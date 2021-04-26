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
      <h3>Selected Key:</h3>
      <p>Key Name: {selectedRow?.keyName}</p>
      <p>{selectedRow?.subset && `Subset: ${selectedRow.subset}`}</p>
      <p>Org Id:{selectedRow?.orgId}</p>
    </div>
  );
};

export default SideDrawer;
