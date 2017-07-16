class ToDoListItem {
  constructor( parentList, item ) {
    Object.assign( this, item );
    this.list = parentList;
    this.node = null;
    this.initMarkup( item );
  }
  initMarkup( item ) {
    let itemNode = document.createElement( "li" );
    if( item.isComplete) {
      itemNode.classList.add( "item-complete" );
    }
    itemNode.innerHTML = `<span class="js-complete">[V] </span><span class="text">${item.name}</span><span class="js-remove"> [delete]</span>`;
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
}

export { ToDoListItem as default }
