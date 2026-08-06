import { Category, Product, AddOn, Voucher, Review, Order, BlogPost, CustomOrderRequest, VietQRConfig, TelegramConfig, GeminiConfig, LuckyWheelConfig } from '@/types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'trap-cuoi-hoi',
    name: 'TRÁP CƯỚI HỎI',
    slug: 'trap-cuoi-hoi',
    description: 'Tráp lễ ăn hỏi cao cấp, thiết kế tinh tế sang trọng cho ngày trọng đại.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    iconName: 'Gift',
    bulletPoints: [
      'Tráp rượu & tráp trà',
      'Tráp bánh cưới & hoa quả',
      'Tráp cau trầu truyền thống',
      'Tráp heo quay & đồ lễ trọn gói'
    ]
  },
  {
    id: 'gio-lang-trai-cay',
    name: 'GIỎ / LẴNG TRÁI CÂY',
    slug: 'gio-lang-trai-cay',
    description: 'Giỏ, lẵng trái cây nhập khẩu cao cấp, kết hợp hoa tươi sang trọng, tươi ngon, đẹp mắt.',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800',
    iconName: 'ShoppingBag',
    bulletPoints: [
      'Trái cây nhập khẩu cao cấp 100%',
      'Thiết kế sang trọng, hiện đại',
      'Phù hợp biếu tặng, thăm hỏi, chúc mừng',
      'Hoa tươi trang trí tinh tế'
    ]
  },
  {
    id: 'lang-chuc-mung',
    name: 'LẴNG CHÚC MỪNG',
    slug: 'lang-chuc-mung',
    description: 'Lẵng hoa chúc mừng khai trương, sinh nhật, thăng chức, tân gia, sự kiện hoành tráng.',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800',
    iconName: 'Award',
    bulletPoints: [
      'Lẵng hoa chúc mừng khai trương',
      'Kệ hoa tân gia, thăng chức',
      'Thiết kế hoa tone màu may mắn (Đỏ, Vàng, Cam)',
      'Miễn phí in băng rôn chữ nổi'
    ]
  },
  {
    id: 'hoa-bo',
    name: 'HOA BÓ',
    slug: 'hoa-bo',
    description: 'Bó hoa sinh nhật, bó hoa tình yêu, bó hoa kỷ niệm, hoa tốt nghiệp tone màu lãng mạn.',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800',
    iconName: 'Heart',
    bulletPoints: [
      'Bó hoa sinh nhật lãng mạn',
      'Bó hoa hồng Ecuador, Tulip, Baby',
      'Bó hoa kỷ niệm & Tốt nghiệp',
      'Gói giấy cao cấp, nơ voan sang trọng'
    ]
  },
  {
    id: 'hoa-hieu',
    name: 'HOA HIẾU',
    slug: 'hoa-hieu',
    description: 'Vòng hoa, kệ hoa, lẵng hoa viếng, hoa chia buồn, hoa tang lễ trang nghiêm, thành kính.',
    image: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&q=80&w=800',
    iconName: 'Flower2',
    bulletPoints: [
      'Vòng hoa viếng tang lễ trang nghiêm',
      'Kệ hoa chia buồn tone Trắng - Tím - Vàng',
      'Lẵng hoa kính viếng người thành kính',
      'Giao hoa tận nhà hiếu nhanh chóng'
    ]
  },
  {
    id: 'trang-tri-su-kien',
    name: 'TRANG TRÍ SỰ KIỆN',
    slug: 'trang-tri-su-kien',
    description: 'Trang trí gia tiên, bàn tiệc, phòng cưới, sinh nhật, sự kiện trọn gói nghệ thuật.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
    iconName: 'Sparkles',
    bulletPoints: [
      'Trang trí hoa tươi gia tiên ngày cưới',
      'Trang trí xe hoa cô dâu & phòng tân hôn',
      'Trang trí tiệc sinh nhật & backdrop sự kiện',
      'Tư vấn & khảo sát tận nơi miễn phí'
    ]
  }
];

export const INITIAL_ADD_ONS: AddOn[] = [
  {
    id: 'bear-pink',
    name: 'Gấu Bông Nơ Hồng Dễ Thương (25cm)',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'choco-ferrero',
    name: 'Hộp Sô-cô-la Ferrero Rocher 16 Viên',
    price: 220000,
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'candle-relax',
    name: 'Nến Thơm Thư Giãn Hương Hoa Hồng',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'card-3d',
    name: 'Thiệp Chúc Mừng 3D Cao Cấp (Miễn Phí)',
    price: 0,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'lf-001',
    name: 'Bó Hoa Hồng Đỏ Trao Yêu Thương',
    slug: 'bo-hoa-hong-do-trao-yeu-thuong',
    categoryId: 'hoa-bo',
    price: 550000,
    originalPrice: 650000,
    images: [
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Bó hoa hồng đỏ lãng mạn kết hợp cùng hoa baby trắng tinh khôi và giấy gói nhập khẩu cao cấp. Món quà hoàn hảo để bày tỏ tình cảm chân thành.',
    flowerComposition: '20 Bông hồng đỏ nhập khẩu, Hoa Baby trắng, Lá đô la',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    occasions: ['Sinh nhật', 'Tình yêu', 'Kỷ niệm', 'Valentine'],
    flowerTypes: ['Hoa hồng', 'Hoa baby']
  },
  {
    id: 'lf-002',
    name: 'Lẵng Hoa Khai Trương Hồng Phát',
    slug: 'lang-hoa-khai-truong-hong-phat',
    categoryId: 'lang-chuc-mung',
    price: 1250000,
    originalPrice: 1450000,
    images: [
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Lẵng hoa chúc mừng khai trương với tone màu Đỏ - Vàng - Cam may mắn, mang lại tài lộc thịnh vượng cho gia chủ.',
    flowerComposition: 'Hoa hướng dương, Hoa hồng cam, Hoa đồng tiền, Hoa lan hồ điệp vàng',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    occasions: ['Khai trương', 'Thăng chức', 'Tân gia', 'Sự kiện'],
    flowerTypes: ['Hoa hướng dương', 'Hoa hồng', 'Hoa lan']
  },
  {
    id: 'lf-003',
    name: 'Giỏ Trái Cây Nhập Khẩu Lin Luxe 01',
    slug: 'gio-trai-cay-nhap-khau-lin-luxe-01',
    categoryId: 'gio-lang-trai-cay',
    price: 980000,
    originalPrice: 1100000,
    images: [
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Giỏ trái cây kết hợp Nho mẫu đơn Hàn Quốc, Táo Envy Mỹ, Cam vàng Úc trang trí hoa tươi điểm xuyết sang trọng.',
    flowerComposition: 'Trái cây tươi nhập khẩu 100%, kết hợp Hoa hồng kem & Cẩm tú cầu',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    occasions: ['Giỏ trái cây', 'Sinh nhật', 'Chúc mừng', 'Tân gia', 'Thăm hỏi'],
    flowerTypes: ['Hoa hồng', 'Hoa cẩm tú cầu']
  },
  {
    id: 'lf-004',
    name: 'Bộ Tráp Cưới Hỏi 7 Lễ Rồng Phượng Lin Classic',
    slug: 'bo-trap-cuoi-hoi-7-le-rong-phuong',
    categoryId: 'trap-cuoi-hoi',
    price: 4800000,
    originalPrice: 5200000,
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Bộ 7 tráp ăn hỏi truyền thống kết hợp hoa tươi kết rồng phượng tinh xảo: Tráp Cau trầu, Tráp Rượu Trà, Tráp Bánh Cốm, Tráp Hoa Quả, Tráp Heo Quay...',
    flowerComposition: 'Tráp vỏ hồng sơn son thếp vàng, hoa tươi trang trí cao cấp',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    occasions: ['Cưới hỏi'],
    flowerTypes: ['Hoa hồng', 'Hoa lan']
  },
  {
    id: 'lf-005',
    name: 'Kệ Hoa Viếng Thành Kính Kính Kính',
    slug: 'ke-hoa-vieng-thanh-kinh',
    categoryId: 'hoa-hieu',
    price: 850000,
    originalPrice: 950000,
    images: [
      'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Kệ hoa viếng tang lễ tone màu Trắng Tinh Khôi kết hợp Hoa Cúc, Hoa Cẩm Chướng và Hoa Lan thể hiện sự thành kính sâu sắc.',
    flowerComposition: 'Hoa Cúc trắng, Hoa Lan thái trắng, Hoa ly trắng',
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    occasions: ['Chia buồn'],
    flowerTypes: ['Hoa lan', 'Hoa cúc']
  },
  {
    id: 'lf-006',
    name: 'Gói Trang Trí Gia Tiên Hoa Tươi Mẫu Lin Elegance',
    slug: 'goi-trang-tri-gia-tien-hoa-tuoi',
    categoryId: 'trang-tri-su-kien',
    price: 8500000,
    originalPrice: 9500000,
    images: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Gói trang trí hoa tươi trọn gói cho lễ gia tiên bao gồm: Bàn thờ gia tiên, cổng hoa tươi, bàn tiếp khách 12 người, bộ chữ tên cô dâu chú rể.',
    flowerComposition: 'Hoa tươi theo tông màu yêu cầu (Hồng pastel, Đỏ nhung, Trắng xanh)',
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    occasions: ['Cưới hỏi', 'Sự kiện'],
    flowerTypes: ['Hoa hồng', 'Hoa cẩm tú cầu', 'Hoa baby']
  },
  {
    id: 'lf-007',
    name: 'Bó Hoa Tulip Hà Lan Trắng Tinh Khôi',
    slug: 'bo-hoa-tulip-ha-lan-trang-tinh-khoi',
    categoryId: 'hoa-bo',
    price: 890000,
    originalPrice: 1050000,
    images: [
      'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Bó hoa Tulip Hà Lan nhập khẩu tone màu trắng ngà thanh lịch, ngọt ngào, phù hợp làm quà tặng sinh nhật hay tỏ tình tinh tế.',
    flowerComposition: '15 Bông Tulip trắng nhập khẩu, Giấy voan cao cấp',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    occasions: ['Sinh nhật', 'Tình yêu', 'Kỷ niệm'],
    flowerTypes: ['Tulip']
  },
  {
    id: 'lf-008',
    name: 'Lẵng Hoa Hướng Dương Rạng Rỡ Nắng Mới',
    slug: 'lang-hoa-huong-duong-rang-ro',
    categoryId: 'lang-chuc-mung',
    price: 790000,
    originalPrice: 920000,
    images: [
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Lẵng hoa chúc mừng kết hợp hoa hướng dương vàng rực rỡ và hoa hồng kem, mang lại nguồn năng lượng tích cực và may mắn.',
    flowerComposition: '10 Bông Hướng Dương, Hoa Hồng Kem, Hoa Đồng Tiền Vàng',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    occasions: ['Sinh nhật', 'Khai trương', 'Thăng chức'],
    flowerTypes: ['Hoa hướng dương', 'Hoa hồng']
  },
  {
    id: 'lf-009',
    name: 'Bó Hoa Baby Hồng Ngọt Ngào Dreamy Pink',
    slug: 'bo-hoa-baby-hong-ngot-ngao',
    categoryId: 'hoa-bo',
    price: 450000,
    originalPrice: 550000,
    images: [
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Bó hoa baby hồng phun sương cực kỳ dễ thương, bồng bềnh như mây hồng. Quà tặng ngọt ngào cho bạn gái & bạn bè.',
    flowerComposition: 'Hoa Baby hồng phun sương Hà Lan, nơ lụa mềm mại',
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    occasions: ['Sinh nhật', 'Tình yêu', 'Tốt nghiệp'],
    flowerTypes: ['Hoa baby']
  },
  {
    id: 'lf-010',
    name: 'Giỏ Trái Cây Kèm Hoa Hồng Ecuador Lin VIP',
    slug: 'gio-trai-cay-kem-hoa-hong-ecuador',
    categoryId: 'gio-lang-trai-cay',
    price: 1450000,
    originalPrice: 1650000,
    images: [
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Giỏ trái cây cao cấp kết hợp dưa lưới Nhật, kiwi xanh, lê Nam Phi cùng hoa hồng Ecuador nhung đỏ sang trọng.',
    flowerComposition: 'Trái cây nhập khẩu chọn lọc loại 1, Hoa hồng Ecuador',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    occasions: ['Giỏ trái cây', 'Sinh nhật', 'Chúc mừng', 'Biếu tặng'],
    flowerTypes: ['Hoa hồng']
  },
  {
    id: 'lf-011',
    name: 'Lẵng Hoa Hồng Kem & Cẩm Tú Cầu Sang Trọng',
    slug: 'lang-hoa-hong-kem-cam-tu-cau',
    categoryId: 'lang-chuc-mung',
    price: 950000,
    originalPrice: 1100000,
    images: [
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Lẵng hoa tươi tone pastel hiện đại nhẹ nhàng, sự kết hợp giữa hoa cẩm tú cầu xanh và hoa hồng kem dâu quý phái.',
    flowerComposition: 'Hoa Cẩm Tú Cầu, Hoa Hồng Kem Dâu, Hoa Cát Tường',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    occasions: ['Sinh nhật', 'Khai trương', 'Sự kiện'],
    flowerTypes: ['Hoa cẩm tú cầu', 'Hoa hồng']
  },
  {
    id: 'lf-012',
    name: 'Bó Hoa Hồng Ecuador Đỏ Nhung 99 Bông VIP',
    slug: 'bo-hoa-hong-ecuador-99-bong-vip',
    categoryId: 'hoa-bo',
    price: 3500000,
    originalPrice: 3900000,
    images: [
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Bó hoa 99 bông hồng đỏ nhung Ecuador kiêu sa, tượng trưng cho tình yêu vĩnh cửu. Món quà cầu hôn & kỷ niệm đỉnh cao.',
    flowerComposition: '99 Bông Hồng Đỏ Ecuador nhập khẩu, lá đô la bạc',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    occasions: ['Sinh nhật', 'Tình yêu', 'Kỷ niệm', 'Valentine'],
    flowerTypes: ['Hoa hồng']
  }
];

export const INITIAL_VOUCHERS: Voucher[] = [
  {
    code: 'LINFLOWER10',
    discountPercent: 10,
    minOrderValue: 300000,
    maxDiscount: 100000,
    description: 'Giảm 10% cho đơn hàng từ 300.000đ',
    expiryDate: '2026-12-31',
    active: true
  },
  {
    code: 'XINCHAO',
    fixedDiscount: 50000,
    minOrderValue: 500000,
    description: 'Giảm trực tiếp 50.000đ cho khách hàng mới',
    expiryDate: '2026-12-31',
    active: true
  },
  {
    code: 'VIPGIAOHANG',
    fixedDiscount: 30000,
    minOrderValue: 400000,
    description: 'Hỗ trợ 30.000đ phí vận chuyển hoả tốc',
    expiryDate: '2026-12-31',
    active: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'lf-002',
    customerName: 'Chị Hoàng Mai Phượng',
    rating: 5,
    comment: 'Shop cắm lẵng hoa khai trương siêu đẹp, tone màu đỏ vàng rất tươi và may mắn! Giao hoa đúng giờ hẹn tại Quế Võ, bác chủ nhà mừng lắm.',
    createdAt: '02/08/2026'
  },
  {
    id: 'rev-02',
    productId: 'lf-001',
    customerName: 'Anh Trần Minh Khoa',
    rating: 5,
    comment: 'Bó hoa hồng đỏ nhân dịp sinh nhật bà xã đẹp xuất sắc, hoa rất tươi giữ được hơn 5 ngày. Dịch vụ tặng thiệp chữ nổi của Lin Flower rất tinh tế.',
    createdAt: '01/08/2026'
  },
  {
    id: 'rev-03',
    productId: 'lf-004',
    customerName: 'Cô Nguyễn Thu Hà',
    rating: 5,
    comment: 'Đặt bộ 7 tráp ăn hỏi rồng phượng ở đây cực kỳ ưng ý. Hoa tươi kết chắc chắn, quả tươi ngon. Ai ở Bắc Ninh nên ghé tiệm Lin Flower ủng hộ nhé!',
    createdAt: '28/07/2026'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-01',
    title: 'Bí Quyết Chọn Hoa Khai Trương Hồng Phát Mang Lại Tài Lộc Thượng Hạng',
    slug: 'bi-quyet-chon-hoa-khai-truong-hong-phat',
    summary: 'Hướng dẫn lựa chọn loại hoa, màu sắc và kiểu dáng lẵng hoa khai trương phù hợp với phong thủy của gia chủ.',
    content: 'Hoa chúc mừng khai trương là món quà tinh thần mang giá trị phong thủy lớn...',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800',
    createdAt: '2026-08-01',
    author: 'Lin Flower Master Floral'
  },
  {
    id: 'blog-02',
    title: 'Ý Nghĩa Số Lượng Bông Hoa Hồng Khi Làm Quà Tặng Tình Yêu & Sinh Nhật',
    slug: 'y-nghia-so-luong-bong-hoa-hong',
    summary: 'Khám phá thông điệp đằng sau 1 bông, 12 bông, 99 bông hồng đỏ khi trao tặng người thương.',
    content: 'Mỗi số lượng bông hồng mang một thông điệp tình yêu độc đáo...',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800',
    createdAt: '2026-07-25',
    author: 'Lin Flower'
  }
];

export const INITIAL_ORDERS: Order[] = [];

export const INITIAL_CUSTOM_REQUESTS: CustomOrderRequest[] = [];

export const INITIAL_VIETQR_CONFIG: VietQRConfig = {
  accountNo: '0363819228',
  accountName: 'LINH FLOWER QUE VO',
  bankCode: 'MB',
  bankName: 'MBBank - Ngân hàng Quân Đội',
  enabled: true
};

export const INITIAL_TELEGRAM_CONFIG: TelegramConfig = {
  botToken: '',
  chatId: '',
  enabled: false,
  notifyOnNewOrder: true,
  notifyOnStatusChange: true
};

export const INITIAL_GEMINI_CONFIG: GeminiConfig = {
  apiKey: '',
  model: 'gemini-1.5-flash',
  systemPrompt: 'Bạn là trợ lý tư vấn hoa tươi Lin Flower tại Quế Võ, Bắc Ninh.',
  enabled: false
};

export const INITIAL_LUCKY_WHEEL_CONFIG: LuckyWheelConfig = {
  enabled: true,
  dailyLimit: 1,
  prizes: [
    { id: 's1', code: 'LINFLOWER10', label: 'Voucher 10%', discountText: 'Giảm 10%', color: '#f43f5e', probability: 30, active: true },
    { id: 's2', code: 'XINCHAO', label: 'Voucher 50K', discountText: 'Giảm 50.000đ', color: '#f59e0b', probability: 20, active: true },
    { id: 's3', code: 'VIPGIAOHANG', label: 'Miễn Phí Ship', discountText: 'Giảm 30.000đ ship', color: '#10b981', probability: 20, active: true },
    { id: 's4', code: 'CHUCMAYMAN', label: 'Chúc Bạn May Mắn Lần Sau', discountText: 'Thêm lượt ngày mai', color: '#6b7280', probability: 30, active: true }
  ]
};

