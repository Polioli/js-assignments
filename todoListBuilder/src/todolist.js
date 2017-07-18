import ToDoListItem from "./todolist_item.js"

class ToDoList {
  /*
    конструктор принимает узел, в котором будет размещен todo-компонент
    и данные для инициализации, если есть
  */
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

  /*
    initMarkup задает структуру todo-компонента
    (form.js-add-item>input:text[name:"add-item"]+input:submit)+ul.todo-list.js-list
  */
  initMarkup() {
    let template = `<button class="js-all">Show all items</button><button class="js-remove-list">Remove list</button><form class="js-add-item"><input type="text" name="add-item" /><input type="submit" value="ok" /></form><ul class="todo-list js-list"></ul>`;
    this.parentNode.innerHTML = template;
    this.inputNode = this.parentNode.querySelector( ".js-add-item" );
    this.listNode = this.parentNode.querySelector( ".js-list" );
    this.parentNode.classList.add( "todo-wrap" );
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
    this.parentNode.addEventListener("createTask", ( ev ) => {
      if( ev.detail.length == 0 ) return alert ( "Необходимо заполнить название задачи" );
      this.addItem( { name: ev.detail } );
    });

    this.parentNode.addEventListener("removeTask", ( ev ) => {
      let index = findItem( this.items, ev.detail );
      // QUESTION: вот здесь вижу несоответствие в разбиении на два компонента
      // потому что, если бы все было ок, то здесь бы был только один вызов,
      // удаление компонента из массива, и эта штука запускала бы destroy item'а
      // а так вынуждена писать два вызова
      this.items[ index ].remove();
      this.items.splice( index, 1 );
    });

    this.parentNode.addEventListener("updateTask", ( ev ) => {
      let updatedItem = this.items[ findItem( this.items, ev.detail ) ].update();
      // if( !updatedItem ) return;
      // updatedItem.then( ( item ) => {
      //   console.log( "--update finish", item );
      //   // сохранение в БД
      // }).catch( ( msg ) => {
      //   console.log( "reject = ", msg );
      // });
    });

    this.parentNode.addEventListener("toggleCompleteTask", ( ev ) => {
        this.items[ findItem( this.items, ev.detail ) ].toggleComplete();
    });

    /*
      фактические обработчики для DOM-узла компонента
      используем делегирование
    */
    this.inputNode.addEventListener("submit", ( ev ) => {
      ev.preventDefault();
      this.parentNode.dispatchEvent(new CustomEvent( "createTask", { detail: ev.target.elements[ "add-item" ].value } ));
      this.inputNode.reset();
    });

    this.listNode.addEventListener("click", ( ev ) => {
      if( ev.target.classList.contains( "js-complete" ) ) {
        this.parentNode.dispatchEvent(new CustomEvent( "toggleCompleteTask", { detail: ev.target.parentNode.dataset.id } ));
      }

      if( ev.target.classList.contains( "js-remove" ) ) {
        this.parentNode.dispatchEvent(new CustomEvent( "removeTask", { detail: ev.target.parentNode.dataset.id } ));
      }

      if( ev.target.classList.contains( "js-update" ) ) {
        this.parentNode.dispatchEvent(new CustomEvent( "updateTask", { detail: ev.target.parentNode.dataset.id } ));
      }
    });
    /*
      удаление всего списка, делаем через "родительский" компонент
    */
    this.parentNode.querySelector( ".js-remove-list" ).addEventListener("click", ( ev ) => {
      this.parentNode.dispatchEvent( new CustomEvent( "removeList" ) );
    });

    /*
      just for debug
    */
    this.parentNode.querySelector( ".js-all" ).addEventListener("click", ( ev ) => {
      alert(this.items.map( ( item ) => {
        return `${item.id} ${item.name} ${item.isComplete} \n`;
      }).join( "" ));
    });
  }
  addItem( item ) {
    if( typeof item.id == "undefined" ) item.id = new Date().getTime();
    // QUESTION: я бы даже для this.items использовала не массив, а объект
    // это упростило бы поиск и обращение к нужному item
    this.items.push( new ToDoListItem( this, item ) );
  }
  clearAll() {
    this.items.length = 0;
    this.parentNode.remove();
  }
}

export { ToDoList as default }
