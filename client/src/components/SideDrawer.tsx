import React from "react";

interface IRowData {
  keyName: string;
  subset: string;
  orgId: string;
}

interface DrawerProps {
  selectedRows: Array<IRowData>;
}

const SideDrawer: React.FC<DrawerProps> = ({ selectedRows }) => {
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
        <p>
          <strong>Value:</strong>
        </p>
        {selectedRows[0] && <button>Delete</button>}
      </div>
    );
  } else if (selectedRows?.length > 1) {
    return (
      <div className="sideDrawer">
        <h3>Bulk Select:</h3>
        <hr />
        {selectedRows
          .map(
            (node: any) =>
              `${node.keyName}` +
              `${node.subset && `#${node.subset}`}` +
              `#${node.orgId}`
          )
          .join(", ")}
      </div>
    );
  } else {
    return <div className="sideDrawer">No rows are selected</div>;
  }
};

export default SideDrawer;

// const selectedDataStringPresentation = selectedData
//   .map(
//     (node: any) =>
//       `${node.keyName}` +
//       `${node.subset && `#${node.subset}`}` +
//       `#${node.orgId}`
//   )
//   .join(", ");
// console.log(
//   `You selected the following rows: ${selectedDataStringPresentation}`
// );
