import ToDoList from "./todolist.js";

class ToDoBuilder {
  constructor( selector ) {
    this.parentNode = document.querySelector( selector );
    this.initialize();
  }

  initialize() {
    this.initializeDOM();
    this.initializeEvents();
    this.initializeData();
  }

  initializeDOM() {
    this.parentNode.innerHTML = '\
      <div><button class="btn-add-todo js-add-todolist">Add a new todolist</button></div>\
      <div class="todos-box js-todo-box"></div>';
    this.addButtonNode = this.parentNode.querySelector( ".js-add-todolist" );
    this.todosBoxNode = this.parentNode.querySelector( ".js-todo-box" );
  }

  initializeEvents() {
    // listener for adding a new item
    this.addButtonNode.addEventListener( "click", this.addList.bind( this ));
    // listener for removing an item
    this.todosBoxNode.addEventListener( "todos.removeListId", this.removeListId.bind( this ));
    // listener for saving listArray
    this.todosBoxNode.addEventListener( "todos.saveListId", this.saveListId.bind( this ));
  }

  initializeData() {
    let todosData = this.getDataFromStorage();

    if( !!todosData && todosData.length ) {
        todosData.forEach( ( listId ) => {
        this.createTodoList( { id: listId } );
      });
    } else {
      this.createTodoList();
    }
  }

  getDataFromStorage() {
    let todosData = localStorage.getItem( "todoLists" );
    try {
      todosData = JSON.parse( todosData ) || [];
    } catch( e ) {
      alert( "An error occured while saving the list" );
      todosData = null;
    }
    return todosData;
  }

  setDataToStorage( todosData ) {
    if( todosData.length )
      localStorage.setItem( "todoLists", JSON.stringify( todosData ) );
    else
      localStorage.removeItem( "todoLists" );
  }

  createTodoList( data ) {
    new ToDoList( this.todosBoxNode, data );
  }

  addList() {
    this.createTodoList();
  }

  saveListId( ev ) {
    let todosData = this.getDataFromStorage() ;
    if( !todosData ) return;
    todosData.push( ev.detail );
    this.setDataToStorage( todosData );
  }

  removeListId( ev ) {
    // actions after removing a list
    let todosData = this.getDataFromStorage();
    let index = todosData.indexOf( ev.detail );
    if( index > -1 ) {
      todosData.splice( index, 1 );
      this.setDataToStorage( todosData );
    }
  }
}

export { ToDoBuilder as default }
