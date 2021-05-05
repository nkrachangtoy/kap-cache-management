import React, { useState } from "react";
import AddKeyForm from "./AddKeyForm";
import DeleteByQueryForm from "./DeleteByQueryForm";

interface IKeyValue {
  keyName: string;
  valueString: string;
}

interface DrawerProps {
  selectedRows: Array<string>;
  handleDeleteByQuery: () => void;
  handleAddNewKey: () => void;
  keyValue: IKeyValue;
  setKeyValue: (keyValue: IKeyValue) => void;
  deleteQuery: string;
  setDeleteQuery: (query: string) => void;
  handleDeleteBySelection: () => void;
}

const SideDrawer: React.FC<DrawerProps> = ({
  selectedRows,
  handleDeleteByQuery,
  handleAddNewKey,
  keyValue,
  setKeyValue,
  deleteQuery,
  setDeleteQuery,
  handleDeleteBySelection,
}) => {
  const [confirmDelete, showConfirmDelete] = useState<boolean>(false);

  // ===== IF A SINGLE ROW IS SELECTED ===== //
  //         display the key's value
  if (selectedRows?.length === 1) {
    return (
      <div className="sideDrawer">
        <h3>Selected Key</h3>
        <hr />
        <p>
          <strong>Key Name: </strong>
          {selectedRows[0]}
        </p>

        <div>
          <strong>Value:</strong>
          <div className="sideDrawer_valueCodeBlock">
            <pre>
              <code>{keyValue.valueString}</code>
            </pre>
          </div>
        </div>
        {selectedRows[0] && (
          <button onClick={handleDeleteBySelection}>Delete</button>
        )}
      </div>
    );
  } else if (selectedRows?.length > 1) {
    // ===== IF MULTIPLE ROWS ARE SELECTED  ===== //
    //        display & allow bulk delete
    return (
      <div className="sideDrawer">
        <div className="sideDrawer__heading">
          <h3>Bulk Select:</h3> {selectedRows.length} items selected
        </div>
        <hr />
        <div className="sideDrawer__listItems">
          {selectedRows.map((key: any, i: number) => (
            <p key={i}>{key}</p>
          ))}
        </div>
        <br />
        {!confirmDelete && (
          <div className="sideDrawer__buttonBlock">
            <button
              onClick={(e) => {
                e.preventDefault();
                showConfirmDelete(!confirmDelete);
              }}
              className="sideDrawer__button-delete"
            >
              Delete all
            </button>
          </div>
        )}

        {confirmDelete && (
          <div>
            <p style={{ color: "red" }}>
              This action cannot be undone. Please confirm this batch delete.
            </p>
            <div className="sideDrawer__buttonBlock">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  showConfirmDelete(!confirmDelete);
                }}
                className="sideDrawer__button-cancel"
              >
                Cancel
              </button>
              <button
                className="sideDrawer__button-delete"
                onClick={handleDeleteBySelection}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    // ===== IF NO ROWS ARE SELECTED  ===== //
    // allow delete by query & post new key
    return (
      <div className="sideDrawer">
        <h3>Konnect Redis Cache</h3>
        <hr />
        <DeleteByQueryForm
          handleDeleteByQuery={handleDeleteByQuery}
          deleteQuery={deleteQuery}
          setDeleteQuery={setDeleteQuery}
        />
      </div>
    );
  }
};

export default SideDrawer;
