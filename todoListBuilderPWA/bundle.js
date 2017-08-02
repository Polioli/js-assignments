(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorsPanel = document.querySelector(".js-errors-panel");
var addError = function addError(message, toConsole) {
  var text = message + (toConsole || "");
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

console.log("serviceWorker" in navigator);
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/todoListBuilderPWA/sw.js") // all domain is the scope todoListBuilderPWA
  .then(function (registration) {
    (0, _errors2.default)("SW ToDoList registration was done!", registration);
    return navigator.serviceWorker.ready;
  }).catch(function (err) {
    (0, _errors2.default)("SW register error: ", err);
  });

  navigator.serviceWorker.addEventListener("message", function (ev) {
    (0, _errors2.default)("From SW: ", ev.data);
  });
} else {
  (0, _errors2.default)("The browser doesn't support SW");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZXJyb3JzLmpzIiwic3JjL21haW4uanMiLCJzcmMvdG9kb2J1aWxkZXIuanMiLCJzcmMvdG9kb2xpc3QuanMiLCJzcmMvdG9kb2xpc3RfaXRlbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsSUFBSSxjQUFjLFNBQVMsYUFBVCxDQUF3QixrQkFBeEIsQ0FBbEI7QUFDQSxJQUFJLFdBQVcsU0FBWCxRQUFXLENBQUUsT0FBRixFQUFXLFNBQVgsRUFBMEI7QUFDdkMsTUFBSSxPQUFPLFdBQVksYUFBYSxFQUF6QixDQUFYO0FBQ0EsY0FBWSxXQUFaLENBQXlCLFNBQVMsY0FBVCxNQUE0QixJQUE1QixDQUF6QjtBQUNBLGNBQVksV0FBWixDQUF5QixTQUFTLGFBQVQsQ0FBd0IsSUFBeEIsQ0FBekI7QUFDQSxVQUFRLEdBQVIsQ0FBYSxJQUFiO0FBQ0QsQ0FMRDs7a0JBT2UsUTs7Ozs7QUNSZjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLGNBQWMsMEJBQWlCLGtCQUFqQixDQUFsQjs7QUFFQSxRQUFRLEdBQVIsQ0FBWSxtQkFBbUIsU0FBL0I7QUFDQSxJQUFJLG1CQUFtQixTQUF2QixFQUFtQztBQUNqQyxZQUFVLGFBQVYsQ0FBd0IsUUFBeEIsQ0FBa0MsMkJBQWxDLEVBQWdFO0FBQWhFLEdBQ0MsSUFERCxDQUNPLFVBQUUsWUFBRixFQUFvQjtBQUN6QiwwQkFBVSxvQ0FBVixFQUFpRCxZQUFqRDtBQUNBLFdBQU8sVUFBVSxhQUFWLENBQXdCLEtBQS9CO0FBQ0QsR0FKRCxFQUlHLEtBSkgsQ0FJVSxVQUFFLEdBQUYsRUFBVztBQUNuQiwwQkFBVSxxQkFBVixFQUFpQyxHQUFqQztBQUNELEdBTkQ7O0FBUUEsWUFBVSxhQUFWLENBQXdCLGdCQUF4QixDQUEwQyxTQUExQyxFQUFxRCxVQUFFLEVBQUYsRUFBVTtBQUM3RCwwQkFBVSxXQUFWLEVBQXVCLEdBQUcs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QUE0QixJQUE1QjtBQUNELE9BRkQ7QUFHRDs7O3VDQUVrQjtBQUNqQixXQUFLLFVBQUwsQ0FBZ0IsYUFBaEIsQ0FBK0IsSUFBSSxXQUFKLENBQWlCLHNCQUFqQixDQUEvQjtBQUNEOzs7OEJBRVM7QUFDUixhQUFPO0FBQ0wsWUFBSSxLQUFLLEVBREo7QUFFTCxjQUFNLEtBQUssSUFGTjtBQUdMLG9CQUFZLEtBQUs7QUFIWixPQUFQO0FBS0Q7OztrQ0FFYTtBQUNaLFdBQUssSUFBTCxDQUFVLE1BQVY7QUFDQSxXQUFLLFVBQUwsQ0FBZ0IsYUFBaEIsQ0FBK0IsSUFBSSxXQUFKLENBQWlCLGtCQUFqQixFQUFxQyxFQUFFLFFBQVEsS0FBSyxFQUFmLEVBQXJDLENBQS9CO0FBQ0Q7OzswQ0FFcUI7QUFDcEIsVUFBSSxLQUFLLFVBQVQsRUFBc0I7QUFDcEIsYUFBSyxJQUFMLENBQVUsU0FBVixDQUFvQixNQUFwQixDQUE0QixlQUE1QjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUssSUFBTCxDQUFVLFNBQVYsQ0FBb0IsR0FBcEIsQ0FBeUIsZUFBekI7QUFDRDtBQUNELFdBQUssVUFBTCxHQUFrQixDQUFDLEtBQUssVUFBeEI7QUFDQSxXQUFLLGdCQUFMO0FBQ0Q7OztnQ0FFWSxFLEVBQUs7QUFDaEIsVUFBSSxHQUFHLE1BQUgsQ0FBVSxLQUFWLENBQWdCLE1BQWhCLElBQTBCLENBQTlCLEVBQWtDO0FBQ2hDLFdBQUcsY0FBSDtBQUNBLFdBQUcsTUFBSCxDQUFVLEtBQVYsR0FBa0IsS0FBSyxJQUF2QjtBQUNBLGNBQVEsc0NBQVI7QUFDRDtBQUNELFNBQUcsTUFBSCxDQUFVLFFBQVYsR0FBcUIsSUFBckI7QUFDQSxXQUFLLElBQUwsR0FBWSxHQUFHLE1BQUgsQ0FBVSxLQUF0QjtBQUNBLFdBQUssZ0JBQUw7QUFDRDs7Ozs7O1FBR3NCLE8sR0FBaEIsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJsZXQgZXJyb3JzUGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBcIi5qcy1lcnJvcnMtcGFuZWxcIiApXG5sZXQgYWRkRXJyb3IgPSAoIG1lc3NhZ2UsIHRvQ29uc29sZSApID0+IHtcbiAgbGV0IHRleHQgPSBtZXNzYWdlICsgKCB0b0NvbnNvbGUgfHwgXCJcIiApO1xuICBlcnJvcnNQYW5lbC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoIGAke3RleHR9YCApICk7XG4gIGVycm9yc1BhbmVsLmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImJyXCIgKSApO1xuICBjb25zb2xlLmxvZyggdGV4dCApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhZGRFcnJvciIsImltcG9ydCBUb0RvQnVpbGRlciBmcm9tIFwiLi90b2RvYnVpbGRlci5qc1wiO1xuaW1wb3J0IGFkZEVycm9yIGZyb20gXCIuL2Vycm9ycy5qc1wiO1xuXG52YXIgdG9kb0J1aWxkZXIgPSBuZXcgVG9Eb0J1aWxkZXIoIFwiLmpzLXRvZG8tYnVpbGRlclwiICk7XG5cbmNvbnNvbGUubG9nKFwic2VydmljZVdvcmtlclwiIGluIG5hdmlnYXRvcik7XG5pZiggXCJzZXJ2aWNlV29ya2VyXCIgaW4gbmF2aWdhdG9yICkge1xuICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlciggXCIvdG9kb0xpc3RCdWlsZGVyUFdBL3N3LmpzXCIgKSAvLyBhbGwgZG9tYWluIGlzIHRoZSBzY29wZSB0b2RvTGlzdEJ1aWxkZXJQV0FcbiAgLnRoZW4oICggcmVnaXN0cmF0aW9uICkgPT4ge1xuICAgIGFkZEVycm9yKCBcIlNXIFRvRG9MaXN0IHJlZ2lzdHJhdGlvbiB3YXMgZG9uZSFcIiwgIHJlZ2lzdHJhdGlvbiApO1xuICAgIHJldHVybiBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWFkeTtcbiAgfSkuY2F0Y2goICggZXJyICkgPT4ge1xuICAgIGFkZEVycm9yKCBcIlNXIHJlZ2lzdGVyIGVycm9yOiBcIiwgZXJyICk7XG4gIH0pO1xuXG4gIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoIFwibWVzc2FnZVwiLCAoIGV2ICkgPT4ge1xuICAgIGFkZEVycm9yKCBcIkZyb20gU1c6IFwiLCBldi5kYXRhICk7XG4gICB9KTtcbn0gZWxzZSB7XG4gIGFkZEVycm9yKCBcIlRoZSBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBTV1wiICk7XG59XG4iLCJpbXBvcnQgVG9Eb0xpc3QgZnJvbSBcIi4vdG9kb2xpc3QuanNcIjtcblxuY2xhc3MgVG9Eb0J1aWxkZXIge1xuICBjb25zdHJ1Y3Rvciggc2VsZWN0b3IgKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvciggc2VsZWN0b3IgKTtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplRE9NKCk7XG4gICAgdGhpcy5pbml0aWFsaXplRXZlbnRzKCk7XG4gICAgdGhpcy5pbml0aWFsaXplRGF0YSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZURPTSgpIHtcbiAgICB0aGlzLnBhcmVudE5vZGUuaW5uZXJIVE1MID0gJ1xcXG4gICAgICA8ZGl2PjxidXR0b24gY2xhc3M9XCJidG4tYWRkLXRvZG8ganMtYWRkLXRvZG9saXN0XCI+QWRkIGEgbmV3IHRvZG9saXN0PC9idXR0b24+PC9kaXY+XFxcbiAgICAgIDxkaXYgY2xhc3M9XCJ0b2Rvcy1ib3gganMtdG9kby1ib3hcIj48L2Rpdj4nO1xuICAgIHRoaXMuYWRkQnV0dG9uTm9kZSA9IHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCBcIi5qcy1hZGQtdG9kb2xpc3RcIiApO1xuICAgIHRoaXMudG9kb3NCb3hOb2RlID0gdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoIFwiLmpzLXRvZG8tYm94XCIgKTtcbiAgfVxuXG4gIGluaXRpYWxpemVFdmVudHMoKSB7XG4gICAgLy8gbGlzdGVuZXIgZm9yIGFkZGluZyBhIG5ldyBpdGVtXG4gICAgdGhpcy5hZGRCdXR0b25Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoIFwiY2xpY2tcIiwgdGhpcy5hZGRMaXN0LmJpbmQoIHRoaXMgKSk7XG4gICAgLy8gbGlzdGVuZXIgZm9yIHJlbW92aW5nIGFuIGl0ZW1cbiAgICB0aGlzLnRvZG9zQm94Tm9kZS5hZGRFdmVudExpc3RlbmVyKCBcInRvZG9zLnJlbW92ZUxpc3RJZFwiLCB0aGlzLnJlbW92ZUxpc3RJZC5iaW5kKCB0aGlzICkpO1xuICAgIC8vIGxpc3RlbmVyIGZvciBzYXZpbmcgbGlzdEFycmF5XG4gICAgdGhpcy50b2Rvc0JveE5vZGUuYWRkRXZlbnRMaXN0ZW5lciggXCJ0b2Rvcy5zYXZlTGlzdElkXCIsIHRoaXMuc2F2ZUxpc3RJZC5iaW5kKCB0aGlzICkpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZURhdGEoKSB7XG4gICAgbGV0IHRvZG9zRGF0YSA9IHRoaXMuZ2V0RGF0YUZyb21TdG9yYWdlKCk7XG5cbiAgICBpZiggISF0b2Rvc0RhdGEgJiYgdG9kb3NEYXRhLmxlbmd0aCApIHtcbiAgICAgICAgdG9kb3NEYXRhLmZvckVhY2goICggbGlzdElkICkgPT4ge1xuICAgICAgICB0aGlzLmNyZWF0ZVRvZG9MaXN0KCB7IGlkOiBsaXN0SWQgfSApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3JlYXRlVG9kb0xpc3QoKTtcbiAgICB9XG4gIH1cblxuICBnZXREYXRhRnJvbVN0b3JhZ2UoKSB7XG4gICAgbGV0IHRvZG9zRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCBcInRvZG9MaXN0c1wiICk7XG4gICAgdHJ5IHtcbiAgICAgIHRvZG9zRGF0YSA9IEpTT04ucGFyc2UoIHRvZG9zRGF0YSApIHx8IFtdO1xuICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICBhbGVydCggXCJBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHNhdmluZyB0aGUgbGlzdFwiICk7XG4gICAgICB0b2Rvc0RhdGEgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdG9kb3NEYXRhO1xuICB9XG5cbiAgc2V0RGF0YVRvU3RvcmFnZSggdG9kb3NEYXRhICkge1xuICAgIGlmKCB0b2Rvc0RhdGEubGVuZ3RoIClcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCBcInRvZG9MaXN0c1wiLCBKU09OLnN0cmluZ2lmeSggdG9kb3NEYXRhICkgKTtcbiAgICBlbHNlXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSggXCJ0b2RvTGlzdHNcIiApO1xuICB9XG5cbiAgY3JlYXRlVG9kb0xpc3QoIGRhdGEgKSB7XG4gICAgbmV3IFRvRG9MaXN0KCB0aGlzLnRvZG9zQm94Tm9kZSwgZGF0YSApO1xuICB9XG5cbiAgYWRkTGlzdCgpIHtcbiAgICB0aGlzLmNyZWF0ZVRvZG9MaXN0KCk7XG4gIH1cblxuICBzYXZlTGlzdElkKCBldiApIHtcbiAgICBsZXQgdG9kb3NEYXRhID0gdGhpcy5nZXREYXRhRnJvbVN0b3JhZ2UoKSA7XG4gICAgaWYoICF0b2Rvc0RhdGEgKSByZXR1cm47XG4gICAgdG9kb3NEYXRhLnB1c2goIGV2LmRldGFpbCApO1xuICAgIHRoaXMuc2V0RGF0YVRvU3RvcmFnZSggdG9kb3NEYXRhICk7XG4gIH1cblxuICByZW1vdmVMaXN0SWQoIGV2ICkge1xuICAgIC8vIGFjdGlvbnMgYWZ0ZXIgcmVtb3ZpbmcgYSBsaXN0XG4gICAgbGV0IHRvZG9zRGF0YSA9IHRoaXMuZ2V0RGF0YUZyb21TdG9yYWdlKCk7XG4gICAgbGV0IGluZGV4ID0gdG9kb3NEYXRhLmluZGV4T2YoIGV2LmRldGFpbCApO1xuICAgIGlmKCBpbmRleCA+IC0xICkge1xuICAgICAgdG9kb3NEYXRhLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgICAgIHRoaXMuc2V0RGF0YVRvU3RvcmFnZSggdG9kb3NEYXRhICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IFRvRG9CdWlsZGVyIGFzIGRlZmF1bHQgfVxuIiwiaW1wb3J0IFRvRG9MaXN0SXRlbSBmcm9tIFwiLi90b2RvbGlzdF9pdGVtLmpzXCJcblxuY2xhc3MgVG9Eb0xpc3Qge1xuICAvKlxuICAgINC60L7QvdGB0YLRgNGD0LrRgtC+0YAg0L/RgNC40L3QuNC80LDQtdGCINGD0LfQtdC7INGA0L7QtNC40YLQtdC70Y8sXG4gICAg0Log0LrQvtGC0L7RgNC+0LzRgyDQsdGD0LTQtdGCINC00L7QsdCw0LLQu9C10L0gdG9kby3QutC+0LzQv9C+0L3QtdC90YIsXG4gICAg0Lgg0LTQsNC90L3Ri9C1INC00LvRjyDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCAtIGxpc3RJZCwg0LXRgdC70Lgg0LXRgdGC0YxcbiAgKi9cbiAgY29uc3RydWN0b3IoIGJ1aWxkZXJOb2RlLCBkYXRhICkge1xuICAgIHRoaXMudG9kb3NCb3hOb2RlID0gYnVpbGRlck5vZGU7XG4gICAgdGhpcy5pbml0TWFya3VwKCk7XG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XG4gICAgdGhpcy5pZCA9ICggZGF0YSAmJiBkYXRhLmlkICkgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgIHRoaXMubmFtZSA9IFwiXCI7XG4gICAgaWYoICEhZGF0YSApIHtcbiAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zYXZlTGlzdCggeyBpc05ldzogdHJ1ZSB9ICk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBzZXQgbmFtZSggdmFsdWUgKSB7XG4gICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAgIHRoaXMubmFtZU5vZGUuaW5uZXJIVE1MID0gdGhpcy5mb3JtYXROYW1lKCk7XG4gIH1cblxuICBpbml0RGF0YSgpIHtcbiAgICBsZXQgZGF0YSA9IHRoaXMuZ2V0TGlzdEZyb21TdG9yYWdlKCk7XG4gICAgT2JqZWN0LmFzc2lnbiggdGhpcywgeyBuYW1lOiBkYXRhLm5hbWUgfSApO1xuICAgIGRhdGEuaXRlbXMubWFwKCggaXRlbSApID0+IHtcbiAgICAgIHRoaXMuYWRkSXRlbSggaXRlbSApO1xuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICBpbml0TWFya3VwINC30LDQtNCw0LXRgiDRgdGC0YDRg9C60YLRg9GA0YMgdG9kby3QutC+0LzQv9C+0L3QtdC90YLQsFxuICAgIChmb3JtLmpzLWFkZC1pdGVtPmlucHV0OnRleHRbbmFtZTpcImFkZC1pdGVtXCJdK2lucHV0OnN1Ym1pdCkrdWwudG9kby1saXN0LmpzLWxpc3RcbiAgKi9cbiAgaW5pdE1hcmt1cCgpIHtcbiAgICBsZXQgdGVtcGxhdGUgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwidG9kby1uYW1lIGpzLWFzc2lnbi1uYW1lXCIgY29udGVudGVkaXRhYmxlPjwvZGl2PlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImpzLWNsZWFyLWxpc3RcIj5DbGVhciBsaXN0PC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwianMtcmVtb3ZlLWxpc3RcIj5SZW1vdmUgbGlzdDwvYnV0dG9uPlxuICAgICAgPGZvcm0gY2xhc3M9XCJqcy1hZGQtaXRlbVwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJhZGQtaXRlbVwiIC8+PGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIm9rXCIgLz48L2Zvcm0+XG4gICAgICA8dWwgY2xhc3M9XCJ0b2RvLWxpc3QganMtbGlzdFwiPjwvdWw+YDtcbiAgICB0aGlzLnBhcmVudE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICk7XG4gICAgdGhpcy5wYXJlbnROb2RlLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICAgIHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCBcInRvZG8td3JhcFwiICk7XG4gICAgdGhpcy5pbnB1dE5vZGUgPSB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvciggXCIuanMtYWRkLWl0ZW1cIiApO1xuICAgIHRoaXMubGlzdE5vZGUgPSB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvciggXCIuanMtbGlzdFwiICk7XG4gICAgdGhpcy5uYW1lTm9kZSA9IHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCBcIi5qcy1hc3NpZ24tbmFtZVwiICk7XG4gICAgdGhpcy50b2Rvc0JveE5vZGUuYXBwZW5kKCB0aGlzLnBhcmVudE5vZGUgKTtcbiAgfVxuXG4gIGluaXRFdmVudHMoKSB7XG4gICAgbGV0IGZpbmRJdGVtID0gKCBsaXN0LCBpZCApID0+IHtcbiAgICAgIHJldHVybiBsaXN0LmZpbmRJbmRleCggKCBpdGVtICkgPT4ge1xuICAgICAgICAgIHJldHVybiBpdGVtLmlkID09IGlkO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLypcbiAgICDQt9Cw0LTQsNC10Lwg0YHQvtCx0YvRgtC40LnQvdGD0Y4g0LzQvtC00LXQu9GMINC00LvRjyDRgdC/0LjRgdC60LBcbiAgICAgIGNyZWF0ZVRhc2ssIHJlbW92ZVRhc2ssIHVwZGF0ZVRhc2ssIGNvbXBsZXRlVGFza1xuICAgICovXG4gICAgdGhpcy5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b2Rvcy5jcmVhdGVUYXNrXCIsICggZXYgKSA9PiB7XG4gICAgICBpZiggZXYuZGV0YWlsLmxlbmd0aCA9PSAwICkgcmV0dXJuIGFsZXJ0ICggXCLQndC10L7QsdGF0L7QtNC40LzQviDQt9Cw0L/QvtC70L3QuNGC0Ywg0L3QsNC30LLQsNC90LjQtSDQt9Cw0LTQsNGH0LhcIiApO1xuICAgICAgdGhpcy5hZGRJdGVtKCB7IG5hbWU6IGV2LmRldGFpbCB9ICk7XG4gICAgICB0aGlzLnNhdmVMaXN0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcInRvZG9zLnJlbW92ZVRhc2tcIiwgKCBldiApID0+IHtcbiAgICAgIGxldCBpbmRleCA9IGZpbmRJdGVtKCB0aGlzLml0ZW1zLCBldi5kZXRhaWwgKTtcbiAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKCBpbmRleCwgMSApO1xuICAgICAgdGhpcy5zYXZlTGlzdCgpO1xuICAgIH0sIHRydWUpO1xuXG4gICAgdGhpcy5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b2Rvcy5pdGVtV2FzVXBkYXRlZFwiLCAoIGV2ICkgPT4ge1xuICAgICAgdGhpcy5zYXZlTGlzdCgpO1xuICAgIH0sIHRydWUpO1xuXG4gICAgLypcbiAgICAgIMKg0LTQvtCx0LDQstC70LXQvdC40LUg0L3QvtCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0YHQv9C40YHQutCwXG4gICAgKi9cbiAgICB0aGlzLmlucHV0Tm9kZS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsICggZXYgKSA9PiB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCBcInRvZG9zLmNyZWF0ZVRhc2tcIiwgeyBkZXRhaWw6IGV2LnRhcmdldC5lbGVtZW50c1sgXCJhZGQtaXRlbVwiIF0udmFsdWUgfSApKTtcbiAgICAgIHRoaXMuaW5wdXROb2RlLnJlc2V0KCk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICAg0YPQtNCw0LvQtdC90LjQtSDRjdC70LXQvNC10L3RgtC+0LIg0YHQv9C40YHQutCwXG4gICAgKi9cbiAgICB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvciggXCIuanMtY2xlYXItbGlzdFwiICkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICggZXYgKSA9PiB7XG4gICAgICB0aGlzLmNsZWFyQWxsKCk7XG4gICAgfSk7XG5cbiAgICAvKlxuICAgICAg0L/QtdGA0LXQuNC80LXQvdC+0LLQsNC90LjQtSDRgdC/0LjRgdC60LBcbiAgICAqL1xuICAgIHRoaXMubmFtZU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCBldiApID0+IHtcbiAgICAgIGlmKCBldi50YXJnZXQuaW5uZXJIVE1MICE9IHRoaXMuZm9ybWF0TmFtZSgpICkge1xuICAgICAgICB0aGlzLm5hbWUgPSBldi50YXJnZXQuaW5uZXJIVE1MO1xuICAgICAgICB0aGlzLnNhdmVMaXN0KCk7XG4gICAgICB9XG4gICAgICBldi50YXJnZXQuaW5uZXJIVE1MID0gdGhpcy5mb3JtYXROYW1lKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm5hbWVOb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsICggZXYgKSA9PiB7XG4gICAgICAgIGlmKCBldi5rZXlDb2RlID09IDI3ICkge1xuICAgICAgICAgIGV2LnRhcmdldC5pbm5lckhUTUwgPSB0aGlzLmZvcm1hdE5hbWUoKTtcbiAgICAgICAgICBldi50YXJnZXQuYmx1cigpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCBldi5rZXlDb2RlID09IDEzICkge1xuICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXYudGFyZ2V0LmJsdXIoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLypcbiAgICAgINGD0LTQsNC70LXQvdC40LUg0LLRgdC10LPQviDRgdC/0LjRgdC60LBcbiAgICAqL1xuICAgIHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCBcIi5qcy1yZW1vdmUtbGlzdFwiICkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICggZXYgKSA9PiB7XG4gICAgICB0aGlzLmNsZWFyQWxsKCB7IHJlbW92ZVdpdGhQYXJlbnQ6IHRydWUgfSApO1xuICAgICAgdGhpcy50b2Rvc0JveE5vZGUuZGlzcGF0Y2hFdmVudCggbmV3IEN1c3RvbUV2ZW50KCBcInRvZG9zLnJlbW92ZUxpc3RJZFwiLCB7IGRldGFpbDogdGhpcy5pZCB9ICkgKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvcm1hdE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZSB8fCBcIltBc3NpZ24gdGhlIGxpc3QgbmFtZV1cIjtcbiAgfVxuXG4gIGdldExpc3RGcm9tU3RvcmFnZSgpIHtcbiAgICBsZXQgdG9kb0RhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggYHRvZG9MaXN0XyR7dGhpcy5pZH1gICk7XG4gICAgdHJ5IHtcbiAgICAgIHRvZG9EYXRhID0gSlNPTi5wYXJzZSggdG9kb0RhdGEgKTtcbiAgICB9IGNhdGNoKCBlICkge1xuICAgICAgLy8gVE9ETzogYWxlcnQgbWVzc2FnZVxuICAgIH1cbiAgICBmaW5hbGx5e1xuICAgICAgdG9kb0RhdGEgPSB0b2RvRGF0YSB8fCB7fTtcbiAgICB9XG4gICAgcmV0dXJuIHRvZG9EYXRhO1xuICB9XG5cbiAgcmVtb3ZlRnJvbVN0b3JhZ2UoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oIGB0b2RvTGlzdF8ke3RoaXMuaWR9YCApO1xuICB9XG5cbiAgc2F2ZUxpc3QoIG9wdGlvbnMgKSB7XG4gICAgbGV0IHRvZG9EYXRhID0gdGhpcy5nZXRMaXN0RnJvbVN0b3JhZ2UoKTtcbiAgICBPYmplY3QuYXNzaWduKCB0b2RvRGF0YSwgeyBpZDogdGhpcy5pZCwgbmFtZTogdGhpcy5uYW1lLCBpdGVtczogdGhpcy5pdGVtcy5tYXAoICggaXRlbSApID0+IHtcbiAgICAgIHJldHVybiBpdGVtLmdldERhdGEoKTtcbiAgICB9KSB9ICk7XG5cbiAgICBsZXQgZGF0YVRvU2F2ZTtcbiAgICB0cnkge1xuICAgICAgZGF0YVRvU2F2ZSA9IEpTT04uc3RyaW5naWZ5KCB0b2RvRGF0YSApO1xuICAgIH0gY2F0Y2goIGUgKSB7XG4gICAgICBhbGVydCggXCJBbiBlcnJvciB3YXMgYWNjdXJlZCBieSBzYXZpbmcgZGF0YVwiICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCBgdG9kb0xpc3RfJHt0aGlzLmlkfWAsIGRhdGFUb1NhdmUgKTtcbiAgICBpZiggb3B0aW9ucyAmJiBvcHRpb25zLmlzTmV3ICkge1xuICAgICAgdGhpcy50b2Rvc0JveE5vZGUuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoIFwidG9kb3Muc2F2ZUxpc3RJZFwiLCB7IGRldGFpbDogdGhpcy5pZCB9ICkpO1xuICAgIH1cbiAgfVxuXG4gIGFkZEl0ZW0oIGl0ZW0gKSB7XG4gICAgaWYoIHR5cGVvZiBpdGVtLmlkID09IFwidW5kZWZpbmVkXCIgKSBpdGVtLmlkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5pdGVtcy5wdXNoKCBuZXcgVG9Eb0xpc3RJdGVtKCB0aGlzLmxpc3ROb2RlLCBpdGVtICkgKTtcbiAgfVxuXG4gIGNsZWFyQWxsKCBvcHRpb25zICkge1xuICAgIHRoaXMuaXRlbXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLmxpc3ROb2RlLmlubmVySFRNTCA9IFwiXCI7XG4gICAgaWYoIG9wdGlvbnMgJiYgb3B0aW9ucy5yZW1vdmVXaXRoUGFyZW50ICkge1xuICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICAgICAgdGhpcy5yZW1vdmVGcm9tU3RvcmFnZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNhdmVMaXN0KCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IFRvRG9MaXN0IGFzIGRlZmF1bHQgfVxuIiwiY2xhc3MgVG9Eb0xpc3RJdGVtIHtcbiAgY29uc3RydWN0b3IoIHBhcmVudE5vZGUsIGl0ZW0gKSB7XG4gICAgdGhpcy5pc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgT2JqZWN0LmFzc2lnbiggdGhpcywgaXRlbSApO1xuICAgIHRoaXMucGFyZW50Tm9kZSA9IHBhcmVudE5vZGU7XG4gICAgdGhpcy5ub2RlID0gbnVsbDtcbiAgICB0aGlzLmluaXRNYXJrdXAoIGl0ZW0gKTtcbiAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgfVxuXG4gIGluaXRNYXJrdXAoIGl0ZW0gKSB7XG4gICAgbGV0IGl0ZW1Ob2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJsaVwiICk7XG4gICAgaXRlbU5vZGUuY2xhc3NMaXN0LmFkZCggXCJ0b2RvLWl0ZW1cIiApO1xuICAgIGxldCBjaGVja2VkU3RhdHVzID0gXCJcIjtcbiAgICBpZiggaXRlbS5pc0NvbXBsZXRlKSB7XG4gICAgICBpdGVtTm9kZS5jbGFzc0xpc3QuYWRkKCBcIml0ZW0tY29tcGxldGVcIiApO1xuICAgICAgY2hlY2tlZFN0YXR1cyA9IFwiY2hlY2tlZFwiXG4gICAgfVxuICAgIGl0ZW1Ob2RlLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgcm9sZT1cImNoZWNrYm94XCIgY2xhc3M9XCJjaGVja2JveCBqcy1jb21wbGV0ZVwiICR7Y2hlY2tlZFN0YXR1c30+PC9kaXY+XG4gICAgICA8aW5wdXQgY2xhc3M9XCJ0ZXh0IGpzLXVwZGF0ZVwiIHZhbHVlPVwiJHtpdGVtLm5hbWV9XCIgcmVhZG9ubHk+XG4gICAgICA8ZGl2IGNsYXNzPVwicmVtb3ZlLWJ0biBqcy1yZW1vdmVcIj48L2Rpdj5gO1xuICAgIGl0ZW1Ob2RlLmRhdGFzZXQuaWQgPSBpdGVtLmlkO1xuICAgIHRoaXMucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCggaXRlbU5vZGUgKTtcbiAgICB0aGlzLm5vZGUgPSBpdGVtTm9kZTtcbiAgICB0aGlzLmlucHV0Tm9kZSA9IGl0ZW1Ob2RlLnF1ZXJ5U2VsZWN0b3IoIFwiLmpzLXVwZGF0ZVwiICk7XG4gIH1cblxuICBpbml0RXZlbnRzKCkge1xuICAgIHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCBcIi5qcy1jb21wbGV0ZVwiICkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudG9nZ2xlQ29tcGxldGVFdmVudC5iaW5kKCB0aGlzKSk7XG5cbiAgICB0aGlzLm5vZGUucXVlcnlTZWxlY3RvciggXCIuanMtcmVtb3ZlXCIgKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZW1vdmVFdmVudC5iaW5kKCB0aGlzICkpO1xuXG4gICAgdGhpcy5pbnB1dE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICggZXYgKSA9PiB7XG4gICAgICBpZiggdGhpcy5pc0NvbXBsZXRlICkgcmV0dXJuOyAvLyBhbGVydCggXCLQndC10LvRjNC30Y8g0LjQt9C80LXQvdGP0YLRjCDQvdCw0LfQstCw0L3QuNC1INC30LDQutGA0YvRgtC+0Lkg0LfQsNC00LDRh9C4XCIgKTtcbiAgICAgIGV2LmN1cnJlbnRUYXJnZXQucmVhZE9ubHkgPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW5wdXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy4gdXBkYXRlRXZlbnQuYmluZCggdGhpcyApKTtcbiAgICB0aGlzLmlucHV0Tm9kZS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoIGV2ICkgPT4ge1xuICAgICAgaWYoIGV2LmtleUNvZGUgPT0gMjcgKSB7XG4gICAgICAgIGV2LnRhcmdldC52YWx1ZSA9IHRoaXMubmFtZTtcbiAgICAgICAgdGhpcy5pbnB1dE5vZGUuYmx1cigpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuaW5wdXROb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICggZXYgKSA9PiB7XG4gICAgICBldi5jdXJyZW50VGFyZ2V0LnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlbmRVcGRhdGVTdGF0dXMoKSB7XG4gICAgdGhpcy5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQoIG5ldyBDdXN0b21FdmVudCggXCJ0b2Rvcy5pdGVtV2FzVXBkYXRlZFwiICkgKTtcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgaXNDb21wbGV0ZTogdGhpcy5pc0NvbXBsZXRlXG4gICAgfTtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50KCkge1xuICAgIHRoaXMubm9kZS5yZW1vdmUoKTtcbiAgICB0aGlzLnBhcmVudE5vZGUuZGlzcGF0Y2hFdmVudCggbmV3IEN1c3RvbUV2ZW50KCBcInRvZG9zLnJlbW92ZVRhc2tcIiwgeyBkZXRhaWw6IHRoaXMuaWQgfSApICk7XG4gIH1cblxuICB0b2dnbGVDb21wbGV0ZUV2ZW50KCkge1xuICAgIGlmKCB0aGlzLmlzQ29tcGxldGUgKSB7XG4gICAgICB0aGlzLm5vZGUuY2xhc3NMaXN0LnJlbW92ZSggXCJpdGVtLWNvbXBsZXRlXCIgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoIFwiaXRlbS1jb21wbGV0ZVwiICk7XG4gICAgfVxuICAgIHRoaXMuaXNDb21wbGV0ZSA9ICF0aGlzLmlzQ29tcGxldGU7XG4gICAgdGhpcy5zZW5kVXBkYXRlU3RhdHVzKCk7XG4gIH1cblxuICB1cGRhdGVFdmVudCggZXYgKSB7XG4gICAgaWYoIGV2LnRhcmdldC52YWx1ZS5sZW5ndGggPT0gMCApIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi50YXJnZXQudmFsdWUgPSB0aGlzLm5hbWU7XG4gICAgICBhbGVydCAoIFwi0J3QtdC+0LHRhdC+0LTQuNC80L4g0LfQsNC/0L7Qu9C90LjRgtGMINC90LDQt9Cy0LDQvdC40LUg0LfQsNC00LDRh9C4XCIgKTtcbiAgICB9XG4gICAgZXYudGFyZ2V0LnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICB0aGlzLm5hbWUgPSBldi50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZW5kVXBkYXRlU3RhdHVzKCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgVG9Eb0xpc3RJdGVtIGFzIGRlZmF1bHQgfVxuIl19
