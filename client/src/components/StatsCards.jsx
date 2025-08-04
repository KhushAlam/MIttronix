import { MdShoppingCart, MdGroup, MdTrendingUp, MdAttachMoney } from 'react-icons/md'

function StatsCards() {
  const stats = [
    {
      icon: <MdShoppingCart size={20} />,
      iconClass: 'orange',
      value: '13,647',
      label: 'Total Orders',
      change: '+2.3%',
      changeType: 'positive',
      period: 'Last Week'
    },
    {
      icon: <MdGroup size={20} />,
      iconClass: 'blue',
      value: '9,526',
      label: 'Total Customers',
      change: '+8.1%',
      changeType: 'positive',
      period: 'Last Month'
    },
    {
      icon: <MdTrendingUp size={20} />,
      iconClass: 'orange',
      value: '976',
      label: 'Completed Orders',
      change: '+0.3%',
      changeType: 'positive',
      period: 'Last Month'
    },
    {
      icon: <MdAttachMoney size={20} />,
      iconClass: 'red',
      value: '₹12.3L',
      label: 'Payment Received',
      change: '+10.6%',
      changeType: 'negative',
      period: 'Last Month'
    }
  ]

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <div className={`stat-icon ${stat.iconClass}`}>
              {stat.icon}
            </div>
          </div>
          
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
          
          <div className={`stat-change ${stat.changeType}`}>
            {stat.changeType === 'positive' ? '↗' : '��'} {stat.change} {stat.period}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
