# userintent.js
A small JS library to assist with detecting a user leaving your web page, and trying to convince them to stay!

## Dependencies
userintent.js requires no third party libraries to operate.

## Usage
Ensure that you include userintent.js in your page.

```html
<script src="userintent.js"></script>
```

Create a new instance of userintent with your required event hooks.

```javascript
var mi = new userIntent({
	"onMouseLeave": function(e) {
		alert("The user's mouse left the screen!");
	},
	"onUnload": function(e) {
		return "The user is trying to close the window!";
	}
});
```

## List of event hooks

```javascript

/*
onMouseLeave
Description: Fires every time the users mouse leaves the browsers viewport
Format: A standard callback function
Example:
*/
function onMouseLeave(e) {
	console.log('Mouse has left');
}

/*
onUnload
Description: Attempts to fire when the user is closing the browser window
Format: A callback function that returns the confirmation message as a string.
				Note: This does not work in all browsers.
Example:
*/
function onUnload(e) {
	return "Are you sure you want to leave now?";
}

/*
onHotKeyExit
Description: Fires when a user goes to press a hot key to close the window,
						 such as Ctrl-w or Ctrl-Q
Format: A standard callback function
Example:
*/
function onHotKeyExit(e) {
	console.log("User may be about to close the window with a hotkey");
}

/*
tabDeactivated
Description: Fires when the current page's tab is deactivated or minimised in the browser
@Format: a standard callback function
Example:
*/
function tabDeactivated(e) {
	console.log('The tab is now hidden');
}

/*
tabReactivated
Description: Fires when the current page's tab is reactivated or reopened in the browser
@Format: a standard callback function
Example:
*/
function tabReactivated(e) {
	console.log('The tab is now visible');
}

```
