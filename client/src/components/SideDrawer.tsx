import React from "react";
import AddKeyForm from "./AddKeyForm";
import DeleteByQueryForm from "./DeleteByQueryForm";

interface IKeyValue {
  keyName: string;
  subset: string;
  orgId: string;
  valueString: string;
}

interface DrawerProps {
  selectedRows: any;
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
  // ===== IF A SINGLE ROW IS SELECTED ===== //
  //         display the key's value
  if (selectedRows?.length === 1) {
    return (
      <div className="sideDrawer">
        <h3>Selected Key</h3>
        <hr />
        <p>
          <strong>Key Name: </strong>
          {selectedRows[0]?.keyName}
        </p>

        {selectedRows[0]?.subset && (
          <p>
            <strong>Subset: </strong>
            {selectedRows[0]?.subset}
          </p>
        )}
        <p>
          <strong>Org Id: </strong>
          {selectedRows[0]?.orgId}
        </p>
        <div>
          <strong>Value:</strong>
          <div className="sideDrawer_valueCodeBlock">
            <pre>
              <code>
                {selectedRows[0].value.data
                  ? selectedRows[0].value.data
                  : selectedRows[0].value}
              </code>
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
        <div>
          {selectedRows.map((node: any, i: number) => (
            <p key={i}>
              {`${node.keyName}` +
                `${node.subset && `#${node.subset}`}` +
                `#${node.orgId}`}
            </p>
          ))}
        </div>
        <br />
        <button onClick={handleDeleteBySelection}>Delete all</button>
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
        <AddKeyForm
          handleAddNewKey={handleAddNewKey}
          keyValue={keyValue}
          setKeyValue={setKeyValue}
        />
      </div>
    );
  }
};

export default SideDrawer;
