sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("mp.mockProj.controller.Main", {
		onInit: function () {
			var oModel = this.getOwnerComponent().getModel("mockData");
			this.getView().setModel(oModel);
		},
		onCollapseAll: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapseAll();
		}
	});
});