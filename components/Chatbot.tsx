'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '👋 Hi! How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (!target.closest('.floating-ai-button')) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setInput(value);
      setCharCount(value.length);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setCharCount(0);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.response,
        },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `⚠️ ${error instanceof Error ? error.message : 'Sorry, something went wrong. Please try again.'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Floating Button - Custom Logo */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-ai-button group relative w-12 h-12 rounded-full shadow-xl transition-all duration-300 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(190, 255, 1, 0.9) 0%, rgba(168, 230, 0, 0.9) 100%)',
          boxShadow: '0 0 30px rgba(190, 255, 1, 0.6), 0 0 60px rgba(190, 255, 1, 0.4)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-full animate-pulse" style={{
          boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.3)',
        }} />

        {/* Icon */}
        <div className="flex items-center justify-center w-full h-full relative z-10">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-5 h-5 text-black" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle className="w-5 h-5 text-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* Chat Window - Taller and Centered on Small Devices */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-[calc(100vw-3rem)] sm:w-96 h-[500px] sm:h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#beff01]/20"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Header */}
            <div className="p-4 border-b border-[#beff01]/10 bg-gradient-to-r from-[#beff01]/10 to-green-500/10">
              <h3 className="font-black text-white flex items-center gap-2 text-lg tracking-tight">
                <Image 
                    src="/assets/icons/logo.svg" 
                    alt="BidayaLab Logo" 
                    width={20}
                    height={20}
                    className="object-contain"
                />
                BidayaLab Chat
              </h3>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#beff01]/20 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-xl text-sm font-medium ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[#beff01] to-[#a8e600] text-black rounded-br-none font-bold'
                        : 'bg-gray-800/50 text-gray-100 border border-gray-700/30 rounded-bl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 justify-start"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ delay: i * 0.1, duration: 0.8, repeat: Infinity }}
                        className="w-2 h-2 bg-[#beff01] rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Section - Text and Send Button in One Line */}
            <div className="p-2 border-t border-[#beff01]/10 bg-black/50">
              <div className="space-y-1">
                {/* Character Counter */}
                <div className="flex justify-end">
                  <span
                    className={`text-xs font-bold ${
                      charCount > maxChars * 0.9 ? 'text-orange-400' : 'text-gray-500'
                    }`}
                  >
                    {charCount}/{maxChars}
                  </span>
                </div>

                {/* Textarea and Send Button in One Line */}
                <div className="flex items-end gap-2">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-gray-900/50 border border-gray-700/30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:border-[#beff01]/50 focus:ring-1 focus:ring-[#beff01]/30 font-medium"
                    rows={1}
                  />
                  
                  {/* Send Button - Compact */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading || !input.trim()}
                    className="p-3 rounded-lg font-black text-sm text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, rgba(190, 255, 1, 0.9) 0%, rgba(168, 230, 0, 0.9) 100%)',
                      boxShadow: !isLoading && input.trim() ? '0 0 20px rgba(190, 255, 1, 0.5)' : 'none',
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Footer Info */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 font-medium">Shift + Enter for new line</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}