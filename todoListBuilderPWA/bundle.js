(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorsPanel = document.querySelector(".js-errors-panel");
var addError = function addError(message, toConsole) {
  var text = message + toConsole;
  errorsPanel.appendChild(document.createTextNode("" + text));
  errorsPanel.appendChild(document.createElement("br"));
  console.log(text);
};

exports.default = addError;

},{}],2:[function(require,module,exports){
"use strict";

var _todobuilder = require("./todobuilder.js");

var _todobuilder2 = _interopRequireDefault(_todobuilder);

var _errors = require("./errors.js");

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var todoBuilder = new _todobuilder2.default(".js-todo-builder");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/js-assignments/todoListBuilderPWA/sw.js") // all domain is the scope todoListBuilderPWA
  .then(function (registration) {
    (0, _errors2.default)("SW ToDoList registration was done!", registration);
    return navigator.serviceWorker.ready;
  }).catch(function (err) {
    (0, _errors2.default)("SW register error: ", err);
  });

  navigator.serviceWorker.addEventListener("message", function (ev) {
    (0, _errors2.default)("From SW: ", ev.data);
  });
}

},{"./errors.js":1,"./todobuilder.js":3}],3:[function(require,module,exports){
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

},{"./todolist.js":4}],4:[function(require,module,exports){
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

},{"./todolist_item.js":5}],5:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZXJyb3JzLmpzIiwic3JjL21haW4uanMiLCJzcmMvdG9kb2J1aWxkZXIuanMiLCJzcmMvdG9kb2xpc3QuanMiLCJzcmMvdG9kb2xpc3RfaXRlbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsSUFBSSxjQUFjLFNBQVMsYUFBVCxDQUF3QixrQkFBeEIsQ0FBbEI7QUFDQSxJQUFJLFdBQVcsU0FBWCxRQUFXLENBQUUsT0FBRixFQUFXLFNBQVgsRUFBMEI7QUFDdkMsTUFBSSxPQUFPLFVBQVUsU0FBckI7QUFDQSxjQUFZLFdBQVosQ0FBeUIsU0FBUyxjQUFULE1BQTRCLElBQTVCLENBQXpCO0FBQ0EsY0FBWSxXQUFaLENBQXlCLFNBQVMsYUFBVCxDQUF3QixJQUF4QixDQUF6QjtBQUNBLFVBQVEsR0FBUixDQUFhLElBQWI7QUFDRCxDQUxEOztrQkFPZSxROzs7OztBQ1JmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksY0FBYywwQkFBaUIsa0JBQWpCLENBQWxCOztBQUVBLElBQUksbUJBQW1CLFNBQXZCLEVBQW1DO0FBQ2pDLFlBQVUsYUFBVixDQUF3QixRQUF4QixDQUFrQywwQ0FBbEMsRUFBK0U7QUFBL0UsR0FDQyxJQURELENBQ08sVUFBRSxZQUFGLEVBQW9CO0FBQ3pCLDBCQUFVLG9DQUFWLEVBQWlELFlBQWpEO0FBQ0EsV0FBTyxVQUFVLGFBQVYsQ0FBd0IsS0FBL0I7QUFDRCxHQUpELEVBSUcsS0FKSCxDQUlVLFVBQUUsR0FBRixFQUFXO0FBQ25CLDBCQUFVLHFCQUFWLEVBQWlDLEdBQWpDO0FBQ0QsR0FORDs7QUFRQSxZQUFVLGFBQVYsQ0FBd0IsZ0JBQXhCLENBQTBDLFNBQTFDLEVBQXFELFVBQUUsRUFBRixFQUFVO0FBQzdELDBCQUFVLFdBQVYsRUFBdUIsR0FBRyxJQUExQjtBQUNBLEdBRkY7QUFHRDs7Ozs7Ozs7Ozs7O0FDakJEOzs7Ozs7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QUFKLENBQWlCLHNCQUFqQixDQUEvQjtBQUNEOzs7OEJBRVM7QUFDUixhQUFPO0FBQ0wsWUFBSSxLQUFLLEVBREo7QUFFTCxjQUFNLEtBQUssSUFGTjtBQUdMLG9CQUFZLEtBQUs7QUFIWixPQUFQO0FBS0Q7OztrQ0FFYTtBQUNaLFdBQUssSUFBTCxDQUFVLE1BQVY7QUFDQSxXQUFLLFVBQUwsQ0FBZ0IsYUFBaEIsQ0FBK0IsSUFBSSxXQUFKLENBQWlCLGtCQUFqQixFQUFxQyxFQUFFLFFBQVEsS0FBSyxFQUFmLEVBQXJDLENBQS9CO0FBQ0Q7OzswQ0FFcUI7QUFDcEIsVUFBSSxLQUFLLFVBQVQsRUFBc0I7QUFDcEIsYUFBSyxJQUFMLENBQVUsU0FBVixDQUFvQixNQUFwQixDQUE0QixlQUE1QjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUssSUFBTCxDQUFVLFNBQVYsQ0FBb0IsR0FBcEIsQ0FBeUIsZUFBekI7QUFDRDtBQUNELFdBQUssVUFBTCxHQUFrQixDQUFDLEtBQUssVUFBeEI7QUFDQSxXQUFLLGdCQUFMO0FBQ0Q7OztnQ0FFWSxFLEVBQUs7QUFDaEIsVUFBSSxHQUFHLE1BQUgsQ0FBVSxLQUFWLENBQWdCLE1BQWhCLElBQTBCLENBQTlCLEVBQWtDO0FBQ2hDLFdBQUcsY0FBSDtBQUNBLFdBQUcsTUFBSCxDQUFVLEtBQVYsR0FBa0IsS0FBSyxJQUF2QjtBQUNBLGNBQVEsc0NBQVI7QUFDRDtBQUNELFNBQUcsTUFBSCxDQUFVLFFBQVYsR0FBcUIsSUFBckI7QUFDQSxXQUFLLElBQUwsR0FBWSxHQUFHLE1BQUgsQ0FBVSxLQUF0QjtBQUNBLFdBQUssZ0JBQUw7QUFDRDs7Ozs7O1FBR3NCLE8sR0FBaEIsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJsZXQgZXJyb3JzUGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBcIi5qcy1lcnJvcnMtcGFuZWxcIiApXG5sZXQgYWRkRXJyb3IgPSAoIG1lc3NhZ2UsIHRvQ29uc29sZSApID0+IHtcbiAgbGV0IHRleHQgPSBtZXNzYWdlICsgdG9Db25zb2xlO1xuICBlcnJvcnNQYW5lbC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoIGAke3RleHR9YCApICk7XG4gIGVycm9yc1BhbmVsLmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImJyXCIgKSApO1xuICBjb25zb2xlLmxvZyggdGV4dCApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhZGRFcnJvciIsImltcG9ydCBUb0RvQnVpbGRlciBmcm9tIFwiLi90b2RvYnVpbGRlci5qc1wiO1xuaW1wb3J0IGFkZEVycm9yIGZyb20gXCIuL2Vycm9ycy5qc1wiO1xuXG52YXIgdG9kb0J1aWxkZXIgPSBuZXcgVG9Eb0J1aWxkZXIoIFwiLmpzLXRvZG8tYnVpbGRlclwiICk7XG5cbmlmKCBcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IgKSB7XG4gIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCBcIi9qcy1hc3NpZ25tZW50cy90b2RvTGlzdEJ1aWxkZXJQV0Evc3cuanNcIiApIC8vIGFsbCBkb21haW4gaXMgdGhlIHNjb3BlIHRvZG9MaXN0QnVpbGRlclBXQVxuICAudGhlbiggKCByZWdpc3RyYXRpb24gKSA9PiB7XG4gICAgYWRkRXJyb3IoIFwiU1cgVG9Eb0xpc3QgcmVnaXN0cmF0aW9uIHdhcyBkb25lIVwiLCAgcmVnaXN0cmF0aW9uICk7XG4gICAgcmV0dXJuIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlYWR5O1xuICB9KS5jYXRjaCggKCBlcnIgKSA9PiB7XG4gICAgYWRkRXJyb3IoIFwiU1cgcmVnaXN0ZXIgZXJyb3I6IFwiLCBlcnIgKTtcbiAgfSk7XG5cbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuYWRkRXZlbnRMaXN0ZW5lciggXCJtZXNzYWdlXCIsICggZXYgKSA9PiB7XG4gICAgYWRkRXJyb3IoIFwiRnJvbSBTVzogXCIsIGV2LmRhdGEgKTtcbiAgIH0pO1xufVxuIiwiaW1wb3J0IFRvRG9MaXN0IGZyb20gXCIuL3RvZG9saXN0LmpzXCI7XG5cbmNsYXNzIFRvRG9CdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoIHNlbGVjdG9yICkge1xuICAgIHRoaXMucGFyZW50Tm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIHNlbGVjdG9yICk7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZURPTSgpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZUV2ZW50cygpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZURhdGEoKTtcbiAgfVxuXG4gIGluaXRpYWxpemVET00oKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlLmlubmVySFRNTCA9ICdcXFxuICAgICAgPGRpdj48YnV0dG9uIGNsYXNzPVwiYnRuLWFkZC10b2RvIGpzLWFkZC10b2RvbGlzdFwiPkFkZCBhIG5ldyB0b2RvbGlzdDwvYnV0dG9uPjwvZGl2PlxcXG4gICAgICA8ZGl2IGNsYXNzPVwidG9kb3MtYm94IGpzLXRvZG8tYm94XCI+PC9kaXY+JztcbiAgICB0aGlzLmFkZEJ1dHRvbk5vZGUgPSB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvciggXCIuanMtYWRkLXRvZG9saXN0XCIgKTtcbiAgICB0aGlzLnRvZG9zQm94Tm9kZSA9IHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCBcIi5qcy10b2RvLWJveFwiICk7XG4gIH1cblxuICBpbml0aWFsaXplRXZlbnRzKCkge1xuICAgIC8vIGxpc3RlbmVyIGZvciBhZGRpbmcgYSBuZXcgaXRlbVxuICAgIHRoaXMuYWRkQnV0dG9uTm9kZS5hZGRFdmVudExpc3RlbmVyKCBcImNsaWNrXCIsIHRoaXMuYWRkTGlzdC5iaW5kKCB0aGlzICkpO1xuICAgIC8vIGxpc3RlbmVyIGZvciByZW1vdmluZyBhbiBpdGVtXG4gICAgdGhpcy50b2Rvc0JveE5vZGUuYWRkRXZlbnRMaXN0ZW5lciggXCJ0b2Rvcy5yZW1vdmVMaXN0SWRcIiwgdGhpcy5yZW1vdmVMaXN0SWQuYmluZCggdGhpcyApKTtcbiAgICAvLyBsaXN0ZW5lciBmb3Igc2F2aW5nIGxpc3RBcnJheVxuICAgIHRoaXMudG9kb3NCb3hOb2RlLmFkZEV2ZW50TGlzdGVuZXIoIFwidG9kb3Muc2F2ZUxpc3RJZFwiLCB0aGlzLnNhdmVMaXN0SWQuYmluZCggdGhpcyApKTtcbiAgfVxuXG4gIGluaXRpYWxpemVEYXRhKCkge1xuICAgIGxldCB0b2Rvc0RhdGEgPSB0aGlzLmdldERhdGFGcm9tU3RvcmFnZSgpO1xuXG4gICAgaWYoICEhdG9kb3NEYXRhICYmIHRvZG9zRGF0YS5sZW5ndGggKSB7XG4gICAgICAgIHRvZG9zRGF0YS5mb3JFYWNoKCAoIGxpc3RJZCApID0+IHtcbiAgICAgICAgdGhpcy5jcmVhdGVUb2RvTGlzdCggeyBpZDogbGlzdElkIH0gKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZVRvZG9MaXN0KCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGF0YUZyb21TdG9yYWdlKCkge1xuICAgIGxldCB0b2Rvc0RhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggXCJ0b2RvTGlzdHNcIiApO1xuICAgIHRyeSB7XG4gICAgICB0b2Rvc0RhdGEgPSBKU09OLnBhcnNlKCB0b2Rvc0RhdGEgKSB8fCBbXTtcbiAgICB9IGNhdGNoKCBlICkge1xuICAgICAgYWxlcnQoIFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSBzYXZpbmcgdGhlIGxpc3RcIiApO1xuICAgICAgdG9kb3NEYXRhID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRvZG9zRGF0YTtcbiAgfVxuXG4gIHNldERhdGFUb1N0b3JhZ2UoIHRvZG9zRGF0YSApIHtcbiAgICBpZiggdG9kb3NEYXRhLmxlbmd0aCApXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSggXCJ0b2RvTGlzdHNcIiwgSlNPTi5zdHJpbmdpZnkoIHRvZG9zRGF0YSApICk7XG4gICAgZWxzZVxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oIFwidG9kb0xpc3RzXCIgKTtcbiAgfVxuXG4gIGNyZWF0ZVRvZG9MaXN0KCBkYXRhICkge1xuICAgIG5ldyBUb0RvTGlzdCggdGhpcy50b2Rvc0JveE5vZGUsIGRhdGEgKTtcbiAgfVxuXG4gIGFkZExpc3QoKSB7XG4gICAgdGhpcy5jcmVhdGVUb2RvTGlzdCgpO1xuICB9XG5cbiAgc2F2ZUxpc3RJZCggZXYgKSB7XG4gICAgbGV0IHRvZG9zRGF0YSA9IHRoaXMuZ2V0RGF0YUZyb21TdG9yYWdlKCkgO1xuICAgIGlmKCAhdG9kb3NEYXRhICkgcmV0dXJuO1xuICAgIHRvZG9zRGF0YS5wdXNoKCBldi5kZXRhaWwgKTtcbiAgICB0aGlzLnNldERhdGFUb1N0b3JhZ2UoIHRvZG9zRGF0YSApO1xuICB9XG5cbiAgcmVtb3ZlTGlzdElkKCBldiApIHtcbiAgICAvLyBhY3Rpb25zIGFmdGVyIHJlbW92aW5nIGEgbGlzdFxuICAgIGxldCB0b2Rvc0RhdGEgPSB0aGlzLmdldERhdGFGcm9tU3RvcmFnZSgpO1xuICAgIGxldCBpbmRleCA9IHRvZG9zRGF0YS5pbmRleE9mKCBldi5kZXRhaWwgKTtcbiAgICBpZiggaW5kZXggPiAtMSApIHtcbiAgICAgIHRvZG9zRGF0YS5zcGxpY2UoIGluZGV4LCAxICk7XG4gICAgICB0aGlzLnNldERhdGFUb1N0b3JhZ2UoIHRvZG9zRGF0YSApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBUb0RvQnVpbGRlciBhcyBkZWZhdWx0IH1cbiIsImltcG9ydCBUb0RvTGlzdEl0ZW0gZnJvbSBcIi4vdG9kb2xpc3RfaXRlbS5qc1wiXG5cbmNsYXNzIFRvRG9MaXN0IHtcbiAgLypcbiAgICDQutC+0L3RgdGC0YDRg9C60YLQvtGAINC/0YDQuNC90LjQvNCw0LXRgiDRg9C30LXQuyDRgNC+0LTQuNGC0LXQu9GPLFxuICAgINC6INC60L7RgtC+0YDQvtC80YMg0LHRg9C00LXRgiDQtNC+0LHQsNCy0LvQtdC9IHRvZG8t0LrQvtC80L/QvtC90LXQvdGCLFxuICAgINC4INC00LDQvdC90YvQtSDQtNC70Y8g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40LggLSBsaXN0SWQsINC10YHQu9C4INC10YHRgtGMXG4gICovXG4gIGNvbnN0cnVjdG9yKCBidWlsZGVyTm9kZSwgZGF0YSApIHtcbiAgICB0aGlzLnRvZG9zQm94Tm9kZSA9IGJ1aWxkZXJOb2RlO1xuICAgIHRoaXMuaW5pdE1hcmt1cCgpO1xuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xuICAgIHRoaXMuaWQgPSAoIGRhdGEgJiYgZGF0YS5pZCApIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICB0aGlzLm5hbWUgPSBcIlwiO1xuICAgIGlmKCAhIWRhdGEgKSB7XG4gICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2F2ZUxpc3QoIHsgaXNOZXc6IHRydWUgfSApO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgc2V0IG5hbWUoIHZhbHVlICkge1xuICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICB0aGlzLm5hbWVOb2RlLmlubmVySFRNTCA9IHRoaXMuZm9ybWF0TmFtZSgpO1xuICB9XG5cbiAgaW5pdERhdGEoKSB7XG4gICAgbGV0IGRhdGEgPSB0aGlzLmdldExpc3RGcm9tU3RvcmFnZSgpO1xuICAgIE9iamVjdC5hc3NpZ24oIHRoaXMsIHsgbmFtZTogZGF0YS5uYW1lIH0gKTtcbiAgICBkYXRhLml0ZW1zLm1hcCgoIGl0ZW0gKSA9PiB7XG4gICAgICB0aGlzLmFkZEl0ZW0oIGl0ZW0gKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAgaW5pdE1hcmt1cCDQt9Cw0LTQsNC10YIg0YHRgtGA0YPQutGC0YPRgNGDIHRvZG8t0LrQvtC80L/QvtC90LXQvdGC0LBcbiAgICAoZm9ybS5qcy1hZGQtaXRlbT5pbnB1dDp0ZXh0W25hbWU6XCJhZGQtaXRlbVwiXStpbnB1dDpzdWJtaXQpK3VsLnRvZG8tbGlzdC5qcy1saXN0XG4gICovXG4gIGluaXRNYXJrdXAoKSB7XG4gICAgbGV0IHRlbXBsYXRlID0gYFxuICAgICAgPGRpdiBjbGFzcz1cInRvZG8tbmFtZSBqcy1hc3NpZ24tbmFtZVwiIGNvbnRlbnRlZGl0YWJsZT48L2Rpdj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJqcy1jbGVhci1saXN0XCI+Q2xlYXIgbGlzdDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImpzLXJlbW92ZS1saXN0XCI+UmVtb3ZlIGxpc3Q8L2J1dHRvbj5cbiAgICAgIDxmb3JtIGNsYXNzPVwianMtYWRkLWl0ZW1cIj48aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiYWRkLWl0ZW1cIiAvPjxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCJva1wiIC8+PC9mb3JtPlxuICAgICAgPHVsIGNsYXNzPVwidG9kby1saXN0IGpzLWxpc3RcIj48L3VsPmA7XG4gICAgdGhpcy5wYXJlbnROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApO1xuICAgIHRoaXMucGFyZW50Tm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbiAgICB0aGlzLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCggXCJ0b2RvLXdyYXBcIiApO1xuICAgIHRoaXMuaW5wdXROb2RlID0gdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoIFwiLmpzLWFkZC1pdGVtXCIgKTtcbiAgICB0aGlzLmxpc3ROb2RlID0gdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoIFwiLmpzLWxpc3RcIiApO1xuICAgIHRoaXMubmFtZU5vZGUgPSB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvciggXCIuanMtYXNzaWduLW5hbWVcIiApO1xuICAgIHRoaXMudG9kb3NCb3hOb2RlLmFwcGVuZCggdGhpcy5wYXJlbnROb2RlICk7XG4gIH1cblxuICBpbml0RXZlbnRzKCkge1xuICAgIGxldCBmaW5kSXRlbSA9ICggbGlzdCwgaWQgKSA9PiB7XG4gICAgICByZXR1cm4gbGlzdC5maW5kSW5kZXgoICggaXRlbSApID0+IHtcbiAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PSBpZDtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qXG4gICAg0LfQsNC00LDQtdC8INGB0L7QsdGL0YLQuNC50L3Rg9GOINC80L7QtNC10LvRjCDQtNC70Y8g0YHQv9C40YHQutCwXG4gICAgICBjcmVhdGVUYXNrLCByZW1vdmVUYXNrLCB1cGRhdGVUYXNrLCBjb21wbGV0ZVRhc2tcbiAgICAqL1xuICAgIHRoaXMucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKFwidG9kb3MuY3JlYXRlVGFza1wiLCAoIGV2ICkgPT4ge1xuICAgICAgaWYoIGV2LmRldGFpbC5sZW5ndGggPT0gMCApIHJldHVybiBhbGVydCAoIFwi0J3QtdC+0LHRhdC+0LTQuNC80L4g0LfQsNC/0L7Qu9C90LjRgtGMINC90LDQt9Cy0LDQvdC40LUg0LfQsNC00LDRh9C4XCIgKTtcbiAgICAgIHRoaXMuYWRkSXRlbSggeyBuYW1lOiBldi5kZXRhaWwgfSApO1xuICAgICAgdGhpcy5zYXZlTGlzdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b2Rvcy5yZW1vdmVUYXNrXCIsICggZXYgKSA9PiB7XG4gICAgICBsZXQgaW5kZXggPSBmaW5kSXRlbSggdGhpcy5pdGVtcywgZXYuZGV0YWlsICk7XG4gICAgICB0aGlzLml0ZW1zLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgICAgIHRoaXMuc2F2ZUxpc3QoKTtcbiAgICB9LCB0cnVlKTtcblxuICAgIHRoaXMucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKFwidG9kb3MuaXRlbVdhc1VwZGF0ZWRcIiwgKCBldiApID0+IHtcbiAgICAgIHRoaXMuc2F2ZUxpc3QoKTtcbiAgICB9LCB0cnVlKTtcblxuICAgIC8qXG4gICAgICDCoNC00L7QsdCw0LLQu9C10L3QuNC1INC90L7QstC+0LPQviDRjdC70LXQvNC10L3RgtCwINGB0L/QuNGB0LrQsFxuICAgICovXG4gICAgdGhpcy5pbnB1dE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoIGV2ICkgPT4ge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCggXCJ0b2Rvcy5jcmVhdGVUYXNrXCIsIHsgZGV0YWlsOiBldi50YXJnZXQuZWxlbWVudHNbIFwiYWRkLWl0ZW1cIiBdLnZhbHVlIH0gKSk7XG4gICAgICB0aGlzLmlucHV0Tm9kZS5yZXNldCgpO1xuICAgIH0pO1xuXG4gICAgLypcbiAgICAgINGD0LTQsNC70LXQvdC40LUg0Y3Qu9C10LzQtdC90YLQvtCyINGB0L/QuNGB0LrQsFxuICAgICovXG4gICAgdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoIFwiLmpzLWNsZWFyLWxpc3RcIiApLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoIGV2ICkgPT4ge1xuICAgICAgdGhpcy5jbGVhckFsbCgpO1xuICAgIH0pO1xuXG4gICAgLypcbiAgICAgINC/0LXRgNC10LjQvNC10L3QvtCy0LDQvdC40LUg0YHQv9C40YHQutCwXG4gICAgKi9cbiAgICB0aGlzLm5hbWVOb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICggZXYgKSA9PiB7XG4gICAgICBpZiggZXYudGFyZ2V0LmlubmVySFRNTCAhPSB0aGlzLmZvcm1hdE5hbWUoKSApIHtcbiAgICAgICAgdGhpcy5uYW1lID0gZXYudGFyZ2V0LmlubmVySFRNTDtcbiAgICAgICAgdGhpcy5zYXZlTGlzdCgpO1xuICAgICAgfVxuICAgICAgZXYudGFyZ2V0LmlubmVySFRNTCA9IHRoaXMuZm9ybWF0TmFtZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5uYW1lTm9kZS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoIGV2ICkgPT4ge1xuICAgICAgICBpZiggZXYua2V5Q29kZSA9PSAyNyApIHtcbiAgICAgICAgICBldi50YXJnZXQuaW5uZXJIVE1MID0gdGhpcy5mb3JtYXROYW1lKCk7XG4gICAgICAgICAgZXYudGFyZ2V0LmJsdXIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiggZXYua2V5Q29kZSA9PSAxMyApIHtcbiAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2LnRhcmdldC5ibHVyKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qXG4gICAgICDRg9C00LDQu9C10L3QuNC1INCy0YHQtdCz0L4g0YHQv9C40YHQutCwXG4gICAgKi9cbiAgICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvciggXCIuanMtcmVtb3ZlLWxpc3RcIiApLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoIGV2ICkgPT4ge1xuICAgICAgdGhpcy5jbGVhckFsbCggeyByZW1vdmVXaXRoUGFyZW50OiB0cnVlIH0gKTtcbiAgICAgIHRoaXMudG9kb3NCb3hOb2RlLmRpc3BhdGNoRXZlbnQoIG5ldyBDdXN0b21FdmVudCggXCJ0b2Rvcy5yZW1vdmVMaXN0SWRcIiwgeyBkZXRhaWw6IHRoaXMuaWQgfSApICk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JtYXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgfHwgXCJbQXNzaWduIHRoZSBsaXN0IG5hbWVdXCI7XG4gIH1cblxuICBnZXRMaXN0RnJvbVN0b3JhZ2UoKSB7XG4gICAgbGV0IHRvZG9EYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oIGB0b2RvTGlzdF8ke3RoaXMuaWR9YCApO1xuICAgIHRyeSB7XG4gICAgICB0b2RvRGF0YSA9IEpTT04ucGFyc2UoIHRvZG9EYXRhICk7XG4gICAgfSBjYXRjaCggZSApIHtcbiAgICAgIC8vIFRPRE86IGFsZXJ0IG1lc3NhZ2VcbiAgICB9XG4gICAgZmluYWxseXtcbiAgICAgIHRvZG9EYXRhID0gdG9kb0RhdGEgfHwge307XG4gICAgfVxuICAgIHJldHVybiB0b2RvRGF0YTtcbiAgfVxuXG4gIHJlbW92ZUZyb21TdG9yYWdlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCBgdG9kb0xpc3RfJHt0aGlzLmlkfWAgKTtcbiAgfVxuXG4gIHNhdmVMaXN0KCBvcHRpb25zICkge1xuICAgIGxldCB0b2RvRGF0YSA9IHRoaXMuZ2V0TGlzdEZyb21TdG9yYWdlKCk7XG4gICAgT2JqZWN0LmFzc2lnbiggdG9kb0RhdGEsIHsgaWQ6IHRoaXMuaWQsIG5hbWU6IHRoaXMubmFtZSwgaXRlbXM6IHRoaXMuaXRlbXMubWFwKCAoIGl0ZW0gKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5nZXREYXRhKCk7XG4gICAgfSkgfSApO1xuXG4gICAgbGV0IGRhdGFUb1NhdmU7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGFUb1NhdmUgPSBKU09OLnN0cmluZ2lmeSggdG9kb0RhdGEgKTtcbiAgICB9IGNhdGNoKCBlICkge1xuICAgICAgYWxlcnQoIFwiQW4gZXJyb3Igd2FzIGFjY3VyZWQgYnkgc2F2aW5nIGRhdGFcIiApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSggYHRvZG9MaXN0XyR7dGhpcy5pZH1gLCBkYXRhVG9TYXZlICk7XG4gICAgaWYoIG9wdGlvbnMgJiYgb3B0aW9ucy5pc05ldyApIHtcbiAgICAgIHRoaXMudG9kb3NCb3hOb2RlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCBcInRvZG9zLnNhdmVMaXN0SWRcIiwgeyBkZXRhaWw6IHRoaXMuaWQgfSApKTtcbiAgICB9XG4gIH1cblxuICBhZGRJdGVtKCBpdGVtICkge1xuICAgIGlmKCB0eXBlb2YgaXRlbS5pZCA9PSBcInVuZGVmaW5lZFwiICkgaXRlbS5pZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMuaXRlbXMucHVzaCggbmV3IFRvRG9MaXN0SXRlbSggdGhpcy5saXN0Tm9kZSwgaXRlbSApICk7XG4gIH1cblxuICBjbGVhckFsbCggb3B0aW9ucyApIHtcbiAgICB0aGlzLml0ZW1zLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5saXN0Tm9kZS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGlmKCBvcHRpb25zICYmIG9wdGlvbnMucmVtb3ZlV2l0aFBhcmVudCApIHtcbiAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgIHRoaXMucmVtb3ZlRnJvbVN0b3JhZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zYXZlTGlzdCgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBUb0RvTGlzdCBhcyBkZWZhdWx0IH1cbiIsImNsYXNzIFRvRG9MaXN0SXRlbSB7XG4gIGNvbnN0cnVjdG9yKCBwYXJlbnROb2RlLCBpdGVtICkge1xuICAgIHRoaXMuaXNDb21wbGV0ZSA9IGZhbHNlO1xuICAgIE9iamVjdC5hc3NpZ24oIHRoaXMsIGl0ZW0gKTtcbiAgICB0aGlzLnBhcmVudE5vZGUgPSBwYXJlbnROb2RlO1xuICAgIHRoaXMubm9kZSA9IG51bGw7XG4gICAgdGhpcy5pbml0TWFya3VwKCBpdGVtICk7XG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gIH1cblxuICBpbml0TWFya3VwKCBpdGVtICkge1xuICAgIGxldCBpdGVtTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwibGlcIiApO1xuICAgIGl0ZW1Ob2RlLmNsYXNzTGlzdC5hZGQoIFwidG9kby1pdGVtXCIgKTtcbiAgICBsZXQgY2hlY2tlZFN0YXR1cyA9IFwiXCI7XG4gICAgaWYoIGl0ZW0uaXNDb21wbGV0ZSkge1xuICAgICAgaXRlbU5vZGUuY2xhc3NMaXN0LmFkZCggXCJpdGVtLWNvbXBsZXRlXCIgKTtcbiAgICAgIGNoZWNrZWRTdGF0dXMgPSBcImNoZWNrZWRcIlxuICAgIH1cbiAgICBpdGVtTm9kZS5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IHJvbGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY2hlY2tib3gganMtY29tcGxldGVcIiAke2NoZWNrZWRTdGF0dXN9PjwvZGl2PlxuICAgICAgPGlucHV0IGNsYXNzPVwidGV4dCBqcy11cGRhdGVcIiB2YWx1ZT1cIiR7aXRlbS5uYW1lfVwiIHJlYWRvbmx5PlxuICAgICAgPGRpdiBjbGFzcz1cInJlbW92ZS1idG4ganMtcmVtb3ZlXCI+PC9kaXY+YDtcbiAgICBpdGVtTm9kZS5kYXRhc2V0LmlkID0gaXRlbS5pZDtcbiAgICB0aGlzLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoIGl0ZW1Ob2RlICk7XG4gICAgdGhpcy5ub2RlID0gaXRlbU5vZGU7XG4gICAgdGhpcy5pbnB1dE5vZGUgPSBpdGVtTm9kZS5xdWVyeVNlbGVjdG9yKCBcIi5qcy11cGRhdGVcIiApO1xuICB9XG5cbiAgaW5pdEV2ZW50cygpIHtcbiAgICB0aGlzLm5vZGUucXVlcnlTZWxlY3RvciggXCIuanMtY29tcGxldGVcIiApLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZUNvbXBsZXRlRXZlbnQuYmluZCggdGhpcykpO1xuXG4gICAgdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoIFwiLmpzLXJlbW92ZVwiICkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVtb3ZlRXZlbnQuYmluZCggdGhpcyApKTtcblxuICAgIHRoaXMuaW5wdXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoIGV2ICkgPT4ge1xuICAgICAgaWYoIHRoaXMuaXNDb21wbGV0ZSApIHJldHVybjsgLy8gYWxlcnQoIFwi0J3QtdC70YzQt9GPINC40LfQvNC10L3Rj9GC0Ywg0L3QsNC30LLQsNC90LjQtSDQt9Cw0LrRgNGL0YLQvtC5INC30LDQtNCw0YfQuFwiICk7XG4gICAgICBldi5jdXJyZW50VGFyZ2V0LnJlYWRPbmx5ID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICB0aGlzLmlucHV0Tm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHRoaXMuIHVwZGF0ZUV2ZW50LmJpbmQoIHRoaXMgKSk7XG4gICAgdGhpcy5pbnB1dE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKCBldiApID0+IHtcbiAgICAgIGlmKCBldi5rZXlDb2RlID09IDI3ICkge1xuICAgICAgICBldi50YXJnZXQudmFsdWUgPSB0aGlzLm5hbWU7XG4gICAgICAgIHRoaXMuaW5wdXROb2RlLmJsdXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmlucHV0Tm9kZS5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoIGV2ICkgPT4ge1xuICAgICAgZXYuY3VycmVudFRhcmdldC5yZWFkT25seSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICBzZW5kVXBkYXRlU3RhdHVzKCkge1xuICAgIHRoaXMucGFyZW50Tm9kZS5kaXNwYXRjaEV2ZW50KCBuZXcgQ3VzdG9tRXZlbnQoIFwidG9kb3MuaXRlbVdhc1VwZGF0ZWRcIiApICk7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGlzQ29tcGxldGU6IHRoaXMuaXNDb21wbGV0ZVxuICAgIH07XG4gIH1cblxuICByZW1vdmVFdmVudCgpIHtcbiAgICB0aGlzLm5vZGUucmVtb3ZlKCk7XG4gICAgdGhpcy5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQoIG5ldyBDdXN0b21FdmVudCggXCJ0b2Rvcy5yZW1vdmVUYXNrXCIsIHsgZGV0YWlsOiB0aGlzLmlkIH0gKSApO1xuICB9XG5cbiAgdG9nZ2xlQ29tcGxldGVFdmVudCgpIHtcbiAgICBpZiggdGhpcy5pc0NvbXBsZXRlICkge1xuICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoIFwiaXRlbS1jb21wbGV0ZVwiICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKCBcIml0ZW0tY29tcGxldGVcIiApO1xuICAgIH1cbiAgICB0aGlzLmlzQ29tcGxldGUgPSAhdGhpcy5pc0NvbXBsZXRlO1xuICAgIHRoaXMuc2VuZFVwZGF0ZVN0YXR1cygpO1xuICB9XG5cbiAgdXBkYXRlRXZlbnQoIGV2ICkge1xuICAgIGlmKCBldi50YXJnZXQudmFsdWUubGVuZ3RoID09IDAgKSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYudGFyZ2V0LnZhbHVlID0gdGhpcy5uYW1lO1xuICAgICAgYWxlcnQgKCBcItCd0LXQvtCx0YXQvtC00LjQvNC+INC30LDQv9C+0LvQvdC40YLRjCDQvdCw0LfQstCw0L3QuNC1INC30LDQtNCw0YfQuFwiICk7XG4gICAgfVxuICAgIGV2LnRhcmdldC5yZWFkT25seSA9IHRydWU7XG4gICAgdGhpcy5uYW1lID0gZXYudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2VuZFVwZGF0ZVN0YXR1cygpO1xuICB9XG59XG5cbmV4cG9ydCB7IFRvRG9MaXN0SXRlbSBhcyBkZWZhdWx0IH1cbiJdfQ==
