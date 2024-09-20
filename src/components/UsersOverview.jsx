import React from "react";
import { Card, Statistic, Row, Col, Badge } from "antd";
import { HiOutlineUsers } from "react-icons/hi2";
import { useSpring, animated } from "react-spring";

const AnimatedStatistic = ({ value }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: value,
    delay: 200,
    config: { mass: 1, tension: 170, friction: 14 },
  });

  return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
};

const UsersOverview = () => {
  return (
    <Card
      title={
        <span className="text-xl font-poppins text-gray-800">
          Users Overview
        </span>
      }
      style={{
        borderRadius: "20px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        background: "linear-gradient(135deg, #f0f4ff 0%, #d9e4ff 100%)",
        padding: "20px",
      }}
      head={{
        borderBottom: "none",
        paddingBottom: "0",
        marginBottom: "20px",
      }}
      body={{
        paddingTop: "0",
      }}
    >
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col justify-between">
          <div className="flex items-center mb-4">
            <HiOutlineUsers className="text-gray-800 text-4xl mr-4" />
            <Statistic
              title={
                <span className="text-gray-800 font-poppins text-lg">
                  Total Employees
                </span>
              }
              formatter={() => <AnimatedStatistic value={46} />}
              valueStyle={{
                color: "#4a8cf5",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              className="mb-2"
            />
          </div>
          <div className="flex items-center">
            <HiOutlineUsers className="text-gray-800 text-4xl mr-4" />
            <Statistic
              title={
                <span className="text-gray-800 font-poppins text-lg">
                  Active Employees
                </span>
              }
              formatter={() => <AnimatedStatistic value={37} />}
              valueStyle={{
                color: "#4a8cf5",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              className="mt-4"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-poppins mb-4 text-gray-800">
            Roles Breakdown
          </h3>
          <ul className="list-inside space-y-2 font-poppins text-gray-800">
            <li>
              <Badge
                color="transparent"
                text={
                  <span className="text-gray-800">Regional Managers: 3</span>
                }
              />
            </li>
            <li>
              <Badge
                color="transparent"
                text={
                  <span className="text-gray-800">Inventory Managers: 5</span>
                }
              />
            </li>
            <li>
              <Badge
                color="transparent"
                text={<span className="text-gray-800">Store Managers: 8</span>}
              />
            </li>
            <li>
              <Badge
                color="transparent"
                text={<span className="text-gray-800">Cashiers: 21</span>}
              />
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default UsersOverview;
