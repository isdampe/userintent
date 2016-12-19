/**
 * userIntent.js
 * Attempt to guess a users actions and do things with them
 * @license - MIT
 * @author - https://github.com/isdampe
 * @constructor
 * @param {object} config - The configuration object of callbacks to hook
 * @return {object} - The new instance of userIntent
 */
var userIntent = function(config) {

	this.tabHasBlurred = false;

	/**
	 * Cross browser handling for add event handler
	 * @param {object} obj - The DOM object to add listener on
	 * @param {string} evt - The event to bind to
	 * @param {function} fn - The callback function to call on emit
	 * @return {void}
	 */
	this.addEvent = function(obj, evt, fn) {

		if (obj.addEventListener) {
			obj.addEventListener(evt, fn, false);
		}
		else if (obj.attachEvent) {
			obj.attachEvent("on" + evt, fn);
		}

	};

	/**
	 * Translates a config name and binds it to appropriate events
	 * @param {string} name - The config event name
	 * @param {function} func - The callback function to bind
	 * @return {mixed} - False on failure, void on success
	 */
	this.translateAndHookEvent = function(name, func) {

		if ( typeof name === 'undefined' || typeof func !== 'function' ) return false;

		var _this = this;

		switch ( name ) {

			case "onMouseLeave":
				this.addEvent(document, "mouseout", function(e){
					e = e ? e : window.event;
					var from = e.relatedTarget || e.toElement;
					if (!from || from.nodeName == "HTML") {
						func(e)
					}
				});
				break;

			case "onUnload":
				window.onbeforeunload = func;
				break;

			case "onHotKeyExit":
				document.addEventListener('keydown', function(e){
					var isCtrl = e.ctrlKey || false;
					if ( isCtrl ) {
						func(e);
					}
				});	
				break;
				
			case "tabDeactivated": 
				window.onblur = function(e){
					_this.tabHasBlurred = true;
					func(e);
				};
				break;

			case "tabReactivated":
				window.onfocus = function(e){
					if ( _this.tabHasBlurred !== false ) {
						func(e);
					}
				};
				break;

		}

	};

	/**
	 * Initialises upon a new instance creation
	 * @param {object} config - The config object of hooked functions
	 * @return {void}
	 */
	this.init = function(config) {

		if (! config ) return false;

		var defaultConfig = {
			onMouseLeave: false,
			onUnload: false,
			onHotKeyExit: false,
			tabDeactivated: false,
			tabReactivated: false
		};

		for ( var key in config ) {
			if (! config.hasOwnProperty(key) ) continue;
			if ( typeof config[key] === "function" ) {
				this.translateAndHookEvent(key, config[key]);
			}
		}
	
	};

	this.init(config);

};
