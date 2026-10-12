import React, { useState } from 'react';
import { Smartphone, Download, Copy, Check, ExternalLink, ShieldCheck, Sparkles, Layers, QrCode } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';

interface AndroidTabProps {
  language: Language;
}

export const AndroidTab: React.FC<AndroidTabProps> = ({ language }) => {
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [downloadingMockApk, setDownloadingMockApk] = useState(false);

  const manifestConfig = {
    name: "EduRank - SSC Railway Bihar Exams",
    short_name: "EduRank",
    packageId: "com.edurank.sscapp",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#0EA5E9",
    start_url: "/",
    icons: [
      {
        src: "edurank_logo_sparkle_final.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    shortcuts: [
      { name: "Daily Quiz", url: "/?tab=quiz" },
      { name: "Current Affairs", url: "/?tab=current" }
    ]
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(manifestConfig, null, 2));
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const handleDownloadManifest = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(manifestConfig, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "edurank-android-manifest.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSimulateApk = () => {
    setDownloadingMockApk(true);
    setTimeout(() => {
      setDownloadingMockApk(false);
      // Trigger instant install prompt if available
      if (isInstallable) {
        install();
      } else {
        alert(language === 'hi' ? 'ऐप इंस्टॉल के लिए "Add to Home Screen" पर टैप करें।' : 'Tap browser menu > "Add to Home Screen" or "Install App".');
      }
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Hero */}
      <div className="rounded-[28px] bg-gradient-to-br from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black">
              <Smartphone className="w-3.5 h-3.5 text-white" />
              <span>PACKAGE: com.edurank.sscapp</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black">
              {language === 'hi' ? 'EduRank Android App Hub' : 'EduRank Android & PWA Hub'}
            </h1>
            <p className="text-xs text-sky-100">
              {language === 'hi'
                ? 'अपने फोन पर सीधे इंस्टॉल करें या PWABuilder से Google Play Store के लिए APK/AAB जनरेट करें।'
                : 'Directly install to Android phone or generate a Play Store signed APK with PWABuilder.'}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleSimulateApk}
              disabled={downloadingMockApk}
              className="px-5 py-3 rounded-2xl bg-white text-[#0284C7] hover:bg-sky-50 text-xs font-extrabold shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-[#0284C7]" />
              <span>
                {downloadingMockApk
                  ? (language === 'hi' ? 'तैयार हो रहा है...' : 'Preparing APK...')
                  : isInstalled
                  ? (language === 'hi' ? 'ऐप इंस्टॉल है ✓' : 'App Installed ✓')
                  : (language === 'hi' ? 'फोन में इंस्टॉल करें' : 'Install on Phone')}
              </span>
            </button>
            <span className="text-[10px] text-sky-100 text-center font-semibold">
              Supports Android 8.0 - 15.0+
            </span>
          </div>
        </div>
      </div>

      {/* Package Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Package ID</span>
          <p className="text-xs font-mono font-bold text-slate-900 mt-1 truncate">com.edurank.sscapp</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">App Icon</span>
          <p className="text-xs font-bold text-slate-900 mt-1">1024x1024 Sparkle</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Theme Color</span>
          <p className="text-xs font-bold text-[#0EA5E9] mt-1">#0EA5E9 (Sky)</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Target Engine</span>
          <p className="text-xs font-bold text-emerald-600 mt-1">Standalone WebAPK</p>
        </div>
      </div>

      {/* 4 Steps to Generate Android APK via PWABuilder */}
      <div className="rounded-[24px] bg-white p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {language === 'hi' ? 'PWABuilder से 4 आसान स्टेप्स में APK बनाएं' : 'Build Android APK in 4 Easy Steps'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'आधिकारिक गाइड (PWABuilder.com)' : 'Official PWABuilder & Play Console workflow'}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-sky-100 text-sky-800">
            OFFICIAL
          </span>
        </div>

        <div className="space-y-3">
          {[
            {
              step: '1',
              title: language === 'hi' ? 'PWABuilder.com खोलें' : 'Open PWABuilder.com',
              desc: language === 'hi' ? 'ब्राउज़र में https://www.pwabuilder.com पर जाएं।' : 'Visit https://www.pwabuilder.com in your browser.'
            },
            {
              step: '2',
              title: language === 'hi' ? 'ऐप का लिंक पेस्ट करें' : 'Paste App Live URL',
              desc: language === 'hi' ? 'अपना EduRank लाइव लिंक पेस्ट करें और Start पर क्लिक करें।' : 'Paste your live EduRank web app URL and click Start.'
            },
            {
              step: '3',
              title: language === 'hi' ? 'Android Package > Generate APK' : 'Android Package > Generate APK',
              desc: language === 'hi' ? 'Package ID में "com.edurank.sscapp" डालें और APK/AAB डाउनलोड करें।' : 'Ensure package ID is "com.edurank.sscapp" and download signed package.'
            },
            {
              step: '4',
              title: language === 'hi' ? 'Play Console > Upload APK' : 'Play Console > Upload APK',
              desc: language === 'hi' ? 'Google Play Console खोलें, नया ऐप बनाएं और APK अपलोड करें।' : 'Upload the generated bundle directly to Google Play Console or install APK on device.'
            }
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0284C7] to-[#0EA5E9] text-white flex items-center justify-center text-xs font-black shrink-0">
                {s.step}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JSON Manifest Code Box */}
      <div className="rounded-[24px] bg-slate-900 p-5 text-white shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">manifest.json</span>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-400/20 px-2 py-0.5 rounded">
              Ready for PWABuilder
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyConfig}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
            >
              {copiedConfig ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedConfig ? 'Copied' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={handleDownloadManifest}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        <pre className="p-4 rounded-xl bg-black/40 text-[11px] font-mono text-sky-200 overflow-x-auto leading-relaxed border border-white/5">
          {JSON.stringify(manifestConfig, null, 2)}
        </pre>
      </div>
    </div>
  );
};
