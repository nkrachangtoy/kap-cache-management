import Grid from "./Grid";
import Pagination from "./Pagination";
import SideDrawer from "./SideDrawer";


// Components
import Drawer from "@material-ui/core/Drawer";
import Modal from "@material-ui/core/Modal";
import Toolbar from "./Toolbar";
import Patterns from "./Patterns";


interface IRowData {
  keys: Array<IKey>;
  totalKeyCount: number;
  pageSize: number;
  totalPages: number;
}

interface IKey {
  keyName: string;
  subset: string;
  orgId: string;
  value?: object;
}

interface IKeyValue {
  keyName: string;
  valueString: string;
}

interface MainProps {
  open: boolean;
  rowData: IRowData | object;
  pageNum: number;
  openDrawer: boolean;
  selectedRows: Array<string>;
  keyValue: IKeyValue;
  deleteQuery: string;
  modalBody: any;
  btnCellRenderer: any;
  openPatterns: boolean;
  setOpenPatterns: (open: boolean) => void;
  setKeyValue: (keyValue: IKeyValue) => void;
  setDeleteQuery: (query: string) => void;
  handlePageNext: () => void;
  handlePageBack: () => void;
  handleSearch: (query: string) => void;
  handleGetSelectedRows: (row: Array<object>) => void;
  handleGetValue: (key: string) => void;
  handleDeleteByQuery: () => void;
  handleDeleteBySelection: () => void;
  handleAddNewKey: () => void;
  handleReset: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  toggleDrawer: () => void;
}

const Main: React.FC<MainProps> = ({
  open,
  rowData,
  pageNum,
  openDrawer,
  selectedRows,
  keyValue,
  deleteQuery,
  modalBody,
  btnCellRenderer,
  openPatterns,
  setOpenPatterns,
  setKeyValue,
  setDeleteQuery,
  handlePageNext,
  handlePageBack,
  handleSearch,
  handleGetSelectedRows,
  handleGetValue,
  handleDeleteByQuery,
  handleDeleteBySelection,
  handleAddNewKey,
  handleReset,
  handleOpen,
  handleClose,
  toggleDrawer,
}) => {
  return (
    <div className="mainContainer">
      <Toolbar
        handleOpen={handleOpen}
        toggleDrawer={toggleDrawer}
        handleSearch={handleSearch}
        handleReset={handleReset}
        numSelected={selectedRows.length}
        setOpenPatterns={setOpenPatterns}
      />
      <div className="mainContainer__contentWrapper">
        <div className="mainContainer__gridWrapper">
          <Grid
            rowData={rowData}
            handleGetSelectedRows={handleGetSelectedRows}
            handleGetValue={handleGetValue}
            btnCellRenderer={btnCellRenderer}
            open={open}
            onClose={handleClose}
            keyValue={keyValue}
          />
          <Pagination
            pageNum={pageNum}
            handlePageNext={handlePageNext}
            handlePageBack={handlePageBack}
            rowData={rowData}
          />
        </div>
        <Drawer open={openDrawer} onClose={toggleDrawer}>
          <SideDrawer
            selectedRows={selectedRows}
            handleDeleteByQuery={handleDeleteByQuery}
            handleAddNewKey={handleAddNewKey}
            keyValue={keyValue}
            setKeyValue={setKeyValue}
            deleteQuery={deleteQuery}
            setDeleteQuery={setDeleteQuery}
            handleDeleteBySelection={handleDeleteBySelection}
          />
        </Drawer>
        <Drawer open={openPatterns} onClose={() => setOpenPatterns(false)}>
          <Patterns />
        </Drawer>
      </div>
      <Modal open={open} onClose={handleClose}>
        {modalBody}
      </Modal>
    </div>
  );
};

export default Main;
