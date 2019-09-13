/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/* global __fbBatchedBridge, self, importScripts, postMessage, onmessage: true */

/* eslint no-unused-vars: 0 */
'use strict';
//const consoleLog = console.log
//const consoleError = console.error
//const consoleInfo = console.info
//const consoleWarn = console.warn
//const Console = {
//	post(data){
//		try{ postMessage({data}) }
//		catch(error){}
//
//	},
//	log(){
//
//		if(Console.active) Console.post({
//			variant: 'console',
//			type: 'log',
//			input: Array.from(arguments)
//		})
//
//		return consoleLog.apply(console, arguments)
//	},
//	error(){
//
//		if(Console.active) Console.post({
//			variant: 'console',
//			type: 'error',
//			input: Array.from(arguments)
//		})
//
//		return consoleError.apply(console, arguments)
//	},
//	info(){
//
//		if(Console.active) Console.post({
//			variant: 'console',
//			type: 'info',
//			input: Array.from(arguments)
//		})
//
//		return consoleInfo.apply(console, arguments)
//	},
//	warn(){
//
//		if(Console.active) Console.post({
//			variant: 'console',
//			type: 'warn',
//			input: Array.from(arguments)
//		})
//
//		return consoleWarn.apply(console, arguments)
//	}
//}
//
//console.log = Console.log
//console.error = Console.error
//console.info = Console.info
//console.warn = Console.warn

onmessage = function(){
	var visibilityState;

	var showVisibilityWarning = function(){
		var hasWarned = false;
		return function(){
			// Wait until `YellowBox` gets initialized before displaying the warning.
			if(hasWarned || console.warn.toString().includes('[native code]')){
				return;
			}

			hasWarned = true;
			console.warn('Remote debugger is in a background tab which may cause apps to ' + 'perform slowly. Fix this by foregrounding the tab (or opening it in ' + 'a separate window).');
		};
	}();

	var messageHandlers = {
		executeApplicationScript: function(message, sendReply){
			for(var key in message.inject){
				self[key] = JSON.parse(message.inject[key]);
			}

			var error;

			try{
				importScripts(message.url);
			}
			catch(err){
				error = err.message;
			}

			sendReply(null
				/* result */
				, error);
		},
		setDebuggerVisibility: function(message){
			visibilityState = message.visibilityState;
		}
	};
	return function(message){

		if(visibilityState === 'hidden'){
			showVisibilityWarning();
		}

		var object = message.data;

		var sendReply = function(result, error){
			postMessage({
				replyID: object.id,
				result: result,
				error: error
			});
		};

		var handler = messageHandlers[object.method];

		if(handler){
			// Special cased handlers
			handler(object, sendReply);
		}
		else{
			// Other methods get called on the bridge
			var returnValue = [[], [], [], 0];
			var error;
			let input = [{object}]

			try{
				if(typeof __fbBatchedBridge === 'object'){
					returnValue = __fbBatchedBridge[object.method].apply(null, object.arguments);
				}
				else{
					error = 'Failed to call function, __fbBatchedBridge is undefined';
				}
			}
			catch(err){
				error = err.message;
				input.push({error:{message:err.message,stack:err.stack}})
			}
			finally{
				input.push({value:returnValue})

				//postMessage({data:{type:error ? 'error':'log',variant:'returnValue',input}})
				sendReply(JSON.stringify(returnValue), error);
			}
		}
	};
}();