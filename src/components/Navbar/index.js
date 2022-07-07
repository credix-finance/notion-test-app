import React, {FC} from 'react';
import "./style.scss";

const Navbar: FC = () => {
  return (
    <div className="navbar-container">
      <div className="logo-and-tag-line">
        <span className="tag-line">NOTION API TEST</span>
      </div>
      <div className="balance-wallet-container">
      </div>
    </div>
  );
}

export default Navbar;
