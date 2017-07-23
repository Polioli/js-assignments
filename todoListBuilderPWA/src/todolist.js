import ToDoListItem from "./todolist_item.js"

class ToDoList {
  /*
    конструктор принимает узел родителя,
    к которому будет добавлен todo-компонент,
    и данные для инициализации - listId, если есть
  */
  constructor( builderNode, data ) {
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

  get name() {
    return this._name;
  }

  set name( value ) {
    this._name = value;
    this.nameNode.innerHTML = this.formatName();
  }

  initData() {
    let data = this.getListFromStorage();
    Object.assign( this, { name: data.name } );
    data.items.map(( item ) => {
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
    this.parentNode = document.createElement( "div" );
    this.parentNode.innerHTML = template;
    this.parentNode.classList.add( "todo-wrap" );
    this.inputNode = this.parentNode.querySelector( ".js-add-item" );
    this.listNode = this.parentNode.querySelector( ".js-list" );
    this.nameNode = this.parentNode.querySelector( ".js-assign-name" );
    this.todosBoxNode.append( this.parentNode );
  }

  initEvents() {
    let findItem = ( list, id ) => {
      return list.findIndex( ( item ) => {
          return item.id == id;
        });
    };

    /*
    задаем событийную модель для списка
      createTask, removeTask, updateTask, completeTask
    */
    this.parentNode.addEventListener("todos.createTask", ( ev ) => {
      if( ev.detail.length == 0 ) return alert ( "Необходимо заполнить название задачи" );
      this.addItem( { name: ev.detail } );
      this.saveList();
    });

    this.parentNode.addEventListener("todos.removeTask", ( ev ) => {
      let index = findItem( this.items, ev.detail );
      this.items.splice( index, 1 );
      this.saveList();
    }, true);

    this.parentNode.addEventListener("todos.itemWasUpdated", ( ev ) => {
      this.saveList();
    }, true);

    /*
       добавление нового элемента списка
    */
    this.inputNode.addEventListener("submit", ( ev ) => {
      ev.preventDefault();
      this.parentNode.dispatchEvent(new CustomEvent( "todos.createTask", { detail: ev.target.elements[ "add-item" ].value } ));
      this.inputNode.reset();
    });

    /*
      удаление элементов списка
    */
    this.parentNode.querySelector( ".js-clear-list" ).addEventListener("click", ( ev ) => {
      this.clearAll();
    });

    /*
      переименование списка
    */
    this.nameNode.addEventListener("blur", ( ev ) => {
      if( ev.target.innerHTML != this.formatName() ) {
        this.name = ev.target.innerHTML;
        this.saveList();
      }
      ev.target.innerHTML = this.formatName();
    });

    this.nameNode.addEventListener("keydown", ( ev ) => {
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
    this.parentNode.querySelector( ".js-remove-list" ).addEventListener("click", ( ev ) => {
      this.clearAll( { removeWithParent: true } );
      this.todosBoxNode.dispatchEvent( new CustomEvent( "todos.removeListId", { detail: this.id } ) );
    });
  }

  formatName() {
    return this.name || "[Assign the list name]";
  }

  getListFromStorage() {
    let todoData = localStorage.getItem( `todoList_${this.id}` );
    try {
      todoData = JSON.parse( todoData );
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

  saveList( options ) {
    let todoData = this.getListFromStorage();
    Object.assign( todoData, { id: this.id, name: this.name, items: this.items.map( ( item ) => {
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

  addItem( item ) {
    if( typeof item.id == "undefined" ) item.id = new Date().getTime();
    this.items.push( new ToDoListItem( this.listNode, item ) );
  }

  clearAll( options ) {
    this.items.length = 0;
    this.listNode.innerHTML = "";
    if( options && options.removeWithParent ) {
      this.parentNode.remove();
      this.removeFromStorage();
    } else {
      this.saveList();
    }
  }
}

export { ToDoList as default }
