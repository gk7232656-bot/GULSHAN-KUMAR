import React, { useState } from 'react';
import { Crown, Check, Sparkles, Zap, ShieldCheck, QrCode, ArrowRight, Tag, CheckCircle2, X, Smartphone, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlanId, Language } from '../types';

interface SubscriptionTabProps {
  language: Language;
  freeModeOn: boolean;
  onToggleFreeMode: () => void;
  currentPlan: PlanId;
  onPlanActivated: (plan: PlanId) => void;
}

export const SubscriptionTab: React.FC<SubscriptionTabProps> = ({
  language,
  freeModeOn,
  onToggleFreeMode,
  currentPlan,
  onPlanActivated
}) => {
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PlanId>('pro');
  const [couponCode, setCouponCode] = useState<string>('LAUNCH100');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('LAUNCH100');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isPaymentSheetOpen, setIsPaymentSheetOpen] = useState<boolean>(false);
  const [upiIdInput, setUpiIdInput] = useState<string>('student@okaxis');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  // Plan pricing base
  const planPrices: Record<PlanId, { original: number; discounted: number }> = {
    free: { original: 0, discounted: 0 },
    pro: { original: 1499, discounted: 299 },
    promax: { original: 3999, discounted: 999 },
  };

  const getFinalPrice = (planId: PlanId) => {
    if (freeModeOn) return 0;
    if (planId === 'free') return 0;
    if (appliedCoupon === 'LAUNCH100') return 0;
    if (appliedCoupon === 'EDURANK50') return Math.round(planPrices[planId].discounted * 0.5);
    return planPrices[planId].discounted;
  };

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (code === 'LAUNCH100') {
      setAppliedCoupon('LAUNCH100');
      setCouponError(null);
    } else if (code === 'EDURANK50') {
      setAppliedCoupon('EDURANK50');
      setCouponError(null);
    } else {
      setCouponError(language === 'hi' ? 'अमान्य कूपन! LAUNCH100 का उपयोग करें।' : 'Invalid code! Try LAUNCH100.');
    }
  };

  const handleOpenCheckout = (planId: PlanId) => {
    if (planId === 'free') {
      onPlanActivated('free');
      return;
    }
    setSelectedPlanForCheckout(planId);
    setIsPaymentSheetOpen(true);
  };

  const handleCompletePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsPaymentSheetOpen(false);
      onPlanActivated(selectedPlanForCheckout);
      setShowSuccessModal(true);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch (e) {
        // safe fallback
      }
    }, 1200);
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText('edurank@upi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const currentFinalPrice = getFinalPrice(selectedPlanForCheckout);

  return (
    <div className="space-y-6 pb-28">
      {/* Top Title */}
      <div className="text-center space-y-1 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{language === 'hi' ? 'सीमित समय ऑफर' : 'LIMITED TIME LAUNCH PASS'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {language === 'hi' ? 'EduRank प्रो सब्सक्रिप्शन' : 'EduRank Pass & Membership'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          {language === 'hi'
            ? 'एक पास में पाएं एसएससी, रेलवे और बिहार के सभी बैचेस, टेस्ट सीरीज और हस्तलिखित नोट्स'
            : 'Unlock complete exam prep: Live & recorded batches, 150+ mocks & teacher notes'}
        </p>
      </div>

      {/* Free Mode Switch Component (Prompt requirement) */}
      <div className="rounded-[24px] bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-5 text-white shadow-xl shadow-emerald-600/20 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
            <h3 className="text-base sm:text-lg font-black">
              {language === 'hi' ? 'Free Mode ON - Launch Offer Active' : 'Free Mode ON - Launch Offer Active'}
            </h3>
          </div>
          <p className="text-xs text-emerald-100">
            {language === 'hi'
              ? 'इसे चालू रखने पर सभी पेड कोर्सेज, मॉक टेस्ट और नोट्स ₹0 (फ्री) में अनलॉक रहते हैं।'
              : 'Keep this active to unlock all paid batches, tests and PDFs for ₹0 (100% Free).'}
          </p>
        </div>

        {/* Big Switch Component */}
        <button
          onClick={onToggleFreeMode}
          role="switch"
          aria-checked={freeModeOn}
          className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            freeModeOn ? 'bg-amber-400' : 'bg-slate-400'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
              freeModeOn ? 'translate-x-8' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Free ₹0 ACTIVE */}
        <div
          className={`rounded-[24px] bg-white p-5 sm:p-6 border transition-all flex flex-col justify-between ${
            currentPlan === 'free' && !freeModeOn
              ? 'border-slate-300 ring-2 ring-slate-200 shadow-md'
              : 'border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Free Starter</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700">
                ACTIVE
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">Free Basic</h3>
            <div className="flex items-baseline gap-1 my-3">
              <span className="text-3xl font-black text-slate-900">₹0</span>
              <span className="text-xs text-slate-400 font-semibold">/ lifetime</span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              {language === 'hi' ? 'शुरुआती तैयारी और दैनिक करंट अफेयर्स के लिए' : 'Essential foundation & daily current affairs'}
            </p>

            <ul className="space-y-2.5 text-xs text-slate-600 mb-6 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'hi' ? 'दैनिक करंट अफेयर्स (Daily CA)' : 'All Daily Current Affairs'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'hi' ? '2 ऑल-इंडिया मॉक टेस्ट' : '2 Full Mock Tests'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'hi' ? 'फाउंडेशन डेमो लेक्चर्स' : 'Foundation Demo Classes'}</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 line-through">
                <X className="w-4 h-4 text-slate-300 shrink-0" />
                <span>{language === 'hi' ? '150+ टेस्ट सीरीज' : '150+ Full Mock Series'}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleOpenCheckout('free')}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            {language === 'hi' ? 'डिफ़ॉल्ट एक्टिव प्लान' : 'Current Plan'}
          </button>
        </div>

        {/* Card 2: Pro ₹299 POPULAR */}
        <div className="relative rounded-[24px] bg-white p-5 sm:p-6 border-2 border-[#0EA5E9] shadow-[0_12px_40px_rgba(14,165,233,0.15)] flex flex-col justify-between">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
            POPULAR • MOST CHOSEN
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 mt-1">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">EduRank Pro</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                SAVE 80%
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">Pro Pass</h3>
            <div className="flex items-baseline gap-2 my-3">
              <span className="text-3xl font-black text-slate-900">
                {freeModeOn || appliedCoupon === 'LAUNCH100' ? '₹0' : '₹299'}
              </span>
              <span className="text-xs text-slate-400 line-through font-semibold">₹1,499</span>
              <span className="text-xs text-slate-500 font-semibold">/ 1 Year</span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              {language === 'hi' ? 'सभी कोर्सेज + 150 टेस्ट + नोट्स' : 'All Courses + Tests + Teacher PDFs'}
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 mb-6 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{language === 'hi' ? 'सभी SSC, रेलवे, बिहार वीडियो बैचेस' : 'All Video Batches (SSC, RRB, Bihar)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{language === 'hi' ? '150+ ऑल-इंडिया मॉक टेस्ट सीरीज' : '150+ Full-Length Mock Tests'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{language === 'hi' ? 'टीचर के हस्तलिखित नोट्स व सूत्र पीडीएफ' : 'Handwritten Teacher Notes & PDFs'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'hi' ? 'ऑल-इंडिया रैंक और पर्सेंटाइल विश्लेषण' : 'All-India Percentile & Rank'}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleOpenCheckout('pro')}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] hover:from-[#0369A1] hover:to-[#0284C7] text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-sky-500/25 transition-transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>
              {freeModeOn || appliedCoupon === 'LAUNCH100'
                ? (language === 'hi' ? '₹0 में फ्री एक्टिव करें' : 'Activate Free (₹0)')
                : (language === 'hi' ? 'Buy Now with UPI' : 'Buy Now with UPI')}
            </span>
          </button>
        </div>

        {/* Card 3: Pro Max ₹999 BEST VALUE */}
        <div className="relative rounded-[24px] bg-white p-5 sm:p-6 border border-purple-200 shadow-[0_8px_30px_rgba(124,58,237,0.08)] flex flex-col justify-between">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
            BEST VALUE • MENTORSHIP
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 mt-1">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">EduRank Pro Max</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800">
                VIP CARE
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">Pro Max Ultimate</h3>
            <div className="flex items-baseline gap-2 my-3">
              <span className="text-3xl font-black text-slate-900">
                {freeModeOn || appliedCoupon === 'LAUNCH100' ? '₹0' : '₹999'}
              </span>
              <span className="text-xs text-slate-400 line-through font-semibold">₹3,999</span>
              <span className="text-xs text-slate-500 font-semibold">/ 2 Years</span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              {language === 'hi' ? 'सब कुछ + पर्सनल डाउट मेंटर' : 'Everything + Personal Doubt Mentor'}
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 mb-6 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="font-semibold">{language === 'hi' ? 'प्रो पास के सभी 100% फीचर्स' : 'All Pro Pass Features'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="font-semibold text-purple-900">{language === 'hi' ? '1-on-1 पर्सनल डाउट मेंटरशिप' : 'Personal 1-on-1 Doubt Mentor'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 shrink-0" />
                <span>{language === 'hi' ? 'प्रिंटेड बुक्स व स्पीड टेस्ट किट' : 'Hardcopy Revision Booklets'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 shrink-0" />
                <span>{language === 'hi' ? 'VIP व्हाट्सएप व टेलीग्राम स्टडी ग्रुप' : 'VIP Telegram Study Circle'}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleOpenCheckout('promax')}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-purple-500/25 transition-transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Crown className="w-4 h-4 fill-white" />
            <span>
              {freeModeOn || appliedCoupon === 'LAUNCH100'
                ? (language === 'hi' ? '₹0 में प्रो मैक्स लें' : 'Unlock Free (₹0)')
                : (language === 'hi' ? 'Buy Now with UPI' : 'Buy Now with UPI')}
            </span>
          </button>
        </div>
      </div>

      {/* Coupon Application Box */}
      <div className="rounded-[24px] bg-white p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#F97316]" />
            <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
              {language === 'hi' ? 'डिस्काउंट कूपन कोड' : 'Have a Discount Coupon?'}
            </span>
          </div>
          <span className="text-xs font-bold text-emerald-600">
            {appliedCoupon ? `"${appliedCoupon}" Active` : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon (e.g. LAUNCH100)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
          />
          <button
            onClick={() => handleApplyCoupon()}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-transform active:scale-95"
          >
            {language === 'hi' ? 'लागू करें' : 'Apply'}
          </button>
        </div>

        {/* Quick Clickable Coupon Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => {
              setCouponCode('LAUNCH100');
              handleApplyCoupon('LAUNCH100');
            }}
            className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-800 text-xs font-extrabold flex items-center gap-1"
          >
            <span>🏷️ LAUNCH100 (100% OFF)</span>
          </button>

          <button
            onClick={() => {
              setCouponCode('EDURANK50');
              handleApplyCoupon('EDURANK50');
            }}
            className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 text-xs font-extrabold flex items-center gap-1"
          >
            <span>🏷️ EDURANK50 (50% OFF)</span>
          </button>
        </div>

        {couponError && (
          <p className="text-xs font-bold text-rose-600">{couponError}</p>
        )}
      </div>

      {/* Payment Sheet Modal (Prompt requirement) */}
      {isPaymentSheetOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full sm:max-w-md bg-white rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    {language === 'hi' ? 'UPI पेमेंट गेटवे' : 'Instant UPI Payment Sheet'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold">EduRank Safe & Fast Checkout</p>
                </div>
              </div>
              <button
                onClick={() => setIsPaymentSheetOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selected Plan Summary & Price */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-700 uppercase">
                  {selectedPlanForCheckout === 'promax' ? 'EduRank Pro Max (2 Years)' : 'EduRank Pro Pass (1 Year)'}
                </p>
                <span className="text-[11px] text-emerald-600 font-bold">
                  {currentFinalPrice === 0 ? '🎉 100% Launch Discount Applied' : '50% Discount Applied'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-slate-900">₹{currentFinalPrice}</span>
                <span className="text-[10px] text-slate-400 line-through block">
                  ₹{planPrices[selectedPlanForCheckout].original}
                </span>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-2 bg-slate-50/50">
              <div className="relative w-36 h-36 bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex items-center justify-center">
                {/* SVG QR Code Simulation */}
                <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                  {/* Top-left position marker */}
                  <rect x="10" y="10" width="24" height="24" rx="3" fill="#0EA5E9" />
                  <rect x="15" y="15" width="14" height="14" fill="#FFFFFF" />
                  <rect x="18" y="18" width="8" height="8" rx="2" fill="#0EA5E9" />
                  {/* Top-right position marker */}
                  <rect x="66" y="10" width="24" height="24" rx="3" fill="#0EA5E9" />
                  <rect x="71" y="15" width="14" height="14" fill="#FFFFFF" />
                  <rect x="74" y="18" width="8" height="8" rx="2" fill="#0EA5E9" />
                  {/* Bottom-left position marker */}
                  <rect x="10" y="66" width="24" height="24" rx="3" fill="#0EA5E9" />
                  <rect x="15" y="71" width="14" height="14" fill="#FFFFFF" />
                  <rect x="18" y="74" width="8" height="8" rx="2" fill="#0EA5E9" />
                  {/* Pattern dots */}
                  <rect x="42" y="14" width="6" height="6" />
                  <rect x="52" y="24" width="6" height="6" />
                  <rect x="40" y="40" width="8" height="8" fill="#F97316" />
                  <rect x="52" y="52" width="6" height="6" />
                  <rect x="66" y="44" width="6" height="6" />
                  <rect x="44" y="66" width="6" height="6" />
                  <rect x="54" y="76" width="6" height="6" />
                  <rect x="76" y="66" width="6" height="6" />
                  <rect x="68" y="80" width="6" height="6" />
                </svg>
              </div>

              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-800">
                  {language === 'hi' ? 'किसी भी UPI ऐप से स्कैन करें' : 'Scan with Any UPI App'}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 cursor-pointer" onClick={handleCopyUPI}>
                  <span>edurank@upi</span>
                  <Copy className="w-3 h-3 text-sky-600" />
                  {copiedUpi && <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>}
                </div>
              </div>
            </div>

            {/* Popular UPI Apps quick triggers */}
            <div>
              <p className="text-xs font-bold text-slate-500 mb-2">
                {language === 'hi' ? 'सीधे ऐप से पेमेंट करें:' : 'Pay directly via app:'}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { name: 'GPay', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                  { name: 'PhonePe', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                  { name: 'Paytm', color: 'bg-sky-50 text-sky-700 border-sky-200' },
                  { name: 'BHIM', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                ].map((app, idx) => (
                  <button
                    key={idx}
                    onClick={handleCompletePayment}
                    className={`py-2 rounded-xl border text-xs font-black text-center hover:opacity-90 transition-transform active:scale-95 ${app.color}`}
                  >
                    {app.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom UPI ID Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">
                {language === 'hi' ? 'या अपनी UPI ID डालें:' : 'Or enter your UPI ID:'}
              </label>
              <input
                type="text"
                value={upiIdInput}
                onChange={(e) => setUpiIdInput(e.target.value)}
                placeholder="username@okhdfcbank"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-medium focus:ring-2 focus:ring-[#0EA5E9] focus:outline-none"
              />
            </div>

            {/* Complete Payment Button */}
            <button
              onClick={handleCompletePayment}
              disabled={isProcessingPayment}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-sky-500/25 transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              {isProcessingPayment ? (
                <span>{language === 'hi' ? 'वेरिफाई हो रहा है...' : 'Verifying Transaction...'}</span>
              ) : currentFinalPrice === 0 ? (
                <span>{language === 'hi' ? '₹0 में तुरंत एक्टिव करें 🎉' : 'Claim Free with Launch Offer 🎉'}</span>
              ) : (
                <span>Pay ₹{currentFinalPrice} & Unlock Batch</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Success State Modal (Prompt requirement: "Launch Offer: Free Me Unlock Ho Gaya! 🎉") */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in zoom-in-95">
          <div className="w-full max-w-sm bg-white rounded-[28px] p-6 text-center shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
              🎉
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-900">
                Launch Offer: Free Me Unlock Ho Gaya! 🎉
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'hi'
                  ? 'बधाई हो! आपके खाते में EduRank प्रो पास सफलतापूर्वक एक्टिवेट हो गया है।'
                  : 'Congratulations! All video batches, tests, and handwritten notes are unlocked.'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 text-left space-y-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>All 150+ Mocks Unlocked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>All Video Batches (Tier 1 & 2) Active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>PDF Notes & Daily Capsules Free</span>
              </div>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-md transition-transform active:scale-95"
            >
              {language === 'hi' ? 'पढ़ाई शुरू करें 🚀' : 'Start Learning Now 🚀'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
