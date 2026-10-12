import React, { useState } from 'react';
import { Search, Filter, Play, Download, CheckCircle2, Lock, Star, BookOpen, Clock, FileText, ChevronRight, X, Sparkles, ExternalLink } from 'lucide-react';
import { Course, Lesson, Language } from '../types';

interface CoursesTabProps {
  courses: Course[];
  language: Language;
  freeModeOn: boolean;
  onOpenSubscription: () => void;
  selectedCourseModal: Course | null;
  onCloseCourseModal: () => void;
  onSelectCourse: (course: Course) => void;
}

export const CoursesTab: React.FC<CoursesTabProps> = ({
  courses,
  language,
  freeModeOn,
  onOpenSubscription,
  selectedCourseModal,
  onCloseCourseModal,
  onSelectCourse
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1.25x');
  const [activeClassTab, setActiveClassTab] = useState<'video' | 'notes' | 'syllabus'>('video');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filteredCourses = courses.filter((c) => {
    const matchesCat = activeCategory === 'all' || c.category === activeCategory;
    const matchesQuery =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleDownloadNotes = (title: string) => {
    setDownloadSuccess(title);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Header & Search */}
      <div className="space-y-3">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {language === 'hi' ? 'सभी ऑनलाइन कोर्सेज व बैचेस' : 'Explore Courses & Batches'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'hi'
              ? 'एसएससी, रेलवे और बिहार परीक्षाओं के लिए संपूर्ण वीडियो कक्षाएं और क्लास नोट्स'
              : 'Complete recorded and live batches with handwritten teacher notes'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'कोर्स या शिक्षक का नाम खोजें (उदा: Rahul Sir, BPSC)...'
                : 'Search courses or educators (e.g., SSC CGL, Neha Mam)...'
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: language === 'hi' ? 'सभी' : 'All' },
            { id: 'ssc', label: 'SSC Exams' },
            { id: 'railway', label: 'Railway RRB' },
            { id: 'state', label: language === 'hi' ? 'बिहार स्पेशल (BPSC/BSSC)' : 'Bihar State' },
            { id: 'ca', label: language === 'hi' ? 'करंट अफेयर्स' : 'Current Affairs' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] text-white shadow-md shadow-sky-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((course) => {
          const isUnlocked = freeModeOn || !course.pro;
          return (
            <div
              key={course.id}
              onClick={() => {
                onSelectCourse(course);
                setActiveLesson(course.lessonList[0]);
              }}
              className="cursor-pointer rounded-[24px] bg-white border border-slate-100 p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                    {course.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{course.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({course.students})</span>
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 mb-1">
                  {language === 'hi' ? course.titleHi : course.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-3">
                  {course.instructor}
                </p>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {language === 'hi' ? course.descriptionHi : course.description}
                </p>

                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-slate-50 text-[11px] font-bold text-slate-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    <span>{course.lessons} {language === 'hi' ? 'पाठ' : 'Lessons'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>{course.hours}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'hi' ? 'हैंडरिटन नोट्स' : 'PDFs'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  {isUnlocked ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-black text-emerald-600">FREE</span>
                      <span className="text-xs text-slate-400 line-through">{course.originalPrice}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                        {freeModeOn ? 'LAUNCH PASS' : '100% OFF'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-black text-slate-900">{course.price}</span>
                      <span className="text-xs text-slate-400 line-through">{course.originalPrice}</span>
                    </div>
                  )}
                </div>

                <button className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition-transform active:scale-95">
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{language === 'hi' ? 'कक्षाएं देखें' : 'Open Batch'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail Modal / Classroom Player */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full sm:max-w-2xl max-h-[92vh] bg-white rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                  {selectedCourseModal.tag}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {selectedCourseModal.instructor}
                </span>
              </div>
              <button
                onClick={onCloseCourseModal}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  {language === 'hi' ? selectedCourseModal.titleHi : selectedCourseModal.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'hi' ? selectedCourseModal.descriptionHi : selectedCourseModal.description}
                </p>
              </div>

              {/* Classroom Player Simulation */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video flex flex-col justify-between p-4 shadow-lg border border-slate-800 text-white">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-rose-600/90 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    {language === 'hi' ? 'एचडी डिजिटल क्लास' : 'HD Smart Board'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-300">
                      {playbackSpeed}
                    </span>
                    <button
                      onClick={() => {
                        const speeds = ['1x', '1.25x', '1.5x', '2x'];
                        const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                        setPlaybackSpeed(speeds[nextIdx]);
                      }}
                      className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[10px] font-bold"
                    >
                      Speed
                    </button>
                  </div>
                </div>

                {/* Video Center Animation / Board graphics */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 cursor-pointer backdrop-blur-md transition-transform hover:scale-105"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <Play className={`w-7 h-7 text-white fill-white ${isPlaying ? 'opacity-90' : 'opacity-40'}`} />
                  </div>
                  <p className="text-xs font-bold text-slate-200">
                    {activeLesson ? (language === 'hi' ? activeLesson.titleHi : activeLesson.title) : 'Lesson 1'}
                  </p>
                  <p className="text-[10px] text-sky-400">
                    {isPlaying ? '▶ Playing • Smart Shortcut Tricks' : '⏸ Paused'}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0EA5E9] h-1.5 rounded-full w-2/3" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>18:42</span>
                    <span>{activeLesson?.duration || '48m'}</span>
                  </div>
                </div>
              </div>

              {/* Classroom Tabs: Lectures vs Notes vs Syllabus */}
              <div className="flex border-b border-slate-100">
                {[
                  { id: 'video', label: language === 'hi' ? 'लेक्चर्स (Videos)' : 'Lectures (Videos)' },
                  { id: 'notes', label: language === 'hi' ? 'हैंडरिटन नोट्स (PDF)' : 'Class Notes (PDF)' },
                  { id: 'syllabus', label: language === 'hi' ? 'सिलेबस (Syllabus)' : 'Syllabus Breakdown' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveClassTab(t.id as any)}
                    className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-colors ${
                      activeClassTab === t.id
                        ? 'border-[#0284C7] text-[#0284C7]'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Video Lessons List */}
              {activeClassTab === 'video' && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500">
                    {language === 'hi' ? 'अध्याय एवं कक्षाएं:' : 'Chapters & Classes:'}
                  </p>
                  {selectedCourseModal.lessonList.map((lesson, idx) => {
                    const isLessonFree = freeModeOn || !selectedCourseModal.pro || lesson.isFree;
                    const isSelected = activeLesson?.id === lesson.id;
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          if (isLessonFree) {
                            setActiveLesson(lesson);
                            setIsPlaying(true);
                          } else {
                            onOpenSubscription();
                          }
                        }}
                        className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50 border-sky-300'
                            : 'bg-white border-slate-100 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-[#0284C7] text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">
                              {language === 'hi' ? lesson.titleHi : lesson.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-medium">
                              ⏱ {lesson.duration}
                            </span>
                          </div>
                        </div>

                        <div>
                          {isLessonFree ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              <Play className="w-3 h-3 fill-emerald-800" />
                              {language === 'hi' ? 'देखें' : 'Play'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              <Lock className="w-3 h-3" />
                              PRO
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab 2: Handwritten Class Notes */}
              {activeClassTab === 'notes' && (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                    <p className="font-bold">📝 {language === 'hi' ? 'विशेष हस्तलिखित नोट्स' : 'Teacher Handwritten Formula Sheets'}</p>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      {language === 'hi'
                        ? 'सरल भाषा में सूत्र, शॉर्टकट और पिछले 5 वर्षों के हल किए गए प्रश्न पत्र।'
                        : 'Clean formulas, shortcuts, and past 5 years solved question sets ready for quick revision.'}
                    </p>
                  </div>

                  {downloadSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{downloadSuccess} {language === 'hi' ? 'सफलतापूर्वक डाउनलोड हो गया!' : 'downloaded successfully!'}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    {[
                      { title: 'Percentage & Ratio Formulas PDF', size: '2.4 MB', pages: '18 Pages' },
                      { title: 'Time, Speed & Train Short Tricks PDF', size: '3.1 MB', pages: '24 Pages' },
                      { title: 'Top 500 SSC CGL Previous Year Maths Solved', size: '5.8 MB', pages: '46 Pages' },
                    ].map((note, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
                            PDF
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">{note.title}</p>
                            <span className="text-[10px] text-slate-400">{note.size} • {note.pages}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDownloadNotes(note.title)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-transform active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{language === 'hi' ? 'डाउनलोड' : 'Download'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Syllabus Breakdown */}
              {activeClassTab === 'syllabus' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900">
                    <p className="font-bold">🎯 {language === 'hi' ? 'विस्तृत परीक्षा पाठ्यक्रम (Official Pattern)' : 'Official Exam Syllabus Pattern'}</p>
                    <p className="text-[11px] text-sky-800 mt-0.5">
                      {language === 'hi'
                        ? '100% सिलेबस कवरेज नवीनतम आयोग दिशा-निर्देशों के अनुसार।'
                        : '100% updated syllabus coverage matching latest TCS / Commission vendor patterns.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-1">Module 1: Quantitative Aptitude (गणित)</h4>
                      <p className="text-[11px] text-slate-600">
                        Number System, Simplification, Percentages, Profit & Loss, Simple & Compound Interest, Algebra, Geometry, Trigonometry, Data Interpretation (DI).
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-1">Module 2: Reasoning & General Intelligence (तर्कशक्ति)</h4>
                      <p className="text-[11px] text-slate-600">
                        Analogy, Classification, Series, Coding-Decoding, Blood Relations, Syllogism, Direction Sense, Non-Verbal Figures, Matrix.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-1">Module 3: General Awareness & Science (सामान्य अध्ययन)</h4>
                      <p className="text-[11px] text-slate-600">
                        Indian History & National Movement, Geography, Indian Polity, Economy, General Science (Physics, Chemistry, Biology), Static GK, Current Affairs.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {language === 'hi' ? 'बैच मूल्य' : 'Batch Access'}
                </span>
                <span className="text-base font-black text-emerald-600">
                  {freeModeOn || !selectedCourseModal.pro ? '₹0 (100% FREE)' : selectedCourseModal.price}
                </span>
              </div>

              <button
                onClick={() => {
                  if (freeModeOn || !selectedCourseModal.pro) {
                    setActiveClassTab('video');
                  } else {
                    onOpenSubscription();
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] text-white text-xs font-bold shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {freeModeOn || !selectedCourseModal.pro
                    ? (language === 'hi' ? 'पढ़ाई शुरू करें' : 'Start Learning')
                    : (language === 'hi' ? 'कूपन से फ्री अनलॉक करें' : 'Unlock with Coupon')}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
