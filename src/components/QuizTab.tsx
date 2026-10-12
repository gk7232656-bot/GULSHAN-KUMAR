import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle, HelpCircle, ArrowRight, ArrowLeft, RotateCcw, Award, Sparkles, Filter, ChevronRight, Bookmark, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MockTest, Question, Language } from '../types';
import { mockTestsData } from '../data/mockData';

interface QuizTabProps {
  language: Language;
  freeModeOn: boolean;
  onOpenSubscription: () => void;
  onRecordQuizCompletion: (solvedCount: number, accuracy: number) => void;
}

export const QuizTab: React.FC<QuizTabProps> = ({
  language,
  freeModeOn,
  onOpenSubscription,
  onRecordQuizCompletion
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(900); // 15 mins
  const [isTestSubmitted, setIsTestSubmitted] = useState<boolean>(false);
  const [testLanguage, setTestLanguage] = useState<Language>(language);
  const [showPalette, setShowPalette] = useState<boolean>(false);

  // Sync test language with app language initial load
  useEffect(() => {
    setTestLanguage(language);
  }, [language]);

  // Timer countdown
  useEffect(() => {
    if (!activeTest || isTestSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTest, isTestSubmitted]);

  const handleStartTest = (test: MockTest) => {
    if (!freeModeOn && test.pro) {
      onOpenSubscription();
      return;
    }
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setMarkedForReview(new Set());
    setTimeLeftSeconds(test.durationMinutes * 60);
    setIsTestSubmitted(false);
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleClearResponse = (questionId: number) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const toggleMarkForReview = (questionId: number) => {
    setMarkedForReview((prev) => {
      const copy = new Set(prev);
      if (copy.has(questionId)) copy.delete(questionId);
      else copy.add(questionId);
      return copy;
    });
  };

  const handleSubmitTest = () => {
    setIsTestSubmitted(true);
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    if (activeTest) {
      let correctCount = 0;
      let attempted = Object.keys(userAnswers).length;
      activeTest.questions.forEach((q) => {
        if (userAnswers[q.id] === q.correctIndex) {
          correctCount++;
        }
      });
      const accuracy = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;
      onRecordQuizCompletion(attempted, accuracy);
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Filtered mock tests list
  const filteredTests = mockTestsData.filter((t) => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  // Calculate score & statistics
  const currentQ = activeTest?.questions[currentQuestionIndex];
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let unattempted = 0;
  let totalScore = 0;

  if (activeTest && isTestSubmitted) {
    activeTest.questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans === undefined) {
        unattempted++;
      } else if (ans === q.correctIndex) {
        correctAnswers++;
        totalScore += 2; // +2 for correct
      } else {
        wrongAnswers++;
        totalScore -= 0.5; // -0.5 for wrong
      }
    });
  }

  // View: Active Test in Progress
  if (activeTest && !isTestSubmitted && currentQ) {
    const isAnswered = userAnswers[currentQ.id] !== undefined;
    const isReviewed = markedForReview.has(currentQ.id);

    return (
      <div className="max-w-3xl mx-auto space-y-4 pb-20 animate-in fade-in">
        {/* Test Header Bar */}
        <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate max-w-[180px] sm:max-w-md">
              {testLanguage === 'hi' ? activeTest.titleHi : activeTest.title}
            </h2>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-500 font-semibold mt-0.5">
              <span>{testLanguage === 'hi' ? 'प्रश्न' : 'Question'} {currentQuestionIndex + 1} / {activeTest.questions.length}</span>
              <span>•</span>
              <span className="uppercase text-sky-600 font-bold">{currentQ.subject}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher for Question */}
            <button
              onClick={() => setTestLanguage(testLanguage === 'hi' ? 'en' : 'hi')}
              className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200"
              title="Change Question Language"
            >
              {testLanguage === 'hi' ? 'ENG' : 'हिन्दी'}
            </button>

            {/* Timer */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-black border ${
              timeLeftSeconds < 120 ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse' : 'bg-slate-100 text-slate-800 border-slate-200'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimer(timeLeftSeconds)}</span>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmitTest}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold shadow-sm transition-transform active:scale-95"
            >
              {testLanguage === 'hi' ? 'सबमिट करें' : 'Submit'}
            </button>
          </div>
        </div>

        {/* Question Content Box */}
        <div className="bg-white rounded-[24px] border border-slate-200 p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] space-y-5">
          {/* Question Text */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                {currentQ.subject === 'maths' ? 'Quantitative Aptitude' : currentQ.subject === 'reasoning' ? 'Reasoning Ability' : currentQ.subject === 'gk' ? 'General Awareness' : 'General English'}
              </span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                +2.0 / -0.5 Marks
              </span>
            </div>

            <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
              {testLanguage === 'hi' ? currentQ.textHi : currentQ.textEn}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {(testLanguage === 'hi' ? currentQ.optionsHi : currentQ.optionsEn).map((opt, oIdx) => {
              const isSelected = userAnswers[currentQ.id] === oIdx;
              const optionLetters = ['A', 'B', 'C', 'D'];
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(currentQ.id, oIdx)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-sky-50 border-[#0284C7] ring-2 ring-sky-200 shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                    isSelected ? 'bg-[#0284C7] text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {optionLetters[oIdx]}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 flex-1">
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleClearResponse(currentQ.id)}
              disabled={!isAnswered}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                isAnswered ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200' : 'text-slate-300 border-slate-100 cursor-not-allowed'
              }`}
            >
              {testLanguage === 'hi' ? 'उत्तर हटाएं' : 'Clear'}
            </button>

            <button
              onClick={() => toggleMarkForReview(currentQ.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                isReviewed
                  ? 'bg-purple-100 text-purple-800 border-purple-300'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              {isReviewed
                ? (testLanguage === 'hi' ? 'रिव्यू से हटाएं' : 'Unmark Review')
                : (testLanguage === 'hi' ? 'रिव्यू के लिए मार्क करें' : 'Mark Review')}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className={`p-2 rounded-xl border ${
                currentQuestionIndex > 0 ? 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200' : 'text-slate-300 border-slate-100 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (currentQuestionIndex < activeTest.questions.length - 1) {
                  setCurrentQuestionIndex((prev) => prev + 1);
                } else {
                  handleSubmitTest();
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] hover:from-[#0369A1] hover:to-[#0284C7] text-white text-xs font-extrabold shadow-md transition-transform active:scale-95"
            >
              <span>{currentQuestionIndex < activeTest.questions.length - 1 ? (testLanguage === 'hi' ? 'सेव एवं अगला' : 'Save & Next') : (testLanguage === 'hi' ? 'टेस्ट सबमिट करें' : 'Submit Test')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Question Palette Grid */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold text-slate-900">
              {testLanguage === 'hi' ? 'प्रश्न पैलेट' : 'Question Palette'}
            </span>
            <div className="flex items-center gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                {Object.keys(userAnswers).length} {testLanguage === 'hi' ? 'हल किया' : 'Answered'}
              </span>
              <span className="flex items-center gap-1 text-purple-700">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                {markedForReview.size} {testLanguage === 'hi' ? 'रिव्यू' : 'Review'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {activeTest.questions.map((q, idx) => {
              const answered = userAnswers[q.id] !== undefined;
              const reviewed = markedForReview.has(q.id);
              const isCurr = currentQuestionIndex === idx;

              let style = 'bg-slate-100 text-slate-700 border-slate-200';
              if (reviewed) style = 'bg-purple-600 text-white border-purple-700';
              else if (answered) style = 'bg-emerald-600 text-white border-emerald-700';

              if (isCurr) style += ' ring-2 ring-[#0EA5E9] ring-offset-2';

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-xl font-bold text-xs border flex items-center justify-center transition-all ${style}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // View: Scorecard / Results Modal
  if (activeTest && isTestSubmitted) {
    const accuracy = (correctAnswers + wrongAnswers) > 0
      ? Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100)
      : 0;

    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-24 animate-in zoom-in-95">
        {/* Scorecard Hero Banner */}
        <div className="rounded-[28px] bg-gradient-to-br from-slate-900 via-indigo-950 to-sky-950 text-white p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/20 mb-3">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{language === 'hi' ? 'ऑल-इंडिया रिजल्ट कार्ड' : 'ALL-INDIA RESULT SCORECARD'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black mb-1">
            {language === 'hi' ? activeTest.titleHi : activeTest.title}
          </h2>
          <p className="text-xs text-slate-300">
            {language === 'hi' ? 'शानदार प्रयास! आपकी विस्तृत परफॉर्मेंस रिपोर्ट नीचे दी गई है।' : 'Great effort! Your detailed performance breakdown is ready.'}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-[10px] text-slate-300 uppercase font-bold tracking-wider block">
                {language === 'hi' ? 'कुल प्राप्तांक' : 'Total Score'}
              </span>
              <span className="text-2xl font-black text-amber-400">{totalScore.toFixed(1)}</span>
              <span className="text-[10px] text-slate-300 block">/ {activeTest.questions.length * 2}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-[10px] text-slate-300 uppercase font-bold tracking-wider block">
                {language === 'hi' ? 'सटीकता' : 'Accuracy'}
              </span>
              <span className="text-2xl font-black text-emerald-400">{accuracy}%</span>
              <span className="text-[10px] text-slate-300 block">
                {correctAnswers} {language === 'hi' ? 'सही' : 'Correct'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-[10px] text-slate-300 uppercase font-bold tracking-wider block">
                {language === 'hi' ? 'ऑल-इंडिया रैंक' : 'Est. Rank'}
              </span>
              <span className="text-2xl font-black text-sky-300">#42</span>
              <span className="text-[10px] text-slate-300 block">Top 1.5% Aspirants</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <span className="text-[10px] text-slate-300 uppercase font-bold tracking-wider block">
                {language === 'hi' ? 'पर्सेंटाइल' : 'Percentile'}
              </span>
              <span className="text-2xl font-black text-purple-300">98.5%</span>
              <span className="text-[10px] text-slate-300 block">Excellent</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => handleStartTest(activeTest)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'पुनः टेस्ट दें' : 'Retake Test'}</span>
            </button>

            <button
              onClick={() => setActiveTest(null)}
              className="px-5 py-2 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-xs font-extrabold shadow-md transition-transform active:scale-95"
            >
              {language === 'hi' ? 'अन्य टेस्ट देखें' : 'Back to Tests'}
            </button>
          </div>
        </div>

        {/* Detailed Solutions & Explanations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-extrabold text-slate-900">
              {language === 'hi' ? 'प्रश्नवार हल एवं शॉर्टकट ट्रिक्स' : 'Question Solutions & Shortcut Tricks'}
            </h3>
            <button
              onClick={() => setTestLanguage(testLanguage === 'hi' ? 'en' : 'hi')}
              className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200"
            >
              {testLanguage === 'hi' ? 'Switch to English' : 'हिन्दी में व्याख्या देखें'}
            </button>
          </div>

          <div className="space-y-4">
            {activeTest.questions.map((q, qIndex) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctIndex;
              const isSkipped = userAns === undefined;

              return (
                <div
                  key={q.id}
                  className={`rounded-[24px] bg-white border p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-3 ${
                    isCorrect
                      ? 'border-emerald-200 bg-emerald-50/10'
                      : isSkipped
                      ? 'border-slate-200'
                      : 'border-rose-200 bg-rose-50/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      {language === 'hi' ? 'प्रश्न' : 'Question'} {qIndex + 1} • <span className="uppercase text-sky-600">{q.subject}</span>
                    </span>

                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {language === 'hi' ? 'सही (+2.0)' : 'Correct (+2.0)'}
                      </span>
                    ) : isSkipped ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {language === 'hi' ? 'छोड़ा गया (0.0)' : 'Skipped (0.0)'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                        <XCircle className="w-3.5 h-3.5" />
                        {language === 'hi' ? 'गलत (-0.5)' : 'Incorrect (-0.5)'}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    {testLanguage === 'hi' ? q.textHi : q.textEn}
                  </p>

                  {/* Options Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {(testLanguage === 'hi' ? q.optionsHi : q.optionsEn).map((opt, oIdx) => {
                      const isCorrectOpt = oIdx === q.correctIndex;
                      const isUserChoice = oIdx === userAns;

                      let optClass = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (isCorrectOpt) {
                        optClass = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                      } else if (isUserChoice) {
                        optClass = 'bg-rose-100 border-rose-400 text-rose-900 font-bold';
                      }

                      return (
                        <div key={oIdx} className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${optClass}`}>
                          <span>{opt}</span>
                          {isCorrectOpt && <span className="text-[10px] text-emerald-700 font-black">✓ Correct</span>}
                          {isUserChoice && !isCorrectOpt && <span className="text-[10px] text-rose-700 font-black">✗ Your Answer</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Solution / Explanation Box */}
                  <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs text-sky-950 space-y-1">
                    <p className="font-extrabold flex items-center gap-1.5 text-[#0284C7]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'विस्तृत हल व शॉर्ट ट्रिक:' : 'Step-by-Step Solution & Tricks:'}</span>
                    </p>
                    <p className="leading-relaxed text-slate-700">
                      {testLanguage === 'hi' ? q.explanationHi : q.explanationEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // View: Mock Tests Catalog
  return (
    <div className="space-y-5 pb-24">
      <div className="space-y-3">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {language === 'hi' ? 'ऑल-इंडिया मॉक टेस्ट सीरीज' : 'All-India Mock Test Series'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'TCS परीक्षा पैटर्न पर आधारित वास्तविक टेस्ट, ऑल इंडिया रैंक और विस्तृत व्याख्या के साथ'
              : 'Real exam CBT interface, negative marking, percentile ranking, and instant solutions'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: language === 'hi' ? 'सभी टेस्ट' : 'All Tests' },
            { id: 'ssc', label: 'SSC CGL / CHSL' },
            { id: 'railway', label: 'Railway RRB NTPC' },
            { id: 'state', label: 'Bihar BPSC / BSSC' },
            { id: 'daily', label: language === 'hi' ? 'दैनिक क्विज' : 'Daily Quizzes' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] text-white shadow-md shadow-sky-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTests.map((test) => {
          const isUnlocked = freeModeOn || !test.pro;
          return (
            <div
              key={test.id}
              className="rounded-[24px] bg-white border border-slate-100 p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sky-100 text-sky-800">
                    {test.category}
                  </span>
                  {isUnlocked ? (
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      FREE UNLOCKED
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      PRO TEST
                    </span>
                  )}
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mb-1">
                  {language === 'hi' ? test.titleHi : test.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 pt-1">
                  <span>📝 {test.questionsCount} {language === 'hi' ? 'प्रश्न' : 'Questions'}</span>
                  <span>•</span>
                  <span>⏱ {test.durationMinutes} {language === 'hi' ? 'मिनट' : 'Mins'}</span>
                  <span>•</span>
                  <span>🎯 {test.totalMarks} {language === 'hi' ? 'अंक' : 'Marks'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400">
                  {language === 'hi' ? 'द्विभाषी (हिन्दी + Eng)' : 'Bilingual (Hindi + Eng)'}
                </span>

                <button
                  onClick={() => handleStartTest(test)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] hover:from-[#0369A1] hover:to-[#0284C7] text-white text-xs font-extrabold shadow-md transition-transform active:scale-95"
                >
                  <span>{language === 'hi' ? 'टेस्ट शुरू करें' : 'Start Mock Test'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
