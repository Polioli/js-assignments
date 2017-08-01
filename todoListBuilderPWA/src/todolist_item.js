class ToDoListItem {
  constructor( parentNode, item ) {
    this.isComplete = false;
    Object.assign( this, item );
    this.parentNode = parentNode;
    this.node = null;
    this.initMarkup( item );
    this.initEvents();
  }

  initMarkup( item ) {
    let itemNode = document.createElement( "li" );
    itemNode.classList.add( "todo-item" );
    let checkedStatus = "";
    if( item.isComplete) {
      itemNode.classList.add( "item-complete" );
      checkedStatus = "checked"
    }
    itemNode.innerHTML = `
      <div role="checkbox" class="checkbox js-complete" ${checkedStatus}></div>
      <input class="text js-update" value="${item.name}" readonly>
      <div class="remove-btn js-remove"></div>`;
    itemNode.dataset.id = item.id;
    this.parentNode.appendChild( itemNode );
    this.node = itemNode;
    this.inputNode = itemNode.querySelector( ".js-update" );
  }

  initEvents() {
    this.node.querySelector( ".js-complete" ).addEventListener("click", this.toggleCompleteEvent.bind( this));

    this.node.querySelector( ".js-remove" ).addEventListener("click", this.removeEvent.bind( this ));

    this.inputNode.addEventListener("click", ( ev ) => {
      if( this.isComplete ) return; // alert( "Нельзя изменять название закрытой задачи" );
      ev.currentTarget.readOnly = false;
    });

    this.inputNode.addEventListener("change", this. updateEvent.bind( this ));
    this.inputNode.addEventListener("keydown", ( ev ) => {
      if( ev.keyCode == 27 ) {
        ev.target.value = this.name;
        this.inputNode.blur();
      }
    });
    this.inputNode.addEventListener("blur", ( ev ) => {
      ev.currentTarget.readOnly = true;
    });
  }

  sendUpdateStatus() {
    this.parentNode.dispatchEvent( new CustomEvent( "todos.itemWasUpdated" ) );
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      isComplete: this.isComplete
    };
  }

  removeEvent() {
    this.node.remove();
    this.parentNode.dispatchEvent( new CustomEvent( "todos.removeTask", { detail: this.id } ) );
  }

  toggleCompleteEvent() {
    if( this.isComplete ) {
      this.node.classList.remove( "item-complete" );
    } else {
      this.node.classList.add( "item-complete" );
    }
    this.isComplete = !this.isComplete;
    this.sendUpdateStatus();
  }

  updateEvent( ev ) {
    if( ev.target.value.length == 0 ) {
      ev.preventDefault();
      ev.target.value = this.name;
      alert ( "Необходимо заполнить название задачи" );
    }
    ev.target.readOnly = true;
    this.name = ev.target.value;
    this.sendUpdateStatus();
  }
}

export { ToDoListItem as default }