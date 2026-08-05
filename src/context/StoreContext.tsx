'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, Category, CartItem, Order, Voucher, Review, 
  CustomOrderRequest, UserRole, OrderStatus, SizeOption, AddOn 
} from '@/types';
import { 
  INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_VOUCHERS, 
  INITIAL_REVIEWS, INITIAL_ORDERS, INITIAL_CUSTOM_REQUESTS, INITIAL_ADD_ONS 
} from '@/data/mockData';

interface StoreContextType {
  // Role
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;

  // Categories & Products
  categories: Category[];
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedSize?: SizeOption, addOns?: AddOn[], cardMessage?: string, bannerText?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Voucher
  appliedVoucher: Voucher | null;
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;
  discountAmount: number;
  vouchers: Voucher[];
  addVoucher: (voucher: Voucher) => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'orderStatus' | 'statusHistory'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string, photoProofUrl?: string) => void;
  findOrderByIdOrPhone: (query: string) => Order[];

  // Custom Requests
  customRequests: CustomOrderRequest[];
  submitCustomRequest: (request: Omit<CustomOrderRequest, 'id' | 'status' | 'createdAt'>) => CustomOrderRequest;
  updateCustomRequestStatus: (id: string, status: CustomOrderRequest['status']) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'lin_flower_';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization with localStorage fallback
  const [userRole, setUserRoleState] = useState<UserRole>('customer');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [vouchers, setVouchers] = useState<Voucher[]>(INITIAL_VOUCHERS);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [customRequests, setCustomRequests] = useState<CustomOrderRequest[]>(INITIAL_CUSTOM_REQUESTS);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedProducts = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedOrders = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedRole = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'role');
      if (savedRole) setUserRoleState(savedRole as UserRole);

      const savedRequests = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'custom_requests');
      if (savedRequests) setCustomRequests(JSON.parse(savedRequests));
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'custom_requests', JSON.stringify(customRequests));
  }, [customRequests]);

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'role', role);
  };

  // Product CRUD
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: 'lf-' + Math.floor(1000 + Math.random() * 9000),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Cart operations
  const defaultSize: SizeOption = { name: 'Tiêu chuẩn', priceMultiplier: 1.0, description: 'Kích thước tiêu chuẩn' };

  const addToCart = (
    product: Product, 
    selectedSize: SizeOption = defaultSize, 
    addOns: AddOn[] = [], 
    cardMessage?: string,
    bannerText?: string
  ) => {
    setCart((prev) => {
      const cartItemId = `${product.id}-${selectedSize.name}-${addOns.map(a => a.id).sort().join(',')}`;
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity: 1,
          selectedSize,
          selectedAddOns: addOns,
          cardMessage,
          bannerText,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedVoucher(null);
  };

  const cartSubtotal = cart.reduce((sum, item) => {
    const basePrice = item.product.price * item.selectedSize.priceMultiplier;
    const addOnsPrice = item.selectedAddOns.reduce((aSum, a) => aSum + a.price, 0);
    return sum + (basePrice + addOnsPrice) * item.quantity;
  }, 0);

  // Voucher operations
  const applyVoucher = (code: string) => {
    const v = vouchers.find(
      (item) => item.code.toUpperCase() === code.trim().toUpperCase() && item.active
    );
    if (!v) {
      return { success: false, message: 'Mã giảm giá không tồn tại hoặc đã hết hạn.' };
    }
    if (cartSubtotal < v.minOrderValue) {
      return {
        success: false,
        message: `Đơn hàng tối thiểu ${v.minOrderValue.toLocaleString('vi-VN')}đ để áp dụng mã này.`
      };
    }
    setAppliedVoucher(v);
    return { success: true, message: `Đã áp dụng mã ${v.code} thành công!` };
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
  };

  const discountAmount = React.useMemo(() => {
    if (!appliedVoucher) return 0;
    if (appliedVoucher.fixedDiscount) {
      return appliedVoucher.fixedDiscount;
    }
    if (appliedVoucher.discountPercent) {
      const calculated = (cartSubtotal * appliedVoucher.discountPercent) / 100;
      return appliedVoucher.maxDiscount ? Math.min(calculated, appliedVoucher.maxDiscount) : calculated;
    }
    return 0;
  }, [appliedVoucher, cartSubtotal]);

  const addVoucher = (voucher: Voucher) => {
    setVouchers((prev) => [voucher, ...prev]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders operations
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'orderStatus' | 'statusHistory'>) => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newId = `LF-${randomNum}`;
    const nowStr = new Date().toISOString();
    const formattedNow = new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });

    const newOrder: Order = {
      ...orderData,
      id: newId,
      createdAt: nowStr,
      orderStatus: 'pending',
      statusHistory: [
        {
          status: 'pending',
          timestamp: formattedNow,
          note: 'Đã nhận đơn hàng thành công trên website Lin Flower'
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string, photoProofUrl?: string) => {
    const formattedNow = new Date().toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const newLog = {
          status,
          timestamp: formattedNow,
          note: note || `Cập nhật trạng thái đơn hàng sang ${status.toUpperCase()}`
        };
        return {
          ...o,
          orderStatus: status,
          statusHistory: [...o.statusHistory, newLog],
          photoProofUrl: photoProofUrl || o.photoProofUrl,
          paymentStatus: status === 'completed' ? 'paid' : o.paymentStatus
        };
      })
    );
  };

  const findOrderByIdOrPhone = (query: string) => {
    const clean = query.trim().toLowerCase();
    if (!clean) return [];
    return orders.filter(
      (o) => o.id.toLowerCase().includes(clean) || o.customerPhone.includes(clean) || o.recipientPhone.includes(clean)
    );
  };

  // Custom Requests
  const submitCustomRequest = (data: Omit<CustomOrderRequest, 'id' | 'status' | 'createdAt'>) => {
    const newReq: CustomOrderRequest = {
      ...data,
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('vi-VN')
    };
    setCustomRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const updateCustomRequestStatus = (id: string, status: CustomOrderRequest['status']) => {
    setCustomRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  // Reviews
  const addReview = (newRev: Omit<Review, 'id' | 'createdAt'>) => {
    const rev: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('vi-VN')
    };
    setReviews((prev) => [rev, ...prev]);
  };

  return (
    <StoreContext.Provider
      value={{
        userRole,
        setUserRole,
        categories,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        appliedVoucher,
        applyVoucher,
        removeVoucher,
        discountAmount,
        vouchers,
        addVoucher,
        orders,
        placeOrder,
        updateOrderStatus,
        findOrderByIdOrPhone,
        customRequests,
        submitCustomRequest,
        updateCustomRequestStatus,
        reviews,
        addReview,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
