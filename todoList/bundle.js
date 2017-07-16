(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _todolist = require("./todolist.js");

var _todolist2 = _interopRequireDefault(_todolist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testData = [{ id: "id1", name: "task1", isComplete: false }, { id: "id2", name: "task2", isComplete: false }, { id: "id3", name: "task3", isComplete: true }, { id: "id4", name: "task4", isComplete: false }];

var nodes = document.querySelectorAll(".js-todo");
var todoList1 = new _todolist2.default(nodes[0]);
var todoList2 = new _todolist2.default(nodes[1], testData);
},{"./todolist.js":2}],2:[function(require,module,exports){
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
    конструктор принимает узел, в котором будет размещен todo-компонент
    и данные для инициализации, если есть
  */
  function ToDoList(node, data) {
    var _this = this;

    _classCallCheck(this, ToDoList);

    this.items = [];
    this.parentNode = node;
    this.initMarkup();
    this.initEvents();
    if (!!data) {
      data.map(function (item) {
        _this.addItem(item);
      });
    }
  }

  /*
    initMarkup задает структуру todo-компонента
    (form.js-add-item>input:text[name:"add-item"]+input:submit)+ul.todo-list.js-list
  */


  _createClass(ToDoList, [{
    key: "initMarkup",
    value: function initMarkup() {
      var template = "<button class=\"js-all\">All items</button><form class=\"js-add-item\"><input type=\"text\" name=\"add-item\" /><input type=\"submit\" value=\"ok\" /></form><ul class=\"todo-list js-list\"></ul>";
      this.parentNode.innerHTML = template;
      this.inputNode = this.parentNode.querySelector(".js-add-item");
      this.listNode = this.parentNode.querySelector(".js-list");
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
      this.parentNode.addEventListener("createTask", function (ev) {
        if (ev.detail.length == 0) return alert("Необходимо заполнить название задачи");
        _this2.addItem({ name: ev.detail });
      });

      this.parentNode.addEventListener("removeTask", function (ev) {
        var index = findItem(_this2.items, ev.detail);
        // QUESTION: вот здесь вижу несоответствие в разбиении на два компонента
        // потому что, если бы все было ок, то здесь бы был только один вызов,
        // удаление компонента из массива, и эта штука запускала бы destroy item'а
        // а так вынуждена писать два вызова
        _this2.items[index].remove();
        _this2.items.splice(index, 1);
      });

      this.parentNode.addEventListener("updateTask", function (ev) {
        var updatedItem = _this2.items[findItem(_this2.items, ev.detail)].update();
        // if( !updatedItem ) return;
        // updatedItem.then( ( item ) => {
        //   console.log( "--update finish", item );
        //   // сохранение в БД
        // }).catch( ( msg ) => {
        //   console.log( "reject = ", msg );
        // });
      });

      this.parentNode.addEventListener("toggleCompleteTask", function (ev) {
        _this2.items[findItem(_this2.items, ev.detail)].toggleComplete();
      });

      /*
        фактические обработчики для DOM-узла компонента
        используем делегирование
      */
      this.inputNode.addEventListener("submit", function (ev) {
        ev.preventDefault();
        _this2.parentNode.dispatchEvent(new CustomEvent("createTask", { detail: ev.target.elements["add-item"].value }));
        _this2.inputNode.reset();
      });

      this.listNode.addEventListener("click", function (ev) {
        if (ev.target.classList.contains("js-complete")) {
          _this2.parentNode.dispatchEvent(new CustomEvent("toggleCompleteTask", { detail: ev.target.parentNode.dataset.id }));
        }

        if (ev.target.classList.contains("js-remove")) {
          _this2.parentNode.dispatchEvent(new CustomEvent("removeTask", { detail: ev.target.parentNode.dataset.id }));
        }

        if (ev.target.classList.contains("js-update")) {
          _this2.parentNode.dispatchEvent(new CustomEvent("updateTask", { detail: ev.target.parentNode.dataset.id }));
        }
      });
      /*
        just for debug
      */
      this.parentNode.querySelector(".js-all").addEventListener("click", function (ev) {
        alert(_this2.items.map(function (item) {
          return item.id + " " + item.name + " " + item.isComplete + " \n";
        }).join(""));
      });
    }
  }, {
    key: "addItem",
    value: function addItem(item) {
      if (typeof item.id == "undefined") item.id = new Date().getTime();
      // QUESTION: я бы даже для this.items использовала не массив, а объект
      // это упростило бы поиск и обращение к нужному item
      this.items.push(new _todolist_item2.default(this, item));
    }
  }]);

  return ToDoList;
}();

exports.default = ToDoList;
},{"./todolist_item.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoListItem = function () {
  function ToDoListItem(parentList, item) {
    _classCallCheck(this, ToDoListItem);

    Object.assign(this, item);
    this.list = parentList;
    this.node = null;
    this.initMarkup(item);
  }

  _createClass(ToDoListItem, [{
    key: "initMarkup",
    value: function initMarkup(item) {
      var itemNode = document.createElement("li");
      itemNode.classList.add("todo-item");
      var checkedStatus = "";
      // item.isComplete = !!item.isComplete;
      if (item.isComplete) {
        itemNode.classList.add("item-complete");
        checkedStatus = "checked";
      }
      itemNode.innerHTML = "<input type=\"checkbox\" class=\"js-complete\" " + checkedStatus + "><span class=\"text js-update\">" + item.name + "</span><span class=\"remove-btn js-remove\"> &#10006;</span>";
      itemNode.dataset.id = item.id;
      this.list.listNode.appendChild(itemNode);
      this.node = itemNode;
    }
  }, {
    key: "remove",
    value: function remove() {
      this.node.remove();
    }
  }, {
    key: "toggleComplete",
    value: function toggleComplete() {
      if (this.isComplete) {
        this.node.classList.remove("item-complete");
      } else {
        this.node.classList.add("item-complete");
      }
      this.isComplete = !this.isComplete;
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      if (this.isComplete) return alert("Нельзя изменить название закрытой задачи");
      // return new Promise ( ( resolve, reject ) => {
      var updatedNode = this.node.querySelector(".js-update");
      updatedNode.innerHTML = "<input type=\"text\" value=\"" + this.name + "\" />";
      var inputNode = updatedNode.querySelector("input");
      inputNode.focus();
      inputNode.addEventListener("keydown", function (ev) {
        if (ev.keyCode == 27) {
          ev.target.value = _this.name;
          inputNode.blur();
        }
      });
      inputNode.addEventListener("blur", function (ev) {
        // reject( "blur" );
        if (ev.target.value.length) {
          updatedNode.innerHTML = ev.target.value;
        }
      });

      inputNode.addEventListener("change", function (ev) {
        // resolve( ev.target.value );
        if (ev.target.value.length == 0) return alert("Название задачи не может быть пустым");

        _this.name = ev.target.value;
        inputNode.blur();
      });
      // });
    }
  }]);

  return ToDoListItem;
}();

exports.default = ToDoListItem;
},{}]},{},[1]);
