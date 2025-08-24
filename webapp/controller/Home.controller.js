sap.ui.define(
  [
    "sap/ui/demo/todo/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
  ],
  (BaseController, JSONModel, Filter, FilterOperator, MessageToast) => {
    "use strict";

    return BaseController.extend("sap.ui.demo.todo.controller.TaskList", {
      onInit() {
        const oData = {
          tasks: [],
        };

        this.getView().setModel(new JSONModel(oData));
      },

      onAddTask() {
        const taskInput = this.getView().byId("taskInput");
        const inputValue = taskInput.getValue()?.trim();
        const sEmptyTaskMsg = this.getView()
          .getModel("i18n")
          .getResourceBundle()
          .getText("emptyTaskMsg");

        if (!inputValue) {
          this.handleMessageToast(sEmptyTaskMsg);
          return;
        }

        const oModel = this.getView().getModel();
        const oData = oModel.getData();

        oData.tasks.push({
          title: inputValue,
          isCompleted: false,
          id: Math.floor(Math.random() * 100000000),
        });

        oModel.setData(oData);
        taskInput.setValue("");
      },

      onTaskCheck(oEvent) {
        const bSelected = oEvent.getParameter("selected");
        const sTaskId = oEvent
          .getSource()
          .getBindingContext()
          .getProperty("id");

        const aTasks = this.getView().getModel().getProperty("/tasks");
        const aTaskWithUpdatedState = aTasks.map((task) => {
          return task.id === sTaskId
            ? { ...task, isCompleted: bSelected }
            : { ...task };
        });

        this.getView().getModel().setProperty("/tasks", aTaskWithUpdatedState);

        const oCheckBox = oEvent.getSource();
        const oHbox = oCheckBox.getParent();

        const oText = oHbox.getItems()[1];
        const oContext = oCheckBox.getBindingContext();

        oContext.getProperty("isCompleted")
          ? oText.addStyleClass("task-completed")
          : oText.removeStyleClass("task-completed");
      },

      onDeleteTaskList(oEvent) {
        const selectedListId = oEvent
          .getParameter("listItem")
          .getBindingContext()
          .getProperty("id");

        const sTaskMessage = oEvent
          .getParameter("listItem")
          .getBindingContext()
          .getProperty("title");

        const aTasks = this.getView().getModel().getProperty("/tasks");

        const aUpdatedTasksList = aTasks.filter(
          (task) => task.id !== selectedListId
        );

        this.getView().getModel().setProperty("/tasks", aUpdatedTasksList);

        // Show Deleted task in the Message Toast
        const sToastMsgDesc =
          aUpdatedTasksList.length > 0
            ? `Task: ${sTaskMessage} is deleted`
            : "All Tasks are deleted now!";
        this.handleMessageToast(sToastMsgDesc);
      },

      handleMessageToast(message) {
        MessageToast.show(message);
      },

      onSearch(oEvent) {
        const sCurrentInput = oEvent.getSource().getProperty("value")?.trim();
        const oList = this.byId("taskList");
        const oBinding = oList.getBinding("items");

        // If no input is provided, remove the filter
        if (!sCurrentInput) {
          oBinding.filter([]);
        }

        const aFilters = [
          new Filter("title", FilterOperator.Contains, sCurrentInput),
        ];

        oBinding.filter(aFilters);
      },
    });
  }
);
