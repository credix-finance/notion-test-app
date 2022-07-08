import React, {FC, useState, useEffect} from 'react';
import {Button} from "@material-ui/core";


import "./style.scss";

const KeyGenerator: FC = () => {
  const [pubKey, setPubkey] = useState("instert public key");
  const [records, setRecords] = useState([{}]);
  const [recordRow, setRecordRow] = useState([<p>"no data yet, please input a public key"</p>]); 

  const handleChange = (e) => {
    setPubkey(e.target.value); 
  };

  useEffect(() => {
    if (records) {
      let pubKeyMap = {};
      for (var i = 0; i < records.length; i++) {
        pubKeyMap[records[i]["Pubkey"]] = records[i]
      }
      if (pubKeyMap[pubKey]) {
        let recordRowNew = [];
        for (const [key, value] of Object.entries(pubKeyMap[pubKey])) {
          let rowNewElement = (
            <div>
              <h3>{key}</h3>
              <p>{value}</p>
            </div>
          );
          recordRowNew.push(rowNewElement);
        }
        setRecordRow(recordRowNew)
      } else {
        setRecordRow([<p>"Record not found"</p>])
      }
    }
  }, [records]); // Only re-run the effect if count changes

  const handleSubmit = async () => {
    const notionPageResponse = await fetch('https://notion-cloudflare-worker.credix.workers.dev/v1/table/6155ffcb4873495d9c0b49f8ca6a8781')
    const notionPageData = await notionPageResponse.json()
    setRecords(notionPageData); 
  };

  return (
    <div className="airdrop-container">
      <h3>Notion API query demonstration 🎉</h3>
      <div className="airdrop-wrapper">
        <h3>Public Key</h3>
        <p>Enter the public key of the borrower</p>
        <input
          name="pubKey"
          type="text"
          placeholder={pubKey}
          onChange={handleChange}
          className="airdrop-pk-input stake-input borrower-pk credix-button MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary balance-button"
        />
        <Button
            variant="contained"
            className="stake-submit MuiButton-containedPrimary balance-button credix-button sol-airdrop"
            onClick={handleSubmit}
        >
         GET INFO
        </Button>
        {recordRow}
       </div>
    </div>
  );
};

export default KeyGenerator;
