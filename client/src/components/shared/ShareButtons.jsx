import React, { useState } from 'react';
import { Copy, MessageCircle, Check, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const ShareButtons = ({ shareUrl, title = 'Check out my travel itinerary!' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const shareText = encodeURIComponent(`${title}\n${shareUrl}`);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-white/60 font-medium">Share itinerary with friends:</p>
      <div className="flex flex-wrap gap-2">
        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/10 rounded-xl transition-all duration-200 text-sm font-semibold cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl transition-all duration-200 text-sm font-semibold cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        {/* Twitter/X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 rounded-xl transition-all duration-200 text-sm font-semibold cursor-pointer"
        >
          {/* Custom elegant SVG for X (formerly Twitter) logo */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>Twitter / X</span>
        </a>
      </div>
    </div>
  );
};

export default ShareButtons;
