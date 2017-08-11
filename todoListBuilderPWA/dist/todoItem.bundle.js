webpackJsonp([0],{

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
/* harmony default export */ __webpack_exports__["default"] = (ToDoListItem);


/***/ })

});
//# sourceMappingURL=todoItem.bundle.js.map