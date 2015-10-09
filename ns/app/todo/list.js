var application = require("application");

var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var todoViewModel = require("./todoViewModel");
var platform = require("platform");

var swipeDelete = require("../utils/ios-swipe-delete");

var topmost;

// Shared Exports
var rowOnPress;
var onPressCheckbox;
var markAllAsDoneOnTap;

exports.navigatedTo = function(args) {
	page = args.object;
    var viewModel;
    if (page.navigationContext) {
        viewModel = page.navigationContext;
    }
    else {
        viewModel = new todoViewModel.ToDoViewModel(null);
    }
    page.bindingContext = page.bindingContext || viewModel;

    var listView = page.getViewById("listView");

	if (!topmost) {
		topmost = frameModule.topmost();
	}
	
	page.bindingContext.set("showBack", topmost.canGoBack());

    if (platform.device.os === platform.platformNames.ios) {
		var iosFrame = topmost.ios;
		iosFrame.navBarVisibility = "never";
		iosFrame.controller.view.window.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.96, 0.96, 0.96, 1);

		// TODO: Replace with a "returnKey" listener in 1.4.
		// See https://github.com/NativeScript/sample-Groceries/issues/17
		application.ios.addNotificationObserver("UITextFieldTextDidEndEditingNotification", createRow);

		// TODO: This solution is very specific to deleting and doesn't handle other swipe actions.
		// UI for NativeScript has a built-in solution for this coming in the next week or so.
		// If I get my hands on it in time I can throw that in here.
    
		swipeDelete.enable(listView, function(index) {
			page.bindingContext.get("todoItems").splice(index, 1);
    	});
	}
}
    
function createRow(args) {
	var bindContext = page.bindingContext;
	var itemText = bindContext.textInput;
	if (itemText) {
		bindContext.todoItems.unshift(new todoViewModel.TodoItem(itemText, false));
		bindContext.textInput = "";
	}
}

function markAllAsDone(_todoItems, newParams) {
    newParams = newParams === undefined ? true : newParams;
    _todoItems.forEach(function(item, index) {

	if (item.children && item.children.length > 0) {
		markAllAsDone(item.children, newParams);
    }
	  
	item.isChecked = newParams;

	});
}

markAllAsDoneOnTap = function () {
	markAllAsDone(page.bindingContext.get("todoItems"));
}; 

rowOnPress = function(args) {
	var bindContext = page.bindingContext;
    topmost.navigate({
        moduleName: "todo/list",
        context: new todoViewModel.ToDoViewModel(bindContext.todoItems.getItem(args.index).children)
    });
};

onPressCheckbox = function(args) {
    var currentItem = args.view.bindingContext;
	
	var _todoItems = page.bindingContext.get("todoItems");
    var index = _todoItems.indexOf(currentItem);
    var toUpdate = {};
    
	console.log("currentItem: " + currentItem);
	
    if (currentItem.isChecked) {
		toUpdate = false;
    } else {
		toUpdate = true;
    }     

	_todoItems.getItem(index).isChecked = toUpdate;

    markAllAsDone(_todoItems.getItem(index).children, toUpdate);
};

exports.onBackTap = function() {
  if (topmost && topmost.canGoBack()) {
    topmost.goBack();
  }
};

exports.markAllAsDoneOnTap = function() {
  markAllAsDoneOnTap.apply(this, arguments);
}

exports.rowOnPress = function() {
  rowOnPress.apply(this, arguments);
};

exports.onPressCheckbox = function() {
  onPressCheckbox.apply(this, arguments);
};