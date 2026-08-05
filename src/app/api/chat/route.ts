import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt, apiKey, model = 'gemini-1.5-flash', systemPrompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Default System Instructions
    const sysPrompt = systemPrompt || 'Bạn là Trợ lý AI Chuyên gia Tư vấn Hoa Tươi Lin Flower tại Quế Võ, Bắc Ninh. Bạn nói chuyện với thái độ ngọt ngào, lãng mạn, chu đáo. Cung cấp tư vấn bó hoa sinh nhật, lẵng khai trương, tráp cưới hỏi, giỏ trái cây và hotline 0363 819 228.';

    // If Gemini API Key is provided, call Official Google Gemini API
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
                parts: [
                  { text: `${sysPrompt}\n\nKhách hàng hỏi: "${prompt}"` }
                ]
              }
            ],
            generationConfig: {
              maxOutputTokens: 800,
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
        console.error('Gemini API call failed, falling back to smart floral advisor engine', e);
      }
    }

    // Smart Local Florist Advisor Fallback Response Engine
    const lower = prompt.toLowerCase();
    let text = '';

    if (lower.includes('sinh nhật') || lower.includes('tình yêu') || lower.includes('người yêu') || lower.includes('vợ')) {
      text = `🌸 **Dạ chào bạn thân yêu!** Với dịp sinh nhật / tình yêu lãng mạn, Lin Flower gợi ý bạn các mẫu hoa hồng tuyệt đẹp:

1. **Bó Hoa Hồng Đỏ Trao Yêu Thương** (550.000đ) - Kết hợp 20 bông hồng đỏ nhập khẩu & baby trắng.
2. **Bó Hoa Hướng Dương Năng Lượng** (420.000đ) - Tone màu rực rỡ tượng trưng cho sự thành công và lời chúc tươi sáng.

💌 Lin Flower miễn phí tặng thiệp 3D chúc mừng nghệ thuật và giao hoa nhanh trong 2H tại Quế Võ - Bắc Ninh đó ạ! Bạn có cần mình tư vấn thêm quà tặng kèm gấu bông hay sô-cô-la không ạ?`;
    } else if (lower.includes('khai trương') || lower.includes('thăng chức') || lower.includes('tân gia') || lower.includes('chúc mừng')) {
      text = `🎉 **Mừng Khai Trương Hồng Phát - Vạn Sự Như Ý!** Lin Flower có những mẫu lẵng hoa khai trương phong thủy mang lại nhiều may mắn:

- **Lẵng Hoa Khai Trương Hồng Phát** (1.250.000đ) - Tông màu Đỏ - Vàng - Cam may mắn, lan hồ điệp vàng & hướng dương đại.
- **Giỏ Trái Cây Nhập Khẩu Lin Luxe** (980.000đ) - Trái cây tươi nhập khẩu 100% kết hợp hoa tươi biếu tặng vô cùng sang trọng.

🎀 Lin Flower tặng bạn băng rôn in chữ nổi chúc mừng hoàn toàn miễn phí. Bạn nhắn SĐT hoặc gọi **0363 819 228** để shop giữ hoa ngay nha!`;
    } else if (lower.includes('cưới') || lower.includes('tráp') || lower.includes('gia tiên')) {
      text = `💒 **Chào bạn! Chúc mừng ngày hạnh phúc trọng đại!** Lin Flower chuyên thiết kế tráp cưới hỏi & trang trí gia tiên hàng đầu Bắc Ninh:

- **Bộ Tráp Cưới Hỏi 7 Lễ Rồng Phượng Lin Classic** (4.800.000đ) - Kết hoa tươi tinh xảo.
- **Gói Trang Trí Gia Tiên Hoa Tươi Mẫu Lin Elegance** (8.500.000đ) - Trọn gói bàn thờ gia tiên, cổng hoa & bàn tiếp khách.

💍 Bạn có thể qua trực tiếp cửa hàng tại **Khu phố 5, Thị trấn Phố Mới, Quế Võ** hoặc gọi hotline **0363 819 228** để thợ hoa tư vấn khảo sát tận nhà miễn phí nhé!`;
    } else if (lower.includes('giữ hoa') || lower.includes('chăm hoa') || lower.includes('tươi lâu')) {
      text = `🌸 **Mẹo giữ hoa tươi lâu đến 10 ngày tại nhà từ Lin Flower:**

1. **Cắt gốc xéo 45 độ**: Dùng kéo sắc cắt vát cành hoa trong chậu nước sạch.
2. **Pha nước dưỡng**: Thêm 1 thìa đường nhỏ và 2 giọt nước chanh tươi vào bình nước.
3. **Vị trí**: Đặt hoa nơi thoáng mát (22-25°C), tránh gió quạt thổi trực tiếp hay nắng gắt.

Bạn cần Lin Flower hỗ trợ gì thêm không ạ? 💕`;
    } else {
      text = `🌸 **Dạ Lin Flower xin chào quý khách!** 

Lin Flower tại Phố Mới, Quế Võ sẵn sàng phục vụ quý khách:
- 🌹 Bó hoa sinh nhật, tình yêu lãng mạn từ 350.000đ
- 🏬 Lẵng hoa chúc mừng khai trương hồng phát từ 790.000đ
- 🍇 Giỏ trái cây nhập khẩu cao cấp từ 850.000đ
- 💒 Tráp cưới hỏi & Trang trí sự kiện trọn gói

Hotline/Zalo đặt hàng gấp: **0363 819 228** (Giao hoa 2H tận nhà tại Bắc Ninh). Bạn đang tìm hoa cho dịp gì để mình tư vấn ngay ạ? 💕`;
    }

    return NextResponse.json({ text, isGeminiLive: false });

  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Server error' }, { status: 500 });
  }
}
