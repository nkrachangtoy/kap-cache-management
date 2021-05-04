import Grid from "./Grid";
import Pagination from "./Pagination";
import Search from "./Search";
import SideDrawer from "./SideDrawer";

// Material UI
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Drawer from "@material-ui/core/Drawer";
import Modal from "@material-ui/core/Modal";

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
  setKeyValue: (keyValue: IKeyValue) => void;
  deleteQuery: string;
  setDeleteQuery: (query: string) => void;
  handlePageNext: () => void;
  handlePageBack: () => void;
  handleSearch: (query: string) => void;
  handleGetSelectedRows: (row: Array<object>) => void;
  handleGetValue: (key: string) => void;
  handleDeleteByQuery: () => void;
  handleDeleteBySelection: () => void;
  handleAddNewKey: () => void;
  handleGetAllKeys: () => void;
  handleReset: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  toggleDrawer: () => void;
  handleCloseDrawer: () => void;
  modalBody: any;
}

const Main: React.FC<MainProps> = ({
  open,
  rowData,
  pageNum,
  openDrawer,
  selectedRows,
  keyValue,
  setKeyValue,
  deleteQuery,
  setDeleteQuery,
  handlePageNext,
  handlePageBack,
  handleSearch,
  handleGetSelectedRows,
  handleGetValue,
  handleDeleteByQuery,
  handleDeleteBySelection,
  handleAddNewKey,
  handleGetAllKeys,
  handleReset,
  handleOpen,
  handleClose,
  toggleDrawer,
  handleCloseDrawer,
  modalBody,
}) => {
  return (
    <div className="mainContainer">
      <div className="mainContainer__toolbar">
        <span className="mainContainer__header">Results</span>
        <div className="mainContainer__actions">
          <Tooltip title="Create" placement="top">
            <button className="mainContainer__button" onClick={handleOpen}>
              <AddIcon />
            </button>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <button className="mainContainer__button">
              <DeleteOutlineIcon />
            </button>
          </Tooltip>
          <Tooltip title="Filter" placement="top">
            <button className="mainContainer__button" onClick={toggleDrawer}>
              <FilterListIcon />
            </button>
          </Tooltip>
          <Search handleSearch={handleSearch} handleReset={handleReset} />
        </div>
      </div>
      <div className="mainContainer__contentWrapper">
        <div className="mainContainer__gridWrapper">
          <Grid
            rowData={rowData}
            handleGetSelectedRows={handleGetSelectedRows}
          />
          <Pagination
            pageNum={pageNum}
            handlePageNext={handlePageNext}
            handlePageBack={handlePageBack}
            rowData={rowData}
          />
        </div>
        <Drawer open={openDrawer} onClose={handleCloseDrawer}>
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
      </div>
      <Modal open={open} onClose={handleClose}>
        {modalBody}
      </Modal>
    </div>
  );
};

export default Main;
