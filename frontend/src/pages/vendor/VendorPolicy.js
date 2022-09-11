import React, { useState, useContext } from "react";
import "./VendorPolicy.css";
import { Checkbox, Button } from "rsuite";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../../context/Store";

const VendorPolicy = () => {
  let [accept, setAccept] = useState(false);

  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const user = state.userInfo;

  let handleVendor = async () => {
    let { data } = await axios.put(`http://localhost:8000/vendor/${user.id}`);
    dispatch({ type: "USER_INFO", payload: data });
    localStorage.removeItem("userInfo");
    localStorage.setItem("userInfo", JSON.stringify(data));
    navigate("/dashboard");
  };

  let handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div id="vendor_policy">
      <div className="vendor_policy">
        <div className="vendor_policy_text">
          <p>MODIFICATION OF CONTRACT TERMS The terms and conditions set forth in the Contract shall govern all transactions by Authorized User(s) under this Contract. The Contract may only be modified or amended upon mutual written agreement of the Commissioner and Contractor. The Contractor may, however, offer Authorized User(s) more advantageous pricing, payment, or other terms and conditions than those set forth in the Contract. In such event, a copy of such terms shall be furnished to the Authorized User(s) and Commissioner by the Contractor at the time of such offer. Other than where such terms are more advantageous for the Authorized User(s) than those set forth in the Contract, no alteration or modification of the terms of the Contract.</p>
          <p>A Terms and Conditions agreement (T&C) is the agreement that includes the terms, the rules and the guidelines of acceptable behavior and other useful sections to which users must agree in order to use or access your website and mobile app.</p>
        </div>
        {user.isVendor ? (
          <div>
            <Button onClick={handleGoToDashboard} appearance="primary">
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <div>
            <Checkbox onChange={() => setAccept(!accept)}>Accept terms and conditions.</Checkbox>
            <br></br>
            {accept ? (
              <Button onClick={handleVendor} appearance="primary">
                Become a Vendor
              </Button>
            ) : (
              <Button appearance="primary" disabled>
                Become a Vendor
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPolicy;
