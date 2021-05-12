import { useEffect, useState } from "react";
import Main from "../components/Main";
import AddKeyForm from "../components/AddKeyForm";
import {
  deleteKeyBySelection,
  getAllKeys,
  getKeyValue,
  postNewKeyValue,
  searchKeys,
  getPage,
  deleteKeyByQuery,
} from "../network/network";

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

const MainCtrl = () => {
  const [rowData, setRowData] = useState<IRowData | object>({});
  const [pageNum, setPageNum] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<Array<string>>([]);
  const [deleteQuery, setDeleteQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openPatterns, setOpenPatterns] = useState(false);
  const [keyValue, setKeyValue] = useState<IKeyValue>({
    keyName: "",
    valueString: "",
  });
  const [newKey, setNewKey] = useState<IKeyValue>({
    keyName: "",
    valueString: "",
  });

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
    row?.forEach((key: object) => {
      const joinedKey = Object.values(key).join("#");
      keys.push(joinedKey);
    });
    //console.log("concantenated keys array>>", keys);
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
    setOpenDrawer(false);
  };

  const handleDeleteBySelection = async () => {
    console.log("selected Rows for deletion", selectedRows);
    await deleteKeyBySelection(selectedRows);
    await handleGetAllKeys();
    setSelectedRows([]);
    setOpenDrawer(false);
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

  useEffect(() => {
    (async () => {
      await handleGetAllKeys();
    })();
  }, []);

  return (
    <Main
      open={open}
      rowData={rowData}
      pageNum={pageNum}
      openDrawer={openDrawer}
      selectedRows={selectedRows}
      deleteQuery={deleteQuery}
      keyValue={keyValue}
      modalBody={modalBody}
      openPatterns={openPatterns}
      setOpenPatterns={setOpenPatterns}
      setKeyValue={setKeyValue}
      setDeleteQuery={setDeleteQuery}
      handlePageNext={handlePageNext}
      handlePageBack={handlePageBack}
      handleSearch={handleSearch}
      handleGetSelectedRows={handleGetSelectedRows}
      handleGetValue={handleGetValue}
      handleDeleteByQuery={handleDeleteByQuery}
      handleDeleteBySelection={handleDeleteBySelection}
      handleAddNewKey={handleAddNewKey}
      handleReset={handleReset}
      handleOpen={handleOpen}
      handleClose={handleClose}
      toggleDrawer={toggleDrawer}
    />
  );
};

export default MainCtrl;
