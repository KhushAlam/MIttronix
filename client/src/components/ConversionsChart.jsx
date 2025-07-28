function ConversionsChart() {
  const conversionRate = 66.7

  return (
    <div className="chart-card conversion-chart">
      <div className="chart-header">
        <h3 className="chart-title">Conversions</h3>
      </div>

      <div className="conversion-circle">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#e17055"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - conversionRate / 100)}`}
            transform="rotate(-90 60 60)"
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out'
            }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '24px', fontWeight: '700', color: '#2d3436'}}>
            {conversionRate}% 
          </div>
        </div>
      </div>

      <div className="conversion-value">
        {conversionRate}% <br />Returning Customers
      </div>
    </div>
  )
}

export default ConversionsChart
