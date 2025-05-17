"use client";
import React, { useState, useEffect } from "react";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export default function WaitlistModal({ open, onClose, onSubmit }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setToast(null); // Clear any toast
      setShowSuccess(true);
      setEmail("");
      onSubmit(email);
    } catch (err) {
      setToast({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* Toast */}
      {toast && !showSuccess && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg font-semibold text-white transition-all ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.message}
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold disabled:opacity-40"
          onClick={() => { if (!showSuccess) onClose(); }}
          aria-label="Close"
          disabled={showSuccess}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Join the Waitlist</h2>
        {showSuccess ? (
          <div className="text-green-600 text-center font-semibold py-8 text-lg">Thank you for joining the waitlist!</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#53b81a] text-lg text-gray-900 placeholder-gray-500"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            {error && <div className="text-red-600 text-sm text-center font-medium">{error}</div>}
            <button
              type="submit"
              className="bg-[#53b81a] hover:bg-[#478f16] text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Joining..." : "Join Waitlist"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}