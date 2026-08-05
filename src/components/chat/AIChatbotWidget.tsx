'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, PhoneCall, Bot, User, RefreshCw, ShoppingBag, Plus, Check, ExternalLink } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ChatMessage, Product } from '@/types';

// Helper function to render formatted text with HTML bold, bullets & line breaks cleanly
const renderFormattedText = (content: string) => {
  const lines = content.split('\n');
  return (
    <div className="space-y-1 text-xs text-stone-800 leading-relaxed font-normal">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1.5" />;

        // Replace markdown bold **text** with <strong>text</strong>
        const parts = line.split(/(\*\*.*?\*\*)/g);

        const renderedLine = parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className="font-bold text-stone-950">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        if (line.startsWith('• ') || line.startsWith('- ')) {
          return (
            <div key={lIdx} className="flex items-start gap-1.5 pl-1 my-0.5">
              <span className="text-brand-500 font-bold flex-shrink-0">•</span>
              <div>{renderedLine}</div>
            </div>
          );
        }

        return <p key={lIdx}>{renderedLine}</p>;
      })}
    </div>
  );
};

export const AIChatbotWidget: React.FC = () => {
  const { geminiConfig, products, addToCart } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: '🌸 **Xin chào bạn thân yêu!** Mình là Trợ lý AI của **Lin Flower**.\nBạn đang tìm hoa cho dịp **Sinh nhật**, **Khai trương**, **Giỏ trái cây** hay **Cưới hỏi** để mình tư vấn & gửi mẫu đặt mua ngay nhé! 💕',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!geminiConfig.enabled) return null;

  const matchProductsFromText = (text: string): Product[] => {
    const lower = text.toLowerCase();
    let matched: Product[] = [];

    if (lower.includes('hồng đỏ') || lower.includes('sinh nhật') || lower.includes('tình yêu')) {
      const p = products.find(prod => prod.id === 'lf-001') || products[0];
      if (p) matched.push(p);
    }
    if (lower.includes('khai trương') || lower.includes('lẵng')) {
      const p = products.find(prod => prod.id === 'lf-002') || products[1];
      if (p) matched.push(p);
    }
    if (lower.includes('trái cây') || lower.includes('giỏ')) {
      const p = products.find(prod => prod.id === 'lf-003') || products[2];
      if (p) matched.push(p);
    }
    if (lower.includes('tráp') || lower.includes('cưới')) {
      const p = products.find(prod => prod.id === 'lf-004') || products[3];
      if (p) matched.push(p);
    }

    return matched.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = textToSend || inputText;
    if (!prompt.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          apiKey: geminiConfig.apiKey,
          model: geminiConfig.model,
          systemPrompt: geminiConfig.systemPrompt,
          catalogContext: products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            occasions: p.occasions,
            flowerComposition: p.flowerComposition
          }))
        }),
      });

      const data = await res.json();
      const botText = data.text || 'Rất tiếc, trợ lý AI đang quá tải. Bạn vui lòng gọi hotline 0363 819 228 để shop hỗ trợ ngay nhé!';
      const suggestedProducts = matchProductsFromText(botText + ' ' + prompt);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        suggestedProducts: suggestedProducts.length > 0 ? suggestedProducts : undefined
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'Xin lỗi bạn, kết nối của trợ lý AI tạm gián đoạn. Bạn gọi hotline **0363 819 228** để shop phục vụ ngay nhé! 💕',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAddToCart = (p: Product) => {
    addToCart(p);
    setAddedItemIds((prev) => [...prev, p.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter(id => id !== p.id));
    }, 2500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-gradient-to-r from-brand-600 via-rose-600 to-amber-500 hover:from-brand-700 hover:to-rose-700 text-white px-4.5 py-3.5 rounded-full shadow-2xl glow-effect active:scale-95 transition-all border-2 border-white cursor-pointer"
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-amber-200 animate-bounce" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></span>
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-serif font-bold text-white flex items-center gap-1">
                <span>Tư Vấn AI Lin Flower</span>
                <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
              </div>
              <div className="text-[10px] text-pink-100">Trả lời tức thì • Đặt hoa 2H</div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] bg-white rounded-3xl shadow-2xl border border-pink-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-900 via-brand-900 to-stone-900 text-white p-4 flex items-center justify-between shadow-md border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-amber-500 border border-amber-300/40 flex items-center justify-center text-amber-100 relative shadow-sm">
                  <Bot className="w-6 h-6" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-stone-900"></span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-white flex items-center gap-1.5">
                    <span>Trợ Lý Hoa Tươi Lin Flower</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h4>
                  <p className="text-[10px] text-stone-300">Google Gemini AI • Hotline 0363 819 228</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-stone-50/80 via-white to-pink-50/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2.5 ${msg.sender === 'user' ? 'bg-gradient-to-r from-brand-600 via-rose-600 to-brand-500 text-white rounded-br-none shadow-md' : 'bg-white text-stone-800 border border-stone-200/90 shadow-md rounded-bl-none'}`}>
                    
                    {/* Formatted Content */}
                    {msg.sender === 'user' ? (
                      <p className="font-medium text-white text-xs whitespace-pre-line">{msg.text}</p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}

                    {/* Embedded Suggested Products Card */}
                    {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                      <div className="pt-2 border-t border-stone-100 space-y-2">
                        <div className="text-[10px] font-bold text-brand-700 uppercase tracking-wider flex items-center gap-1">
                          <ShoppingBag className="w-3 h-3 text-brand-600" />
                          <span>Mẫu hoa gợi ý chọn nhanh:</span>
                        </div>
                        {msg.suggestedProducts.map((p) => {
                          const isAdded = addedItemIds.includes(p.id);
                          return (
                            <div key={p.id} className="bg-gradient-to-r from-brand-50/80 to-amber-50/80 p-2.5 rounded-2xl border border-brand-200 flex items-center justify-between gap-3 shadow-sm hover:border-brand-400 transition-all">
                              <img src={p.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl flex-shrink-0 border border-white shadow-sm" />
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-[11px] text-stone-900 truncate">{p.name}</div>
                                <div className="font-serif font-extrabold text-brand-700 text-[11px]">
                                  {p.price.toLocaleString('vi-VN')}đ
                                </div>
                              </div>
                              <button
                                onClick={() => handleQuickAddToCart(p)}
                                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-sm ${isAdded ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white'}`}
                              >
                                {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                <span>{isAdded ? 'Đã thêm' : 'Thêm giỏ'}</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className={`text-[9px] text-right font-normal ${msg.sender === 'user' ? 'text-brand-200' : 'text-stone-400'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-stone-600 bg-white p-3 rounded-2xl border border-pink-200 max-w-[80%] shadow-md">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-600" />
                  <span>Trợ lý Lin Flower đang tìm hoa phù hợp...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips Prompts */}
            <div className="p-2 bg-white border-t border-stone-100 overflow-x-auto flex gap-1.5 whitespace-nowrap text-[11px] scrollbar-none">
              {[
                '🎂 Hoa tặng sinh nhật',
                '🎉 Lẵng hoa khai trương',
                '🍇 Giỏ trái cây biếu',
                '🌸 Mẹo giữ hoa tươi'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="bg-pink-50 hover:bg-pink-100 text-brand-700 px-3 py-1 rounded-full border border-pink-200/80 font-semibold active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Hỏi trợ lý AI về hoa tươi..."
                className="flex-1 px-4 py-2.5 text-xs bg-stone-100/80 border border-stone-200 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium text-stone-900"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-700 hover:to-rose-700 disabled:opacity-50 text-white rounded-full transition-all active:scale-95 flex-shrink-0 cursor-pointer shadow-pink-soft"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
