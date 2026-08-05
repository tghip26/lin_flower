import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, apiKey, model = 'gemini-1.5-flash', systemPrompt, catalogContext = [] } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Build Catalog context string
    const catalogStr = catalogContext.length > 0
      ? catalogContext.map((p: any) => `- [${p.id}] ${p.name}: ${p.price.toLocaleString('vi-VN')}đ (Dịp: ${p.occasions?.join(', ')}, Thành phần: ${p.flowerComposition || 'Hoa tươi chọn lọc'})`).join('\n')
      : `
- [lf-001] Bó Hoa Hồng Đỏ Trao Yêu Thương: 550.000đ (Dịp: Sinh nhật, Tình yêu, Kỷ niệm)
- [lf-002] Lẵng Hoa Khai Trương Hồng Phát: 1.250.000đ (Dịp: Khai trương, Thăng chức, Tân gia)
- [lf-003] Giỏ Trái Cây Nhập Khẩu Lin Luxe 01: 980.000đ (Dịp: Chúc mừng, Tân gia, Thăm hỏi)
- [lf-004] Bộ Tráp Cưới Hỏi 7 Lễ Rồng Phượng Lin Classic: 4.800.000đ (Dịp: Cưới hỏi)
- [lf-005] Kệ Hoa Viếng Thành Kính: 850.000đ (Dịp: Chia buồn)
- [lf-006] Gói Trang Trí Gia Tiên Hoa Tươi Mẫu Lin Elegance: 8.500.000đ (Dịp: Cưới hỏi, Sự kiện)
      `;

    // Advanced System Prompt for Gemini
    const fullSystemPrompt = `${systemPrompt || 'Bạn là Trợ lý AI Chuyên gia Tư vấn Hoa Tươi Lin Flower tại Quế Võ, Bắc Ninh.'}

DƯỚI ĐÂY LÀ DANH MỤC SẢN PHẨM HIỆN CÓ TẠI TIỆM LIN FLOWER:
${catalogStr}

THÔNG TIN TIỆM:
- Cửa hàng: Lin Flower - TRAO TRỌN YÊU THƯƠNG – GỬI TRỌN TÂM Ý ♡
- Địa chỉ: Khu phố 5, Thị trấn Phố Mới, Quế Võ, Bắc Ninh
- Hotline/Zalo: 0363 819 228
- Ưu đãi: Miễn phí in băng rôn/thiệp 3D, Giao hoa 2H tận nơi tại Quế Võ - Bắc Ninh.

NGUYÊN TẮC TƯ VẤN:
1. Xưng hô ngọt ngào, lãng mạn, chu đáo (ví dụ: "Dạ Lin Flower chào bạn yêu!").
2. Đưa ra gợi ý 1-2 mẫu hoa cụ thể từ danh mục trên kèm giá chính xác.
3. Trình bày đẹp mắt với dấu gạch đầu dòng, emoji và bôi đen các từ quan trọng.
4. Nếu khách cần đặt hoa gấp, khuyên khách gọi hotline 0363 819 228.
`;

    // Call Gemini API if API Key is available
    if (apiKey && apiKey.trim().length > 10) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${fullSystemPrompt}\n\nKhách hàng hỏi: "${prompt}"` }]
              }
            ],
            generationConfig: {
              maxOutputTokens: 900,
              temperature: 0.7,
            }
          })
        });

        const data = await response.json();
        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          const text = data.candidates[0].content.parts[0].text;
          return NextResponse.json({ text, isGeminiLive: true });
        }
      } catch (e) {
        console.error('Gemini API error, falling back to smart engine', e);
      }
    }

    // Smart Local Fallback Advisor Engine
    const lower = prompt.toLowerCase();
    let text = '';

    if (lower.includes('sinh nhật') || lower.includes('tình yêu') || lower.includes('người yêu') || lower.includes('vợ') || lower.includes('hồng')) {
      text = `🌸 **Dạ chào bạn thân yêu!** Với dịp sinh nhật / tình yêu lãng mạn, Lin Flower gợi ý bạn những tác phẩm hoa ngọt ngào nhất:

• **Bó Hoa Hồng Đỏ Trao Yêu Thương** (550.000đ) - Kết hợp 20 bông hồng đỏ nhập khẩu & hoa baby trắng tinh khôi.
• **Giỏ Trái Cây Nhập Khẩu Lin Luxe** (980.000đ) - Trái cây tươi nhập khẩu 100% điểm xuyết hoa hồng kem sang trọng.

💌 **Đặc quyền tặng kèm:** Miễn phí thiệp chúc mừng 3D nghệ thuật & Giao hoa nhanh trong **2H tại Quế Võ - Bắc Ninh**! Bạn bấm nút **"Thêm giỏ"** bên dưới để đặt ngay nha 💕`;
    } else if (lower.includes('khai trương') || lower.includes('thăng chức') || lower.includes('tân gia') || lower.includes('chúc mừng') || lower.includes('lẵng')) {
      text = `🎉 **Mừng Khai Trương Hồng Phát - Vạn Sự Như Ý!** Lin Flower có những mẫu lẵng hoa khai trương mang lại tài lộc & may mắn:

• **Lẵng Hoa Khai Trương Hồng Phát** (1.250.000đ) - Tông Đỏ - Vàng - Cam thịnh vượng, kết hợp Lan hồ điệp & Hướng dương đại.
• **Giỏ Trái Cây Nhập Khẩu Lin Luxe** (980.000đ) - Sang trọng, lịch sự cho dịp tân gia & chúc mừng đối tác.

🎗️ **Ưu đãi độc quyền:** Miễn phí in băng rôn chữ nổi chúc mừng sang trọng. Hotline hỗ trợ 24/7: **0363 819 228**!`;
    } else if (lower.includes('cưới') || lower.includes('tráp') || lower.includes('gia tiên') || lower.includes('ăn hỏi')) {
      text = `💒 **Chúc mừng ngày vui trọng đại của hai bạn!** Lin Flower chuyên thiết kế tráp cưới hỏi & trang trí hoa tươi trọn gói tại Bắc Ninh:

• **Bộ Tráp Cưới Hỏi 7 Lễ Rồng Phượng Lin Classic** (4.800.000đ) - Kết rồng phượng tinh xảo, hoa tươi cao cấp.
• **Gói Trang Trí Gia Tiên Hoa Tươi Lin Elegance** (8.500.000đ) - Trọn gói bàn thờ gia tiên, cổng hoa & bàn tiệc.

💎 Nhận tư vấn mẫu riêng & khảo sát tận nơi miễn phí! Gọi ngay hotline **0363 819 228** bạn nhé 💕`;
    } else if (lower.includes('giữ hoa') || lower.includes('chăm hoa') || lower.includes('tươi lâu')) {
      text = `🌸 **Bí quyết giữ bình hoa tươi rực rỡ đến 10 ngày tại nhà từ Lin Flower:**

1. **Cắt gốc xéo 45 độ**: Nhúng cành hoa vào chậu nước rồi cắt vát 45° giúp tăng diện tích hút nước.
2. **Pha nước dưỡng thần thánh**: Cho 1 thìa đường nhỏ (dưỡng chất) & 2-3 giọt nước chanh (kháng khuẩn).
3. **Vị trí thoáng mát**: Tránh quạt gió thổi trực tiếp, điều hòa quá lạnh hoặc ánh nắng gắt.

Bạn cần Lin Flower hỗ trợ thêm thông tin gì không ạ? 💕`;
    } else {
      text = `🌸 **Dạ Lin Flower xin chào bạn yêu!** 

Lin Flower tại Thị trấn Phố Mới, Quế Võ sẵn sàng phục vụ bạn:
• 🌹 **Bó hoa sinh nhật & Tình yêu**: Từ 350.000đ
• 🏬 **Lẵng hoa khai trương hồng phát**: Từ 790.000đ
• 🍇 **Giỏ trái cây nhập khẩu cao cấp**: Từ 850.000đ
• 💒 **Tráp cưới hỏi & Trang trí sự kiện**: Trọn gói nghệ thuật

📞 Hotline / Zalo tư vấn trực tiếp: **0363 819 228** (Giao hoa 2H tận tay tại Bắc Ninh). Bạn đang tìm mẫu hoa cho dịp nào để shop gửi hình tư vấn ngay ạ? 💕`;
    }

    return NextResponse.json({ text, isGeminiLive: false });

  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
