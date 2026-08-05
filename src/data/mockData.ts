import { Category, Product, AddOn, Voucher, Review, Order, BlogPost, CustomOrderRequest } from '@/types';

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
    id: 'candle-aroma',
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
    occasions: ['Chúc mừng', 'Tân gia', 'Thăm hỏi', 'Cưới hỏi'],
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
    name: 'Bó Hoa Hướng Dương Năng Lượng Rạng Rỡ',
    slug: 'bo-hoa-huong-duong-nang-luong',
    categoryId: 'hoa-bo',
    price: 420000,
    originalPrice: 480000,
    images: [
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Bó hoa hướng dương rực rỡ tượng trưng cho sự thành công, niềm tin và lời chúc tương lai tươi sáng.',
    flowerComposition: '5 Bông hướng dương đại, Hoa thạch thảo tím, Lá cau',
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    occasions: ['Tốt nghiệp', 'Sinh nhật', 'Chúc mừng'],
    flowerTypes: ['Hoa hướng dương']
  },
  {
    id: 'lf-008',
    name: 'Lẵng Hoa Cẩm Tú Cầu Pastel Dịu Dàng',
    slug: 'lang-hoa-cam-tu-cau-pastel',
    categoryId: 'lang-chuc-mung',
    price: 790000,
    originalPrice: 890000,
    images: [
      'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Lẵng hoa để bàn với cẩm tú cầu xanh mint và hoa hồng phớt dịu dàng, tạo không gian thư thái sang trọng.',
    flowerComposition: 'Cẩm tú cầu Đà Lạt, Hoa hồng phớt, Hoa cát tường',
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    occasions: ['Sinh nhật', 'Tân gia', 'Kỷ niệm'],
    flowerTypes: ['Hoa cẩm tú cầu', 'Hoa hồng']
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
    code: 'FREESHIPBN',
    fixedDiscount: 30000,
    minOrderValue: 400000,
    description: 'Ưu đãi phí giao hàng tại Bắc Ninh',
    expiryDate: '2026-12-31',
    active: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'lf-001',
    customerName: 'Chị Minh Anh (Quế Võ)',
    rating: 5,
    comment: 'Hoa giao cực kỳ nhanh, tươi rói rực rỡ luôn! Thiệp chúc mừng in chữ rất đẹp và sang trọng. Sẽ ủng hộ Lin Flower dài dài!',
    createdAt: '2026-08-01'
  },
  {
    id: 'rev-2',
    productId: 'lf-003',
    customerName: 'Anh Hoàng Nam (TP Bắc Ninh)',
    rating: 5,
    comment: 'Giỏ trái cây đầy đặn, trái cây nhập khẩu ngọt lịm. Hoa đính kèm tươi nguyên 3 ngày vẫn đẹp. Dịch vụ tuyệt vời 10/10.',
    createdAt: '2026-08-03'
  },
  {
    id: 'rev-3',
    productId: 'lf-004',
    customerName: 'Gia đình Bác Đức',
    rating: 5,
    comment: 'Bộ tráp rồng phượng làm vô cùng công phu, bạn bè 2 bên họ hàng ai cũng khen nức nở. Cảm ơn cửa hàng Lin Flower nhiều nhé!',
    createdAt: '2026-08-04'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'LF-884920',
    customerName: 'Nguyễn Văn Hùng',
    customerPhone: '0988123456',
    customerEmail: 'hung.nguyen@gmail.com',
    recipientName: 'Trần Thu Hà',
    recipientPhone: '0977888999',
    recipientAddress: 'Số 15 đường Phố Mới, Thị trấn Phố Mới, Quế Võ, Bắc Ninh',
    deliveryDate: '2026-08-05',
    deliveryTimeSlot: '14:00 - 16:00',
    isAnonymous: false,
    cardMessage: 'Chúc em yêu sinh nhật vui vẻ, luôn rạng rỡ như những bông hoa hồng này!',
    bannerText: 'Mừng Sinh Nhật Em Yêu - Thu Hà',
    items: [
      {
        id: 'cart-item-1',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedSize: { name: 'Cao cấp (+30%)', priceMultiplier: 1.3, description: 'Tăng 30% số lượng hoa' },
        selectedAddOns: [INITIAL_ADD_ONS[0]],
        cardMessage: 'Chúc em yêu sinh nhật vui vẻ'
      }
    ],
    subtotal: 865000,
    discount: 50000,
    voucherCode: 'XINCHAO',
    shippingFee: 0,
    totalPrice: 815000,
    paymentMethod: 'vietqr',
    paymentStatus: 'paid',
    orderStatus: 'shipping',
    createdAt: '2026-08-05T08:30:00Z',
    statusHistory: [
      { status: 'pending', timestamp: '2026-08-05 08:30', note: 'Đã nhận đơn hàng từ website' },
      { status: 'processing', timestamp: '2026-08-05 08:45', note: 'Đang thiết kế hoa tại cửa hàng Phố Mới' },
      { status: 'shipping', timestamp: '2026-08-05 09:15', note: 'Shipper Lin Flower đang giao hoa tới người nhận' }
    ],
    photoProofUrl: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'LF-772109',
    customerName: 'Lê Thanh Hương',
    customerPhone: '0912345678',
    recipientName: 'Công Ty Cổ Phần Thiên An',
    recipientPhone: '0904112233',
    recipientAddress: 'KCN Quế Võ 1, Huyện Quế Võ, Bắc Ninh',
    deliveryDate: '2026-08-05',
    deliveryTimeSlot: '10:00 - 12:00',
    isAnonymous: false,
    bannerText: 'Chúc Mừng Khai Trương Hồng Phát - Công Ty Thiên An',
    items: [
      {
        id: 'cart-item-2',
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedSize: { name: 'Tiêu chuẩn', priceMultiplier: 1.0, description: 'Kích thước tiêu chuẩn' },
        selectedAddOns: [],
      }
    ],
    subtotal: 1250000,
    discount: 125000,
    voucherCode: 'LINFLOWER10',
    shippingFee: 0,
    totalPrice: 1125000,
    paymentMethod: 'momo',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    createdAt: '2026-08-04T15:20:00Z',
    statusHistory: [
      { status: 'pending', timestamp: '2026-08-04 15:20', note: 'Đã nhận đơn' },
      { status: 'processing', timestamp: '2026-08-04 16:00', note: 'Đang cắm hoa' },
      { status: 'shipping', timestamp: '2026-08-05 09:30', note: 'Đang giao hoa' },
      { status: 'completed', timestamp: '2026-08-05 10:15', note: 'Giao hoa thành công' }
    ]
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Cách Giữ Hoa Tươi Lâu Đến 10 Ngày Đơn Giản Tại Nhà',
    slug: 'cach-giu-hoa-tuoi-lau-tai-nha',
    excerpt: 'Mẹo nhỏ cắt gốc xéo 45 độ, pha dung dịch dưỡng hoa và vị trí đặt hoa giúp bình hoa của bạn luôn tươi rực rỡ.',
    content: 'Để hoa tươi lâu, bạn nên tỉa bớt lá ngập trong nước, cắt cành hoa góc 45 độ bằng kéo sắc và thay nước bình 2 ngày/lần. Có thể thêm 1 thìa đường nhỏ hoặc vài giọt nước chanh để nuôi hoa...',
    coverImage: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=800',
    author: 'Lin Flower Master Florist',
    category: 'Mẹo Hay Chọn Hoa',
    createdAt: '2026-08-02'
  },
  {
    id: 'blog-2',
    title: 'Ý Nghĩa Số Lượng Bông Hoa Hồng Khi Tặng Người Thượng',
    slug: 'y-nghia-so-luong-hoa-hong',
    excerpt: 'Tặng 1 bông là "Em là duy nhất", 9 bông là "Tình yêu vĩnh cửu", 99 bông là "Yêu em trọn đời"...',
    content: 'Số lượng bông hoa hồng mang nhiều thông điệp lãng mạn vô cùng tinh tế. Hãy cùng Lin Flower giải mã ý nghĩa các con số khi chọn quà nhé...',
    coverImage: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80&w=800',
    author: 'Lin Flower',
    category: 'Cẩm Nang Tình Yêu',
    createdAt: '2026-08-03'
  }
];

export const INITIAL_CUSTOM_REQUESTS: CustomOrderRequest[] = [
  {
    id: 'REQ-101',
    customerName: 'Chị Mai Chi',
    phone: '0966554433',
    budget: '1.500.000đ - 2.000.000đ',
    mainColor: 'Tone Hồng Pastel & White',
    occasion: 'Kỷ niệm 5 năm ngày cưới',
    note: 'Cần lẵng hoa cắm sang trọng, nhiều hoa Tulip và Hồng Ecuador',
    status: 'contacted',
    createdAt: '2026-08-04'
  }
];
