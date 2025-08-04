import StatsCards from "./StatsCards";
import PerformanceChart from "./PerformanceChart";
import ConversionsChart from "./ConversionsChart";
import { IoMdNotifications } from "react-icons/io";
import { MdPerson } from "react-icons/md";
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

          <Link to="/login" className="user-avatar-link">
              <div className="user-avatar-icon">
                <MdPerson size={28} />
              </div>
          </Link>
        </div>
      </div>

      <div className="dashboard-content">
        <StatsCards />

        <div className="chart-section">
          <PerformanceChart />
          <ConversionsChart />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
