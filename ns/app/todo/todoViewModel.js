var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var observableModule = require("data/observable");
var observableModuleArray = require("data/observable-array");
var ToDoViewModel = (function (_super) {
    __extends(ToDoViewModel, _super);
    function ToDoViewModel(todoItems) {
        _super.call(this);
        this._todoItems = todoItems;
    }
    Object.defineProperty(ToDoViewModel.prototype, "textInput", {
        get: function () {
            return this._textInput;
        },
        set: function (value) {
            if (this._textInput !== value) {
                this._textInput = value;
                this.notifyPropertyChange("textInput", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToDoViewModel.prototype, "showBack", {
        get: function () {
            return this._showBack;
        },
        set: function (value) {
            if (this._showBack !== value) {
                this._showBack = value;
                this.notifyPropertyChange("showBack", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToDoViewModel.prototype, "todoItems", {
        get: function () {
            if (!this._todoItems) {
                this._todoItems = new observableModuleArray.ObservableArray();
            }
            return this._todoItems;
        },
        enumerable: true,
        configurable: true
    });
    return ToDoViewModel;
})(observableModule.Observable);
exports.ToDoViewModel = ToDoViewModel;
var TodoItem = (function (_super) {
    __extends(TodoItem, _super);
    function TodoItem(text, isChecked) {
        _super.call(this);
        this._text = text;
        this._isChecked = isChecked;
    }
    Object.defineProperty(TodoItem.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (value) {
            if (this._text !== value) {
                this._text = value;
                this.notifyPropertyChange("text", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoItem.prototype, "isChecked", {
        get: function () {
            return this._isChecked;
        },
        set: function (value) {
            if (this._isChecked !== value) {
                this._isChecked = value;
                this.notifyPropertyChange("isChecked", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TodoItem.prototype, "children", {
        get: function () {
            if (!this._children) {
                this._children = new observableModuleArray.ObservableArray();
            }
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    return TodoItem;
})(observableModule.Observable);
exports.TodoItem = TodoItem;