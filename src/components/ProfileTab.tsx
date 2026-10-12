import React, { useState } from 'react';
import { User, Flame, Award, Target, CheckCircle2, Crown, Globe, Shield, BookOpen, Share2, MessageCircle, Send, Check } from 'lucide-react';
import { UserState, PlanId, Language } from '../types';

interface ProfileTabProps {
  userState: UserState;
  language: Language;
  onToggleLanguage: () => void;
  onOpenSubscription: () => void;
  onToggleFreeMode: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userState,
  language,
  onToggleLanguage,
  onOpenSubscription,
  onToggleFreeMode
}) => {
  const [selectedTargetExam, setSelectedTargetExam] = useState<string>(userState.targetExam);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const handleShareApp = () => {
    const text = "Main EduRank app par SSC & Railway exams ki taiyari kar raha hu! Free me mocks aur daily CA mil rahe hai. Check it out: " + window.location.href;
    if (navigator.share) {
      navigator.share({
        title: "EduRank App",
        text: text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Profile Card Header */}
      <div className="rounded-[28px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0284C7] to-[#0EA5E9] flex items-center justify-center text-2xl font-black shadow-lg shadow-sky-500/30">
              AK
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center border-2 border-slate-900">
                ★
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black">{userState.name}</h2>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  {userState.freeModeOn ? 'PRO ACTIVE (FREE)' : userState.currentPlan.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Roll No: <span className="font-mono text-slate-300">{userState.rollNo}</span> • Patna Aspirant
              </p>
              <p className="text-xs text-sky-400 font-semibold mt-0.5">
                Target: {selectedTargetExam}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSubscription}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'hi' ? 'प्लान मैनेज करें' : 'Manage Plan'}</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-[22px] bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Study Streak</span>
            <Flame className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
          </div>
          <p className="text-2xl font-black text-slate-900">{userState.streakDays} Days</p>
          <span className="text-[10px] text-emerald-600 font-bold">Top 2% consistent</span>
        </div>

        <div className="p-4 rounded-[22px] bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Questions</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{userState.questionsSolved}</p>
          <span className="text-[10px] text-slate-400 font-medium">Solved this month</span>
        </div>

        <div className="p-4 rounded-[22px] bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</span>
            <Target className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{userState.accuracy}%</p>
          <span className="text-[10px] text-emerald-600 font-bold">+5% vs last week</span>
        </div>

        <div className="p-4 rounded-[22px] bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">All-India Rank</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-[#0284C7]">#{userState.rank}</p>
          <span className="text-[10px] text-slate-400 font-medium">Among 42k students</span>
        </div>
      </div>

      {/* Target Exam Selection */}
      <div className="rounded-[24px] bg-white p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900">
          {language === 'hi' ? '🎯 आपका मुख्य लक्ष्य (Target Exam)' : '🎯 Target Exam Preference'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { id: 'SSC CGL 2026', label: 'SSC CGL & CHSL 2026' },
            { id: 'RRB NTPC & Group D', label: 'Railway RRB NTPC + Group D' },
            { id: 'Bihar BPSC / BSSC', label: 'Bihar BPSC & BSSC CGL 4th' },
          ].map((exam) => (
            <button
              key={exam.id}
              onClick={() => setSelectedTargetExam(exam.id)}
              className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                selectedTargetExam === exam.id
                  ? 'bg-sky-50 border-[#0284C7] text-[#0284C7]'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {exam.label}
            </button>
          ))}
        </div>
      </div>

      {/* Settings & Preferences */}
      <div className="rounded-[24px] bg-white p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900">
          {language === 'hi' ? 'सेटिंग्स एवं प्राथमिकताएं' : 'Settings & Preferences'}
        </h3>

        <div className="divide-y divide-slate-100">
          {/* Language Switch */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Globe className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{language === 'hi' ? 'भाषा (Language)' : 'App Language'}</p>
                <span className="text-[10px] text-slate-400">
                  {language === 'hi' ? 'वर्तमान: हिन्दी' : 'Current: English'}
                </span>
              </div>
            </div>

            <button
              onClick={onToggleLanguage}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
            >
              {language === 'hi' ? 'Switch to English' : 'हिन्दी में बदलें'}
            </button>
          </div>

          {/* Free Mode Toggle */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{language === 'hi' ? 'फ्री लॉन्च मोड' : 'Free Launch Mode'}</p>
                <span className="text-[10px] text-slate-400">
                  {userState.freeModeOn ? 'All courses & tests unlocked for ₹0' : 'Standard pricing'}
                </span>
              </div>
            </div>

            <button
              onClick={onToggleFreeMode}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                userState.freeModeOn
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {userState.freeModeOn ? 'ON (Active)' : 'OFF'}
            </button>
          </div>

          {/* Share App */}
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{language === 'hi' ? 'मित्रों को शेयर करें' : 'Refer Aspirants'}</p>
                <span className="text-[10px] text-slate-400">
                  {language === 'hi' ? 'शेयर करने पर 5 फ्री मॉक टेस्ट पाएं' : 'Get 5 free mocks per referral'}
                </span>
              </div>
            </div>

            <button
              onClick={handleShareApp}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm"
            >
              {copiedShare ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedShare ? 'Copied Link' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Community Links (WhatsApp / Telegram) */}
      <div className="rounded-[24px] bg-white p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900">
          {language === 'hi' ? 'जुड़ें EduRank स्टडी कम्युनिटी से' : 'Join EduRank Study Circles'}
        </h3>
        <p className="text-xs text-slate-500">
          {language === 'hi'
            ? 'डेली क्विज, परीक्षा नोटिस और टॉपर्स डिस्कशन के लिए आधिकारिक चैनलों से जुड़ें:'
            : 'Get daily PDF notes, answer keys and discuss doubts directly with educators:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 transition-colors"
          >
            <Send className="w-5 h-5 text-sky-600" />
            <div>
              <p className="text-xs font-black">Telegram Channel</p>
              <span className="text-[10px] text-sky-700">85,000+ SSC & Railway Aspirants</span>
            </div>
          </a>

          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="text-xs font-black">WhatsApp Study Group</p>
              <span className="text-[10px] text-emerald-700">Daily GK & Notes Updates</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
