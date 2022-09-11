import React, { useEffect, useState } from "react";
import "./TopProducts.css";
import { Grid, Col, Row } from "rsuite";
import Product from "./Product";
import axios from "axios";

const TopProducts = () => {
  let [product, setProduct] = useState([]);

  useEffect(() => {
    async function product() {
      let { data } = await axios.get("http://localhost:8000/topproduct");
      setProduct(data);
    }
    product();
  }, []);

  return (
    <>
      <div className="top-product">
        <Grid>
          <Row className="show-grid">
            <Col xs={8}>
              <h5>Top Products</h5>
            </Col>
            <Col xs={16}>
              <ul>
                <li>
                  <span></span>All
                </li>
                <li>
                  <span></span>Boys Collection
                </li>
                <li>
                  <span></span>Girl Collection
                </li>
                <li>
                  <span></span>Shose Collection
                </li>
              </ul>
            </Col>
          </Row>
        </Grid>
      </div>
      <div className="product">
        <Grid>
          <Row className="show-grid" gutter={30}>
            {product.map((data, index) => (
              <Col key={index} xs={6}>
                <Product items={data} img={data.image} rating={data.rating} brand={data.brand} title={data.title} color={data.color} size={data.size} price={data.price} />
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    </>
  );
};

export default TopProducts;
