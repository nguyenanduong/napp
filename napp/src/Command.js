define([
	"dojo/_base/declare",
	"dojo/Stateful"
], function (
	declare,
	Stateful) {
	
	return declare([Stateful], {
		model: null,
		canExecute: null,
		label: null,
		
		execute: function () {

		}		
	});
})