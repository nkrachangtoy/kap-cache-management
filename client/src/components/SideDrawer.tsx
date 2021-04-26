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
  const handleDelete = () => {};

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
        <p>
          {selectedRows
            .map(
              (node: any) =>
                `${node.keyName}` +
                `${node.subset && `#${node.subset}`}` +
                `#${node.orgId}`
            )
            .join(", ")}
        </p>
        <br />
        <button>Delete all</button>
      </div>
    );
  } else {
    return (
      <div className="sideDrawer">
        <h3>Konnect Redis Cache</h3>
        <hr />
        <form onSubmit={handleDelete}>
          <input type="text" placeholder="Delete by Redis pattern" />
          <button type="submit">Bulk Delete</button>
          <p className="sideDrawer__warning">
            Warning: This action cannot be undone.
          </p>
        </form>
      </div>
    );
  }
};

export default SideDrawer;

// const selectedDataStringPresentation = selectedData
//   .map(
//     (node: any) =>
//       `${node.keyName}`
//       `${node.subset && `#${node.subset}`}` +
//       `#${node.orgId}`
//   )
//   .join(", ");
// console.log(
//   `You selected the following rows: ${selectedDataStringPresentation}`
// );
