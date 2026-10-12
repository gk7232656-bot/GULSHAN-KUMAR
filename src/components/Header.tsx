import React, { useState } from 'react';
import { Flame, Bell, Globe, Sparkles, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  streakDays: number;
  freeModeOn: boolean;
  onOpenSubscription: () => void;
  onOpenAndroid: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  streakDays,
  freeModeOn,
  onOpenSubscription,
  onOpenAndroid
}) => {
  const { isInstallable, install } = usePWAInstall();
  const [showNotifications, setShowNotifications] = useState(false);

  const notices = [
    { id: 1, title: language === 'hi' ? '🚨 SSC CGL 2026: फॉर्म भरने की अंतिम तिथि 20 अक्टूबर!' : '🚨 SSC CGL 2026: Form application closes on 20th Oct!', time: '10m ago' },
    { id: 2, title: language === 'hi' ? '🚆 RRB NTPC: 35,000+ पदों की परीक्षा तिथि घोषित' : '🚆 RRB NTPC: Exam dates announced for 35,000+ vacancies', time: '2h ago' },
    { id: 3, title: language === 'hi' ? '🎉 लॉन्च ऑफर: LAUNCH100 कूपन से सभी कोर्स फ्री अनलॉक करें' : '🎉 Launch Offer: Unlock all courses free with LAUNCH100 coupon', time: 'Today' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] flex items-center justify-center shadow-md shadow-sky-500/20 overflow-hidden">
            <span className="text-white text-xl font-black tracking-tight">E</span>
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-300 animate-ping opacity-75" />
            <div className="absolute -bottom-1 -right-1 text-xs">⭐</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-slate-900 bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] bg-clip-text text-transparent">
                EduRank
              </span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                PRO
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {language === 'hi' ? 'एसएससी • रेलवे • बिहार' : 'SSC • Railway • Bihar'}
            </p>
          </div>
        </div>

        {/* Right Action Icons & Toggles */}
        <div className="flex items-center gap-2">
          {/* Free Mode Launch Offer Pill */}
          <button
            onClick={onOpenSubscription}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
              freeModeOn
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                : 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {freeModeOn ? (
              <span>{language === 'hi' ? 'फ्री मोड एक्टिव 🎉' : 'Free Mode Active 🎉'}</span>
            ) : (
              <span>{language === 'hi' ? 'लॉन्च ऑफर ₹0' : 'Launch Offer ₹0'}</span>
            )}
          </button>

          {/* Daily Streak */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold shadow-sm"
            title="Daily Study Streak"
          >
            <Flame className="w-3.5 h-3.5 text-[#F97316] fill-[#F97316] animate-pulse" />
            <span>{streakDays} {language === 'hi' ? 'दिन' : 'Days'}</span>
          </div>

          {/* Bilingual Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors border border-slate-200"
            title="Toggle Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            <span>{language === 'hi' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* In-app PWA install button (if installable) */}
          {isInstallable && (
            <button
              onClick={install}
              className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white text-xs font-bold shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F97316]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-xs font-bold text-slate-900">
                    {language === 'hi' ? 'परीक्षा सूचनाएं व अलर्ट' : 'Exam Alerts & Updates'}
                  </span>
                  <span className="text-[10px] text-sky-600 font-semibold cursor-pointer" onClick={() => setShowNotifications(false)}>
                    {language === 'hi' ? 'बंद करें' : 'Close'}
                  </span>
                </div>
                <div className="space-y-2">
                  {notices.map((n) => (
                    <div key={n.id} className="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 transition-colors">
                      <p className="text-xs font-medium text-slate-800 leading-snug">{n.title}</p>
                      <span className="text-[10px] text-slate-400 font-semibold">{n.time}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onOpenAndroid();
                  }}
                  className="w-full mt-3 py-1.5 text-center text-xs font-bold text-sky-600 hover:bg-sky-50 rounded-xl"
                >
                  {language === 'hi' ? '📲 एंड्रॉइड ऐप डाउनलोड करें' : '📲 Download Android APK'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
