import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderManagement = ({ orders, onUpdateOrder }) => {
  const [trackingInputs, setTrackingInputs] = useState({});

  const handleTrackingUpdate = (orderId, trackingNumber) => {
    onUpdateOrder(orderId, { trackingNumber, status: 'shipped' });
    setTrackingInputs({ ...trackingInputs, [orderId]: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning-100 text-warning-700';
      case 'processing': return 'bg-primary-100 text-primary-700';
      case 'shipped': return 'bg-success-100 text-success-700';
      case 'delivered': return 'bg-success-100 text-success-700';
      case 'cancelled': return 'bg-error-100 text-error-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error-600';
      case 'medium': return 'text-warning-600';
      case 'low': return 'text-success-600';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Icon name="Clock" size={20} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Pending</p>
              <p className="text-xl font-bold text-text-primary">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Icon name="Package" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Processing</p>
              <p className="text-xl font-bold text-text-primary">
                {orders.filter(o => o.status === 'processing').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success-100 rounded-lg">
              <Icon name="Truck" size={20} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Shipped</p>
              <p className="text-xl font-bold text-text-primary">
                {orders.filter(o => o.status === 'shipped').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Icon name="DollarSign" size={20} className="text-accent-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Revenue</p>
              <p className="text-xl font-bold text-text-primary">
                ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">Recent Orders</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={16} />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Products</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-hover">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-text-primary">#{order.id}</span>
                      {order.priority === 'high' && (
                        <Icon name="AlertCircle" size={16} className="text-error-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-text-primary">{order.customer.name}</p>
                      <p className="text-sm text-text-secondary">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {order.products.slice(0, 3).map((product, index) => (
                          <div key={index} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                            <Image
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-text-secondary">
                        {order.products.length} item{order.products.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-text-primary">${order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {order.status === 'pending' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onUpdateOrder(order.id, { status: 'processing' })}
                        >
                          Process
                        </Button>
                      )}
                      {order.status === 'processing' && (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="text"
                            placeholder="Tracking #"
                            value={trackingInputs[order.id] || ''}
                            onChange={(e) => setTrackingInputs({
                              ...trackingInputs,
                              [order.id]: e.target.value
                            })}
                            className="w-24 text-sm"
                          />
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleTrackingUpdate(order.id, trackingInputs[order.id])}
                            disabled={!trackingInputs[order.id]}
                          >
                            Ship
                          </Button>
                        </div>
                      )}
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-border">
          {orders.map((order) => (
            <div key={order.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-text-primary">#{order.id}</h3>
                    {order.priority === 'high' && (
                      <Icon name="AlertCircle" size={16} className="text-error-600" />
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">{order.customer.name}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex -space-x-2">
                  {order.products.slice(0, 3).map((product, index) => (
                    <div key={index} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  {order.products.length} item{order.products.length > 1 ? 's' : ''}
                </span>
                <span className="font-medium text-text-primary">${order.total.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">
                  {new Date(order.date).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-2">
                  {order.status === 'pending' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onUpdateOrder(order.id, { status: 'processing' })}
                    >
                      Process
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Icon name="Eye" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;