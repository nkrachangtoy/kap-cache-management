import React from "react";

interface IRowData {
  keyName: string;
  subset: string;
  orgId: string;
}

interface DrawerProps {
  selectedRow: IRowData | null;
}

const SideDrawer: React.FC<DrawerProps> = ({ selectedRow }) => {
  return (
    <div className="sideDrawer">
      <h3>Selected Key</h3>
      <hr />
      <p>
        <strong>Key Name: </strong>
        {selectedRow?.keyName}
      </p>

      {selectedRow?.subset && (
        <p>
          <strong>Subset: </strong>
          {selectedRow?.subset}
        </p>
      )}
      <p>
        <strong>Org Id: </strong>
        {selectedRow?.orgId}
      </p>
      <p>
        <strong>Value:</strong>
      </p>
      {selectedRow && <button>Delete</button>}
    </div>
  );
};

export default SideDrawer;
