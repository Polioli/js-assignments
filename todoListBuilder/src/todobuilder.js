import ToDoList from "./todolist.js";

class ToDoBuilder {
  constructor( selector ) {
    this.parentNode = document.querySelector( selector );
    this.initialize();
  }

  initialize() {
    this.initializeDOM();
    this.initializeEvents();
  }

  initializeDOM() {
    this.parentNode.innerHTML = '\
      <div><button class="btn-add-todo js-add-todolist">Add a new todolist</button></div>\
      <div class="todos-box js-todo-box"></div>';
    this.addButtonNode = this.parentNode.querySelector( ".js-add-todolist" );
    this.todosBoxNode = this.parentNode.querySelector( ".js-todo-box" );
  }

  initializeEvents() {
    this.initializeEventToAddItem();
  }
  initializeEventToAddItem() {
    // listener for adding a new item
    this.addButtonNode.addEventListener( "click", ( ev ) => {
      let node = this.createTodoParentNode();
      new ToDoList( node );
      this.initializeEventToRemoveList( node );
    });
  }
  initializeEventToRemoveList( node ) {
    // listener for removing an item
    node.addEventListener( "removeList", ( ev ) => {
      node.remove();
    });
  }
  createTodoParentNode() {
    let node = document.createElement( "div" );
    this.todosBoxNode.append( node );
    return node;
  }
}

export { ToDoBuilder as default }
