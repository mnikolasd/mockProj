/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"mp/mockProj/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});