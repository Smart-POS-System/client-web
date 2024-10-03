import {
  AccountBookOutlined,
  DollarOutlined,
  RetweetOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Card from "./Cards";

function DashboardCards() {
  return (
    <>
      <Card
        title="Total Revenue"
        amount={5000}
        icon={<AccountBookOutlined />}
        colour={"bg-green-300"}
        outerColour={"bg-green-100"}
      />
      <Card
        title="Total Sales"
        amount={5000}
        icon={<DollarOutlined />}
        colour={"bg-purple-300"}
        outerColour={"bg-purple-100"}
      />
      <Card
        title="Total Purchase"
        amount={5000}
        icon={<ShoppingCartOutlined />}
        colour={"bg-orange-300"}
        outerColour={"bg-orange-100"}
      />
      <Card
        title="Total Return"
        amount={5000}
        icon={<RetweetOutlined />}
        colour={"bg-yellow-300"}
        outerColour={"bg-yellow-100"}
      />
    </>
  );
}

export default DashboardCards;
