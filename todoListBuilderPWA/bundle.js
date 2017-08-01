(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _todobuilder = require("./todobuilder.js");

var _todobuilder2 = _interopRequireDefault(_todobuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoBuilder = new _todobuilder2.default(".js-todo-builder");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/js-assignments/todoListBuilderPWA/sw.js") // all domain is the scope todoListBuilderPWA
  .then(function (registration) {
    console.log("SW registration was done!", registration);
  });
}

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi5qcyIsInNyYy90b2RvYnVpbGRlci5qcyIsInNyYy90b2RvbGlzdC5qcyIsInNyYy90b2RvbGlzdF9pdGVtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsSUFBSSxjQUFjLDBCQUFpQixrQkFBakIsQ0FBbEI7O0FBRUEsSUFBSSxtQkFBbUIsU0FBdkIsRUFBbUM7QUFDakMsWUFBVSxhQUFWLENBQXdCLFFBQXhCLENBQWtDLDBDQUFsQyxFQUErRTtBQUEvRSxHQUNDLElBREQsQ0FDTyxVQUFFLFlBQUYsRUFBb0I7QUFDekIsWUFBUSxHQUFSLENBQWEsMkJBQWIsRUFBMkMsWUFBM0M7QUFDRCxHQUhEO0FBSUQ7Ozs7Ozs7Ozs7OztBQ1REOzs7Ozs7OztJQUVNLFc7QUFDSix1QkFBYSxRQUFiLEVBQXdCO0FBQUE7O0FBQ3RCLFNBQUssVUFBTCxHQUFrQixTQUFTLGFBQVQsQ0FBd0IsUUFBeEIsQ0FBbEI7QUFDQSxTQUFLLFVBQUw7QUFDRDs7OztpQ0FFWTtBQUNYLFdBQUssYUFBTDtBQUNBLFdBQUssZ0JBQUw7QUFDQSxXQUFLLGNBQUw7QUFDRDs7O29DQUVlO0FBQ2QsV0FBSyxVQUFMLENBQWdCLFNBQWhCLEdBQTRCOztnREFBNUI7QUFHQSxXQUFLLGFBQUwsR0FBcUIsS0FBSyxVQUFMLENBQWdCLGFBQWhCLENBQStCLGtCQUEvQixDQUFyQjtBQUNBLFdBQUssWUFBTCxHQUFvQixLQUFLLFVBQUwsQ0FBZ0IsYUFBaEIsQ0FBK0IsY0FBL0IsQ0FBcEI7QUFDRDs7O3VDQUVrQjtBQUNqQjtBQUNBLFdBQUssYUFBTCxDQUFtQixnQkFBbkIsQ0FBcUMsT0FBckMsRUFBOEMsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFtQixJQUFuQixDQUE5QztBQUNBO0FBQ0EsV0FBSyxZQUFMLENBQWtCLGdCQUFsQixDQUFvQyxvQkFBcEMsRUFBMEQs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QUgsQ0FBVSxLQUFWLENBQWdCLE1BQWhCLElBQTBCLENBQTlCLEVBQWtDO0FBQ2hDLFdBQUcsY0FBSDtBQUNBLFdBQUcsTUFBSCxDQUFVLEtBQVYsR0FBa0IsS0FBSyxJQUF2QjtBQUNBLGNBQVEsc0NBQVI7QUFDRDtBQUNELFNBQUcsTUFBSCxDQUFVLFFBQVYsR0FBcUIsSUFBckI7QUFDQSxXQUFLLElBQUwsR0FBWSxHQUFHLE1BQUgsQ0FBVSxLQUF0QjtBQUNBLFdBQUssZ0JBQUw7QUFDRDs7Ozs7O1FBR3NCLE8sR0FBaEIsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVG9Eb0J1aWxkZXIgZnJvbSBcIi4vdG9kb2J1aWxkZXIuanNcIjtcblxudmFyIHRvZG9CdWlsZGVyID0gbmV3IFRvRG9CdWlsZGVyKCBcIi5qcy10b2RvLWJ1aWxkZXJcIiApO1xuXG5pZiggXCJzZXJ2aWNlV29ya2VyXCIgaW4gbmF2aWdhdG9yICkge1xuICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlciggXCIvanMtYXNzaWdubWVudHMvdG9kb0xpc3RCdWlsZGVyUFdBL3N3LmpzXCIgKSAvLyBhbGwgZG9tYWluIGlzIHRoZSBzY29wZSB0b2RvTGlzdEJ1aWxkZXJQV0FcbiAgLnRoZW4oICggcmVnaXN0cmF0aW9uICkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCBcIlNXIHJlZ2lzdHJhdGlvbiB3YXMgZG9uZSFcIiwgIHJlZ2lzdHJhdGlvbiApO1xuICB9KTtcbn1cbiIsImltcG9ydCBUb0RvTGlzdCBmcm9tIFwiLi90b2RvbGlzdC5qc1wiO1xuXG5jbGFzcyBUb0RvQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCBzZWxlY3RvciApIHtcbiAgICB0aGlzLnBhcmVudE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBzZWxlY3RvciApO1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVET00oKTtcbiAgICB0aGlzLmluaXRpYWxpemVFdmVudHMoKTtcbiAgICB0aGlzLmluaXRpYWxpemVEYXRhKCk7XG4gIH1cblxuICBpbml0aWFsaXplRE9NKCkge1xuICAgIHRoaXMucGFyZW50Tm9kZS5pbm5lckhUTUwgPSAnXFxcbiAgICAgIDxkaXY+PGJ1dHRvbiBjbGFzcz1cImJ0bi1hZGQtdG9kbyBqcy1hZGQtdG9kb2xpc3RcIj5BZGQgYSBuZXcgdG9kb2xpc3Q8L2J1dHRvbj48L2Rpdj5cXFxuICAgICAgPGRpdiBjbGFzcz1cInRvZG9zLWJveCBqcy10b2RvLWJveFwiPjwvZGl2Pic7XG4gICAgdGhpcy5hZGRCdXR0b25Ob2RlID0gdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoIFwiLmpzLWFkZC10b2RvbGlzdFwiICk7XG4gICAgdGhpcy50b2Rvc0JveE5vZGUgPSB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvciggXCIuanMtdG9kby1ib3hcIiApO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUV2ZW50cygpIHtcbiAgICAvLyBsaXN0ZW5lciBmb3IgYWRkaW5nIGEgbmV3IGl0ZW1cbiAgICB0aGlzLmFkZEJ1dHRvbk5vZGUuYWRkRXZlbnRMaXN0ZW5lciggXCJjbGlja1wiLCB0aGlzLmFkZExpc3QuYmluZCggdGhpcyApKTtcbiAgICAvLyBsaXN0ZW5lciBmb3IgcmVtb3ZpbmcgYW4gaXRlbVxuICAgIHRoaXMudG9kb3NCb3hOb2RlLmFkZEV2ZW50TGlzdGVuZXIoIFwidG9kb3MucmVtb3ZlTGlzdElkXCIsIHRoaXMucmVtb3ZlTGlzdElkLmJpbmQoIHRoaXMgKSk7XG4gICAgLy8gbGlzdGVuZXIgZm9yIHNhdmluZyBsaXN0QXJyYXlcbiAgICB0aGlzLnRvZG9zQm94Tm9kZS5hZGRFdmVudExpc3RlbmVyKCBcInRvZG9zLnNhdmVMaXN0SWRcIiwgdGhpcy5zYXZlTGlzdElkLmJpbmQoIHRoaXMgKSk7XG4gIH1cblxuICBpbml0aWFsaXplRGF0YSgpIHtcbiAgICBsZXQgdG9kb3NEYXRhID0gdGhpcy5nZXREYXRhRnJvbVN0b3JhZ2UoKTtcblxuICAgIGlmKCAhIXRvZG9zRGF0YSAmJiB0b2Rvc0RhdGEubGVuZ3RoICkge1xuICAgICAgICB0b2Rvc0RhdGEuZm9yRWFjaCggKCBsaXN0SWQgKSA9PiB7XG4gICAgICAgIHRoaXMuY3JlYXRlVG9kb0xpc3QoIHsgaWQ6IGxpc3RJZCB9ICk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jcmVhdGVUb2RvTGlzdCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldERhdGFGcm9tU3RvcmFnZSgpIHtcbiAgICBsZXQgdG9kb3NEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oIFwidG9kb0xpc3RzXCIgKTtcbiAgICB0cnkge1xuICAgICAgdG9kb3NEYXRhID0gSlNPTi5wYXJzZSggdG9kb3NEYXRhICkgfHwgW107XG4gICAgfSBjYXRjaCggZSApIHtcbiAgICAgIGFsZXJ0KCBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgc2F2aW5nIHRoZSBsaXN0XCIgKTtcbiAgICAgIHRvZG9zRGF0YSA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0b2Rvc0RhdGE7XG4gIH1cblxuICBzZXREYXRhVG9TdG9yYWdlKCB0b2Rvc0RhdGEgKSB7XG4gICAgaWYoIHRvZG9zRGF0YS5sZW5ndGggKVxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oIFwidG9kb0xpc3RzXCIsIEpTT04uc3RyaW5naWZ5KCB0b2Rvc0RhdGEgKSApO1xuICAgIGVsc2VcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCBcInRvZG9MaXN0c1wiICk7XG4gIH1cblxuICBjcmVhdGVUb2RvTGlzdCggZGF0YSApIHtcbiAgICBuZXcgVG9Eb0xpc3QoIHRoaXMudG9kb3NCb3hOb2RlLCBkYXRhICk7XG4gIH1cblxuICBhZGRMaXN0KCkge1xuICAgIHRoaXMuY3JlYXRlVG9kb0xpc3QoKTtcbiAgfVxuXG4gIHNhdmVMaXN0SWQoIGV2ICkge1xuICAgIGxldCB0b2Rvc0RhdGEgPSB0aGlzLmdldERhdGFGcm9tU3RvcmFnZSgpIDtcbiAgICBpZiggIXRvZG9zRGF0YSApIHJldHVybjtcbiAgICB0b2Rvc0RhdGEucHVzaCggZXYuZGV0YWlsICk7XG4gICAgdGhpcy5zZXREYXRhVG9TdG9yYWdlKCB0b2Rvc0RhdGEgKTtcbiAgfVxuXG4gIHJlbW92ZUxpc3RJZCggZXYgKSB7XG4gICAgLy8gYWN0aW9ucyBhZnRlciByZW1vdmluZyBhIGxpc3RcbiAgICBsZXQgdG9kb3NEYXRhID0gdGhpcy5nZXREYXRhRnJvbVN0b3JhZ2UoKTtcbiAgICBsZXQgaW5kZXggPSB0b2Rvc0RhdGEuaW5kZXhPZiggZXYuZGV0YWlsICk7XG4gICAgaWYoIGluZGV4ID4gLTEgKSB7XG4gICAgICB0b2Rvc0RhdGEuc3BsaWNlKCBpbmRleCwgMSApO1xuICAgICAgdGhpcy5zZXREYXRhVG9TdG9yYWdlKCB0b2Rvc0RhdGEgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgVG9Eb0J1aWxkZXIgYXMgZGVmYXVsdCB9XG4iLCJpbXBvcnQgVG9Eb0xpc3RJdGVtIGZyb20gXCIuL3RvZG9saXN0X2l0ZW0uanNcIlxuXG5jbGFzcyBUb0RvTGlzdCB7XG4gIC8qXG4gICAg0LrQvtC90YHRgtGA0YPQutGC0L7RgCDQv9GA0LjQvdC40LzQsNC10YIg0YPQt9C10Lsg0YDQvtC00LjRgtC10LvRjyxcbiAgICDQuiDQutC+0YLQvtGA0L7QvNGDINCx0YPQtNC10YIg0LTQvtCx0LDQstC70LXQvSB0b2RvLdC60L7QvNC/0L7QvdC10L3RgixcbiAgICDQuCDQtNCw0L3QvdGL0LUg0LTQu9GPINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4IC0gbGlzdElkLCDQtdGB0LvQuCDQtdGB0YLRjFxuICAqL1xuICBjb25zdHJ1Y3RvciggYnVpbGRlck5vZGUsIGRhdGEgKSB7XG4gICAgdGhpcy50b2Rvc0JveE5vZGUgPSBidWlsZGVyTm9kZTtcbiAgICB0aGlzLmluaXRNYXJrdXAoKTtcbiAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgICB0aGlzLmlkID0gKCBkYXRhICYmIGRhdGEuaWQgKSB8fCBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gICAgdGhpcy5uYW1lID0gXCJcIjtcbiAgICBpZiggISFkYXRhICkge1xuICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNhdmVMaXN0KCB7IGlzTmV3OiB0cnVlIH0gKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuXG4gIHNldCBuYW1lKCB2YWx1ZSApIHtcbiAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgdGhpcy5uYW1lTm9kZS5pbm5lckhUTUwgPSB0aGlzLmZvcm1hdE5hbWUoKTtcbiAgfVxuXG4gIGluaXREYXRhKCkge1xuICAgIGxldCBkYXRhID0gdGhpcy5nZXRMaXN0RnJvbVN0b3JhZ2UoKTtcbiAgICBPYmplY3QuYXNzaWduKCB0aGlzLCB7IG5hbWU6IGRhdGEubmFtZSB9ICk7XG4gICAgZGF0YS5pdGVtcy5tYXAoKCBpdGVtICkgPT4ge1xuICAgICAgdGhpcy5hZGRJdGVtKCBpdGVtICk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgIGluaXRNYXJrdXAg0LfQsNC00LDQtdGCINGB0YLRgNGD0LrRgtGD0YDRgyB0b2RvLdC60L7QvNC/0L7QvdC10L3RgtCwXG4gICAgKGZvcm0uanMtYWRkLWl0ZW0+aW5wdXQ6dGV4dFtuYW1lOlwiYWRkLWl0ZW1cIl0raW5wdXQ6c3VibWl0KSt1bC50b2RvLWxpc3QuanMtbGlzdFxuICAqL1xuICBpbml0TWFya3VwKCkge1xuICAgIGxldCB0ZW1wbGF0ZSA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvLW5hbWUganMtYXNzaWduLW5hbWVcIiBjb250ZW50ZWRpdGFibGU+PC9kaXY+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwianMtY2xlYXItbGlzdFwiPkNsZWFyIGxpc3Q8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJqcy1yZW1vdmUtbGlzdFwiPlJlbW92ZSBsaXN0PC9idXR0b24+XG4gICAgICA8Zm9ybSBjbGFzcz1cImpzLWFkZC1pdGVtXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImFkZC1pdGVtXCIgLz48aW5wdXQgdHlwZT1cInN1Ym1pdFwiIHZhbHVlPVwib2tcIiAvPjwvZm9ybT5cbiAgICAgIDx1bCBjbGFzcz1cInRvZG8tbGlzdCBqcy1saXN0XCI+PC91bD5gO1xuICAgIHRoaXMucGFyZW50Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcbiAgICB0aGlzLnBhcmVudE5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgdGhpcy5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoIFwidG9kby13cmFwXCIgKTtcbiAgICB0aGlzLmlucHV0Tm9kZSA9IHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCBcIi5qcy1hZGQtaXRlbVwiICk7XG4gICAgdGhpcy5saXN0Tm9kZSA9IHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCBcIi5qcy1saXN0XCIgKTtcbiAgICB0aGlzLm5hbWVOb2RlID0gdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoIFwiLmpzLWFzc2lnbi1uYW1lXCIgKTtcbiAgICB0aGlzLnRvZG9zQm94Tm9kZS5hcHBlbmQoIHRoaXMucGFyZW50Tm9kZSApO1xuICB9XG5cbiAgaW5pdEV2ZW50cygpIHtcbiAgICBsZXQgZmluZEl0ZW0gPSAoIGxpc3QsIGlkICkgPT4ge1xuICAgICAgcmV0dXJuIGxpc3QuZmluZEluZGV4KCAoIGl0ZW0gKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgPT0gaWQ7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKlxuICAgINC30LDQtNCw0LXQvCDRgdC+0LHRi9GC0LjQudC90YPRjiDQvNC+0LTQtdC70Ywg0LTQu9GPINGB0L/QuNGB0LrQsFxuICAgICAgY3JlYXRlVGFzaywgcmVtb3ZlVGFzaywgdXBkYXRlVGFzaywgY29tcGxldGVUYXNrXG4gICAgKi9cbiAgICB0aGlzLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcInRvZG9zLmNyZWF0ZVRhc2tcIiwgKCBldiApID0+IHtcbiAgICAgIGlmKCBldi5kZXRhaWwubGVuZ3RoID09IDAgKSByZXR1cm4gYWxlcnQgKCBcItCd0LXQvtCx0YXQvtC00LjQvNC+INC30LDQv9C+0LvQvdC40YLRjCDQvdCw0LfQstCw0L3QuNC1INC30LDQtNCw0YfQuFwiICk7XG4gICAgICB0aGlzLmFkZEl0ZW0oIHsgbmFtZTogZXYuZGV0YWlsIH0gKTtcbiAgICAgIHRoaXMuc2F2ZUxpc3QoKTtcbiAgICB9KTtcblxuICAgIHRoaXMucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKFwidG9kb3MucmVtb3ZlVGFza1wiLCAoIGV2ICkgPT4ge1xuICAgICAgbGV0IGluZGV4ID0gZmluZEl0ZW0oIHRoaXMuaXRlbXMsIGV2LmRldGFpbCApO1xuICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoIGluZGV4LCAxICk7XG4gICAgICB0aGlzLnNhdmVMaXN0KCk7XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICB0aGlzLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcInRvZG9zLml0ZW1XYXNVcGRhdGVkXCIsICggZXYgKSA9PiB7XG4gICAgICB0aGlzLnNhdmVMaXN0KCk7XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICAvKlxuICAgICAgwqDQtNC+0LHQsNCy0LvQtdC90LjQtSDQvdC+0LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDRgdC/0LjRgdC60LBcbiAgICAqL1xuICAgIHRoaXMuaW5wdXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKCBldiApID0+IHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoIFwidG9kb3MuY3JlYXRlVGFza1wiLCB7IGRldGFpbDogZXYudGFyZ2V0LmVsZW1lbnRzWyBcImFkZC1pdGVtXCIgXS52YWx1ZSB9ICkpO1xuICAgICAgdGhpcy5pbnB1dE5vZGUucmVzZXQoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgICDRg9C00LDQu9C10L3QuNC1INGN0LvQtdC80LXQvdGC0L7QsiDRgdC/0LjRgdC60LBcbiAgICAqL1xuICAgIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCBcIi5qcy1jbGVhci1saXN0XCIgKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCBldiApID0+IHtcbiAgICAgIHRoaXMuY2xlYXJBbGwoKTtcbiAgICB9KTtcblxuICAgIC8qXG4gICAgICDQv9C10YDQtdC40LzQtdC90L7QstCw0L3QuNC1INGB0L/QuNGB0LrQsFxuICAgICovXG4gICAgdGhpcy5uYW1lTm9kZS5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoIGV2ICkgPT4ge1xuICAgICAgaWYoIGV2LnRhcmdldC5pbm5lckhUTUwgIT0gdGhpcy5mb3JtYXROYW1lKCkgKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IGV2LnRhcmdldC5pbm5lckhUTUw7XG4gICAgICAgIHRoaXMuc2F2ZUxpc3QoKTtcbiAgICAgIH1cbiAgICAgIGV2LnRhcmdldC5pbm5lckhUTUwgPSB0aGlzLmZvcm1hdE5hbWUoKTtcbiAgICB9KTtcblxuICAgIHRoaXMubmFtZU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKCBldiApID0+IHtcbiAgICAgICAgaWYoIGV2LmtleUNvZGUgPT0gMjcgKSB7XG4gICAgICAgICAgZXYudGFyZ2V0LmlubmVySFRNTCA9IHRoaXMuZm9ybWF0TmFtZSgpO1xuICAgICAgICAgIGV2LnRhcmdldC5ibHVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIGV2LmtleUNvZGUgPT0gMTMgKSB7XG4gICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldi50YXJnZXQuYmx1cigpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICAg0YPQtNCw0LvQtdC90LjQtSDQstGB0LXQs9C+INGB0L/QuNGB0LrQsFxuICAgICovXG4gICAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoIFwiLmpzLXJlbW92ZS1saXN0XCIgKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCBldiApID0+IHtcbiAgICAgIHRoaXMuY2xlYXJBbGwoIHsgcmVtb3ZlV2l0aFBhcmVudDogdHJ1ZSB9ICk7XG4gICAgICB0aGlzLnRvZG9zQm94Tm9kZS5kaXNwYXRjaEV2ZW50KCBuZXcgQ3VzdG9tRXZlbnQoIFwidG9kb3MucmVtb3ZlTGlzdElkXCIsIHsgZGV0YWlsOiB0aGlzLmlkIH0gKSApO1xuICAgIH0pO1xuICB9XG5cbiAgZm9ybWF0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lIHx8IFwiW0Fzc2lnbiB0aGUgbGlzdCBuYW1lXVwiO1xuICB9XG5cbiAgZ2V0TGlzdEZyb21TdG9yYWdlKCkge1xuICAgIGxldCB0b2RvRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCBgdG9kb0xpc3RfJHt0aGlzLmlkfWAgKTtcbiAgICB0cnkge1xuICAgICAgdG9kb0RhdGEgPSBKU09OLnBhcnNlKCB0b2RvRGF0YSApO1xuICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICAvLyBUT0RPOiBhbGVydCBtZXNzYWdlXG4gICAgfVxuICAgIGZpbmFsbHl7XG4gICAgICB0b2RvRGF0YSA9IHRvZG9EYXRhIHx8IHt9O1xuICAgIH1cbiAgICByZXR1cm4gdG9kb0RhdGE7XG4gIH1cblxuICByZW1vdmVGcm9tU3RvcmFnZSgpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSggYHRvZG9MaXN0XyR7dGhpcy5pZH1gICk7XG4gIH1cblxuICBzYXZlTGlzdCggb3B0aW9ucyApIHtcbiAgICBsZXQgdG9kb0RhdGEgPSB0aGlzLmdldExpc3RGcm9tU3RvcmFnZSgpO1xuICAgIE9iamVjdC5hc3NpZ24oIHRvZG9EYXRhLCB7IGlkOiB0aGlzLmlkLCBuYW1lOiB0aGlzLm5hbWUsIGl0ZW1zOiB0aGlzLml0ZW1zLm1hcCggKCBpdGVtICkgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0uZ2V0RGF0YSgpO1xuICAgIH0pIH0gKTtcblxuICAgIGxldCBkYXRhVG9TYXZlO1xuICAgIHRyeSB7XG4gICAgICBkYXRhVG9TYXZlID0gSlNPTi5zdHJpbmdpZnkoIHRvZG9EYXRhICk7XG4gICAgfSBjYXRjaCggZSApIHtcbiAgICAgIGFsZXJ0KCBcIkFuIGVycm9yIHdhcyBhY2N1cmVkIGJ5IHNhdmluZyBkYXRhXCIgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oIGB0b2RvTGlzdF8ke3RoaXMuaWR9YCwgZGF0YVRvU2F2ZSApO1xuICAgIGlmKCBvcHRpb25zICYmIG9wdGlvbnMuaXNOZXcgKSB7XG4gICAgICB0aGlzLnRvZG9zQm94Tm9kZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCggXCJ0b2Rvcy5zYXZlTGlzdElkXCIsIHsgZGV0YWlsOiB0aGlzLmlkIH0gKSk7XG4gICAgfVxuICB9XG5cbiAgYWRkSXRlbSggaXRlbSApIHtcbiAgICBpZiggdHlwZW9mIGl0ZW0uaWQgPT0gXCJ1bmRlZmluZWRcIiApIGl0ZW0uaWQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB0aGlzLml0ZW1zLnB1c2goIG5ldyBUb0RvTGlzdEl0ZW0oIHRoaXMubGlzdE5vZGUsIGl0ZW0gKSApO1xuICB9XG5cbiAgY2xlYXJBbGwoIG9wdGlvbnMgKSB7XG4gICAgdGhpcy5pdGVtcy5sZW5ndGggPSAwO1xuICAgIHRoaXMubGlzdE5vZGUuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBpZiggb3B0aW9ucyAmJiBvcHRpb25zLnJlbW92ZVdpdGhQYXJlbnQgKSB7XG4gICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gICAgICB0aGlzLnJlbW92ZUZyb21TdG9yYWdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2F2ZUxpc3QoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgVG9Eb0xpc3QgYXMgZGVmYXVsdCB9XG4iLCJjbGFzcyBUb0RvTGlzdEl0ZW0ge1xuICBjb25zdHJ1Y3RvciggcGFyZW50Tm9kZSwgaXRlbSApIHtcbiAgICB0aGlzLmlzQ29tcGxldGUgPSBmYWxzZTtcbiAgICBPYmplY3QuYXNzaWduKCB0aGlzLCBpdGVtICk7XG4gICAgdGhpcy5wYXJlbnROb2RlID0gcGFyZW50Tm9kZTtcbiAgICB0aGlzLm5vZGUgPSBudWxsO1xuICAgIHRoaXMuaW5pdE1hcmt1cCggaXRlbSApO1xuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuICB9XG5cbiAgaW5pdE1hcmt1cCggaXRlbSApIHtcbiAgICBsZXQgaXRlbU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImxpXCIgKTtcbiAgICBpdGVtTm9kZS5jbGFzc0xpc3QuYWRkKCBcInRvZG8taXRlbVwiICk7XG4gICAgbGV0IGNoZWNrZWRTdGF0dXMgPSBcIlwiO1xuICAgIGlmKCBpdGVtLmlzQ29tcGxldGUpIHtcbiAgICAgIGl0ZW1Ob2RlLmNsYXNzTGlzdC5hZGQoIFwiaXRlbS1jb21wbGV0ZVwiICk7XG4gICAgICBjaGVja2VkU3RhdHVzID0gXCJjaGVja2VkXCJcbiAgICB9XG4gICAgaXRlbU5vZGUuaW5uZXJIVE1MID0gYFxuICAgICAgPGRpdiByb2xlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNoZWNrYm94IGpzLWNvbXBsZXRlXCIgJHtjaGVja2VkU3RhdHVzfT48L2Rpdj5cbiAgICAgIDxpbnB1dCBjbGFzcz1cInRleHQganMtdXBkYXRlXCIgdmFsdWU9XCIke2l0ZW0ubmFtZX1cIiByZWFkb25seT5cbiAgICAgIDxkaXYgY2xhc3M9XCJyZW1vdmUtYnRuIGpzLXJlbW92ZVwiPjwvZGl2PmA7XG4gICAgaXRlbU5vZGUuZGF0YXNldC5pZCA9IGl0ZW0uaWQ7XG4gICAgdGhpcy5wYXJlbnROb2RlLmFwcGVuZENoaWxkKCBpdGVtTm9kZSApO1xuICAgIHRoaXMubm9kZSA9IGl0ZW1Ob2RlO1xuICAgIHRoaXMuaW5wdXROb2RlID0gaXRlbU5vZGUucXVlcnlTZWxlY3RvciggXCIuanMtdXBkYXRlXCIgKTtcbiAgfVxuXG4gIGluaXRFdmVudHMoKSB7XG4gICAgdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoIFwiLmpzLWNvbXBsZXRlXCIgKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy50b2dnbGVDb21wbGV0ZUV2ZW50LmJpbmQoIHRoaXMpKTtcblxuICAgIHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCBcIi5qcy1yZW1vdmVcIiApLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJlbW92ZUV2ZW50LmJpbmQoIHRoaXMgKSk7XG5cbiAgICB0aGlzLmlucHV0Tm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCBldiApID0+IHtcbiAgICAgIGlmKCB0aGlzLmlzQ29tcGxldGUgKSByZXR1cm47IC8vIGFsZXJ0KCBcItCd0LXQu9GM0LfRjyDQuNC30LzQtdC90Y/RgtGMINC90LDQt9Cy0LDQvdC40LUg0LfQsNC60YDRi9GC0L7QuSDQt9Cw0LTQsNGH0LhcIiApO1xuICAgICAgZXYuY3VycmVudFRhcmdldC5yZWFkT25seSA9IGZhbHNlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbnB1dE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLiB1cGRhdGVFdmVudC5iaW5kKCB0aGlzICkpO1xuICAgIHRoaXMuaW5wdXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsICggZXYgKSA9PiB7XG4gICAgICBpZiggZXYua2V5Q29kZSA9PSAyNyApIHtcbiAgICAgICAgZXYudGFyZ2V0LnZhbHVlID0gdGhpcy5uYW1lO1xuICAgICAgICB0aGlzLmlucHV0Tm9kZS5ibHVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5pbnB1dE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCBldiApID0+IHtcbiAgICAgIGV2LmN1cnJlbnRUYXJnZXQucmVhZE9ubHkgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgc2VuZFVwZGF0ZVN0YXR1cygpIHtcbiAgICB0aGlzLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCggbmV3IEN1c3RvbUV2ZW50KCBcInRvZG9zLml0ZW1XYXNVcGRhdGVkXCIgKSApO1xuICB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBpc0NvbXBsZXRlOiB0aGlzLmlzQ29tcGxldGVcbiAgICB9O1xuICB9XG5cbiAgcmVtb3ZlRXZlbnQoKSB7XG4gICAgdGhpcy5ub2RlLnJlbW92ZSgpO1xuICAgIHRoaXMucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KCBuZXcgQ3VzdG9tRXZlbnQoIFwidG9kb3MucmVtb3ZlVGFza1wiLCB7IGRldGFpbDogdGhpcy5pZCB9ICkgKTtcbiAgfVxuXG4gIHRvZ2dsZUNvbXBsZXRlRXZlbnQoKSB7XG4gICAgaWYoIHRoaXMuaXNDb21wbGV0ZSApIHtcbiAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QucmVtb3ZlKCBcIml0ZW0tY29tcGxldGVcIiApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LmFkZCggXCJpdGVtLWNvbXBsZXRlXCIgKTtcbiAgICB9XG4gICAgdGhpcy5pc0NvbXBsZXRlID0gIXRoaXMuaXNDb21wbGV0ZTtcbiAgICB0aGlzLnNlbmRVcGRhdGVTdGF0dXMoKTtcbiAgfVxuXG4gIHVwZGF0ZUV2ZW50KCBldiApIHtcbiAgICBpZiggZXYudGFyZ2V0LnZhbHVlLmxlbmd0aCA9PSAwICkge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnRhcmdldC52YWx1ZSA9IHRoaXMubmFtZTtcbiAgICAgIGFsZXJ0ICggXCLQndC10L7QsdGF0L7QtNC40LzQviDQt9Cw0L/QvtC70L3QuNGC0Ywg0L3QsNC30LLQsNC90LjQtSDQt9Cw0LTQsNGH0LhcIiApO1xuICAgIH1cbiAgICBldi50YXJnZXQucmVhZE9ubHkgPSB0cnVlO1xuICAgIHRoaXMubmFtZSA9IGV2LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNlbmRVcGRhdGVTdGF0dXMoKTtcbiAgfVxufVxuXG5leHBvcnQgeyBUb0RvTGlzdEl0ZW0gYXMgZGVmYXVsdCB9XG4iXX0=
