define([
	"dcl",
	"decor/Stateful"
], function (
	dcl,
	Stateful) {
	
	return dcl([Stateful], {
		model: null,
		canExecute: null,
		label: null,
		
		execute: function () {
		}		
	});
})
