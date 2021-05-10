import React from 'react';

interface IKeyValue {
  keyName: string;
  valueString: string;
}

interface KeyValueModalProp {
    selectedRows: Array<string>;
    keyValue: IKeyValue;
    handleClose: () => void;
}

const KeyValueModal: React.FC<KeyValueModalProp> = () => {
        return (
            <div>
                
            </div>
        );
}

export default KeyValueModal;