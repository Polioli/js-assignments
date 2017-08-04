// import ToDoListItem from "./todolist_item"

class ToDoList {
  /*
    конструктор принимает узел родителя,
    к которому будет добавлен todo-компонент,
    и данные для инициализации - listId, если есть
  */
  todosBoxNode: any;
  id: string;
  items: Array<any>;
  _name: string;
  nameNode: any;
  parentNode: HTMLElement;
  listNode: HTMLElement;
  inputNode: HTMLFormElement;
  constructor( builderNode:any, data:any ) {
    this.todosBoxNode = builderNode;
    this.initMarkup();
    this.initEvents();
    this.id = ( data && data.id ) || new Date().getTime();
    this.items = [];
    this.name = "";
    if( !!data ) {
      this.initData();
    } else {
      this.saveList( { isNew: true } );
    }
  }

  get name():string {
    return this._name;
  }

  set name( value ) {
    this._name = value;
    this.nameNode.innerHTML = this.formatName();
  }

  initData() {
    let data:any = this.getListFromStorage();
    Object.assign( this, { name: data.name } );
    data.items.map(( item:any ) => {
      this.addItem( item );
    });
  }

  /*
    initMarkup задает структуру todo-компонента
    (form.js-add-item>input:text[name:"add-item"]+input:submit)+ul.todo-list.js-list
  */
  initMarkup() {
    let template = `
      <div class="todo-name js-assign-name" contenteditable></div>
      <button class="js-clear-list">Clear list</button>
      <button class="js-remove-list">Remove list</button>
      <form class="js-add-item"><input type="text" name="add-item" /><input type="submit" value="ok" /></form>
      <ul class="todo-list js-list"></ul>`;
    this.parentNode = <HTMLElement>document.createElement( "div" );
    this.parentNode.innerHTML = template;
    this.parentNode.classList.add( "todo-wrap" );
    this.inputNode = <HTMLFormElement>this.parentNode.querySelector( ".js-add-item" );
    this.listNode = <HTMLElement>this.parentNode.querySelector( ".js-list" );
    this.nameNode = this.parentNode.querySelector( ".js-assign-name" );
    this.todosBoxNode.append( this.parentNode );
  }

  initEvents() {
    let findItem = ( list:Array<any>, id:string ): number => {
      return list.findIndex( ( item:any ): boolean => {
          return item.id == id;
        });
    };

    /*
    задаем событийную модель для списка
      createTask, removeTask, updateTask, completeTask
    */
    this.parentNode.addEventListener("todos.createTask", ( ev:any ) => {
      if( ev.detail.length == 0 ) return alert ( "Необходимо заполнить название задачи" );
      this.addItem( { name: ev.detail } );
    });

    this.parentNode.addEventListener("todos.removeTask", ( ev:any ) => {
      let index = findItem( this.items, ev.detail );
      this.items.splice( index, 1 );
      this.saveList( null );
    }, true);

    this.parentNode.addEventListener("todos.itemWasUpdated", ( ev:any ) => {
      this.saveList( null );
    }, true);

    /*
       добавление нового элемента списка
    */
    this.inputNode.addEventListener("submit", ( ev ) => {
      ev.preventDefault();
      let elements: any = (<HTMLFormElement>ev.target).elements;
      let value = elements[ "add-item" ].value;
      this.parentNode.dispatchEvent(new CustomEvent( "todos.createTask", { detail: value } ));
      this.inputNode.reset();
    });

    /*
      удаление элементов списка
    */
    this.parentNode.querySelector( ".js-clear-list" ).addEventListener("click", ( ev:any ) => {
      this.clearAll( null );
    });

    /*
      переименование списка
    */
    this.nameNode.addEventListener("blur", ( ev:any ) => {
      if( ev.target.innerHTML != this.formatName() ) {
        this.name = ev.target.innerHTML;
        this.saveList( null );
      }
      ev.target.innerHTML = this.formatName();
    });

    this.nameNode.addEventListener("keydown", ( ev:any ) => {
        if( ev.keyCode == 27 ) {
          ev.target.innerHTML = this.formatName();
          ev.target.blur();
        }
        if( ev.keyCode == 13 ) {
          ev.preventDefault();
          ev.target.blur();
        }
    });

    /*
      удаление всего списка
    */
    this.parentNode.querySelector( ".js-remove-list" ).addEventListener("click", ( ev:any ) => {
      this.clearAll( { removeWithParent: true } );
      this.todosBoxNode.dispatchEvent( new CustomEvent( "todos.removeListId", { detail: this.id } ) );
    });
  }

  formatName() {
    return this.name || "[Assign the list name]";
  }

  getListFromStorage(): Object {
    let todoData: Object;
    try {
      todoData = JSON.parse( localStorage.getItem( `todoList_${this.id}` ) );
    } catch( e ) {
      // TODO: alert message
    }
    finally{
      todoData = todoData || {};
    }
    return todoData;
  }

  removeFromStorage() {
    localStorage.removeItem( `todoList_${this.id}` );
  }

  saveList( options:any ) {
    let todoData = this.getListFromStorage();
    Object.assign( todoData, { id: this.id, name: this.name, items: this.items.map( ( item:any ) => {
      return item.getData();
    }) } );

    let dataToSave;
    try {
      dataToSave = JSON.stringify( todoData );
    } catch( e ) {
      alert( "An error was accured by saving data" );
      return;
    }
    localStorage.setItem( `todoList_${this.id}`, dataToSave );
    if( options && options.isNew ) {
      this.todosBoxNode.dispatchEvent(new CustomEvent( "todos.saveListId", { detail: this.id } ));
    }
  }

  clearAll( options:any ) {
    this.items.length = 0;
    this.listNode.innerHTML = "";
    if( options && options.removeWithParent ) {
      this.parentNode.remove();
      this.removeFromStorage();
    } else {
      this.saveList( null );
    }
  }

  addItem( item:any ) {
    if( typeof item.id == "undefined" ) item.id = new Date().getTime();
    // this.items.push( new ToDoListItem( this.listNode, item ) );

    import( "./todolist_item" ).then( module => module.default ).then( ( ToDoListItem ) => {
      this.items.push( new ToDoListItem( this.listNode, item ) );
      this.saveList( null );
    });

    // import( "./todolist_item" ).then( module => {
    //   let ToDoListItem = module.default;
    //   this.items.push( new ToDoListItem( this.listNode, item ) );
    // });
  }

}

export default ToDoList
