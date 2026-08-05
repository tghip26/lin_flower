'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, PhoneCall, Bot, User, RefreshCw, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ChatMessage } from '@/types';

export const AIChatbotWidget: React.FC = () => {
  const { geminiConfig, products } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: '🌸 **Xin chào bạn thân yêu!** Mình là Trợ lý AI của **Lin Flower**. Bạn đang tìm hoa cho dịp Sinh nhật, Khai trương hay Cưới hỏi để mình hỗ trợ ngay ạ? 💕',
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
        }),
      });

      const data = await res.json();
      const botText = data.text || 'Rất tiếc, trợ lý AI đang quá tải. Bạn vui lòng gọi hotline 0363 819 228 để shop hỗ trợ ngay nhé!';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'Xin lỗi bạn, kết nối của trợ lý AI tạm gián đoạn. Bạn gọi hotline 0363 819 228 để shop phục vụ ngay nhé! 💕',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
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
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white px-4 py-3 rounded-full shadow-2xl glow-effect active:scale-95 transition-all border-2 border-white/40"
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-amber-200 animate-bounce" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></span>
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-serif font-bold text-white">Tư Vấn Hoa AI</div>
              <div className="text-[10px] text-brand-100">Lin Flower Assistant</div>
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
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[520px] bg-white rounded-3xl shadow-2xl border border-brand-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-900 via-brand-900 to-stone-900 text-white p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-500/20 border border-brand-400/40 flex items-center justify-center text-amber-300 relative">
                  <Bot className="w-6 h-6" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-stone-900"></span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-white flex items-center gap-1.5">
                    <span>Trợ Lý Hoa Tươi Lin Flower</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h4>
                  <p className="text-[10px] text-stone-300">Google Gemini AI • Phản hồi 24/7</p>
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
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-stone-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed space-y-1 ${msg.sender === 'user' ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-br-none shadow-sm' : 'bg-white text-stone-800 border border-stone-200 shadow-sm rounded-bl-none'}`}>
                    <div className="whitespace-pre-line font-medium">
                      {msg.text}
                    </div>
                    <div className={`text-[9px] text-right font-normal ${msg.sender === 'user' ? 'text-brand-200' : 'text-stone-400'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-stone-500 bg-white p-3 rounded-2xl border border-stone-200 max-w-[70%]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-600" />
                  <span>Trợ lý Lin Flower đang suy nghĩ câu trả lời...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Chips Prompts */}
            <div className="p-2 bg-white border-t border-stone-100 overflow-x-auto flex gap-1.5 whitespace-nowrap text-[11px]">
              {[
                '🎂 Hoa tặng sinh nhật',
                '🎉 Lẵng hoa khai trương',
                '🍇 Giỏ trái cây biếu',
                '🌸 Mẹo giữ hoa tươi'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip)}
                  className="bg-brand-50 hover:bg-brand-100 text-brand-700 px-2.5 py-1 rounded-full border border-brand-200/60 font-medium active:scale-95 transition-all"
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
                className="flex-1 px-3.5 py-2 text-xs bg-stone-100 border border-stone-200 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-full transition-colors active:scale-95 flex-shrink-0"
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
