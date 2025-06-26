import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActions = ({ onAction }) => {
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  const quickActionItems = [
    {
      id: 'add-product',
      title: 'Add New Product',
      description: 'Create a new product listing',
      icon: 'Plus',
      color: 'bg-primary-50 text-primary',
      action: () => onAction('add-product')
    },
    {
      id: 'bulk-upload',
      title: 'Bulk Upload',
      description: 'Upload multiple products via CSV',
      icon: 'Upload',
      color: 'bg-success-50 text-success-600',
      action: () => setShowBulkUpload(true)
    },
    {
      id: 'create-promotion',
      title: 'Create Promotion',
      description: 'Set up discounts and offers',
      icon: 'Tag',
      color: 'bg-accent-50 text-accent-600',
      action: () => onAction('create-promotion')
    },
    {
      id: 'inventory-report',
      title: 'Inventory Report',
      description: 'Generate stock level report',
      icon: 'BarChart3',
      color: 'bg-secondary-50 text-secondary-600',
      action: () => onAction('inventory-report')
    },
    {
      id: 'customer-messages',
      title: 'Customer Messages',
      description: 'Respond to customer inquiries',
      icon: 'MessageCircle',
      color: 'bg-warning-50 text-warning-600',
      action: () => onAction('customer-messages'),
      badge: '3'
    },
    {
      id: 'order-fulfillment',
      title: 'Order Fulfillment',
      description: 'Process pending orders',
      icon: 'Package',
      color: 'bg-primary-50 text-primary',
      action: () => onAction('order-fulfillment'),
      badge: '12'
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setUploadFile(file);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleBulkUploadSubmit = () => {
    if (uploadFile) {
      onAction('bulk-upload', { file: uploadFile });
      setUploadFile(null);
      setShowBulkUpload(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActionItems.map((item) => (
          <div
            key={item.id}
            className="card p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
            onClick={item.action}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-3 rounded-lg ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={item.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                <div className="flex items-center mt-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-sm font-medium">Get started</span>
                  <Icon name="ArrowRight" size={16} className="ml-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
          <div className="bg-surface rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Bulk Upload Products</h3>
              <Button
                variant="ghost"
                onClick={() => setShowBulkUpload(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-secondary mb-2">
                  Upload a CSV file with your product data. Make sure to follow our template format.
                </p>
                <Button
                  variant="outline"
                  onClick={() => onAction('download-template')}
                  iconName="Download"
                  iconPosition="left"
                  className="w-full"
                >
                  Download CSV Template
                </Button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Select CSV File
                </label>
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="w-full"
                />
                {uploadFile && (
                  <p className="text-sm text-success-600 mt-2">
                    File selected: {uploadFile.name}
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="primary"
                  onClick={handleBulkUploadSubmit}
                  disabled={!uploadFile}
                  className="flex-1"
                >
                  Upload Products
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowBulkUpload(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {[
            {
              id: 1,
              action: 'Product "Wireless Headphones" was updated',
              time: '2 minutes ago',
              icon: 'Edit',
              color: 'text-primary'
            },
            {
              id: 2,
              action: 'New order #12345 received',
              time: '15 minutes ago',
              icon: 'ShoppingBag',
              color: 'text-success-600'
            },
            {
              id: 3,
              action: 'Stock alert: "Gaming Mouse" is running low',
              time: '1 hour ago',
              icon: 'AlertTriangle',
              color: 'text-warning-600'
            },
            {
              id: 4,
              action: 'Customer review received for "Bluetooth Speaker"',
              time: '2 hours ago',
              icon: 'Star',
              color: 'text-accent-600'
            }
          ].map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface-hover transition-colors duration-200">
              <div className={`p-1.5 rounded-full bg-background ${activity.color}`}>
                <Icon name={activity.icon} size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">{activity.action}</p>
                <p className="text-xs text-text-secondary">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;