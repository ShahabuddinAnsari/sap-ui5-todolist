sap.ui.define(["sap/ui/core/UIComponent"], (UIComponent) => {
  "use strict";

  return UIComponent.extend("sap.ui.demo.todo.Component", {
    metadata: {
      interfaces: ["sap.ui.core.IAsyncContentCreation"],
      manifest: "json",
    },
    init() {
      // Call the base component's init function
      console.log("component initialized");
      UIComponent.prototype.init.apply(this, arguments);

      this.getRouter().initialize();
    },
  });
});
