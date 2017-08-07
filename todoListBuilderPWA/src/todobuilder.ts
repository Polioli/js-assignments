import ToDoList from "./todolist";

class ToDoBuilder {
  parentNode: HTMLBodyElement;
  addButtonNode: Element;
  todosBoxNode: Element;
  constructor( selector:any ) {
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
      <button class="fab js-add-todolist">\
        <i class="material-icons material-spec-icon" title="Add Item">add</i>\
      </button>\
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
        todosData.forEach( ( listId:any ) => {
        this.createTodoList( { id: listId } );
      });
    } else {
      this.createTodoList( null );
    }
  }

  getDataFromStorage(): Array<any> {
    let todosData: Array<any>;
    try {
      todosData = JSON.parse( localStorage.getItem( "todoLists" ) ) || [];
    } catch( e ) {
      alert( "An error occured while saving the list" );
      todosData = null;
    }
    return todosData;
  }

  setDataToStorage( todosData:any ) {
    if( todosData.length )
      localStorage.setItem( "todoLists", JSON.stringify( todosData ) );
    else
      localStorage.removeItem( "todoLists" );
  }

  createTodoList( data:any ) {
    new ToDoList( this.todosBoxNode, data );
  }

  addList() {
    this.createTodoList( null );
  }

  saveListId( ev:any ) {
    let todosData = this.getDataFromStorage() ;
    if( !todosData ) return;
    todosData.push( ev.detail );
    this.setDataToStorage( todosData );
  }

  removeListId( ev:any ) {
    // actions after removing a list
    let todosData = this.getDataFromStorage();
    let index = todosData.indexOf( ev.detail );
    if( index > -1 ) {
      todosData.splice( index, 1 );
      this.setDataToStorage( todosData );
    }
  }
}

export default ToDoBuilder
