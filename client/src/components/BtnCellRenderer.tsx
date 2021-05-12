import React, { useState } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";

const BASE_URL = "https://konnect-redis.azurewebsites.net/api/keys";


const BtnCellRenderer: React.FC = (params) => {
    const [keyValue, setKeyValue] = useState<string>();



    const getKeyValue = async (keyString: any) => {
        try {
            const replaced = keyString.replace(/[#]/g, "%23");
            const response = await axios.get(`${BASE_URL}/value?KeyName=${replaced}`);
            return response.data.data;
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    };

    const handleBtnClicked = async () => {
        const keyString = Object.values(params["data"]).join('#');
        const data = await getKeyValue(keyString);
        setKeyValue(data);
    };

    return (
        <div className="keyValue">
            <Tooltip title={`${keyValue}`} placement="top">
                <a onMouseEnter={handleBtnClicked} className="keyValue__button"><InfoIcon /></a>
            </Tooltip>
        </div>
        );
}

export default BtnCellRenderer;