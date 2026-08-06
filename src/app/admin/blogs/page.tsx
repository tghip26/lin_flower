'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, BookOpen, ExternalLink, Search, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { BlogPost } from '@/types';

export default function AdminBlogsPage() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, userRole } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [author, setAuthor] = useState('Lin Flower Florist');
  const [category, setCategory] = useState('Mẹo Chăm Hoa');
  const [readTime, setReadTime] = useState('4 phút đọc');
  const [tagsInput, setTagsInput] = useState('Hoa Tươi, Lin Flower, Mẹo Hay');

  const filteredPosts = blogPosts.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.category || b.summary || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCoverImage('https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800');
    setAuthor('Lin Flower Master Florist');
    setCategory('Mẹo Chăm Hoa');
    setReadTime('4 phút đọc');
    setTagsInput('Hoa Tươi, Mẹo Chăm Hoa, Bắc Ninh');
    setEditingPost(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt || post.summary || '');
    setContent(post.content || '');
    setCoverImage(post.coverImage || post.image || '');
    setAuthor(post.author || 'Lin Flower Florist');
    setCategory(post.category || 'Mẹo Chăm Hoa');
    setReadTime(post.readTime || '4 phút đọc');
    setTagsInput(post.tags ? post.tags.join(', ') : 'Hoa Tươi, Lin Flower');
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const generatedSlug = slug.trim() || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    if (editingPost) {
      updateBlogPost(editingPost.id, {
        title,
        slug: generatedSlug,
        excerpt,
        content,
        coverImage,
        author,
        category,
        readTime,
        tags,
      });
      setEditingPost(null);
    } else {
      addBlogPost({
        title,
        slug: generatedSlug,
        excerpt,
        content,
        coverImage,
        author,
        category,
        readTime,
        tags,
      });
      setIsAddModalOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (userRole === 'staff') {
      alert('🔒 Chỉ Admin (Toàn quyền) mới được xóa bài viết!');
      return;
    }
    if (confirm('Bạn có chắc muốn xóa bài viết cẩm nang này?')) {
      deleteBlogPost(id);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-stone-200">
        <div>
          <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-stone-900">
            Quản Lý Bài Viết Cẩm Nang Chọn Hoa
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Đăng bài chia sẻ mẹo chăm hoa, ý nghĩa các loài hoa và kinh nghiệm mua hoa tươi
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-pink-soft flex items-center gap-2 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Đăng Bài Viết Cẩm Nang Mới</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
        </div>

        <div className="text-xs text-stone-500 font-bold">
          Tổng số bài viết: {blogPosts.length} bài
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50 text-stone-700 uppercase font-bold text-[10px] tracking-wider border-b">
              <tr>
                <th className="p-4">Ảnh bìa</th>
                <th className="p-4">Tiêu đề bài viết</th>
                <th className="p-4">Chuyên mục</th>
                <th className="p-4">Tác giả & Ngày đăng</th>
                <th className="p-4">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4">
                    <img src={post.coverImage} alt="" className="w-16 h-12 object-cover rounded-xl border" />
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-stone-900 text-sm line-clamp-1">{post.title}</div>
                    <div className="text-stone-400 truncate max-w-md">{post.excerpt}</div>
                  </td>

                  <td className="p-4">
                    <span className="bg-brand-50 text-brand-700 font-bold px-2.5 py-1 rounded-full text-[10px]">
                      {post.category}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-stone-800">{post.author}</div>
                    <div className="text-stone-400 text-[10px]">{post.createdAt}</div>
                  </td>

                  <td className="p-4 flex items-center gap-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl"
                      title="Xem trực tiếp trên web"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleOpenEditModal(post)}
                      className="p-2 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-xl"
                      title="Sửa bài viết"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl"
                      title="Xóa bài viết"
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

      {/* Add / Edit Blog Modal */}
      {(isAddModalOpen || editingPost) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSavePost} className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl border border-stone-200 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingPost ? 'Chỉnh Sửa Bài Viết Cẩm Nang' : 'Đăng Bài Viết Cẩm Nang Mới'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingPost(null);
                }}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Tiêu đề bài viết *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Bí quyết giữ bình hoa tươi rực rỡ đến 10 ngày..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Chuyên mục bài viết *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                  >
                    <option value="Mẹo Chăm Hoa">Mẹo Chăm Hoa</option>
                    <option value="Cẩm Nang Tình Yêu">Cẩm Nang Tình Yêu</option>
                    <option value="Hoa Sự Kiện">Hoa Sự Kiện</option>
                    <option value="Tráp Cưới Hỏi">Tráp Cưới Hỏi</option>
                    <option value="Ý Nghĩa Loài Hoa">Ý Nghĩa Loài Hoa</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Tác giả *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">URL Ảnh Bìa Bài Viết *</label>
                <input
                  type="url"
                  required
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Tóm tắt ngắn (Excerpt) *</label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Mô tả ngắn gọn thu hút độc giả..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Nội dung bài viết chi tiết (Hỗ trợ Markdown) *</label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Nhập nội dung đầy đủ bài viết..."
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Thẻ Tags (Phân cách bởi dấu phẩy)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Hoa Tươi, Mẹo Chăm Hoa, Bắc Ninh"
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingPost(null);
                }}
                className="px-4 py-2 bg-stone-200 text-stone-700 font-bold rounded-xl text-xs"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-brand-600 text-white font-bold rounded-xl text-xs shadow-pink-soft"
              >
                Xuất Bản Bài Viết
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
