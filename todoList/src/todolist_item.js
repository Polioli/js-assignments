class ToDoListItem {
  constructor( parentList, item ) {
    Object.assign( this, item );
    this.list = parentList;
    this.node = null;
    this.initMarkup( item );
  }
  initMarkup( item ) {
    let itemNode = document.createElement( "li" );
    itemNode.classList.add( "todo-item" );
    let checkedStatus = "";
    // item.isComplete = !!item.isComplete;
    if( item.isComplete) {
      itemNode.classList.add( "item-complete" );
      checkedStatus = "checked"
    }
    itemNode.innerHTML = `<input type="checkbox" class="js-complete" ${checkedStatus}><span class="text js-update">${item.name}</span><span class="remove-btn js-remove"> &#10006;</span>`;
    itemNode.dataset.id = item.id;
    this.list.listNode.appendChild( itemNode );
    this.node = itemNode;
  }

  remove() {
    this.node.remove();
  }

  toggleComplete() {
    if( this.isComplete ) {
      this.node.classList.remove( "item-complete" );
    } else {
      this.node.classList.add( "item-complete" );
    }
    this.isComplete = !this.isComplete;
  }

  update() {
    if( this.isComplete ) return alert( "Нельзя изменить название закрытой задачи" );
    // return new Promise ( ( resolve, reject ) => {
      let updatedNode = this.node.querySelector( ".js-update" );
      updatedNode.innerHTML = `<input type="text" value="${this.name}" />`;
      let inputNode = updatedNode.querySelector( "input" );
      inputNode.focus();
      inputNode.addEventListener("keydown", ( ev ) => {
        if( ev.keyCode == 27 ) {
          ev.target.value = this.name;
          inputNode.blur();
        }
      });
      inputNode.addEventListener("blur", ( ev ) => {
        // reject( "blur" );
        if( ev.target.value.length ) {
          updatedNode.innerHTML = ev.target.value;
        }
      });

      inputNode.addEventListener("change", ( ev ) => {
        // resolve( ev.target.value );
        if( ev.target.value.length == 0 ) return alert( "Название задачи не может быть пустым" );

        this.name = ev.target.value;
        inputNode.blur();
      });
    // });
  }
}

export { ToDoListItem as default }
