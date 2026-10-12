import { Category, Course, MockTest, CurrentAffairItem } from '../types';

export const categories: Category[] = [
  { id: 'ssc', label: 'SSC Exams', labelHi: 'एसएससी', emoji: '🎯', bg: 'from-[#FF6B7A] to-[#FF8A4C]', count: '12 Courses' },
  { id: 'railway', label: 'Railway Exams', labelHi: 'रेलवे', emoji: '🚆', bg: 'from-[#7C3AED] to-[#A78BFA]', count: '8 Courses' },
  { id: 'state', label: 'State Exams', labelHi: 'बिहार स्पेशल', emoji: '🏛️', bg: 'from-[#059669] to-[#34D399]', count: 'Bihar Special' },
  { id: 'ca', label: 'Current Affairs', labelHi: 'करंट अफेयर्स', emoji: '📰', bg: 'from-[#DB2777] to-[#F472B6]', count: 'Daily Capsules' },
  { id: 'mock', label: 'Mock Tests', labelHi: 'मॉक टेस्ट', emoji: '📝', bg: 'from-[#0284C7] to-[#38BDF8]', count: 'Free All-India' },
];

export const sampleQuestions: Record<string, Question[]> = {
  ssc: [
    {
      id: 101,
      subject: 'maths',
      textEn: 'If the price of sugar increases by 20%, by what percentage should a family reduce its consumption so that the expenditure remains constant?',
      textHi: 'यदि चीनी के मूल्य में 20% की वृद्धि होती है, तो एक परिवार को अपनी खपत में कितने प्रतिशत की कमी करनी चाहिए ताकि खर्च समान रहे?',
      optionsEn: ['16.67%', '20%', '25%', '15%'],
      optionsHi: ['16.67%', '20%', '25%', '15%'],
      correctIndex: 0,
      explanationEn: 'Formula: [R / (100 + R)] × 100%. Here R = 20. So [20 / 120] × 100 = 100/6 = 16.67%.',
      explanationHi: 'सूत्र: [R / (100 + R)] × 100%. यहाँ R = 20 है। अतः [20 / 120] × 100 = 16.67% कमी करनी होगी।'
    },
    {
      id: 102,
      subject: 'reasoning',
      textEn: 'Select the related word: Patna : Bihar :: Dispur : ?',
      textHi: 'संबंधित शब्द का चयन करें: पटना : बिहार :: दिसपुर : ?',
      optionsEn: ['Tripura', 'Assam', 'Manipur', 'Meghalaya'],
      optionsHi: ['त्रिपुरा', 'असम', 'मणिपुर', 'मेघालय'],
      correctIndex: 1,
      explanationEn: 'Patna is the capital of Bihar, and Dispur is the capital of Assam.',
      explanationHi: 'पटना बिहार की राजधानी है, उसी प्रकार दिसपुर असम की राजधानी है।'
    },
    {
      id: 103,
      subject: 'gk',
      textEn: 'Which amendment to the Constitution of India added the words "Socialist", "Secular" and "Integrity" to the Preamble?',
      textHi: 'भारतीय संविधान के किस संशोधन द्वारा प्रस्तावना में "समाजवादी", "धर्मनिरपेक्ष" और "अखंडता" शब्द जोड़े गए?',
      optionsEn: ['42nd Amendment (1976)', '44th Amendment (1978)', '86th Amendment (2002)', '73rd Amendment (1992)'],
      optionsHi: ['42वां संशोधन (1976)', '44वां संशोधन (1978)', '86वां संशोधन (2002)', '73वां संशोधन (1992)'],
      correctIndex: 0,
      explanationEn: 'The 42nd Constitutional Amendment Act of 1976 amended the Preamble to include Socialist, Secular and Integrity.',
      explanationHi: '1976 के 42वें संविधान संशोधन अधिनियम द्वारा प्रस्तावना में समाजवादी, पंथनिरपेक्ष और अखंडता शब्द जोड़े गए।'
    },
    {
      id: 104,
      subject: 'english',
      textEn: 'Choose the correct synonym of the word "DILIGENT":',
      textHi: '"DILIGENT" शब्द का सही पर्यायवाची (Synonym) चुनें:',
      optionsEn: ['Hardworking', 'Careless', 'Lazy', 'Hostile'],
      optionsHi: ['Hardworking (परिश्रमी)', 'Careless (लापरवाह)', 'Lazy (आलसी)', 'Hostile (विरोधी)'],
      correctIndex: 0,
      explanationEn: 'Diligent means having or showing care and conscientiousness in one\'s work; industrious/hardworking.',
      explanationHi: 'Diligent का अर्थ लगनशील या परिश्रमी होता है। इसलिए सही उत्तर Hardworking है।'
    },
    {
      id: 105,
      subject: 'maths',
      textEn: 'A train 180 meters long is running at a speed of 54 km/h. How many seconds will it take to cross an electric pole?',
      textHi: '180 मीटर लंबी एक रेलगाड़ी 54 किमी/घंटा की गति से चल रही है। एक बिजली के खंभे को पार करने में इसे कितने सेकंड लगेंगे?',
      optionsEn: ['10 seconds', '12 seconds', '15 seconds', '8 seconds'],
      optionsHi: ['10 सेकंड', '12 सेकंड', '15 सेकंड', '8 सेकंड'],
      correctIndex: 1,
      explanationEn: 'Speed in m/s = 54 × (5/18) = 15 m/s. Time = Distance / Speed = 180 / 15 = 12 seconds.',
      explanationHi: 'चाल (m/s में) = 54 × (5/18) = 15 मीटर/सेकंड। समय = दूरी / चाल = 180 / 15 = 12 सेकंड।'
    }
  ]
};

import { Question } from '../types';

export const coursesData: Course[] = [
  {
    id: 1,
    title: 'SSC CGL Complete 2026 Foundation',
    titleHi: 'एसएससी सीजीएल 2026 संपूर्ण फाउंडेशन बैच',
    instructor: 'Rahul Sir • Ex-SSC CGL Topper',
    rating: 4.8,
    students: '42,500+',
    price: 'FREE',
    originalPrice: '₹1,999',
    progress: 68,
    tag: 'Best Seller',
    color: 'from-[#FF4D5A] to-[#FF8A4C]',
    lessons: 120,
    hours: '180h',
    pro: false,
    category: 'ssc',
    description: 'Comprehensive preparation for SSC CGL Tier 1 & 2 covering Quantitative Aptitude, English, Reasoning & General Awareness with shortcut tricks and daily practice sets.',
    descriptionHi: 'एसएससी सीजीएल टियर 1 एवं 2 की संपूर्ण तैयारी। गणित, रीजनिंग, अंग्रेजी और सामान्य अध्ययन के लिए विशेष शॉर्टकट ट्रिक्स और डेली प्रैक्टिस सेट्स।',
    lessonList: [
      { id: 'c1-1', title: 'Percentage Concepts & 10-sec Tricks', titleHi: 'प्रतिशत की अवधारणा और 10-सेकंड ट्रिक्स', duration: '48m', isFree: true },
      { id: 'c1-2', title: 'Ratio & Proportion Advanced Mastery', titleHi: 'अनुपात और समानुपात एडवांस मास्टरी', duration: '52m', isFree: true },
      { id: 'c1-3', title: 'Time, Speed & Train Problems', titleHi: 'समय, दूरी और रेलगाड़ी संबंधी प्रश्न', duration: '64m', isFree: true },
      { id: 'c1-4', title: 'Grammar: Subject Verb Agreement', titleHi: 'अंग्रेजी व्याकरण: सब्जेक्ट वर्ब एग्रीमेंट', duration: '45m', isFree: false },
      { id: 'c1-5', title: 'Reasoning: Syllogism 100-50 Method', titleHi: 'रीजनिंग: सिलोजिज्म बिना वेन आरेख मेथड', duration: '50m', isFree: false },
      { id: 'c1-6', title: 'Polity: Fundamental Rights Article 12-35', titleHi: 'संविधान: मूल अधिकार अनुच्छेद 12-35', duration: '58m', isFree: false },
    ]
  },
  {
    id: 2,
    title: 'Railway NTPC + Group D Mahapack',
    titleHi: 'रेलवे एनटीपीसी + ग्रुप डी महापैक 2026',
    instructor: 'Neha Mam • Railway Expert',
    rating: 4.9,
    students: '38,200+',
    price: '₹499',
    originalPrice: '₹1,499',
    progress: 23,
    tag: 'Bihar Top',
    color: 'from-[#7C3AED] to-[#06B6D4]',
    lessons: 95,
    hours: '140h',
    pro: true,
    category: 'railway',
    description: 'Targeted batch for RRB NTPC CBT 1 & 2 + Group D with special emphasis on General Science (Physics, Chemistry, Biology) and Numerical Maths.',
    descriptionHi: 'आरआरबी एनटीपीसी सीबीटी 1 एवं 2 तथा ग्रुप डी के लिए विशेष बैच। सामान्य विज्ञान (भौतिकी, रसायन, जीव विज्ञान) और अंकगणित पर विशेष फोकस।',
    lessonList: [
      { id: 'c2-1', title: 'Physics: Motion & Laws of Newton', titleHi: 'भौतिकी: गति एवं न्यूटन के नियम', duration: '55m', isFree: true },
      { id: 'c2-2', title: 'Chemistry: Periodic Table Shortcuts', titleHi: 'रसायन: आवर्त सारणी याद करने की ट्रिक्स', duration: '60m', isFree: true },
      { id: 'c2-3', title: 'Biology: Human Circulatory System', titleHi: 'जीव विज्ञान: मानव परिसंचरण तंत्र व रक्त', duration: '52m', isFree: false },
      { id: 'c2-4', title: 'Railway Special GK & Current Affairs', titleHi: 'रेलवे स्पेशल सामान्य ज्ञान और करंट अफेयर्स', duration: '44m', isFree: false },
      { id: 'c2-5', title: 'Pipes & Cisterns Shortcut Method', titleHi: 'नल और टंकी के प्रश्न शॉर्टकट मेथड से', duration: '49m', isFree: false },
    ]
  },
  {
    id: 3,
    title: 'Bihar State Exams - BPSC/BSSC Mahapack',
    titleHi: 'बिहार राज्य परीक्षाएं - BPSC/BSSC महापैक',
    instructor: 'Gulshan Sir • Patna Wale',
    rating: 4.7,
    students: '27,800+',
    price: '₹299',
    originalPrice: '₹999',
    progress: 0,
    tag: 'New Launch',
    color: 'from-[#059669] to-[#10B981]',
    lessons: 80,
    hours: '110h',
    pro: true,
    category: 'state',
    description: 'Special batch for Bihar BPSC CCE Prelims, BSSC CGL 4th, and Bihar Police SI. Includes Bihar Special History, Geography, Census and Economic Survey.',
    descriptionHi: 'बिहार बीपीएससी, बीएसएससी सीजीएल और बिहार दरोगा भर्ती के लिए स्पेशल बैच। बिहार विशेष इतिहास, भूगोल, 2011 जनगणना एवं आर्थिक सर्वेक्षण शामिल।',
    lessonList: [
      { id: 'c3-1', title: 'Bihar Special: Ancient History & Magadha', titleHi: 'बिहार विशेष: प्राचीन इतिहास और मगध साम्राज्य', duration: '65m', isFree: true },
      { id: 'c3-2', title: 'Bihar Geography: Rivers & Agriculture', titleHi: 'बिहार का भूगोल: नदियाँ, मिट्टी व कृषि', duration: '58m', isFree: true },
      { id: 'c3-3', title: '1857 Revolt in Bihar & Veer Kunwar Singh', titleHi: '1857 का विद्रोह और वीर कुंवर सिंह का योगदान', duration: '46m', isFree: false },
      { id: 'c3-4', title: 'Bihar Census 2011 & Caste Survey Analysis', titleHi: 'बिहार जनगणना 2011 एवं जाति आधारित गणना', duration: '54m', isFree: false },
    ]
  },
  {
    id: 4,
    title: 'Current Affairs 2025-26 Yearly Booster',
    titleHi: 'करंट अफेयर्स 2025-26 वार्षिक बूस्टर',
    instructor: 'Team EduRank • Research Wing',
    rating: 5.0,
    students: '65,000+',
    price: 'FREE',
    originalPrice: '₹599',
    progress: 92,
    tag: 'Must Have',
    color: 'from-[#DB2777] to-[#FB7185]',
    lessons: 365,
    hours: 'Daily 10min',
    pro: false,
    category: 'ca',
    description: 'Daily bilingual capsules with monthly topic-wise PDFs (Appointments, Sports, Military Exercises, Summits & Awards) for guaranteed high marks.',
    descriptionHi: 'प्रतिदिन 10 मिनट में द्विभाषी करंट अफेयर्स और मासिक विषयवार पीडीएफ (नियुक्तियां, खेल, युद्धाभ्यास, सम्मेलन और पुरस्कार)।',
    lessonList: [
      { id: 'c4-1', title: 'National & International Summits 2026', titleHi: 'राष्ट्रीय एवं अंतर्राष्ट्रीय शिखर सम्मेलन', duration: '35m', isFree: true },
      { id: 'c4-2', title: 'Major Sports Tournaments & Winners', titleHi: 'प्रमुख खेल प्रतियोगिताएं और पदक विजेता', duration: '40m', isFree: true },
      { id: 'c4-3', title: 'New Union Cabinet & Key Appointments', titleHi: 'नया केंद्रीय मंत्रिमंडल और प्रमुख नियुक्तियां', duration: '28m', isFree: true },
    ]
  }
];

export const mockTestsData: MockTest[] = [
  {
    id: 'mock-ssc-1',
    title: 'SSC CGL Tier 1 All-India Mock 2026',
    titleHi: 'एसएससी सीजीएल टियर 1 अखिल भारतीय मॉक 2026',
    category: 'ssc',
    questionsCount: 25,
    durationMinutes: 15,
    totalMarks: 50,
    pro: false,
    questions: [
      ...sampleQuestions.ssc,
      {
        id: 106,
        subject: 'gk',
        textEn: 'Which river is known as the "Sorrow of Bihar"?',
        textHi: 'किस नदी को "बिहार का शोक" कहा जाता है?',
        optionsEn: ['Ganga', 'Kosi', 'Gandak', 'Son'],
        optionsHi: ['गंगा', 'कोसी', 'गंडक', 'सोन'],
        correctIndex: 1,
        explanationEn: 'The Kosi River is known as the "Sorrow of Bihar" due to recurring devastating floods caused by frequent changes in its course.',
        explanationHi: 'कोसी नदी को लगातार मार्ग बदलने और बाढ़ की विभीषिका के कारण "बिहार का शोक" कहा जाता है।'
      },
      {
        id: 107,
        subject: 'maths',
        textEn: 'The average of first 50 natural numbers is:',
        textHi: 'प्रथम 50 प्राकृतिक संख्याओं का औसत क्या है?',
        optionsEn: ['25', '25.5', '26', '24.5'],
        optionsHi: ['25', '25.5', '26', '24.5'],
        correctIndex: 1,
        explanationEn: 'Average of first n natural numbers = (n + 1) / 2 = (50 + 1) / 2 = 25.5.',
        explanationHi: 'प्रथम n प्राकृतिक संख्याओं का औसत = (n + 1) / 2 = (50 + 1) / 2 = 25.5 होता है।'
      },
      {
        id: 108,
        subject: 'reasoning',
        textEn: 'Find the odd one out: 64, 125, 216, 343, 512, 729, 1000',
        textHi: 'विषम का चयन करें: 64, 125, 216, 343, 512, 729, 1000 (इनमें से कौन अलग है?)',
        optionsEn: ['All are cubes', '64 is also a square', '343 is odd', 'None'],
        optionsHi: ['सभी घन (cube) हैं', '64 वर्ग (square) भी है', '343 विषम है', 'कोई नहीं'],
        correctIndex: 1,
        explanationEn: 'All numbers are perfect cubes (4^3, 5^3, 6^3, 7^3, 8^3, 9^3, 10^3), but 64 is also a perfect square (8^2).',
        explanationHi: 'सभी संख्याएं पूर्ण घन हैं, लेकिन 64 एक पूर्ण वर्ग (8²) भी है।'
      }
    ]
  },
  {
    id: 'mock-rrb-1',
    title: 'RRB NTPC CBT 1 Speed Test #04',
    titleHi: 'आरआरबी एनटीपीसी सीबीटी 1 स्पीड टेस्ट #04',
    category: 'railway',
    questionsCount: 20,
    durationMinutes: 12,
    totalMarks: 40,
    pro: true,
    questions: sampleQuestions.ssc
  },
  {
    id: 'mock-bpsc-1',
    title: 'Bihar BSSC & Daroga Special GS Mini Test',
    titleHi: 'बिहार बीएसएससी व दरोगा स्पेशल जीएस टेस्ट',
    category: 'state',
    questionsCount: 20,
    durationMinutes: 12,
    totalMarks: 40,
    pro: true,
    questions: sampleQuestions.ssc
  },
  {
    id: 'mock-ca-daily',
    title: 'Daily Current Affairs 10-Q Rapid Fire',
    titleHi: 'दैनिक करंट अफेयर्स 10 प्रश्न रैपिड फायर',
    category: 'daily',
    questionsCount: 10,
    durationMinutes: 7,
    totalMarks: 20,
    pro: false,
    questions: sampleQuestions.ssc
  }
];

export const currentAffairsData: CurrentAffairItem[] = [
  {
    id: 'ca-1',
    date: '12 Oct 2026',
    titleEn: 'India launches National Semiconductor Mission Phase-2 with ₹1.25 Lakh Crore Outlay',
    titleHi: 'भारत ने ₹1.25 लाख करोड़ के परिव्यय के साथ राष्ट्रीय सेमीकंडक्टर मिशन चरण-2 शुरू किया',
    category: 'Economy & Tech',
    summaryEn: 'The Union Cabinet approved the second phase of the India Semiconductor Mission to establish high-end fabrication clusters in Gujarat and Odisha, targeting domestic electronics self-reliance by 2028.',
    summaryHi: 'केंद्रीय मंत्रिमंडल ने गुजरात और ओडिशा में उच्च स्तरीय फैब्रिकेशन क्लस्टर स्थापित करने के लिए भारत सेमीकंडक्टर मिशन के दूसरे चरण को मंजूरी दी। 2028 तक इलेक्ट्रॉनिक्स में आत्मनिर्भरता का लक्ष्य।',
    tags: ['SSC CGL', 'RRB NTPC', 'Economy'],
    importance: 'Very High'
  },
  {
    id: 'ca-2',
    date: '11 Oct 2026',
    titleEn: 'Bihar completes electrification of 100% rural agricultural pump sets under Mukhyamantri Krishi Vidyut Yojna',
    titleHi: 'बिहार ने मुख्यमंत्री कृषि विद्युत योजना के तहत 100% ग्रामीण कृषि पंप सेटों का विद्युतीकरण पूरा किया',
    category: 'State Affairs',
    summaryEn: 'Bihar has achieved a milestone with dedicated separate agricultural electricity feeders installed across all 38 districts, reducing farmers diesel dependency by 74%.',
    summaryHi: 'बिहार ने सभी 38 जिलों में समर्पित अलग कृषि विद्युत फीडर स्थापित कर एक नया मील का पत्थर हासिल किया, जिससे किसानों की डीजल पर निर्भरता 74% तक कम हो गई है।',
    tags: ['Bihar BPSC', 'BSSC CGL', 'State GK'],
    importance: 'High'
  },
  {
    id: 'ca-3',
    date: '10 Oct 2026',
    titleEn: 'Indian Railways flags off 100th Vande Bharat Sleeper Train on Patna-Delhi Route',
    titleHi: 'भारतीय रेलवे ने पटना-दिल्ली रूट पर 100वीं वंदे भारत स्लीपर ट्रेन को हरी झंडी दिखाई',
    category: 'Railways & Infrastructure',
    summaryEn: 'Equipped with indigenous Kavach 4.0 automatic train protection and top operational speeds of 160 km/h, covering Patna to New Delhi in under 9 hours.',
    summaryHi: 'स्वदेशी कवच 4.0 स्वचालित ट्रेन सुरक्षा प्रणाली और 160 किमी/घंटे की गति से युक्त यह ट्रेन पटना से नई दिल्ली की दूरी 9 घंटे से कम समय में तय करेगी।',
    tags: ['RRB NTPC', 'Group D', 'SSC CGL'],
    importance: 'Very High'
  },
  {
    id: 'ca-4',
    date: '09 Oct 2026',
    titleEn: 'Nobel Peace Prize 2026 awarded for humanitarian disarmament diplomacy',
    titleHi: 'मानवीय निरस्त्रीकरण कूटनीति के लिए नोबेल शांति पुरस्कार 2026 की घोषणा',
    category: 'International Awards',
    summaryEn: 'Recognized for tireless advocacy in conflict de-escalation and global civilian protection frameworks during international crises.',
    summaryHi: 'अंतरराष्ट्रीय संकटों के दौरान संघर्ष में कमी लाने और वैश्विक नागरिक सुरक्षा ढांचे की वकालत के लिए सम्मानित किया गया।',
    tags: ['SSC CGL', 'UPSC', 'Static GK'],
    importance: 'High'
  }
];

export const topperTestimonials = [
  {
    name: 'Vikash Kumar',
    exam: 'SSC CGL 2024 - AIR 34 (Income Tax Inspector)',
    city: 'Patna, Bihar',
    text: 'EduRank ke daily quizzes aur Rahul Sir ke maths tricks ne mera speed 3x badha diya. Negative marking kam hui aur first attempt me selection hua!',
    rating: 5,
    avatar: '👨‍🎓'
  },
  {
    name: 'Priya Sharma',
    exam: 'RRB NTPC Station Master',
    city: 'Muzaffarpur, Bihar',
    text: 'Neha Mam ki science classes aur mock test percentile analytics exact exam pattern jaisa tha. EduRank best platform hai!',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    name: 'Aman Raj',
    exam: 'Bihar BSSC CGL 3rd Ranker',
    city: 'Gaya, Bihar',
    text: 'Gulshan sir ke Bihar Special notes aur daily current affairs PDF se 100% direct questions aaye the. Dhanyawad EduRank team!',
    rating: 5,
    avatar: '🎯'
  }
];
