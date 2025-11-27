"use client";

import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    accept?: string;
}

export default function FileUpload({ value, onChange, label = "Upload File", accept = "image/*,video/*" }: FileUploadProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Upload failed");

            onChange(data.url);
        } catch (err) {
            setError("Failed to upload file");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-zinc-500 tracking-wider">{label}</label>

            {value ? (
                <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/50">
                    {value.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video src={value} className="w-full h-48 object-cover" controls />
                    ) : (
                        <div className="relative h-48 w-full">
                            <Image src={value} alt="Uploaded" fill className="object-cover" />
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <input
                        type="file"
                        onChange={handleUpload}
                        accept={accept}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        disabled={loading}
                    />
                    <div className={`w-full border border-dashed ${error ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 bg-black/30'} rounded-xl p-8 flex flex-col items-center justify-center gap-2 transition-colors hover:bg-white/5`}>
                        {loading ? (
                            <Loader2 size={24} className="animate-spin text-[#beff01]" />
                        ) : (
                            <>
                                <Upload size={24} className="text-zinc-500" />
                                <span className="text-sm text-zinc-400 font-medium">Click to upload</span>
                            </>
                        )}
                    </div>
                </div>
            )}
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}
