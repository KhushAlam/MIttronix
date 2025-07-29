function PerformanceChart() {
  const chartData = [
    { month: 'Jan', pageViews: 45, clicks: 30 },
    { month: 'Feb', pageViews: 65, clicks: 45 },
    { month: 'Mar', pageViews: 55, clicks: 35 },
    { month: 'Apr', pageViews: 75, clicks: 55 },
    { month: 'May', pageViews: 85, clicks: 65 },
    { month: 'Jun', pageViews: 70, clicks: 50 },
    { month: 'Jul', pageViews: 90, clicks: 70 },
    { month: 'Aug', pageViews: 95, clicks: 75 },
    { month: 'Sep', pageViews: 80, clicks: 60 },
    { month: 'Oct', pageViews: 100, clicks: 80 },
    { month: 'Nov', pageViews: 85, clicks: 65 },
    { month: 'Dec', pageViews: 75, clicks: 55 }
  ]

  const maxValue = Math.max(...chartData.map(d => Math.max(d.pageViews, d.clicks)))

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">Performance</h3>
        <div className="chart-tabs">
          <div className="chart-tab active">ALL</div>
          <div className="chart-tab">1M</div>
          <div className="chart-tab">6M</div>
          <div className="chart-tab">1Y</div>
        </div>
      </div>

      <div className="performance-chart">
        <div className="chart-bars">
          {chartData.map((data, index) => (
            <div key={index} className="chart-bar-group" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px'}}>
              <div
                className="chart-bar"
                style={{
                  height: `${(data.pageViews / maxValue) * 180}px`,
                  backgroundColor: '#ffc007'
                }}
              ></div>
              <div
                className="chart-bar"
                style={{
                  height: `${(data.clicks / maxValue) * 180}px`,
                  backgroundColor: '#e6ac06',
                  width: '18px'
                }}
              ></div>
            </div>
          ))}
        </div>

        <div className="chart-x-axis" style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '12px', color: '#636e72'}}>
          {chartData.map((data, index) => (
            <span key={index}>{data.month}</span>
          ))}
        </div>
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{backgroundColor: '#ffc007'}}></div>
          Page Views
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{backgroundColor: '#e6ac06'}}></div>
          Clicks
        </div>
      </div>
    </div>
  )
}

export default PerformanceChart
