import React from "react";
import "./VendorPanel.css";

const VendorPanel = () => {
  return (
    <div>
      <div id="panel_board">
        <div className="panel_board">
          <h2>$2180</h2>
          <h4>Total Balance</h4>
        </div>
        <div className="panel_board">
          <h2>$1150</h2>
          <h4>Total Revenue</h4>
        </div>
        <div className="panel_board">
          <h2>950</h2>
          <h4>Total Sale</h4>
        </div>
        <div className="panel_board">
          <h2>45</h2>
          <h4>Total Product</h4>
        </div>
      </div>
    </div>
  );
};

export default VendorPanel;
