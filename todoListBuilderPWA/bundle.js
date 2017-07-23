(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _todobuilder = require("./todobuilder.js");

var _todobuilder2 = _interopRequireDefault(_todobuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoBuilder = new _todobuilder2.default(".js-todo-builder");
},{"./todobuilder.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _todolist = require("./todolist.js");

var _todolist2 = _interopRequireDefault(_todolist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoBuilder = function () {
  function ToDoBuilder(selector) {
    _classCallCheck(this, ToDoBuilder);

    this.parentNode = document.querySelector(selector);
    this.initialize();
  }

  _createClass(ToDoBuilder, [{
    key: "initialize",
    value: function initialize() {
      this.initializeDOM();
      this.initializeEvents();
      this.initializeData();
    }
  }, {
    key: "initializeDOM",
    value: function initializeDOM() {
      this.parentNode.innerHTML = '\
      <div><button class="btn-add-todo js-add-todolist">Add a new todolist</button></div>\
      <div class="todos-box js-todo-box"></div>';
      this.addButtonNode = this.parentNode.querySelector(".js-add-todolist");
      this.todosBoxNode = this.parentNode.querySelector(".js-todo-box");
    }
  }, {
    key: "initializeEvents",
    value: function initializeEvents() {
      // listener for adding a new item
      this.addButtonNode.addEventListener("click", this.addList.bind(this));
      // listener for removing an item
      this.todosBoxNode.addEventListener("todos.removeListId", this.removeListId.bind(this));
      // listener for saving listArray
      this.todosBoxNode.addEventListener("todos.saveListId", this.saveListId.bind(this));
    }
  }, {
    key: "initializeData",
    value: function initializeData() {
      var _this = this;

      var todosData = this.getDataFromStorage();

      if (!!todosData && todosData.length) {
        todosData.forEach(function (listId) {
          _this.createTodoList({ id: listId });
        });
      } else {
        this.createTodoList();
      }
    }
  }, {
    key: "getDataFromStorage",
    value: function getDataFromStorage() {
      var todosData = localStorage.getItem("todoLists");
      try {
        todosData = JSON.parse(todosData) || [];
      } catch (e) {
        alert("An error occured while saving the list");
        todosData = null;
      }
      return todosData;
    }
  }, {
    key: "setDataToStorage",
    value: function setDataToStorage(todosData) {
      if (todosData.length) localStorage.setItem("todoLists", JSON.stringify(todosData));else localStorage.removeItem("todoLists");
    }
  }, {
    key: "createTodoList",
    value: function createTodoList(data) {
      new _todolist2.default(this.todosBoxNode, data);
    }
  }, {
    key: "addList",
    value: function addList() {
      this.createTodoList();
    }
  }, {
    key: "saveListId",
    value: function saveListId(ev) {
      var todosData = this.getDataFromStorage();
      if (!todosData) return;
      todosData.push(ev.detail);
      this.setDataToStorage(todosData);
    }
  }, {
    key: "removeListId",
    value: function removeListId(ev) {
      // actions after removing a list
      var todosData = this.getDataFromStorage();
      var index = todosData.indexOf(ev.detail);
      if (index > -1) {
        todosData.splice(index, 1);
        this.setDataToStorage(todosData);
      }
    }
  }]);

  return ToDoBuilder;
}();

exports.default = ToDoBuilder;
},{"./todolist.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _todolist_item = require("./todolist_item.js");

var _todolist_item2 = _interopRequireDefault(_todolist_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoList = function () {
  /*
    конструктор принимает узел родителя,
    к которому будет добавлен todo-компонент,
    и данные для инициализации - listId, если есть
  */
  function ToDoList(builderNode, data) {
    _classCallCheck(this, ToDoList);

    this.todosBoxNode = builderNode;
    this.initMarkup();
    this.initEvents();
    this.id = data && data.id || new Date().getTime();
    this.items = [];
    this.name = "";
    if (!!data) {
      this.initData();
    } else {
      this.saveList({ isNew: true });
    }
  }

  _createClass(ToDoList, [{
    key: "initData",
    value: function initData() {
      var _this = this;

      var data = this.getListFromStorage();
      Object.assign(this, { name: data.name });
      data.items.map(function (item) {
        _this.addItem(item);
      });
    }

    /*
      initMarkup задает структуру todo-компонента
      (form.js-add-item>input:text[name:"add-item"]+input:submit)+ul.todo-list.js-list
    */

  }, {
    key: "initMarkup",
    value: function initMarkup() {
      var template = "\n      <div class=\"todo-name js-assign-name\" contenteditable></div>\n      <button class=\"js-clear-list\">Clear list</button>\n      <button class=\"js-remove-list\">Remove list</button>\n      <form class=\"js-add-item\"><input type=\"text\" name=\"add-item\" /><input type=\"submit\" value=\"ok\" /></form>\n      <ul class=\"todo-list js-list\"></ul>";
      this.parentNode = document.createElement("div");
      this.parentNode.innerHTML = template;
      this.parentNode.classList.add("todo-wrap");
      this.inputNode = this.parentNode.querySelector(".js-add-item");
      this.listNode = this.parentNode.querySelector(".js-list");
      this.nameNode = this.parentNode.querySelector(".js-assign-name");
      this.todosBoxNode.append(this.parentNode);
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this2 = this;

      var findItem = function findItem(list, id) {
        return list.findIndex(function (item) {
          return item.id == id;
        });
      };

      /*
      задаем событийную модель для списка
        createTask, removeTask, updateTask, completeTask
      */
      this.parentNode.addEventListener("todos.createTask", function (ev) {
        if (ev.detail.length == 0) return alert("Необходимо заполнить название задачи");
        _this2.addItem({ name: ev.detail });
        _this2.saveList();
      });

      this.parentNode.addEventListener("todos.removeTask", function (ev) {
        var index = findItem(_this2.items, ev.detail);
        _this2.items.splice(index, 1);
        _this2.saveList();
      }, true);

      this.parentNode.addEventListener("todos.itemWasUpdated", function (ev) {
        _this2.saveList();
      }, true);

      /*
         добавление нового элемента списка
      */
      this.inputNode.addEventListener("submit", function (ev) {
        ev.preventDefault();
        _this2.parentNode.dispatchEvent(new CustomEvent("todos.createTask", { detail: ev.target.elements["add-item"].value }));
        _this2.inputNode.reset();
      });

      /*
        удаление элементов списка
      */
      this.parentNode.querySelector(".js-clear-list").addEventListener("click", function (ev) {
        _this2.clearAll();
      });

      /*
        переименование списка
      */
      this.nameNode.addEventListener("blur", function (ev) {
        if (ev.target.innerHTML != _this2.formatName()) {
          _this2.name = ev.target.innerHTML;
          _this2.saveList();
        }
        ev.target.innerHTML = _this2.formatName();
      });

      this.nameNode.addEventListener("keydown", function (ev) {
        if (ev.keyCode == 27) {
          ev.target.innerHTML = _this2.formatName();
          ev.target.blur();
        }
        if (ev.keyCode == 13) {
          ev.preventDefault();
          ev.target.blur();
        }
      });

      /*
        удаление всего списка
      */
      this.parentNode.querySelector(".js-remove-list").addEventListener("click", function (ev) {
        _this2.clearAll({ removeWithParent: true });
        _this2.todosBoxNode.dispatchEvent(new CustomEvent("todos.removeListId", { detail: _this2.id }));
      });
    }
  }, {
    key: "formatName",
    value: function formatName() {
      return this.name || "[Assign the list name]";
    }
  }, {
    key: "getListFromStorage",
    value: function getListFromStorage() {
      var todoData = localStorage.getItem("todoList_" + this.id);
      try {
        todoData = JSON.parse(todoData);
      } catch (e) {
        // TODO: alert message
      } finally {
        todoData = todoData || {};
      }
      return todoData;
    }
  }, {
    key: "removeFromStorage",
    value: function removeFromStorage() {
      localStorage.removeItem("todoList_" + this.id);
    }
  }, {
    key: "saveList",
    value: function saveList(options) {
      var todoData = this.getListFromStorage();
      Object.assign(todoData, { id: this.id, name: this.name, items: this.items.map(function (item) {
          return item.getData();
        }) });

      var dataToSave = void 0;
      try {
        dataToSave = JSON.stringify(todoData);
      } catch (e) {
        alert("An error was accured by saving data");
        return;
      }
      localStorage.setItem("todoList_" + this.id, dataToSave);
      if (options && options.isNew) {
        this.todosBoxNode.dispatchEvent(new CustomEvent("todos.saveListId", { detail: this.id }));
      }
    }
  }, {
    key: "addItem",
    value: function addItem(item) {
      if (typeof item.id == "undefined") item.id = new Date().getTime();
      this.items.push(new _todolist_item2.default(this.listNode, item));
    }
  }, {
    key: "clearAll",
    value: function clearAll(options) {
      this.items.length = 0;
      this.listNode.innerHTML = "";
      if (options && options.removeWithParent) {
        this.parentNode.remove();
        this.removeFromStorage();
      } else {
        this.saveList();
      }
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(value) {
      this._name = value;
      this.nameNode.innerHTML = this.formatName();
    }
  }]);

  return ToDoList;
}();

exports.default = ToDoList;
},{"./todolist_item.js":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoListItem = function () {
  function ToDoListItem(parentNode, item) {
    _classCallCheck(this, ToDoListItem);

    this.isComplete = false;
    Object.assign(this, item);
    this.parentNode = parentNode;
    this.node = null;
    this.initMarkup(item);
    this.initEvents();
  }

  _createClass(ToDoListItem, [{
    key: "initMarkup",
    value: function initMarkup(item) {
      var itemNode = document.createElement("li");
      itemNode.classList.add("todo-item");
      var checkedStatus = "";
      if (item.isComplete) {
        itemNode.classList.add("item-complete");
        checkedStatus = "checked";
      }
      itemNode.innerHTML = "\n      <div role=\"checkbox\" class=\"checkbox js-complete\" " + checkedStatus + "></div>\n      <input class=\"text js-update\" value=\"" + item.name + "\" readonly>\n      <div class=\"remove-btn js-remove\"></div>";
      itemNode.dataset.id = item.id;
      this.parentNode.appendChild(itemNode);
      this.node = itemNode;
      this.inputNode = itemNode.querySelector(".js-update");
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      this.node.querySelector(".js-complete").addEventListener("click", this.toggleCompleteEvent.bind(this));

      this.node.querySelector(".js-remove").addEventListener("click", this.removeEvent.bind(this));

      this.inputNode.addEventListener("click", function (ev) {
        if (_this.isComplete) return; // alert( "Нельзя изменять название закрытой задачи" );
        ev.currentTarget.readOnly = false;
      });

      this.inputNode.addEventListener("change", this.updateEvent.bind(this));
      this.inputNode.addEventListener("keydown", function (ev) {
        if (ev.keyCode == 27) {
          ev.target.value = _this.name;
          _this.inputNode.blur();
        }
      });
      this.inputNode.addEventListener("blur", function (ev) {
        ev.currentTarget.readOnly = true;
      });
    }
  }, {
    key: "sendUpdateStatus",
    value: function sendUpdateStatus() {
      this.parentNode.dispatchEvent(new CustomEvent("todos.itemWasUpdated"));
    }
  }, {
    key: "getData",
    value: function getData() {
      return {
        id: this.id,
        name: this.name,
        isComplete: this.isComplete
      };
    }
  }, {
    key: "removeEvent",
    value: function removeEvent() {
      this.node.remove();
      this.parentNode.dispatchEvent(new CustomEvent("todos.removeTask", { detail: this.id }));
    }
  }, {
    key: "toggleCompleteEvent",
    value: function toggleCompleteEvent() {
      if (this.isComplete) {
        this.node.classList.remove("item-complete");
      } else {
        this.node.classList.add("item-complete");
      }
      this.isComplete = !this.isComplete;
      this.sendUpdateStatus();
    }
  }, {
    key: "updateEvent",
    value: function updateEvent(ev) {
      if (ev.target.value.length == 0) {
        ev.preventDefault();
        ev.target.value = this.name;
        alert("Необходимо заполнить название задачи");
      }
      ev.target.readOnly = true;
      this.name = ev.target.value;
      this.sendUpdateStatus();
    }
  }]);

  return ToDoListItem;
}();

exports.default = ToDoListItem;
},{}]},{},[1]);
