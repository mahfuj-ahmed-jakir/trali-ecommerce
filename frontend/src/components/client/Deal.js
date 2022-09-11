import React, { useEffect, useState } from "react";
import "./Deal.css";
import { Grid, Row, Col } from "rsuite";
import axios from "axios";

const Deal = () => {
  let [deal, setDeal] = useState([]);

  useEffect(() => {
    async function dealData() {
      let data = await axios.get("http://localhost:8000/deal");
      setDeal(data.data);
    }
    dealData();
  }, []);

  return (
    <>
      <section id="deal">
        <div className="conatiner">
          <Grid>
            <Row className="show-grid">
              {deal.map((items, index) => (
                <Col key={index} xs={12}>
                  <div className="deal" style={{ backgroundImage: `url(${items.img})` }}>
                    <h5>{items.deal}</h5>
                    <h1>{items.heading}</h1>
                    <button className={`btn${index}`}>{items.button}</button>
                  </div>
                </Col>
              ))}
            </Row>
          </Grid>
        </div>
      </section>
    </>
  );
};

export default Deal;
