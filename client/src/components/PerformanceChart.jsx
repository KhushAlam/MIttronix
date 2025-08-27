import { useState, useEffect } from 'react'

function PerformanceChart() {
  const [activeTab, setActiveTab] = useState('ALL')
  const [animatedData, setAnimatedData] = useState([])
  const [hoveredBar, setHoveredBar] = useState(null)

  const allData = [
    { month: 'Jan', pageViews: 45, clicks: 30, date: '2024-01' },
    { month: 'Feb', pageViews: 65, clicks: 45, date: '2024-02' },
    { month: 'Mar', pageViews: 55, clicks: 35, date: '2024-03' },
    { month: 'Apr', pageViews: 75, clicks: 55, date: '2024-04' },
    { month: 'May', pageViews: 85, clicks: 65, date: '2024-05' },
    { month: 'Jun', pageViews: 70, clicks: 50, date: '2024-06' },
    { month: 'Jul', pageViews: 90, clicks: 70, date: '2024-07' },
    { month: 'Aug', pageViews: 95, clicks: 75, date: '2024-08' },
    { month: 'Sep', pageViews: 80, clicks: 60, date: '2024-09' },
    { month: 'Oct', pageViews: 100, clicks: 80, date: '2024-10' },
    { month: 'Nov', pageViews: 85, clicks: 65, date: '2024-11' },
    { month: 'Dec', pageViews: 75, clicks: 55, date: '2024-12' }
  ]

  const getFilteredData = () => {
    switch(activeTab) {
      case '1M':
        return allData.slice(-1)
      case '6M':
        return allData.slice(-6)
      case '1Y':
        return allData
      default:
        return allData
    }
  }

  const chartData = getFilteredData()
  const maxValue = Math.max(...chartData.map(d => Math.max(d.pageViews, d.clicks)))

  useEffect(() => {
    setAnimatedData(chartData.map(() => ({ pageViews: 0, clicks: 0 })))
    const timer = setTimeout(() => {
      setAnimatedData(chartData)
    }, 100)
    return () => clearTimeout(timer)
  }, [activeTab, chartData]) // Added chartData to dependency array for correctness

  const tabs = ['ALL', '1M', '6M', '1Y']

  return (
    <div className="performance-chart-card">
      <div className="chart-header">
        <h3 className="chart-title">Performance Analytics</h3>
        <div className="chart-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`chart-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="performance-chart">
        <div className="chart-bars">
          {animatedData.map((data, index) => {
            const originalData = chartData[index] || { pageViews: 0, clicks: 0 }
            const pageViewsHeight = maxValue > 0 ? (data.pageViews / maxValue) * 200 : 0
            const clicksHeight = maxValue > 0 ? (data.clicks / maxValue) * 200 : 0

            return (
              <div
                // FIX: Key no longer depends on data.month
                key={`chart-bar-group-${index}`}
                className="chart-bar-group"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div className="bar-container">
                  <div
                    className="chart-bar page-views-bar"
                    style={{ height: `${pageViewsHeight}px`, transition: 'height 0.3s ease-out' }}
                  ></div>
                  <div
                    className="chart-bar clicks-bar"
                    style={{ height: `${clicksHeight}px`, transition: 'height 0.3s ease-out' }}
                  ></div>
                </div>
                {hoveredBar === index && (
                  <div className="chart-tooltip">
                    <div className="tooltip-item">
                      <span className="tooltip-label">Page Views:</span>
                      <span className="tooltip-value">{originalData.pageViews}</span>
                    </div>
                    <div className="tooltip-item">
                      <span className="tooltip-label">Clicks:</span>
                      <span className="tooltip-value">{originalData.clicks}</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="chart-x-axis">
          {chartData.map((data) => (
            <span key={`chart-axis-${data.month}`} className="axis-label">{data.month}</span>
          ))}
        </div>
      </div>
      <div className="chart-legend">
        {/* ... legend items ... */}
      </div>
    </div>
  )
}

export default PerformanceChart