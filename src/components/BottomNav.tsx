import React from 'react';
import { Home, BookOpen, CheckSquare, Newspaper, Crown, User, Smartphone } from 'lucide-react';
import { Tab, Language } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  onSelectTab: (tab: Tab) => void;
  language: Language;
  freeModeOn: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  language,
  freeModeOn
}) => {
  const tabs = [
    {
      id: 'home' as Tab,
      label: language === 'hi' ? 'होम' : 'Home',
      icon: Home,
    },
    {
      id: 'courses' as Tab,
      label: language === 'hi' ? 'कोर्स' : 'Courses',
      icon: BookOpen,
    },
    {
      id: 'quiz' as Tab,
      label: language === 'hi' ? 'टेस्ट' : 'Tests',
      icon: CheckSquare,
      badge: 'LIVE',
    },
    {
      id: 'current' as Tab,
      label: language === 'hi' ? 'करंट' : 'CA',
      icon: Newspaper,
    },
    {
      id: 'subscription' as Tab,
      label: language === 'hi' ? (freeModeOn ? 'फ्री पास' : 'प्लान') : (freeModeOn ? 'Free Pass' : 'Plans'),
      icon: Crown,
      highlight: true,
    },
    {
      id: 'android' as Tab,
      label: 'APK',
      icon: Smartphone,
    },
    {
      id: 'profile' as Tab,
      label: language === 'hi' ? 'प्रोफाइल' : 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-100 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-safe md:max-w-2xl md:mx-auto md:rounded-t-3xl">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          if (tab.highlight) {
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className="relative -top-3.5 flex flex-col items-center focus:outline-none transition-transform active:scale-95 group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-tr from-[#0284C7] to-[#0EA5E9] text-white ring-4 ring-sky-100 shadow-sky-500/30'
                      : 'bg-gradient-to-tr from-[#F97316] to-[#FF8A4C] text-white shadow-orange-500/30 group-hover:scale-105'
                  }`}
                >
                  <Icon className="w-5 h-5 fill-current" />
                </div>
                <span className="text-[10px] font-bold mt-1 text-slate-800">
                  {tab.label}
                </span>
                <span className="absolute -top-1 px-1.5 py-0.2 rounded-full bg-emerald-500 text-[8px] font-extrabold text-white tracking-wider animate-pulse">
                  ₹0
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-[#0284C7]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 rounded-full bg-rose-500 text-[8px] font-black text-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-[#0284C7]' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
