import React from 'react';
import { Sparkles, ArrowRight, Play, CheckCircle, Flame, Trophy, Users, BookOpen, Star, ChevronRight, Award } from 'lucide-react';
import { Tab, Language, Course, Category } from '../types';
import { categories, topperTestimonials } from '../data/mockData';

interface HomeTabProps {
  language: Language;
  courses: Course[];
  freeModeOn: boolean;
  onSelectTab: (tab: Tab) => void;
  onOpenCourse: (course: Course) => void;
  onOpenSubscription: () => void;
  streakDays: number;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  language,
  courses,
  freeModeOn,
  onSelectTab,
  onOpenCourse,
  onOpenSubscription,
  streakDays
}) => {
  const continueCourse = courses[0]; // SSC CGL Complete

  return (
    <div className="space-y-6 pb-24">
      {/* Launch Offer Top Hero Banner */}
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] p-5 sm:p-6 text-white shadow-[0_8px_30px_rgba(2,132,199,0.22)]">
        {/* Glow effects & sparkles */}
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-white/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-32 h-32 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold border border-white/25">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'hi' ? 'महा धमाका ऑफर • 100% फ्री' : 'SPECIAL LAUNCH OFFER • 100% FREE'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
              {language === 'hi'
                ? 'SSC, रेलवे और बिहार परीक्षाओं में Rank #1 पक्की करें!'
                : 'Crack SSC, Railway & Bihar Exams with All-India Rank #1!'}
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 font-medium">
              {language === 'hi'
                ? 'कूपन LAUNCH100 लगाएं या "Free Mode" चालू करें — सभी वीडियो लेक्चर्स व टेस्ट सीरीज ₹0 में अनलॉक।'
                : 'Use coupon LAUNCH100 or toggle Free Mode to access all premium video batches & mock test series for ₹0.'}
            </p>
          </div>

          <div className="flex flex-row md:flex-col items-center sm:items-start gap-2.5">
            <button
              onClick={onOpenSubscription}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#FF8A4C] hover:from-[#EA580C] hover:to-[#F97316] text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-orange-500/30 transition-transform active:scale-95"
            >
              <span>{freeModeOn ? (language === 'hi' ? 'फ्री पास एक्टिव देखें' : 'View Free Pass') : (language === 'hi' ? '₹0 में अनलॉक करें' : 'Unlock for ₹0')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-[11px] font-semibold text-sky-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{language === 'hi' ? '42,000+ छात्र लाइव पढ़ रहे हैं' : '42,000+ active aspirants'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Slider / Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{language === 'hi' ? 'प्रमुख श्रेणियां' : 'Top Exam Categories'}</span>
          </h2>
          <button
            onClick={() => onSelectTab('courses')}
            className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-0.5"
          >
            <span>{language === 'hi' ? 'सभी देखें' : 'View All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {categories.map((cat: Category) => (
            <button
              key={cat.id}
              onClick={() => {
                if (cat.id === 'ca') onSelectTab('current');
                else if (cat.id === 'mock') onSelectTab('quiz');
                else onSelectTab('courses');
              }}
              className="group relative overflow-hidden rounded-[20px] bg-white p-3.5 text-left border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-all active:scale-95 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {cat.count}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 group-hover:text-[#0284C7] transition-colors">
                  {language === 'hi' ? cat.labelHi : cat.label}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  {cat.id === 'state' ? 'BPSC • BSSC' : cat.id === 'ssc' ? 'CGL • CHSL • MTS' : 'Live Batches'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Learning Card */}
      {continueCourse && (
        <div className="rounded-[24px] bg-white p-4 sm:p-5 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-[#0EA5E9] fill-[#0EA5E9]" />
              {language === 'hi' ? 'पढ़ाई जारी रखें' : 'Continue Learning'}
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              68% {language === 'hi' ? 'पूर्ण' : 'Completed'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                {language === 'hi' ? continueCourse.titleHi : continueCourse.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'hi' ? 'वर्तमान पाठ: प्रतिशत की अवधारणा और 10-सेकंड ट्रिक्स' : 'Current Lesson: Percentage Concepts & 10-sec Tricks'}
              </p>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2 max-w-md overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${continueCourse.progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => onOpenCourse(continueCourse)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{language === 'hi' ? 'लेक्चर देखें' : 'Resume Lesson'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Daily Target Quest Widget */}
      <div className="rounded-[24px] bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold">
                {language === 'hi' ? 'आज का दैनिक लक्ष्य (Daily Target)' : "Today's Study Quest"}
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'hi' ? 'लगातार 14 दिन पूरे करने पर 1 फ्री टेस्ट' : 'Complete 3 tasks to maintain your streak'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full border border-amber-400/20">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>{streakDays} {language === 'hi' ? 'दिन स्ट्रीक' : 'Streak'}</span>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span className="text-xs font-semibold">
                {language === 'hi' ? 'आज का करंट अफेयर्स पढ़ें' : 'Read 12 Oct Current Affairs'}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/20 px-2 py-0.5 rounded-full">
              {language === 'hi' ? 'पूर्ण' : 'Done'}
            </span>
          </div>

          <div
            onClick={() => onSelectTab('quiz')}
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full border-2 border-slate-500" />
              <span className="text-xs font-semibold">
                {language === 'hi' ? '15 मैथ्स व रीजनिंग प्रश्न हल करें (8/15)' : 'Solve 15 Maths & Reasoning Questions (8/15)'}
              </span>
            </div>
            <span className="text-[10px] font-bold text-amber-400">
              {language === 'hi' ? 'जारी रखें' : 'Continue'}
            </span>
          </div>

          <div
            onClick={() => onSelectTab('quiz')}
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full border-2 border-slate-500" />
              <span className="text-xs font-semibold">
                {language === 'hi' ? 'RRB NTPC स्पीड टेस्ट #04 दें' : 'Attempt RRB NTPC Speed Test #04'}
              </span>
            </div>
            <span className="text-[10px] font-bold text-sky-400">
              {language === 'hi' ? 'शुरू करें' : 'Start'}
            </span>
          </div>
        </div>
      </div>

      {/* Featured Courses Carousel / Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              {language === 'hi' ? '🔥 लोकप्रिय ऑनलाइन बैचेस' : '🔥 Popular Exam Batches'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'भारत के सर्वश्रेष्ठ शिक्षकों द्वारा निर्मित' : 'Taught by top educators & ex-officers'}
            </p>
          </div>
          <button
            onClick={() => onSelectTab('courses')}
            className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-0.5"
          >
            <span>{language === 'hi' ? 'सभी 24+ कोर्स' : 'All 24+ Courses'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((course) => {
            const isUnlocked = freeModeOn || !course.pro;
            return (
              <div
                key={course.id}
                onClick={() => onOpenCourse(course)}
                className="group cursor-pointer rounded-[24px] bg-white border border-slate-100 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  {/* Tag and Rating Header */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm">
                      {course.tag}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{course.rating}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({course.students})</span>
                    </div>
                  </div>

                  {/* Gradient Card Accent & Title */}
                  <div className="relative mb-3">
                    <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#0284C7] transition-colors leading-snug">
                      {language === 'hi' ? course.titleHi : course.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {course.instructor}
                    </p>
                  </div>

                  {/* Meta stats */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      {course.lessons} {language === 'hi' ? 'पाठ' : 'Lessons'}
                    </span>
                    <span>•</span>
                    <span>{course.hours}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold">
                      {language === 'hi' ? 'हैंडरिटन नोट्स' : 'PDF Notes'}
                    </span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    {isUnlocked ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-emerald-600">FREE</span>
                        <span className="text-[11px] text-slate-400 line-through">{course.originalPrice}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-slate-900">{course.price}</span>
                        <span className="text-[11px] text-slate-400 line-through">{course.originalPrice}</span>
                      </div>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] group-hover:translate-x-1 transition-transform">
                    <span>{language === 'hi' ? 'देखें' : 'Explore'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live All-India Test Callout */}
      <div className="rounded-[24px] bg-gradient-to-r from-purple-700 via-indigo-600 to-sky-600 p-5 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span>LIVE ALL-INDIA MOCK TEST</span>
          </div>
          <h3 className="text-base sm:text-lg font-black">
            {language === 'hi' ? 'SSC CGL 2026 ऑल-इंडिया लाइव मॉक टेस्ट #01' : 'SSC CGL 2026 All-India Live Mock #01'}
          </h3>
          <p className="text-xs text-purple-100">
            {language === 'hi'
              ? 'असली परीक्षा पैटर्न, ऑल इंडिया रैंक और विस्तृत व्याख्या के साथ।'
              : 'Exact exam interface with All-India percentile & step-by-step solutions.'}
          </p>
        </div>

        <button
          onClick={() => onSelectTab('quiz')}
          className="px-5 py-2.5 rounded-xl bg-white text-purple-900 hover:bg-purple-50 text-xs font-extrabold shadow-md transition-transform active:scale-95 text-center"
        >
          {language === 'hi' ? 'फ्री में टेस्ट दें' : 'Take Free Test'}
        </button>
      </div>

      {/* Toppers Testimonial Section */}
      <div>
        <div className="mb-3 px-1">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#0EA5E9]" />
            <span>{language === 'hi' ? 'हमारे टॉपर्स की जुबानी' : 'EduRank Topper Success Stories'}</span>
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'hi' ? 'पटना, प्रयागराज, दिल्ली के सफल छात्रों का अनुभव' : 'From Patna, Prayagraj & Delhi study circles'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {topperTestimonials.map((t, idx) => (
            <div key={idx} className="rounded-[20px] bg-white p-4 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">{t.name}</h4>
                  <p className="text-[10px] text-emerald-600 font-bold">{t.exam}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-100">
                <span>📍 {t.city}</span>
                <span className="text-amber-500 font-bold">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
