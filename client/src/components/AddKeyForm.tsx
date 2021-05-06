import React, { useState, useEffect, useRef } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import Snackbar from '@material-ui/core/Snackbar';
// CodeMirror //
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';



interface IKeyValue {
  keyName: string;
  valueString: string;
}

interface AddKeyFormProps {
  handleAddNewKey: () => void;
  newKey: IKeyValue;
  setNewKey: (keyValue: IKeyValue) => void;
  handleClose: () => void;
}


const AddKeyForm: React.FC<AddKeyFormProps> = ({
  handleAddNewKey,
  newKey,
  setNewKey,
  handleClose,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const timer = useRef<number>();


  const handleButtonClick = () => {
    handleAddNewKey();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="addKeyForm">
      <span className="addKeyForm__title">Add New Key</span>
      <form
        className="addKeyForm__form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("New KeyValue Pair >>", newKey);
        }}
      >
        <div className="addKeyForm__inputContainer">
          <label htmlFor="keyName" className="addKeyForm__formLabel">
            Key Name:
          </label>
          <input
            id="keyName"
            className="addKeyForm__inputForm"
            type="text"
            value={newKey.keyName}
            onChange={(e) => setNewKey({ ...newKey, keyName: e.target.value })}
            required
          />
        </div>
        <div className="addKeyForm__inputContainer">
          <label htmlFor="value" className="addKeyForm__formLabel">
            Value:
          </label>
          <textarea
            id="value"
            className="addKeyForm__textArea"
            rows={10}
            // rows={4}
            required
            value={newKey.valueString}
            onChange={(e) =>
              setNewKey({ ...newKey, valueString: e.target.value })
            }
          ></textarea>
        </div>
        <div className="addKeyForm__buttonsContainer">
          <div className="addKeyForm__buttonWrapper">
            <button type="submit" className="addKeyForm__button addKeyForm__button--submit" onClick={handleButtonClick} disabled={loading}>Submit</button>
            { success ? <CheckIcon style={{fontSize: "16px"}} className="addKeyForm__checkIcon"/> : <></>}
            { loading && <CircularProgress size={14} style={{color: "white"}} className="addKeyForm__spinner"/>}
          </div>  
          <button type="submit" className="addKeyForm__button addKeyForm__button--cancel" onClick={handleClose}>Cancel</button>
        </div>
      </form>
      <Snackbar open={success} autoHideDuration={1500} onClose={handleClose} message="Successfully added new key!" anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}/>
    </div>
  );
};

export default AddKeyForm;
