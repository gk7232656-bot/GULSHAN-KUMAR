import React, { useState } from 'react';
import { Newspaper, Calendar, Download, Bookmark, BookmarkCheck, CheckCircle2, Sparkles, Share2, Tag, ChevronRight } from 'lucide-react';
import { CurrentAffairItem, Language } from '../types';
import { currentAffairsData } from '../data/mockData';

interface CurrentAffairsTabProps {
  language: Language;
  onOpenTestTab: () => void;
}

export const CurrentAffairsTab: React.FC<CurrentAffairsTabProps> = ({
  language,
  onOpenTestTab
}) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [quickQuizAnswers, setQuickQuizAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  const handleDownloadPDF = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3500);
  };

  const caQuestions = [
    {
      id: 1,
      qEn: 'What is the budgetary outlay for India Semiconductor Mission Phase-2 approved in Oct 2026?',
      qHi: 'अक्टूबर 2026 में स्वीकृत भारत सेमीकंडक्टर मिशन चरण-2 का बजटीय परिव्यय क्या है?',
      options: ['₹76,000 Crore', '₹1.25 Lakh Crore', '₹90,000 Crore', '₹2 Lakh Crore'],
      correct: 1
    },
    {
      id: 2,
      qEn: 'Which state completed 100% electrification of agricultural pump sets with dedicated feeders?',
      qHi: 'किस राज्य ने समर्पित फीडरों के साथ कृषि पंप सेटों का 100% विद्युतीकरण पूरा किया?',
      options: ['Uttar Pradesh', 'Bihar', 'Madhya Pradesh', 'Rajasthan'],
      correct: 1
    }
  ];

  const handleSelectQuizOption = (qIdx: number, oIdx: number) => {
    const updated = { ...quickQuizAnswers, [qIdx]: oIdx };
    setQuickQuizAnswers(updated);
    if (Object.keys(updated).length === caQuestions.length) {
      let score = 0;
      caQuestions.forEach((q, idx) => {
        if (updated[idx] === q.correct) score++;
      });
      setQuizScore(score);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-[#DB2777]" />
          <span>{language === 'hi' ? 'दैनिक करंट अफेयर्स एवं मासिक कैप्सूल' : 'Daily Current Affairs & Monthly Capsule'}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          {language === 'hi'
            ? 'एसएससी, रेलवे और बीपीएससी के लिए सटीक परीक्षा-उन्मुख समाचार और दैनिक क्विज'
            : 'Targeted news capsules curated for SSC, Railway & State civil services'}
        </p>
      </div>

      {/* Monthly PDF Capsule Download Banner */}
      <div className="rounded-[24px] bg-gradient-to-r from-[#DB2777] via-[#E11D48] to-[#F43F5E] p-5 text-white shadow-lg shadow-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20">
            {language === 'hi' ? 'अक्टूबर 2026 मासिक पीडीएफ' : 'OCTOBER 2026 MONTHLY PDF'}
          </span>
          <h3 className="text-base sm:text-lg font-black">
            {language === 'hi' ? 'मासिक करंट अफेयर्स महा-बूस्टर (100% फ्री)' : 'EduRank Monthly Current Affairs Booster'}
          </h3>
          <p className="text-xs text-rose-100">
            {language === 'hi'
              ? 'नियुक्तियां, पुरस्कार, खेल, सूचकांक, युद्धाभ्यास और 250+ वस्तुनिष्ठ प्रश्न एक ही पीडीएफ में।'
              : 'Appointments, Sports, Summits, Defense Exercises + 250 Solved MCQs in 1 PDF.'}
          </p>
        </div>

        <div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-rose-700 hover:bg-rose-50 text-xs font-black shadow-md transition-transform active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'hi' ? 'फ्री पीडीएफ डाउनलोड करें' : 'Download Free PDF'}</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{language === 'hi' ? 'अक्टूबर 2026 करंट अफेयर्स पीडीएफ सफलतापूर्वक डाउनलोड हो गया!' : 'October 2026 Capsule PDF downloaded successfully!'}</span>
        </div>
      )}

      {/* Daily Quick CA Quiz Card */}
      <div className="rounded-[24px] bg-white p-5 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center text-[#DB2777]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                {language === 'hi' ? 'आज का 2-मिनट करंट अफेयर्स टेस्ट' : "Today's 2-Min Rapid CA Quiz"}
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'hi' ? 'आज के ताजा घटनाक्रम पर आधारित प्रश्न' : 'Test your daily retention right now'}
              </p>
            </div>
          </div>

          {quizScore !== null && (
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Score: {quizScore}/{caQuestions.length} 🎉
            </span>
          )}
        </div>

        <div className="space-y-4 pt-1">
          {caQuestions.map((q, qIdx) => {
            const userChoice = quickQuizAnswers[qIdx];
            return (
              <div key={q.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
                <p className="text-xs font-bold text-slate-900">
                  Q{qIdx + 1}. {language === 'hi' ? q.qHi : q.qEn}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = userChoice === oIdx;
                    const isCorrect = oIdx === q.correct;
                    let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                    if (userChoice !== undefined) {
                      if (isCorrect) btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                      else if (isSelected) btnStyle = 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectQuizOption(qIdx, oIdx)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-colors flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {userChoice !== undefined && isCorrect && <span className="text-emerald-700">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily News Capsules List */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900 px-1">
          {language === 'hi' ? 'दैनिक समाचार कैप्सूल (परीक्षा विशेष)' : 'Daily News Capsules (Exam-Oriented)'}
        </h3>

        <div className="space-y-3">
          {currentAffairsData.map((item: CurrentAffairItem) => {
            const isBookmarked = bookmarkedIds.has(item.id);
            return (
              <div
                key={item.id}
                className="rounded-[24px] bg-white border border-slate-100 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="text-[10px] font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100">
                      {item.category}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-[#0EA5E9] fill-[#0EA5E9]" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  {language === 'hi' ? item.titleHi : item.titleEn}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'hi' ? item.summaryHi : item.summaryEn}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.tags.map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                    Priority: {item.importance}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
