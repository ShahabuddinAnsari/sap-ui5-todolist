sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
  ],
  (Controller, History, UIComponent) => {
    "use strict";

    return Controller.extend("sap.ui.demo.todo.controller.BaseController", {
      getRouter() {
        return UIComponent.getRouterFor(this);
      },
    });
  }
);
