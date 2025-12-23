'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, MessageSquare, Bot, ArrowRight, Globe, Zap } from 'lucide-react';

interface Message {
    role: 'user' | 'model';
    text: string;
}

export default function BidayalabAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isWelcomeOpen, setIsWelcomeOpen] = useState(false); // New state for centered welcome
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize and check for first visit
    useEffect(() => {
        const visited = localStorage.getItem('bidayalab_v2_visited'); // New key for fresh test

        if (!visited) {
            // New user: Show Centered Welcome Modal after a short delay
            const timer = setTimeout(() => {
                setIsWelcomeOpen(true);
            }, 3000); // 3 seconds delay for "pop" effect
            return () => clearTimeout(timer);
        } else {
            // Returning user: Just show small notification dot or nothing
            if (messages.length === 0) {
                setMessages([{ role: 'model', text: "Welcome back! Ready to continue building your vision?" }]);
            }
        }
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleStartChat = () => {
        setIsWelcomeOpen(false);
        setIsOpen(true);
        localStorage.setItem('bidayalab_v2_visited', 'true');
        setMessages([{ role: 'model', text: "👋 Hi there! I'm your Bidayalab Creative Assistant. I speak your language! How can I help you scale today?" }]);
    };

    const handleDismissWelcome = () => {
        setIsWelcomeOpen(false);
        localStorage.setItem('bidayalab_v2_visited', 'true');
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Filter out the initial welcome message from history to prevent "User must start" errors
            const history = messages
                .filter((_, i) => i > 0 || messages[0].role !== 'model')
                .map(m => ({
                    role: m.role,
                    parts: [{ text: m.text }]
                }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    history: history
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Failed to fetch response');
            }

            if (data.response) {
                setMessages(prev => [...prev, { role: 'model', text: data.response }]);
            } else {
                throw new Error('No response content');
            }
        } catch (error: any) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'model', text: `Connection error: ${error.message || "Please try again."}` }]);
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
            {/* CENTERED WELCOME MODAL FOR FIRST TIME VISITORS */}
            <AnimatePresence>
                {isWelcomeOpen && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: "spring", duration: 0.6 }}
                            className="relative w-full max-w-lg"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#beff01]/30 via-purple-500/20 to-[#beff01]/30 blur-2xl rounded-3xl" />

                            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 overflow-hidden shadow-2xl">
                                {/* Close Button */}
                                <button
                                    onClick={handleDismissWelcome}
                                    className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="text-center space-y-6">
                                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-[#beff01]/10 border border-[#beff01]/20 mb-4">
                                        <Bot className="w-12 h-12 text-[#beff01]" />
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                                        Hi! I'm Bidayalab AI. <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#beff01] to-emerald-400">
                                            How can I help you?
                                        </span>
                                    </h2>

                                    <p className="text-zinc-400 text-lg leading-relaxed">
                                        I can speak your language 🌍 and answer any question about our services, tech stack, or pricing.
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                                        <button
                                            onClick={handleStartChat}
                                            className="col-span-2 py-4 bg-[#beff01] hover:bg-[#a8e600] text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(190,255,1,0.3)] hover:shadow-[0_0_30px_rgba(190,255,1,0.5)]"
                                        >
                                            Start Chatting
                                            <MessageSquare size={18} className="group-hover:rotate-12 transition-transform" />
                                        </button>
                                        <button
                                            onClick={handleDismissWelcome}
                                            className="col-span-2 py-3 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white font-medium rounded-xl transition-all text-sm border border-white/5 hover:border-white/10"
                                        >
                                            Just Browsing
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* CORNER CHAT WINDOW */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[550px] max-h-[70vh] z-[9999] flex flex-col"
                    >
                        {/* Glass Container */}
                        <div className="relative w-full h-full bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden">

                            {/* Background Atmosphere */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#beff01]/5 to-transparent pointer-events-none" />

                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b border-white/5 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 rounded-xl bg-[#beff01]/10 flex items-center justify-center border border-[#beff01]/20">
                                        <Bot className="w-5 h-5 text-[#beff01]" />
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black rounded-full flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-base">Assistant</h3>
                                        <p className="text-[10px] text-zinc-400">Online & Ready</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                                {messages.length === 0 && (
                                    <div className="text-center mt-10 opacity-50">
                                        <Sparkles className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                                        <p className="text-sm text-zinc-500">Ask me anything about<br />Bidayalab services.</p>
                                    </div>
                                )}
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-lg ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-[#beff01] to-[#a8e600] text-black font-medium rounded-tr-none'
                                            : 'bg-zinc-900/80 border border-white/5 text-zinc-200 rounded-tl-none backdrop-blur-md'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}
                                {loading && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                                        <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-[#beff01] rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-1.5 h-1.5 bg-[#beff01] rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-1.5 h-1.5 bg-[#beff01] rounded-full animate-bounce" />
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-5 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#beff01]/20 to-purple-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                                    <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-2xl focus-within:border-[#beff01]/30 transition-colors">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            placeholder="Type a message..."
                                            className="flex-1 bg-transparent px-4 py-4 text-sm text-white focus:outline-none placeholder:text-zinc-600"
                                        />
                                        <button
                                            onClick={handleSend}
                                            disabled={!input.trim() || loading}
                                            className="m-2 p-2 bg-[#beff01] text-black rounded-xl hover:bg-[#d4ff4d] disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all shadow-lg shadow-[#beff01]/10"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TOGGLE BUTTON */}
            {!isWelcomeOpen && (
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-6 right-6 z-[9990] group"
                >
                    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
                        {/* Rotating gradients */}
                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,_transparent_0%,_#beff01_50%,_transparent_100%)] animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-[2px] bg-[#050505] rounded-full" />

                        {/* Icon */}
                        <div className="relative z-10 text-white group-hover:text-[#beff01] transition-colors">
                            {isOpen ? <X size={28} /> : <Bot size={28} />}
                        </div>
                    </div>
                </motion.button>
            )}
        </>
    );
}
