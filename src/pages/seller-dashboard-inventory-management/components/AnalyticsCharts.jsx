import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsCharts = ({ salesData, productData, customerData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [activeChart, setActiveChart] = useState('sales');

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const chartTypes = [
    { value: 'sales', label: 'Sales Trends', icon: 'TrendingUp' },
    { value: 'products', label: 'Top Products', icon: 'Package' },
    { value: 'customers', label: 'Customer Demographics', icon: 'Users' }
  ];

  const COLORS = ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'];

  const renderSalesChart = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Sales Revenue Trends</h3>
        <div className="flex items-center space-x-2">
          {periods.map((period) => (
            <Button
              key={period.value}
              variant={selectedPeriod === period.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedPeriod(period.value)}
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [`$${value}`, 'Revenue']}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#1E40AF" 
              strokeWidth={3}
              dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#1E40AF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderProductChart = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary">Top Performing Products</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              type="number"
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              type="category"
              dataKey="name" 
              stroke="#6B7280"
              fontSize={12}
              width={120}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [value, 'Sales']}
            />
            <Bar 
              dataKey="sales" 
              fill="#1E40AF"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderCustomerChart = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary">Customer Demographics</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64">
          <h4 className="text-sm font-medium text-text-secondary mb-3">Age Groups</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={customerData.ageGroups}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {customerData.ageGroups.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="h-64">
          <h4 className="text-sm font-medium text-text-secondary mb-3">Geographic Distribution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={customerData.locations}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="country" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="customers" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Legend for Age Groups */}
      <div className="flex flex-wrap gap-4 justify-center">
        {customerData.ageGroups.map((entry, index) => (
          <div key={entry.name} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-text-secondary">
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'sales':
        return renderSalesChart();
      case 'products':
        return renderProductChart();
      case 'customers':
        return renderCustomerChart();
      default:
        return renderSalesChart();
    }
  };

  return (
    <div className="card p-6">
      {/* Chart Type Selector */}
      <div className="flex items-center space-x-2 mb-6 overflow-x-auto">
        {chartTypes.map((chart) => (
          <Button
            key={chart.value}
            variant={activeChart === chart.value ? 'primary' : 'ghost'}
            onClick={() => setActiveChart(chart.value)}
            iconName={chart.icon}
            iconPosition="left"
            className="whitespace-nowrap"
          >
            {chart.label}
          </Button>
        ))}
      </div>

      {/* Chart Content */}
      {renderActiveChart()}

      {/* Export Options */}
      <div className="flex items-center justify-end space-x-2 mt-6 pt-4 border-t border-border">
        <Button variant="outline" size="sm">
          <Icon name="Download" size={16} />
          Export PNG
        </Button>
        <Button variant="outline" size="sm">
          <Icon name="FileText" size={16} />
          Export PDF
        </Button>
        <Button variant="outline" size="sm">
          <Icon name="Table" size={16} />
          Export CSV
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsCharts;