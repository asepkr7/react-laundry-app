import Marquee from "react-fast-marquee";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Marquee>
        <h1>Welcome and enjoy our services</h1>
      </Marquee>
    </>
  );
};
export default Dashboard;
