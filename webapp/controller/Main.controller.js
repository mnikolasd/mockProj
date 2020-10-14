sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("mp.mockProj.controller.Main", {
		onInit: function () {
			var oModel = this.getOwnerComponent().getModel("mockdata");
			this.getView().setModel(oModel);
		},
		onCollapseAll: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapseAll();
		},
		onLinkPress: function(oEvent) {
			var oSelectedItem = oEvent.getSource().getBindingContext();
        	var sPath = oSelectedItem.getPath();
        	var oClothingDetailPanel = this.byId("clothingDetailsPanel");
        	oClothingDetailPanel.bindElement({ path: sPath, model: "mockdata" });
    	},
    	onApiCall: function() {
    		var sURL = "https://reqres.in/api/users/1";
			$.ajax({
				type: "GET",
				url: sURL,
				contentType: "application/json",
				dataType: "json",
				success: this.successREST.bind(this),
				error: [this.errorREST, this]
			});
    	},
    	successREST: function(data) {
    		var rModel = new JSONModel();
    		rModel.setData({
    			"newData": data
    		});
    		var oValue = rModel.getProperty("/newData/data/email");
    		var oInput = this.getView().byId("sal");
    		oInput.setValue(oValue);
    	},
    	errorREST: function(error) {
    		console.log(error);
    		debugger;
    	},
    	onNavCall: function(oEvent) {
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation"); 
			oCrossAppNavigator.isIntentSupported(["mockProj2-Display"])
				.done(function(aResponses) {

				})
				.fail(function() {
					// new sap.m.MessageToast("Provide corresponding intent to navigate");
					console.log("Nav has failed");
				});
				
			var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
				target: {
					semanticObject: "mockProj2",
					action: "Display"
				},
				params : {
            		"name": this.getView().byId("inpName").getValue(),
					"amount": this.getView().byId("inpAmount").getValue(),
					"currency": this.getView().byId("inpCurrency").getValue(),
					"size": this.getView().byId("inpSize").getValue(),
					"salary": this.getView().byId("sal").getValue(),
					"oEnable": this.getView().byId("cbEnable").getSelected()
        		}
			})) || ""; 
			
			var url = window.location.href.split('#')[0] + hash; 
			sap.m.URLHelper.redirect(url, true); 
		}
	});
});