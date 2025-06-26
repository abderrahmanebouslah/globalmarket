import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, trend, period = "vs last month" }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success-600';
    if (changeType === 'negative') return 'text-error-600';
    return 'text-text-secondary';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="card p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary-50 rounded-lg">
            <Icon name={icon} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
          </div>
        </div>
        {trend && (
          <div className="text-right">
            <div className="w-16 h-8 bg-primary-50 rounded flex items-center justify-center">
              <Icon name="TrendingUp" size={16} className="text-primary" />
            </div>
          </div>
        )}
      </div>
      
      {change && (
        <div className="flex items-center space-x-2">
          <Icon name={getChangeIcon()} size={16} className={getChangeColor()} />
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change}
          </span>
          <span className="text-sm text-text-muted">{period}</span>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;