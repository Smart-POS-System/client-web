import React, { useState } from "react";
import SearchItem from "../../components/cashier/SearchItem";
import AddSale from "../../components/cashier/AddSale";
import { Layout } from "antd";
import BillSider from "../../components/cashier/BIllSider";
import ShowStashedBills from "../../components/cashier/ShowStashedBills";

const { Content, Sider } = Layout;

const Cashier = () => {
  const [bill, setBill] = useState([]);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Content
          style={{
            margin: "0",
            padding: 1,
            minHeight: 360,
            background: "white",
            borderRadius: 1,
          }}
        >
          <div>
            <AddSale setVariable={setBill} />
          </div>
          <div>
            <div className="text-2xl my-8">Find Item</div>
            <SearchItem setVariable={setBill} />
          </div>
          {console.log({ bill })}
        </Content>
        <Sider
          width={400}
          style={{
            background: "white",
            marginLeft: "16px",
          }}
        >
          <div
            style={{
              paddingLeft: "15px",
              minHeight: 360,
              background: "white",
              borderRadius: 1,
            }}
          >
            <BillSider value={bill} />
          </div>
        </Sider>
      </Layout>
      <Content>
      {/* <Content>
        <ShowStashedBills />
      </Content>
      </Content> */}
    </>
  );
};

export default Cashier;
