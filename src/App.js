import * as React from "react";
import "./App.css";
import { defaultData } from "./data";
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RangesDirective,
} from "@syncfusion/ej2-react-spreadsheet";
import {
  RangeDirective,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-spreadsheet";

import { DataManager } from "@syncfusion/ej2-data";

import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-grids/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-spreadsheet/styles/material.css";
// import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";

export default class App extends React.Component {
  saveComplete(args) {
    console.log(args.blobData);
  }

  beforeSave(args) {
    args.needBlobData = true;
  }
  created(args) {
    fetch(
      "https://js.syncfusion.com/demos/ejservices/data/Spreadsheet/LargeData.xlsx"
    ) // fetch the remote url
      .then((response) => {
        response.blob().then((fileBlob) => {
          var file = new File([fileBlob], "Sample.xlsx"); //convert the blob into file
          this.spreadsheet.open({ file: file }); // open the file into Spreadsheet
          this.spreadsheet.addFileMenuItems(
            [
              {
                text: "Save",
                id: "saveForExcel",
                iconCss: "e-menu-icon e-save e-icons",
              },
            ],
            "Save As",
            false,
            false
          );
        });
      });
  }
  fileMenuBeforeOpen() {
    this.spreadsheet.enableFileMenuItems(["Save As"], false, false);
    const saveButton = document.getElementById("saveForExcel");
    saveButton.addEventListener("click", () => {
      this.spreadsheet.save();
    });
    // To enable / disable file menu items.
    //File menu Items that needs to be enabled / disabled, set `true` / `false` to enable / disable the menu items, set `true` if the   given file menu items `text` is a unique id.
  }
  // fileMenuItemSelect() {}

  render() {
    return (
      <SpreadsheetComponent
        ref={(ssObj) => {
          this.spreadsheet = ssObj;
        }}
        openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
        created={this.created.bind(this)}
        fileMenuBeforeOpen={this.fileMenuBeforeOpen.bind(this)}
        allowSave={true}
        saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
        beforeSave={this.beforeSave.bind(this)}
        saveComplete={this.saveComplete.bind(this)}
        // fileMenuItemSelect={this.fileMenuItemSelect.bind(this)}
      ></SpreadsheetComponent>
    );
  }
}
