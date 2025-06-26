import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InventoryTable = ({ products, onUpdateProduct, onBulkAction }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(products.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    }
  };

  const handleEditStart = (product) => {
    setEditingProduct(product.id);
    setEditValues({
      price: product.price,
      stock: product.stock,
      status: product.status
    });
  };

  const handleEditSave = (productId) => {
    onUpdateProduct(productId, editValues);
    setEditingProduct(null);
    setEditValues({});
  };

  const handleEditCancel = () => {
    setEditingProduct(null);
    setEditValues({});
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-700';
      case 'inactive': return 'bg-error-100 text-error-700';
      case 'draft': return 'bg-warning-100 text-warning-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-error-600' };
    if (stock < 10) return { text: 'Low Stock', color: 'text-warning-600' };
    return { text: 'In Stock', color: 'text-success-600' };
  };

  return (
    <div className="card overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedProducts.length > 0 && (
        <div className="bg-primary-50 border-b border-primary-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('activate', selectedProducts)}
              >
                Activate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('deactivate', selectedProducts)}
              >
                Deactivate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('delete', selectedProducts)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Product</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-surface-hover">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-background">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{product.name}</p>
                      <p className="text-sm text-text-secondary">SKU: {product.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-primary">{product.category}</span>
                </td>
                <td className="px-6 py-4">
                  {editingProduct === product.id ? (
                    <Input
                      type="number"
                      value={editValues.price}
                      onChange={(e) => setEditValues({...editValues, price: e.target.value})}
                      className="w-20"
                    />
                  ) : (
                    <span className="font-medium text-text-primary">${product.price}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {editingProduct === product.id ? (
                      <Input
                        type="number"
                        value={editValues.stock}
                        onChange={(e) => setEditValues({...editValues, stock: e.target.value})}
                        className="w-20"
                      />
                    ) : (
                      <>
                        <span className="font-medium text-text-primary">{product.stock}</span>
                        <p className={`text-xs ${getStockStatus(product.stock).color}`}>
                          {getStockStatus(product.stock).text}
                        </p>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {editingProduct === product.id ? (
                    <select
                      value={editValues.status}
                      onChange={(e) => setEditValues({...editValues, status: e.target.value})}
                      className="text-sm border border-border rounded px-2 py-1"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="draft">Draft</option>
                    </select>
                  ) : (
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {editingProduct === product.id ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleEditSave(product.id)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleEditCancel}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditStart(product)}
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => console.log('View product', product.id)}
                        >
                          <Icon name="Eye" size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => console.log('Delete product', product.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {products.map((product) => (
          <div key={product.id} className="p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
                className="mt-1 rounded border-border"
              />
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary truncate">{product.name}</h3>
                <p className="text-sm text-text-secondary">SKU: {product.sku}</p>
                <p className="text-sm text-text-secondary">{product.category}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-text-primary">${product.price}</span>
                    <span className="text-sm text-text-secondary">Stock: {product.stock}</span>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  <Button variant="ghost" size="sm">
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Eye" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryTable;