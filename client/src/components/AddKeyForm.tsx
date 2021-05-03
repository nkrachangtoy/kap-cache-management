import React from "react";

interface IKeyValue {
  keyName: string;
  subset: string;
  orgId: string;
  valueString: string;
}

interface AddKeyFormProps {
  handleAddNewKey: () => void;
  keyValue: IKeyValue;
  setKeyValue: (keyValue: IKeyValue) => void;
}

const AddKeyForm: React.FC<AddKeyFormProps> = ({
  handleAddNewKey,
  keyValue,
  setKeyValue,
}) => {
  return (
    <div>
      <h4>Add New Key</h4>
      <hr />
      <form
        className="sideDrawer__form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("New KeyValue Pair >>", keyValue);
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
            value={keyValue.keyName}
            onChange={(e) =>
              setKeyValue({ ...keyValue, keyName: e.target.value })
            }
            required
          />
        </div>
        <div className="sideDrawer__formField">
          <label htmlFor="subset" className="sideDrawer__formLabel">
            Subset:
          </label>
          <input
            id="subset"
            type="text"
            value={keyValue.subset}
            onChange={(e) =>
              setKeyValue({ ...keyValue, subset: e.target.value })
            }
          />
        </div>
        <div className="sideDrawer__formField">
          <label htmlFor="orgId" className="sideDrawer__formLabel">
            OrgId:
          </label>
          <input
            id="orgId"
            type="text"
            value={keyValue.orgId}
            onChange={(e) =>
              setKeyValue({ ...keyValue, orgId: e.target.value })
            }
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
            value={keyValue.valueString}
            onChange={(e) =>
              setKeyValue({ ...keyValue, valueString: e.target.value })
            }
          ></textarea>
        </div>
        <button type="submit">Add New Key</button>
      </form>
    </div>
  );
};

export default AddKeyForm;
