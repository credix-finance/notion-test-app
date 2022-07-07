import React, {FC, useState, useEffect} from 'react';
import {Button} from "@material-ui/core";


import "./style.scss";

const KeyGenerator: FC = () => {
  const [pubKey, setPubkey] = useState("a");
  const [records, setRecords] = useState([{"Pubkey": "a", "Name": "b", "Description": 'c'}])
  const [name, setName] = useState("borrower name");
  const [description, setDescription] = useState("borrower description");


  const handleChange = (e) => {
    setPubkey(e.target.value); 
  };

  useEffect(() => {
    if (records) {
      let pubKeyMap = {};
      for (var i = 0; i < records.length; i++) {
        pubKeyMap[records[i]["Pubkey"]] = {
          "Name": records[i]["Name"],
          "Description": records[i]["Description"]
        }
      }
      setName(pubKeyMap[pubKey]["Name"]);
      setDescription(pubKeyMap[pubKey]["Description"]);
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
          value={pubKey}
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
        <h3>Name:</h3>
        <p>{name}</p>
        <h3>Description:</h3>
        <p>{description}</p>
       </div>
    </div>
  );
};

export default KeyGenerator;
