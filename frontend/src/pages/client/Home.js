import React from "react";
import Menubar from "../../components/client/Menubar";
import Banner from "../../components/client/Banner";
import Deal from "../../components/client/Deal";
import TopProducts from "../../components/client/TopProducts";

const Home = () => {
  return (
    <>
      <Menubar />
      <Banner />
      <Deal />
      <TopProducts />
    </>
  );
};

export default Home;
