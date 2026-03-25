'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, ArrowRight, Bot } from 'lucide-react';

interface Message {
    role: 'user' | 'model';
    text: string;
}

export default function BidayalabAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Show popup on load and every 1 minute
    useEffect(() => {
        // Show on first load after 3 seconds
        const initialTimer = setTimeout(() => {
            if (!isOpen) setShowToast(true);
        }, 3000);

        // Show every 1 minute
        const intervalTimer = setInterval(() => {
            if (!isOpen) setShowToast(true);
        }, 60000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(intervalTimer);
        };
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleOpenChat = () => {
        setShowToast(false);
        setIsOpen(true);
    };

    const handleDismissToast = () => {
        setShowToast(false);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const history = messages
                .filter((_, i) => i > 0 || messages[0].role !== 'model')
                .map(m => ({ role: m.role, parts: [{ text: m.text }] }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input, history }),
            });

            const data = await response.json();
            if (data.response) {
                setMessages(prev => [...prev, { role: 'model', text: data.response }]);
            }
        } catch {
            setMessages(prev => [...prev, { role: 'model', text: "Oops! Something went wrong." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* CORNER TOAST */}
            <AnimatePresence>
                {showToast && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="fixed bottom-24 right-4 md:right-6 z-[9998] max-w-[260px]"
                    >
                        <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
                            <button onClick={handleDismissToast} aria-label="Dismiss notification" className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-white">
                                <X size={14} />
                            </button>
                            <p className="text-white text-sm font-louis font-bold">Need help?</p>
                            <p className="text-zinc-400 text-xs mt-1 font-louis">I can answer your questions.</p>
                            <button onClick={handleOpenChat} className="w-full mt-3 py-2 bg-[#beff01] text-black font-louis font-bold text-xs uppercase rounded-lg flex items-center justify-center gap-2">
                                Chat Now <ArrowRight size={12} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CHAT WINDOW */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-[400px] h-[540px] max-h-[75vh] z-[9999]"
                    >
                        <div className="w-full h-full bg-[#0a0a0a] rounded-[24px] flex flex-col overflow-hidden border border-white/5">

                            {/* Header */}
                            <div className="relative p-5 border-b border-white/5 bg-gradient-to-r from-[#beff01]/5 to-transparent">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-11 h-11 bg-[#beff01] rounded-xl flex items-center justify-center">
                                                <Bot className="w-6 h-6 text-black" strokeWidth={2.5} />
                                            </div>
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center">
                                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-louis font-bold text-white text-sm">Bidayalab AI</h3>
                                            <p className="text-[11px] text-zinc-400 font-louis">Ready to help you grow</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" aria-live="polite" aria-relevant="additions">
                                {/* Welcome Message */}
                                {messages.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        {/* Welcome Card */}
                                        <div className="bg-gradient-to-br from-[#beff01]/10 to-transparent border border-[#beff01]/20 rounded-2xl p-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-8 h-8 bg-[#beff01] rounded-lg flex items-center justify-center">
                                                    <Bot className="w-4 h-4 text-black" strokeWidth={2.5} />
                                                </div>
                                                <span className="text-[#beff01] font-louis font-bold text-sm">Welcome!</span>
                                            </div>
                                            <p className="text-white font-louis text-base leading-relaxed">
                                                Hey there! 👋 I&apos;m your Bidayalab AI assistant.
                                            </p>
                                            <p className="text-zinc-400 font-louis text-sm mt-2 leading-relaxed">
                                                I can help you with questions about our services or anything else. Just type below!
                                            </p>
                                        </div>

                                        {/* Badge */}
                                        <div className="flex items-center justify-center text-zinc-500 text-xs font-louis">
                                            <span>Powered by AI • Instant responses</span>
                                        </div>
                                    </motion.div>
                                )}

                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.role === 'model' ? (
                                            <div className="flex gap-2 max-w-[85%]">
                                                <div className="w-6 h-6 rounded-md bg-[#beff01] flex items-center justify-center flex-shrink-0 mt-1">
                                                    <Bot className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
                                                </div>
                                                <div className="bg-zinc-900 px-4 py-3 rounded-2xl rounded-tl-md text-sm font-louis text-zinc-200 leading-relaxed">
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-[#beff01] px-4 py-3 rounded-2xl rounded-tr-md max-w-[85%] text-sm font-louis text-black font-medium">
                                                {msg.text}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {loading && (
                                    <div className="flex gap-2" role="status" aria-label="Loading response">
                                        <div className="w-6 h-6 rounded-md bg-[#beff01] flex items-center justify-center">
                                            <Bot className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
                                        </div>
                                        <div className="bg-zinc-900 px-4 py-3 rounded-2xl rounded-tl-md flex gap-1">
                                            <span className="w-2 h-2 bg-[#beff01] rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-2 h-2 bg-[#beff01] rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-2 h-2 bg-[#beff01] rounded-full animate-bounce" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-black/50">
                                <div className="flex items-center gap-2 bg-zinc-900 rounded-2xl px-4 py-2 border border-white/5 focus-within:border-[#beff01]/30 transition-colors">
                                    <label htmlFor="chat-input" className="sr-only">Chat message</label>
                                    <input
                                        id="chat-input"
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder="Ask me anything..."
                                        className="flex-1 bg-transparent py-2 text-sm text-white font-louis focus:outline-none placeholder:text-zinc-600"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || loading}
                                        aria-label="Send message"
                                        className="w-10 h-10 bg-[#beff01] rounded-xl flex items-center justify-center text-black hover:bg-[#d4ff4d] disabled:opacity-30 disabled:bg-zinc-800 transition-all"
                                    >
                                        <Send size={16} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ROBOT ICON BUTTON */}
            <motion.button
                id="bidayalab-assistant-widget"
                onClick={() => { setShowToast(false); setIsOpen(!isOpen); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
                aria-expanded={isOpen}
                className="fixed bottom-6 right-4 md:right-6 z-[9990]"
            >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#beff01] rounded-2xl flex items-center justify-center transition-all">
                    {isOpen ? (
                        <X size={24} strokeWidth={2.5} className="text-black" />
                    ) : (
                        <Bot size={26} strokeWidth={2.5} className="text-black" />
                    )}
                </div>
            </motion.button>
        </>
    );
}
