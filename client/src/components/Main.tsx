import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import Pagination from "./Pagination";
import {
  deleteKeyBySelection,
  getAllKeys,
  getKeyValue,
  postNewKeyValue,
  searchKeys,
} from "../network/network";
import Search from "./Search";
import { getPage } from "../network/network";
import SideDrawer from "./SideDrawer";
import { deleteKeyByQuery } from "./../network/network";
import AddKeyForm from "./AddKeyForm";
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

const Main = () => {
  const [rowData, setRowData] = useState<IRowData | object>({});
  const [pageNum, setPageNum] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<Array<string>>([]);
  const [deleteQuery, setDeleteQuery] = useState<string>("");
  const [keyValue, setKeyValue] = useState<IKeyValue>({
    keyName: "",
    valueString: "",
  });
  const [newKey, setNewKey] = useState<IKeyValue>({
    keyName: "",
    valueString: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handlePageNext = async () => {
    const data = await getPage(pageNum + 1);
    setPageNum(pageNum + 1);
    setRowData(data);
  };

  const handlePageBack = async () => {
    if (pageNum !== 1) {
      setPageNum(pageNum - 1);
      const data = await getPage(pageNum - 1);
      setRowData(data);
    }
  };

  const handleSearch = async (query: string) => {
    const data = await searchKeys(query);
    setRowData(data);
    setPageNum(1);
  };

  const handleGetSelectedRows = async (row: Array<object>) => {
    //Need to concantenate the fields before sending API call
    let keys: Array<string> = [];
    row?.map((key: object) => {
      const joinedKey = Object.values(key).join("#");
      keys.push(joinedKey);
    });
    console.log("concantenated keys array>>", keys);
    setSelectedRows(keys);

    if (row?.length === 1) {
      await handleGetValue(keys[0]);
    }
  };

  //this can be called elsewhere later on
  const handleGetValue = async (key: string) => {
    const data = await getKeyValue(key);
    const keyValuePair = {
      keyName: key,
      valueString: data,
    };
    setKeyValue(keyValuePair);
  };

  const handleDeleteByQuery = async () => {
    const data = await deleteKeyByQuery(deleteQuery);
    await handleGetAllKeys();
    console.log(`delete query: ${deleteQuery}, result:`, data);
  };

  const handleDeleteBySelection = async () => {
    console.log("selected Rows for deletion", selectedRows);
    await deleteKeyBySelection(selectedRows);
    await handleGetAllKeys();
  };

  const handleAddNewKey = async () => {
    const data = await postNewKeyValue(newKey);
    data &&
      setNewKey({
        keyName: "",
        valueString: "",
      });
    await handleGetAllKeys();
  };

  const handleGetAllKeys = async () => {
    const result = await getAllKeys();
    setRowData(result);
    console.log("ROW DATA", result);
  };

  const handleReset = async () => {
    await handleGetAllKeys();
    setPageNum(1);
    setSelectedRows([]); // this doesnt update the grid
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    (async () => {
      await handleGetAllKeys();
    })();
  }, []);

  const modalBody = (
    <div className="modal">
      <AddKeyForm
        handleAddNewKey={handleAddNewKey}
        newKey={newKey}
        setNewKey={setNewKey}
        handleClose={handleClose}
      />
    </div>
  );

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
