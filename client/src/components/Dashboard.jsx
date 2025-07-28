import StatsCards from "./StatsCards";
import PerformanceChart from "./PerformanceChart";
import ConversionsChart from "./ConversionsChart";
import SessionsCountry from "./SessionsCountry";
import TopPages from "./TopPages";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>WELCOME!</h1>
        </div>

        <div className="header-actions">
          <div className="notification-icon">
            <IoMdNotifications className="icons" size={24} color="grey" />
          </div>

          <Link to="/profile">
              <img className="user-avatar" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face" alt="" />
          </Link>
        </div>
      </div>

      <div className="dashboard-content">
        <StatsCards />

        <div className="chart-section">
          <PerformanceChart />
          <ConversionsChart />
        </div>

        {/* <div className="bottom-section">
          <SessionsCountry />
          <TopPages />
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
