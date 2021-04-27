import React from "react";

interface IRowData {
  keyName: string;
  subset: string;
  orgId: string;
  value?: any;
}

interface DrawerProps {
  selectedRows: Array<IRowData>;
  handleDeleteByQuery: () => void;
  setDeleteQuery: (query: string) => void;
}

const SideDrawer: React.FC<DrawerProps> = ({
  selectedRows,
  handleDeleteByQuery,
  setDeleteQuery,
}) => {
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
          <div className="sideDrawer_valueCodeBlock">
            <pre>
              <code>{selectedRows[0].value?.data}</code>
            </pre>
          </div>
        </p>
        {selectedRows[0] && <button>Delete</button>}
      </div>
    );
  } else if (selectedRows?.length > 1) {
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
        <button>Delete all</button>
      </div>
    );
  } else {
    return (
      <div className="sideDrawer">
        <h3>Konnect Redis Cache</h3>
        <hr />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleDeleteByQuery();
          }}
        >
          <input
            type="text"
            placeholder="Delete by Redis pattern"
            onChange={(e) => setDeleteQuery(e.target.value)}
          />
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
