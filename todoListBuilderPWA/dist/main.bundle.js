/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "todoItem.bundle.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
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
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__todobuilder__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors__ = __webpack_require__(3);


let todoBuilder = new __WEBPACK_IMPORTED_MODULE_0__todobuilder__["a" /* default */](".js-todo-builder");
let errorsPanel = document.querySelector(".js-errors-panel");
let appMenu = document.querySelector(".js-app-menu");
let aboutBox = document.querySelector(".js-description");
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/js-assignments/todoListBuilderPWA/sw.js")
        .then((registration) => {
        Object(__WEBPACK_IMPORTED_MODULE_1__errors__["a" /* default */])("SW ToDoList registration was done!", registration);
        return navigator.serviceWorker.ready;
    }).catch((err) => {
        Object(__WEBPACK_IMPORTED_MODULE_1__errors__["a" /* default */])("SW register error: ", err);
    });
    navigator.serviceWorker.addEventListener("message", (ev) => {
        Object(__WEBPACK_IMPORTED_MODULE_1__errors__["a" /* default */])("From SW: ", ev.data);
    });
}
else {
    Object(__WEBPACK_IMPORTED_MODULE_1__errors__["a" /* default */])("The browser doesn't support ServiceWorker", "");
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__todolist__ = __webpack_require__(2);

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
        new __WEBPACK_IMPORTED_MODULE_0__todolist__["a" /* default */](this.todosBoxNode, data);
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
/* harmony default export */ __webpack_exports__["a"] = (ToDoBuilder);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
        __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 5)).then((module) => module.default).then((ToDoListItem) => {
            this.items.push(new ToDoListItem(this.listNode, item));
            this.saveList(null);
        }).catch((err) => {
            console.log("Lazy loading error:", err);
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ToDoList);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let errorsPanel = document.querySelector(".js-errors-panel");
let addError = (message, toConsole) => {
    let text = message + (toConsole || "");
    errorsPanel.appendChild(document.createTextNode(`${text}`));
    errorsPanel.appendChild(document.createElement("br"));
    console.log(text);
};
/* harmony default export */ __webpack_exports__["a"] = (addError);


/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map