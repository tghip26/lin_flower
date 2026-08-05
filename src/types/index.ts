export type UserRole = 'admin' | 'staff' | 'customer';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  iconName: string;
  bulletPoints: string[];
}

export interface SizeOption {
  name: string; // 'Tiêu chuẩn' | 'Cao cấp' | 'V.I.P'
  priceMultiplier: number; // 1 | 1.3 | 1.6
  description: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  flowerComposition: string; // e.g. "Hoa hồng Ecuador, hoa baby trắng, lá đô la"
  isBestSeller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  occasions: string[]; // ['Sinh nhật', 'Khai trương', 'Cưới hỏi', 'Tình yêu', 'Chia buồn', 'Kỷ niệm']
  flowerTypes: string[]; // ['Hoa hồng', 'Hoa hướng dương', 'Hoa cẩm tú cầu', 'Hoa lan', 'Hoa baby']
}

export interface CartItem {
  id: string; // Unique cart item ID
  product: Product;
  quantity: number;
  selectedSize: SizeOption;
  selectedAddOns: AddOn[];
  cardMessage?: string;
  bannerText?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
export type PaymentMethod = 'cod' | 'vietqr' | 'momo';
export type PaymentStatus = 'unpaid' | 'paid';

export interface OrderStatusLog {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  isAnonymous: boolean;
  cardMessage?: string;
  bannerText?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  voucherCode?: string;
  shippingFee: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  statusHistory: OrderStatusLog[];
  photoProofUrl?: string;
}

export interface Voucher {
  code: string;
  discountPercent?: number;
  fixedDiscount?: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  expiryDate: string;
  active: boolean;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface CustomOrderRequest {
  id: string;
  customerName: string;
  phone: string;
  budget: string;
  mainColor: string;
  occasion: string;
  note: string;
  imageUrl?: string;
  status: 'pending' | 'contacted' | 'fulfilled' | 'cancelled';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  readTime: string;
  createdAt: string;
  tags: string[];
}

export interface VietQRConfig {
  accountNo: string;
  accountName: string;
  bankCode: string;
  bankName: string;
  enabled: boolean;
}

export interface TelegramConfig {
  botToken: string;
  chatId: string;
  enabled: boolean;
  notifyOnNewOrder: boolean;
  notifyOnStatusChange: boolean;
}
