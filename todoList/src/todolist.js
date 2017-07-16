class ToDoList {
  constructor( node, data ) {
    this.items = [];
    this.parentNode = node;
    this.initMarkup();
    this.initEvents();
    if( !!data ) {
      data.map(( item ) => {
        this.addItem( item );
      });
    }
  }

  initMarkup() {
    let fragment = document.createDocumentFragment();
    let form = document.createElement( "form" );
    form.classList.add( "js-add-item" );
    let input = document.createElement( "input" );
    input.setAttribute( "type", "text" );
    input.setAttribute( "name", "add-item" );
    form.appendChild( input );
    let button = document.createElement( "input" );
    button.setAttribute( "type", "submit" );
    button.setAttribute( "value", "ok" );
    form.appendChild( button );
    fragment.appendChild( form );
    this.inputNode = form;
    let list = document.createElement( "ul" );
    list.classList.add( "todo-list" );
    fragment.appendChild( list );
    this.listNode = list;
    this.parentNode.appendChild( fragment );
  }
  initEvents() {
    let findItem = ( list, id ) => {
      return list.findIndex( ( item ) => {
          return item.id == id;
        });
    };

    this.inputNode.addEventListener("submit", ( ev ) => {
      ev.preventDefault();
      this.addItem( { name: ev.target.elements[ "add-item" ].value } );
    });

    this.listNode.addEventListener("click", ( ev ) => {
      if( ev.target.classList.contains( "js-complete" ) ) {
        let index = findItem( this.items, ev.target.parentNode.dataset.id );
        if( this.items[ index ].isComplete ) {
          this.listNode.children[ index ].classList.remove( "item-complete" );
        } else {
          this.listNode.children[ index ].classList.add( "item-complete" );
        }
        this.items[ index ].isComplete = !this.items[ index ].isComplete;
      }
      if( ev.target.classList.contains( "js-remove" ) ) {
        let index = findItem( this.items, ev.target.parentNode.dataset.id );
        this.items.splice( index, 1 );
        this.listNode.children[ index ].remove();
      }
    });

  }
  addItem( item ) {
    if( typeof item.id == "undefined" ) item.id = this.items.length;
    this.items.push( item );

    let itemNode = document.createElement( "li" );
    if( item.isComplete) {
      itemNode.classList.add( "item-complete" );
    }
    itemNode.innerHTML = `<span class="js-complete">[V] </span><span class="text">${item.name}</span><span class="js-remove"> [delete]</span>`;
    itemNode.dataset.id = item.id;
    this.listNode.appendChild( itemNode );
  }
}

export { ToDoList as default }
