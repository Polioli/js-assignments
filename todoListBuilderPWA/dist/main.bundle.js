/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ToDoListItem {
    constructor(parentNode, item) {
        this.isComplete = false;
        Object.assign(this, item);
        this.parentNode = parentNode;
        this.node = null;
        this.initMarkup(item);
        this.initEvents();
    }
    initMarkup(item) {
        let itemNode = document.createElement("li");
        itemNode.classList.add("item-wrap");
        let checkedStatus = "";
        if (item.isComplete) {
            itemNode.classList.add("item-complete");
            checkedStatus = "checked";
        }
        itemNode.innerHTML = `
      <div role="checkbox" class="icon-button colored-icon-button checkbox js-complete" ${checkedStatus}>
        <i class="material-icons material-spec-icon done" title="Check it done">check_box</i>
        <i class="material-icons material-spec-icon in-progress" title="Check it done">check_box_outline_blank</i>
      </div>
      <input class="item-text-field js-update" value="${item.name}" readonly>
      <button class="icon-button colored-icon-button js-remove">
        <i class="material-icons material-spec-icon" title="Remove item">clear</i>
      </button>`;
        itemNode.dataset.id = item.id;
        this.parentNode.appendChild(itemNode);
        this.node = itemNode;
        this.inputNode = itemNode.querySelector(".js-update");
    }
    initEvents() {
        this.node.querySelector(".js-complete").addEventListener("click", this.toggleCompleteEvent.bind(this));
        this.node.querySelector(".js-remove").addEventListener("click", this.removeEvent.bind(this));
        this.inputNode.addEventListener("click", (ev) => {
            if (this.isComplete)
                return;
            ev.currentTarget.readOnly = false;
        });
        this.inputNode.addEventListener("change", this.updateEvent.bind(this));
        this.inputNode.addEventListener("keydown", (ev) => {
            this.node.classList.remove("error");
            if (ev.keyCode == 27) {
                ev.target.value = this.name;
                this.inputNode.blur();
                return;
            }
            if (ev.keyCode == 13) {
                if (ev.target.value.length == 0) {
                    ev.preventDefault();
                    this.node.classList.add("error");
                    return;
                }
            }
        });
        this.inputNode.addEventListener("blur", (ev) => {
            ev.currentTarget.readOnly = true;
        });
        this.inputNode.addEventListener("keypress", (ev) => {
            this.node.classList.remove("error");
        });
    }
    sendUpdateStatus() {
        this.parentNode.dispatchEvent(new CustomEvent("todos.itemWasUpdated"));
    }
    getData() {
        return {
            id: this.id,
            name: this.name,
            isComplete: this.isComplete
        };
    }
    removeEvent() {
        this.node.remove();
        this.parentNode.dispatchEvent(new CustomEvent("todos.removeTask", { detail: this.id }));
    }
    toggleCompleteEvent() {
        if (this.isComplete) {
            this.node.classList.remove("item-complete");
        }
        else {
            this.node.classList.add("item-complete");
        }
        this.isComplete = !this.isComplete;
        this.sendUpdateStatus();
    }
    updateEvent(ev) {
        if (ev.target.value.length == 0) {
            ev.preventDefault();
            this.node.classList.add("error");
            return;
        }
        ev.target.readOnly = true;
        this.name = ev.target.value;
        this.sendUpdateStatus();
    }
}
exports.default = ToDoListItem;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const todobuilder_1 = __webpack_require__(2);
const errors_1 = __webpack_require__(4);
let todoBuilder = new todobuilder_1.default(".js-todo-builder");
let errorsPanel = document.querySelector(".js-errors-panel");
let appMenu = document.querySelector(".js-app-menu");
let aboutBox = document.querySelector(".js-description");
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/todoListBuilderPWA/sw.js")
        .then((registration) => {
        errors_1.default("SW ToDoList registration was done!", registration);
        return navigator.serviceWorker.ready;
    }).catch((err) => {
        errors_1.default("SW register error: ", err);
    });
    navigator.serviceWorker.addEventListener("message", (ev) => {
        errors_1.default("From SW: ", ev.data);
    });
}
else {
    errors_1.default("The browser doesn't support ServiceWorker", "");
}
document.querySelector(".js-app-menu-button").addEventListener("click", (ev) => {
    appMenu.classList.toggle("visible");
});
document.querySelector(".js-app-menu-item").addEventListener("click", (ev) => {
    errorsPanel.classList.toggle("visible");
    appMenu.classList.toggle("visible");
    let target = ev.currentTarget;
    if (target.dataset.textStatus == "show") {
        target.dataset.textStatus = "hide";
        target.innerHTML = target.dataset.textHide;
    }
    else {
        target.dataset.textStatus = "show";
        target.innerHTML = target.dataset.textShow;
    }
});
document.querySelector(".js-toggle-about").addEventListener("click", (ev) => {
    aboutBox.classList.toggle("visible");
});
document.querySelector(".js-description-close").addEventListener("click", (ev) => {
    aboutBox.classList.toggle("visible");
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const todolist_1 = __webpack_require__(3);
class ToDoBuilder {
    constructor(selector) {
        this.parentNode = document.querySelector(selector);
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
        this.addButtonNode = this.parentNode.querySelector(".js-add-todolist");
        this.todosBoxNode = this.parentNode.querySelector(".js-todo-box");
    }
    initializeEvents() {
        this.addButtonNode.addEventListener("click", this.addList.bind(this));
        this.todosBoxNode.addEventListener("todos.removeListId", this.removeListId.bind(this));
        this.todosBoxNode.addEventListener("todos.saveListId", this.saveListId.bind(this));
    }
    initializeData() {
        let todosData = this.getDataFromStorage();
        if (!!todosData && todosData.length) {
            todosData.forEach((listId) => {
                this.createTodoList({ id: listId });
            });
        }
        else {
            this.createTodoList(null);
        }
    }
    getDataFromStorage() {
        let todosData;
        try {
            todosData = JSON.parse(localStorage.getItem("todoLists")) || [];
        }
        catch (e) {
            alert("An error occured while saving the list");
            todosData = null;
        }
        return todosData;
    }
    setDataToStorage(todosData) {
        if (todosData.length)
            localStorage.setItem("todoLists", JSON.stringify(todosData));
        else
            localStorage.removeItem("todoLists");
    }
    createTodoList(data) {
        new todolist_1.default(this.todosBoxNode, data);
    }
    addList() {
        this.createTodoList(null);
    }
    saveListId(ev) {
        let todosData = this.getDataFromStorage();
        if (!todosData)
            return;
        todosData.push(ev.detail);
        this.setDataToStorage(todosData);
    }
    removeListId(ev) {
        let todosData = this.getDataFromStorage();
        let index = todosData.indexOf(ev.detail);
        if (index > -1) {
            todosData.splice(index, 1);
            this.setDataToStorage(todosData);
        }
    }
}
exports.default = ToDoBuilder;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ToDoList {
    constructor(builderNode, data) {
        this.todosBoxNode = builderNode;
        this.initMarkup();
        this.initEvents();
        this.id = (data && data.id) || new Date().getTime();
        this.items = [];
        this.name = "";
        if (!!data) {
            this.initData();
        }
        else {
            this.saveList({ isNew: true });
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
        this.nameNode.innerHTML = this.formatName();
    }
    initData() {
        let data = this.getListFromStorage();
        Object.assign(this, { name: data.name });
        data.items.map((item) => {
            this.addItem(item);
        });
    }
    initMarkup() {
        let template = `
      <div class="todo-wrap">
        <div class="todo-name-wrap">
          <div class="todo-name js-assign-name" contenteditable></div>
          <button class="icon-button js-list-menu-button">
            <i class="material-icons material-spec-icon" title="Show menu">more_vert</i>
          </button>
        </div>
        <div class="list-menu js-list-menu">
          <ul>
            <li class="item js-clear-list">Clear list</li>
            <li class="item js-remove-list">Remove list</li>
          </ul>
        </div>
        <form class="item-wrap add-item js-add-item">
          <input type="text" name="add-item" class="item-text-field" placeholder="Add name" />
          <button type="submit" class="icon-button colored-icon-button">
            <i class="material-icons material-spec-icon" title="Add item">add_circle</i>
          </button>
        </form>
        <ul class="todo-list js-list"></ul>
      </div>`;
        this.parentNode = document.createElement("div");
        this.parentNode.innerHTML = template;
        this.parentNode.classList.add("todo-grid-item");
        this.inputNode = this.parentNode.querySelector(".js-add-item");
        this.listNode = this.parentNode.querySelector(".js-list");
        this.nameNode = this.parentNode.querySelector(".js-assign-name");
        this.menuNode = this.parentNode.querySelector(".js-list-menu-button");
        this.listMenuNode = this.parentNode.querySelector(".js-list-menu");
        this.todosBoxNode.append(this.parentNode);
    }
    initEvents() {
        let findItem = (list, id) => {
            return list.findIndex((item) => {
                return item.id == id;
            });
        };
        this.parentNode.addEventListener("todos.createTask", (ev) => {
            if (ev.detail.length == 0) {
                this.inputNode.classList.add("error");
                return;
            }
            this.addItem({ name: ev.detail });
        });
        this.parentNode.addEventListener("todos.removeTask", (ev) => {
            let index = findItem(this.items, ev.detail);
            this.items.splice(index, 1);
            this.saveList(null);
        }, true);
        this.parentNode.addEventListener("todos.itemWasUpdated", (ev) => {
            this.saveList(null);
        }, true);
        this.inputNode.addEventListener("keypress", (ev) => {
            this.inputNode.classList.remove("error");
        });
        this.inputNode.addEventListener("submit", (ev) => {
            ev.preventDefault();
            let elements = ev.target.elements;
            let value = elements["add-item"].value;
            this.parentNode.dispatchEvent(new CustomEvent("todos.createTask", { detail: value }));
            this.inputNode.reset();
        });
        this.parentNode.querySelector(".js-clear-list").addEventListener("click", (ev) => {
            this.clearAll(null);
            this.listMenuNode.classList.toggle("visible");
        });
        this.nameNode.addEventListener("blur", (ev) => {
            if (ev.target.innerHTML != this.formatName()) {
                this.name = ev.target.innerHTML;
                this.saveList(null);
            }
            ev.target.innerHTML = this.formatName();
        });
        this.nameNode.addEventListener("keydown", (ev) => {
            if (ev.keyCode == 27) {
                ev.target.innerHTML = this.formatName();
                ev.target.blur();
            }
            if (ev.keyCode == 13) {
                ev.preventDefault();
                ev.target.blur();
            }
        });
        this.menuNode.addEventListener("click", (ev) => {
            this.listMenuNode.classList.toggle("visible");
        });
        this.parentNode.querySelector(".js-remove-list").addEventListener("click", (ev) => {
            this.clearAll({ removeWithParent: true });
            this.todosBoxNode.dispatchEvent(new CustomEvent("todos.removeListId", { detail: this.id }));
            this.listMenuNode.classList.toggle("visible");
        });
    }
    formatName() {
        return this.name || "[Assign the list name]";
    }
    getListFromStorage() {
        let todoData;
        try {
            todoData = JSON.parse(localStorage.getItem(`todoList_${this.id}`));
        }
        catch (e) {
        }
        finally {
            todoData = todoData || {};
        }
        return todoData;
    }
    removeFromStorage() {
        localStorage.removeItem(`todoList_${this.id}`);
    }
    saveList(options) {
        let todoData = this.getListFromStorage();
        Object.assign(todoData, { id: this.id, name: this.name, items: this.items.map((item) => {
                return item.getData();
            }) });
        let dataToSave;
        try {
            dataToSave = JSON.stringify(todoData);
        }
        catch (e) {
            alert("An error was accured by saving data");
            return;
        }
        localStorage.setItem(`todoList_${this.id}`, dataToSave);
        if (options && options.isNew) {
            this.todosBoxNode.dispatchEvent(new CustomEvent("todos.saveListId", { detail: this.id }));
        }
    }
    clearAll(options) {
        this.items.length = 0;
        this.listNode.innerHTML = "";
        if (options && options.removeWithParent) {
            this.parentNode.remove();
            this.removeFromStorage();
        }
        else {
            this.saveList(null);
        }
    }
    addItem(item) {
        if (typeof item.id == "undefined")
            item.id = new Date().getTime();
        Promise.resolve().then(function () { return __webpack_require__(0); }).then(module => module.default).then((ToDoListItem) => {
            this.items.push(new ToDoListItem(this.listNode, item));
            this.saveList(null);
        });
    }
}
exports.default = ToDoList;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let errorsPanel = document.querySelector(".js-errors-panel");
let addError = (message, toConsole) => {
    let text = message + (toConsole || "");
    errorsPanel.appendChild(document.createTextNode(`${text}`));
    errorsPanel.appendChild(document.createElement("br"));
    console.log(text);
};
exports.default = addError;


/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map