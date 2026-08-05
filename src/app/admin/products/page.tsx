'use client';

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, CheckCircle, XCircle, Lock, AlertCircle, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types';

export default function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct, userRole } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'hoa-bo');
  const [price, setPrice] = useState(500000);
  const [originalPrice, setOriginalPrice] = useState(600000);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [flowerComposition, setFlowerComposition] = useState('');
  const [isBestSeller, setIsBestSeller] = useState(false);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false;
    if (searchQuery.trim()) {
      return p.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handleOpenAddModal = () => {
    setName('');
    setPrice(500000);
    setOriginalPrice(600000);
    setImageUrl('https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800');
    setDescription('Bó hoa tươi nghệ thuật được thiết kế tinh tế bởi tiệm hoa Lin Flower.');
    setFlowerComposition('Hoa hồng ecuador, hoa baby trắng');
    setIsBestSeller(false);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setCategoryId(product.categoryId);
    setPrice(product.price);
    setOriginalPrice(product.originalPrice || product.price);
    setImageUrl(product.images[0]);
    setDescription(product.description);
    setFlowerComposition(product.flowerComposition);
    setIsBestSeller(!!product.isBestSeller);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        categoryId,
        price: Number(price),
        originalPrice: Number(originalPrice),
        images: [imageUrl],
        description,
        flowerComposition,
        isBestSeller,
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        categoryId,
        price: Number(price),
        originalPrice: Number(originalPrice),
        images: [imageUrl],
        description,
        flowerComposition,
        isBestSeller,
        inStock: true,
        occasions: ['Sinh nhật', 'Khai trương'],
        flowerTypes: ['Hoa hồng'],
      });
      setIsAddModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (userRole === 'staff') {
      alert('🔒 Chỉ có tài khoản Admin (Toàn quyền) mới được phép xóa sản phẩm khỏi kho!');
      return;
    }
    if (confirm('Bạn có chắc chắn muốn xóa mẫu hoa này?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-stone-200">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900">
            Quản Lý Danh Mục Sản Phẩm Hoa
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Thêm mới, chỉnh sửa giá cả, cập nhật trạng thái còn hàng/hết hàng trong xưởng
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-pink-soft flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Mẫu Hoa Mới</span>
        </button>
      </div>

      {/* Filter controls */}
      <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <span className="text-stone-500">Lọc theo danh mục:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 focus:outline-none"
          >
            <option value="all">Tất cả danh mục ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tên hoa..."
            className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2" />
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b">
              <tr>
                <th className="p-4">Hình ảnh</th>
                <th className="p-4">Tên sản phẩm</th>
                <th className="p-4">Danh mục</th>
                <th className="p-4">Giá bán</th>
                <th className="p-4">Thành phần hoa</th>
                <th className="p-4">Trạng thái kho</th>
                <th className="p-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4">
                    <img src={p.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl border" />
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-stone-900">{p.name}</div>
                    {p.isBestSeller && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                        Best Seller
                      </span>
                    )}
                  </td>

                  <td className="p-4 font-semibold text-stone-700">
                    {categories.find(c => c.id === p.categoryId)?.name || p.categoryId}
                  </td>

                  <td className="p-4 font-serif font-bold text-brand-700">
                    {p.price.toLocaleString('vi-VN')}đ
                    {p.originalPrice && p.originalPrice > p.price && (
                      <div className="text-[10px] text-stone-400 line-through">
                        {p.originalPrice.toLocaleString('vi-VN')}đ
                      </div>
                    )}
                  </td>

                  <td className="p-4 max-w-xs truncate text-stone-500">
                    {p.flowerComposition}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                      className={`px-3 py-1 rounded-full font-bold text-[10px] transition-colors ${p.inStock ? 'bg-green-100 text-green-800' : 'bg-stone-200 text-stone-600'}`}
                    >
                      {p.inStock ? '✓ Còn hàng' : '× Hết hàng'}
                    </button>
                  </td>

                  <td className="p-4 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(p)}
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl"
                      title="Sửa sản phẩm"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveProduct} className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-stone-200 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingProduct ? 'Chỉnh Sửa Mẫu Hoa' : 'Thêm Mẫu Hoa Mới'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Tên sản phẩm hoa *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Danh mục *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Giá bán (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold text-brand-700"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">URL hình ảnh sản phẩm</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Thành phần loại hoa sử dụng</label>
                <input
                  type="text"
                  value={flowerComposition}
                  onChange={(e) => setFlowerComposition(e.target.value)}
                  placeholder="Hoa hồng ecuador, hoa baby trắng..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Mô tả sản phẩm</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                ></textarea>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                    className="accent-brand-600 rounded"
                  />
                  <span>Đánh dấu là mẫu "Best Seller" bán chạy</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="px-4 py-2 bg-stone-200 text-stone-700 font-bold rounded-xl"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-brand-600 text-white font-bold rounded-xl shadow-pink-soft"
              >
                Lưu Sản Phẩm
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
