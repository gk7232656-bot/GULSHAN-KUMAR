import React, { useState, useEffect } from 'react';
import './index.css';
import { Tab, PlanId, Language, Course, UserState } from './types';
import { coursesData } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { CoursesTab } from './components/CoursesTab';
import { QuizTab } from './components/QuizTab';
import { CurrentAffairsTab } from './components/CurrentAffairsTab';
import { SubscriptionTab } from './components/SubscriptionTab';
import { AndroidTab } from './components/AndroidTab';
import { ProfileTab } from './components/ProfileTab';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [language, setLanguage] = useState<Language>('hi');
  const [freeModeOn, setFreeModeOn] = useState<boolean>(true); // Free Mode ON - Launch Offer Active
  const [currentPlan, setCurrentPlan] = useState<PlanId>('free');
  const [courses, setCourses] = useState<Course[]>(coursesData);
  const [selectedCourseModal, setSelectedCourseModal] = useState<Course | null>(null);

  const [userState, setUserState] = useState<UserState>({
    name: 'Amit Kumar',
    rollNo: 'ED-9482',
    targetExam: 'SSC CGL 2026',
    streakDays: 14,
    questionsSolved: 842,
    accuracy: 84,
    rank: 42,
    currentPlan: 'free',
    freeModeOn: true,
    bookmarks: [],
    language: 'hi'
  });

  // Sync with URL query parameter on initial load (support PWA shortcuts e.g. /?tab=quiz, /?tab=current)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab') as Tab;
      if (tabParam && ['home', 'courses', 'quiz', 'current', 'profile', 'subscription', 'android'].includes(tabParam)) {
        setCurrentTab(tabParam);
      }
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  const handleToggleFreeMode = () => {
    setFreeModeOn((prev) => {
      const next = !prev;
      setUserState((u) => ({ ...u, freeModeOn: next }));
      return next;
    });
  };

  const handlePlanActivated = (plan: PlanId) => {
    setCurrentPlan(plan);
    setUserState((u) => ({ ...u, currentPlan: plan }));
  };

  const handleRecordQuizCompletion = (solvedCount: number, accuracy: number) => {
    setUserState((prev) => ({
      ...prev,
      questionsSolved: prev.questionsSolved + solvedCount,
      accuracy: Math.round((prev.accuracy + accuracy) / 2)
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col selection:bg-[#0EA5E9]/20 selection:text-[#0284C7]">
      {/* Top Header */}
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        streakDays={userState.streakDays}
        freeModeOn={freeModeOn}
        onOpenSubscription={() => setCurrentTab('subscription')}
        onOpenAndroid={() => setCurrentTab('android')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 sm:py-6">
        {currentTab === 'home' && (
          <HomeTab
            language={language}
            courses={courses}
            freeModeOn={freeModeOn}
            onSelectTab={(tab) => setCurrentTab(tab)}
            onOpenCourse={(course) => setSelectedCourseModal(course)}
            onOpenSubscription={() => setCurrentTab('subscription')}
            streakDays={userState.streakDays}
          />
        )}

        {currentTab === 'courses' && (
          <CoursesTab
            courses={courses}
            language={language}
            freeModeOn={freeModeOn}
            onOpenSubscription={() => setCurrentTab('subscription')}
            selectedCourseModal={selectedCourseModal}
            onCloseCourseModal={() => setSelectedCourseModal(null)}
            onSelectCourse={(course) => setSelectedCourseModal(course)}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizTab
            language={language}
            freeModeOn={freeModeOn}
            onOpenSubscription={() => setCurrentTab('subscription')}
            onRecordQuizCompletion={handleRecordQuizCompletion}
          />
        )}

        {currentTab === 'current' && (
          <CurrentAffairsTab
            language={language}
            onOpenTestTab={() => setCurrentTab('quiz')}
          />
        )}

        {currentTab === 'subscription' && (
          <SubscriptionTab
            language={language}
            freeModeOn={freeModeOn}
            onToggleFreeMode={handleToggleFreeMode}
            currentPlan={currentPlan}
            onPlanActivated={handlePlanActivated}
          />
        )}

        {currentTab === 'android' && (
          <AndroidTab language={language} />
        )}

        {currentTab === 'profile' && (
          <ProfileTab
            userState={userState}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            onOpenSubscription={() => setCurrentTab('subscription')}
            onToggleFreeMode={handleToggleFreeMode}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        freeModeOn={freeModeOn}
      />
    </div>
  );
}
