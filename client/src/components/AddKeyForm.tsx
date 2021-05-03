import React, { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';


interface IKeyValue {
  keyName: string;
  valueString: string;
}

interface AddKeyFormProps {
  handleAddNewKey: () => void;
  newKey: IKeyValue;
  setNewKey: (keyValue: IKeyValue) => void;
}

const AddKeyForm: React.FC<AddKeyFormProps> = ({
  handleAddNewKey,
  newKey,
  setNewKey,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);



  // const handleButtonClick = () => {
  //   if (!loading) {
  //     setSuccess(false);
  //     setLoading(true);
  //     timer.current = window.setTimeout(() => {
  //       setSuccess(true);
  //       setLoading(false);
  //     }, 2000);
  //   }
  // };

  return (
    <div>
      <h4>Add New Key</h4>
      <form
        className="sideDrawer__form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("New KeyValue Pair >>", newKey);
          handleAddNewKey();
        }}
      >
        <div className="sideDrawer__formField">
          <label htmlFor="keyName" className="sideDrawer__formLabel">
            Key Name:
          </label>
          <input
            id="keyName"
            type="text"
            value={newKey.keyName}
            onChange={(e) => setNewKey({ ...newKey, keyName: e.target.value })}
            required
          />
        </div>
        <div className="sideDrawer__formField">
          <label htmlFor="value" className="sideDrawer__formLabel">
            Value:
          </label>
          <textarea
            id="value"
            rows={4}
            required
            value={newKey.valueString}
            onChange={(e) =>
              setNewKey({ ...newKey, valueString: e.target.value })
            }
          ></textarea>
        </div>
          <button type="submit"  disabled={loading}>Submit</button>
      </form>
    </div>
  );
};

export default AddKeyForm;
