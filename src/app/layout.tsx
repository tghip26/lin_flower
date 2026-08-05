import './globals.css';
import type { Metadata } from 'next';
import { StoreProvider } from '@/context/StoreContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AIChatbotWidget } from '@/components/chat/AIChatbotWidget';
import { LuckyWheelModal } from '@/components/common/LuckyWheelModal';

export const metadata: Metadata = {
  title: 'Lin Flower - Trao Trọn Yêu Thương, Gửi Trọn Tâm Ý ♡',
  description: 'Cửa hàng hoa tươi Lin Flower tại Quế Võ, Bắc Ninh. Chuyên tráp cưới hỏi, giỏ trái cây, lẵng khai trương, bó hoa sinh nhật và trang trí sự kiện trọn gói. Hotline: 0363 819 228.',
  keywords: ['Lin Flower', 'Hoa tươi Bắc Ninh', 'Tráp cưới hỏi Phố Mới', 'Giỏ trái cây Bắc Ninh', 'Lẵng hoa khai trương Quế Võ', 'Hoa tươi Phố Mới Quế Võ'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col bg-[#FFFDF9] antialiased text-stone-800">
        <StoreProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <AIChatbotWidget />
          <LuckyWheelModal />
        </StoreProvider>
      </body>
    </html>
  );
}
