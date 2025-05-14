'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [orderQuantity, setOrderQuantity] = useState('');
  const [rentalStart, setRentalStart] = useState('');
  const [rentalEnd, setRentalEnd] = useState('');

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('加载商品失败:', error.message);
    } else {
      setProducts(data || []);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      alert('删除失败: ' + error.message);
    } else {
      alert('商品已删除');
      fetchProducts();
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const { id, ...updateData } = editingProduct;
    const { error } = await supabase.from('products').update(updateData).eq('id', id);
    if (error) {
      alert('更新失败: ' + error.message);
    } else {
      alert('商品已更新');
      setEditingProduct(null);
      fetchProducts();
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const order = {
      product_id: selectedProduct.id,
      product_name: selectedProduct.name,
      type: selectedProduct.type,
      quantity: orderQuantity,
      rental_start: rentalStart,
      rental_end: rentalEnd,
    };

    const { error } = await supabase.from('orders').insert([order]);
    if (error) {
      alert('下单失败: ' + error.message);
    } else {
      alert('下单成功！');
      setSelectedProduct(null);
      setOrderQuantity('');
      setRentalStart('');
      setRentalEnd('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6">商品列表</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow p-6 rounded cursor-pointer" onClick={() => setSelectedProduct(product)}>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-1">类型：{product.type}</p>
            <p className="text-gray-600 mb-1">￥{product.price}</p>
            <p className="text-sm text-gray-500 mb-4">{product.description}</p>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingProduct(product);
                }}
                className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white"
              >
                编辑
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(product.id);
                }}
                className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white"
              >
                删除
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && <p>暂无商品。</p>}
      </div>

      {editingProduct && (
        <form onSubmit={handleUpdate} className="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-md border-t mt-10">
          <h2 className="text-lg font-semibold mb-4">编辑商品：{editingProduct.name}</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input className="p-2 border rounded w-full" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} placeholder="商品名称" />
            <input className="p-2 border rounded w-full" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} placeholder="价格" />
            <input className="p-2 border rounded w-full" value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} placeholder="描述" />
            <select className="p-2 border rounded w-full" value={editingProduct.type} onChange={(e) => setEditingProduct({ ...editingProduct, type: e.target.value })}>
              <option value="">选择类型</option>
              <option value="购买">购买</option>
              <option value="租赁">租赁</option>
            </select>
            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">保存</button>
            <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">取消</button>
          </div>
        </form>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{selectedProduct.description}</p>
            <form onSubmit={handleOrderSubmit}>
              {selectedProduct.type === '购买' && (
                <div className="mb-4">
                  <label className="block mb-1">购买数量:</label>
                  <input type="number" min={1} value={orderQuantity} onChange={(e) => setOrderQuantity(e.target.value)} className="w-full p-2 border rounded" />
                </div>
              )}
              {selectedProduct.type === '租赁' && (
                <div className="mb-4">
                  <label className="block mb-1">租赁开始日期:</label>
                  <input type="date" value={rentalStart} onChange={(e) => setRentalStart(e.target.value)} className="w-full p-2 border rounded" />
                  <label className="block mt-2 mb-1">租赁结束日期:</label>
                  <input type="date" value={rentalEnd} onChange={(e) => setRentalEnd(e.target.value)} className="w-full p-2 border rounded" />
                </div>
              )}
              <div className="flex justify-between">
                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">确认</button>
                <button type="button" onClick={() => setSelectedProduct(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">取消</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
