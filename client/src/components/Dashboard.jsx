import StatsCards from "./StatsCards";
import PerformanceChart from "./PerformanceChart";
import ConversionsChart from "./ConversionsChart";
import { IoMdNotifications } from "react-icons/io";
import { MdPerson, MdCheckCircle, MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { healthService } from "../api/healthService.js";

function Dashboard() {
  const [apiStatus, setApiStatus] = useState('checking')

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        await healthService.checkConnection()
        setApiStatus('connected')
      } catch (error) {
        setApiStatus('disconnected')
      }
    }

    checkApiConnection()
  }, [])

  return (
    <div>
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>WELCOME!</h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            marginTop: '4px'
          }}>
            {apiStatus === 'connected' && (
              <>
                <MdCheckCircle size={16} style={{ color: '#10b981' }} />
                <span style={{ color: '#10b981' }}>API Connected</span>
              </>
            )}
            {apiStatus === 'disconnected' && (
              <>
                <MdError size={16} style={{ color: '#ef4444' }} />
                <span style={{ color: '#ef4444' }}>API Disconnected</span>
              </>
            )}
            {apiStatus === 'checking' && (
              <span style={{ color: '#6b7280' }}>Checking connection...</span>
            )}
          </div>
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
