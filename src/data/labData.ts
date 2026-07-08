import { MicroscopeSample, CellOrganelle, ChemicalElement, MetalOrNonMetalElement, QuizQuestion } from '../types';

import onionRealImg from '../assets/images/onion_cells_microscope_1783385484560.jpg';
import rbcRealImg from '../assets/images/rbc_microscope_1783385495538.jpg';
import stomataRealImg from '../assets/images/stomata_microscope_1783385507622.jpg';
import amoebaRealImg from '../assets/images/amoeba_microscope_1783385519030.jpg';
import bacteriaRealImg from '../assets/images/bacteria_microscope_1783385529145.jpg';

export const CELL_SCIENTISTS = [
  {
    id: 'robert_hooke',
    nameAr: 'روبرت هوك (1665 م)',
    discoveryAr: 'أول من أطلق اسم "الخلية" (Cell) عند فحص قطعة من الفلين تحت مجهره الضوئي البسيط، ورأى حجيرات تشبه أقراس العسل.',
    contributionAr: 'صناعة مجهر ضوئي مركب واكتشاف التركيب الحجيري الميت لمسامات الفلين.'
  },
  {
    id: 'leeuwenhoek',
    nameAr: 'أنطوني فان ليفينهوك (1674 م)',
    discoveryAr: 'أول من شاهد كائنات حية دقيقة وحيدة الخلية (البكتيريا، الأميبا) في قطرة ماء بركة باستخدام مجهر عدسي بدائي تكبيره 270x.',
    contributionAr: 'مؤسس علم الأحياء الدقيقة ورؤية خلايا الدم والكائنات الدقيقة لأول مرة.'
  },
  {
    id: 'schleiden',
    nameAr: 'ماتياس شلايدن (1838 م)',
    discoveryAr: 'عالم نبات أثبت أن جميع النباتات بدون استثناء تتكون من خلايا نباتية وهي وحدة البناء والوظيفة.',
    contributionAr: 'وضع البند الأول للنظرية الخلوية الخاصة بالمملكة النباتية.'
  },
  {
    id: 'schwann',
    nameAr: 'ثيودور شوان (1839 م)',
    discoveryAr: 'عالم حيوان استنتج أن جميع أجساد الحيوانات تتكون من خلايا حيوية وأن الخلية وحدة الحياة الأساسية.',
    contributionAr: 'صياغة النظرية الخلوية الشاملة لجميع الكائنات الحية بالتعاون مع شلايدن.'
  }
];

export const ORGAN_SYSTEMS = [
  {
    id: 'circulatory',
    nameAr: 'الجهاز الدوري والدموي',
    mainOrgansAr: 'القلب، الأوعية الدموية (الشرايين والأوردة)، والدم',
    functionAr: 'ضخ الدم وتوصيل الأكسجين والمغذيات لكافة خلايا الجسم والتخلص من الفضلات وثاني أكسيد الكربون.'
  },
  {
    id: 'respiratory',
    nameAr: 'الجهاز التنفسي',
    mainOrgansAr: 'الرئتان، القصبة الهوائية، والشعب الهوائية',
    functionAr: 'إمداد الخلية بالأكسجين O2 اللازم للتنفس الخلوي وإخراج CO2 عبر عملية الشهيق والزفير.'
  },
  {
    id: 'digestive',
    nameAr: 'الجهاز الهضمي',
    mainOrgansAr: 'الفم، المريء، المعدة، الأمعاء الدقيقة والغليظة',
    functionAr: 'تفكيك الطعام إلى جزيئات جلوكوز وأحماض بسيطة تمتصها الأمعاء لتغذي الخلايا بالمواد الغذائية.'
  },
  {
    id: 'nervous',
    nameAr: 'الجهاز العصبي',
    mainOrgansAr: 'الدماغ، النخاع الشوكي، الأعصاب الخلوية',
    functionAr: 'استقبال المؤثرات الخارجية والداخلية وإرسال سيالات عصبية سريعة للتنسيق بين كافة أجهزة الجسم.'
  }
];

export const ALLOTROPES_CARBON = [
  {
    id: 'diamond',
    nameAr: 'الماس (Diamond)',
    structureAr: 'شبكة بلورية تساهمية ثلاثية الأبعاد صلبة جداً، ترتبط فيها كل ذرة كربون بـ 4 ذرات كربون أخرى.',
    propertiesAr: 'أصلد مادة طبيعية، عازل للكهرباء، شفاف براق ودرجة انصهاره عالية جداً.',
    useAr: 'قطع وصقل الجواهر والزجاج ورؤوس الحفارات العملاقة.'
  },
  {
    id: 'graphite',
    nameAr: 'الجرافيت (Graphite)',
    structureAr: 'طبقات سداسية مستوية تنزلق فوق بعضها، ترتبط كل ذرة كربون بـ 3 ذرات أخرى مع وجود إلكترونات حرة.',
    propertiesAr: 'لين ذو ملمس زلق داكن، موصل جيد للكهرباء والحرارة بسبب الإلكترونات الحرة.',
    useAr: 'أقلام الرصاص، الأقطاب الكهربائية للبطاريات، والمزلقات الجافة.'
  }
];

export const MICROSCOPE_SAMPLES: MicroscopeSample[] = [
  {
    id: 'onion_skin',
    nameAr: 'خلايا بشرة البصل',
    nameEn: 'Onion Epidermis Cells',
    category: 'plant',
    descriptionAr: 'خلايا نباتية متراصة بوضوح تظهر الجدار الخلوي والنواة والمحيط السيتوبلازمي بشكل مستطيل منظم.',
    recommendedMagnification: 10,
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#fef3c7"/><rect width="800" height="800" fill="#fde68a" opacity="0.3"/><g stroke="#78350f" stroke-width="5" fill="#fef08a" fill-opacity="0.65" stroke-linejoin="round"><rect x="-10" y="10" width="270" height="110" rx="4"/><rect x="260" y="10" width="270" height="110" rx="4"/><rect x="530" y="10" width="280" height="110" rx="4"/><rect x="-10" y="120" width="160" height="110" rx="4"/><rect x="150" y="120" width="270" height="110" rx="4"/><rect x="420" y="120" width="260" height="110" rx="4"/><rect x="680" y="120" width="140" height="110" rx="4"/><rect x="-10" y="230" width="310" height="110" rx="4"/><rect x="300" y="230" width="280" height="110" rx="4"/><rect x="580" y="230" width="240" height="110" rx="4"/><rect x="-10" y="340" width="200" height="110" rx="4"/><rect x="190" y="340" width="290" height="110" rx="4"/><rect x="480" y="340" width="270" height="110" rx="4"/><rect x="750" y="340" width="80" height="110" rx="4"/><rect x="-10" y="450" width="280" height="110" rx="4"/><rect x="270" y="450" width="260" height="110" rx="4"/><rect x="530" y="450" width="280" height="110" rx="4"/><rect x="-10" y="560" width="160" height="110" rx="4"/><rect x="150" y="560" width="290" height="110" rx="4"/><rect x="440" y="560" width="280" height="110" rx="4"/><rect x="720" y="560" width="100" height="110" rx="4"/><rect x="-10" y="670" width="290" height="110" rx="4"/><rect x="280" y="670" width="270" height="110" rx="4"/><rect x="550" y="670" width="270" height="110" rx="4"/></g><g fill="#d97706" opacity="0.3" stroke="#b45309" stroke-width="2" stroke-dasharray="4,4"><rect x="10" y="25" width="230" height="80" rx="8"/><rect x="280" y="25" width="230" height="80" rx="8"/><rect x="550" y="25" width="240" height="80" rx="8"/><rect x="170" y="135" width="230" height="80" rx="8"/><rect x="440" y="135" width="220" height="80" rx="8"/><rect x="320" y="245" width="240" height="80" rx="8"/><rect x="210" y="355" width="250" height="80" rx="8"/><rect x="500" y="355" width="230" height="80" rx="8"/><rect x="290" y="465" width="220" height="80" rx="8"/><rect x="170" y="575" width="250" height="80" rx="8"/><rect x="460" y="575" width="240" height="80" rx="8"/></g><g fill="#451a03"><circle cx="180" cy="55" r="16"/><circle cx="340" cy="80" r="17"/><circle cx="720" cy="60" r="15"/><circle cx="80" cy="180" r="15"/><circle cx="360" cy="155" r="16"/><circle cx="620" cy="185" r="15"/><circle cx="240" cy="285" r="18"/><circle cx="530" cy="265" r="16"/><circle cx="730" cy="290" r="15"/><circle cx="140" cy="390" r="16"/><circle cx="430" cy="370" r="17"/><circle cx="680" cy="400" r="15"/><circle cx="210" cy="500" r="16"/><circle cx="480" cy="485" r="17"/><circle cx="740" cy="510" r="15"/><circle cx="100" cy="610" r="15"/><circle cx="390" cy="590" r="16"/><circle cx="660" cy="620" r="17"/><circle cx="210" cy="720" r="16"/><circle cx="490" cy="700" r="15"/></g></svg>',
    realImageUrl: onionRealImg,
    keyFeaturesAr: ['جدار خلوي سميك وواضح', 'نواة طرفية أو مركزية واضحة المعالم', 'فجوة عصيرية كبيرة', 'انعدام البلاستيدات الخضراء في خلايا البشرة']
  },
  {
    id: 'red_blood_cells',
    nameAr: 'خلايا الدم الحمراء',
    nameEn: 'Red Blood Cells (Erythrocytes)',
    category: 'animal',
    descriptionAr: 'خلايا حيوانية مقعرة الوجهين خالية من النواة لدى الإنسان، متخصصة في نقل الأكسجين عبر الهيموجلوبين.',
    recommendedMagnification: 40,
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#fff1f2"/><rect width="800" height="800" fill="#fecdd3" opacity="0.35"/><defs><radialGradient id="rbc" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fca5a5"/><stop offset="30%" stop-color="#f87171"/><stop offset="70%" stop-color="#dc2626"/><stop offset="100%" stop-color="#881337"/></radialGradient><radialGradient id="wbc" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#e0e7ff"/><stop offset="65%" stop-color="#818cf8"/><stop offset="100%" stop-color="#312e81"/></radialGradient></defs><g opacity="0.95"><circle cx="100" cy="90" r="42" fill="url(#rbc)"/><circle cx="200" cy="70" r="45" fill="url(#rbc)"/><circle cx="310" cy="110" r="41" fill="url(#rbc)"/><circle cx="420" cy="80" r="44" fill="url(#rbc)"/><circle cx="530" cy="100" r="42" fill="url(#rbc)"/><circle cx="640" cy="70" r="46" fill="url(#rbc)"/><circle cx="740" cy="120" r="40" fill="url(#rbc)"/><circle cx="60" cy="210" r="44" fill="url(#rbc)"/><circle cx="160" cy="190" r="42" fill="url(#rbc)"/><circle cx="260" cy="220" r="45" fill="url(#rbc)"/><circle cx="370" cy="200" r="43" fill="url(#rbc)"/><circle cx="480" cy="230" r="41" fill="url(#rbc)"/><circle cx="590" cy="190" r="45" fill="url(#rbc)"/><circle cx="690" cy="220" r="42" fill="url(#rbc)"/><circle cx="110" cy="320" r="43" fill="url(#rbc)"/><circle cx="210" cy="300" r="46" fill="url(#rbc)"/><circle cx="430" cy="320" r="42" fill="url(#rbc)"/><circle cx="540" cy="300" r="44" fill="url(#rbc)"/><circle cx="640" cy="330" r="41" fill="url(#rbc)"/><circle cx="740" cy="310" r="43" fill="url(#rbc)"/><circle cx="70" cy="430" r="45" fill="url(#rbc)"/><circle cx="170" cy="410" r="42" fill="url(#rbc)"/><circle cx="270" cy="440" r="44" fill="url(#rbc)"/><circle cx="370" cy="410" r="41" fill="url(#rbc)"/><circle cx="480" cy="430" r="46" fill="url(#rbc)"/><circle cx="580" cy="410" r="43" fill="url(#rbc)"/><circle cx="680" cy="440" r="45" fill="url(#rbc)"/><circle cx="120" cy="540" r="42" fill="url(#rbc)"/><circle cx="220" cy="520" r="44" fill="url(#rbc)"/><circle cx="320" cy="550" r="46" fill="url(#rbc)"/><circle cx="420" cy="520" r="43" fill="url(#rbc)"/><circle cx="520" cy="540" r="41" fill="url(#rbc)"/><circle cx="620" cy="520" r="45" fill="url(#rbc)"/><circle cx="720" cy="550" r="42" fill="url(#rbc)"/><circle cx="60" cy="650" r="43" fill="url(#rbc)"/><circle cx="160" cy="630" r="45" fill="url(#rbc)"/><circle cx="260" cy="660" r="42" fill="url(#rbc)"/><circle cx="370" cy="640" r="44" fill="url(#rbc)"/><circle cx="470" cy="660" r="41" fill="url(#rbc)"/><circle cx="580" cy="630" r="46" fill="url(#rbc)"/><circle cx="680" cy="660" r="43" fill="url(#rbc)"/><circle cx="120" cy="740" r="44" fill="url(#rbc)"/><circle cx="220" cy="730" r="42" fill="url(#rbc)"/><circle cx="330" cy="750" r="45" fill="url(#rbc)"/><circle cx="440" cy="730" r="43" fill="url(#rbc)"/><circle cx="540" cy="750" r="41" fill="url(#rbc)"/><circle cx="640" cy="730" r="44" fill="url(#rbc)"/><circle cx="740" cy="750" r="42" fill="url(#rbc)"/></g><g transform="translate(320, 310)"><circle cx="0" cy="0" r="58" fill="url(#wbc)"/><circle cx="-15" cy="-10" r="16" fill="#1e1b4b"/><circle cx="15" cy="5" r="14" fill="#1e1b4b"/><circle cx="-5" cy="18" r="12" fill="#1e1b4b"/></g></svg>',
    realImageUrl: rbcRealImg,
    keyFeaturesAr: ['قرصية مقعرة الوجهين', 'غياب النواة لزيادة سعة الأكسجين', 'لون أحمر ناتج عن الهيموجلوبين', 'وجود خلايا دم بيضاء ذات نواة مفصصة بينها']
  },
  {
    id: 'leaf_stomata',
    nameAr: 'قطاع ورقة شجر والثغور',
    nameEn: 'Leaf Stomata & Plant Tissue',
    category: 'plant',
    descriptionAr: 'نسيج الورقة النباتية يظهر الثغور والخلايا الحارسة التي تتحكم في تبادل الغازات والنثر المائي.',
    recommendedMagnification: 40,
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#f0fdf4"/><g stroke="#15803d" stroke-width="5" fill="#bbf7d0" fill-opacity="0.7"><polygon points="30,30 230,10 380,60 280,180 80,160"/><polygon points="230,10 530,10 630,100 380,60"/><polygon points="530,10 770,30 780,200 630,100"/><polygon points="80,160 280,180 230,360 30,330"/><polygon points="630,100 780,200 750,380 580,300"/><polygon points="30,330 230,360 180,530 10,500"/><polygon points="180,530 430,500 380,700 130,680"/><polygon points="430,500 750,480 730,680 380,700"/></g><g transform="translate(420, 280)"><path d="M -25,-90 C -90,-70 -90,70 -25,90 C 12,70 12,-70 -25,-90 Z" fill="#16a34a" stroke="#14532d" stroke-width="5"/><path d="M 25,-90 C 90,-70 90,70 25,90 C -12,70 -12,-70 25,-90 Z" fill="#16a34a" stroke="#14532d" stroke-width="5"/><ellipse cx="0" cy="0" rx="14" ry="50" fill="#022c22"/><circle cx="-45" cy="-35" r="10" fill="#14532d"/><circle cx="-50" cy="10" r="10" fill="#14532d"/><circle cx="-40" cy="50" r="10" fill="#14532d"/><circle cx="45" cy="-35" r="10" fill="#14532d"/><circle cx="50" cy="10" r="10" fill="#14532d"/><circle cx="40" cy="50" r="10" fill="#14532d"/></g></svg>',
    realImageUrl: stomataRealImg,
    keyFeaturesAr: ['خلايا حارسة تحيط بفتحة الثغر', 'وفرة البلاستيدات الخضراء', 'طبقة كيوتين واقية على البشرة']
  },
  {
    id: 'amoeba_proteus',
    nameAr: 'الأميبا (كائن وحيد الخلية)',
    nameEn: 'Amoeba Proteus',
    category: 'microbe',
    descriptionAr: 'كائن حقيقي النواة غير منتظم الشكل يتحرك باستخدام الأقدام الكاذبة وتتغذى عن طريق البلعمة.',
    recommendedMagnification: 40,
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#f0f9ff"/><defs><radialGradient id="amoebaBody" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#bae6fd"/><stop offset="70%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#0284c7"/></radialGradient></defs><path d="M 350,150 C 480,120 580,220 620,320 C 680,420 620,550 510,610 C 400,680 280,650 180,560 C 100,480 120,320 220,220 C 270,160 280,180 350,150 Z" fill="url(#amoebaBody)" fill-opacity="0.85" stroke="#0369a1" stroke-width="7"/><circle cx="360" cy="380" r="48" fill="#1e3a8a" opacity="0.9"/><circle cx="360" cy="380" r="26" fill="#1e1b4b"/><circle cx="480" cy="300" r="38" fill="#e0f2fe" stroke="#0284c7" stroke-width="4"/><circle cx="280" cy="480" r="22" fill="#334155"/><circle cx="460" cy="490" r="28" fill="#334155"/><circle cx="300" cy="300" r="5" fill="#0284c7"/><circle cx="420" cy="240" r="6" fill="#0284c7"/><circle cx="520" cy="400" r="5" fill="#0284c7"/><circle cx="240" cy="400" r="7" fill="#0284c7"/></svg>',
    realImageUrl: amoebaRealImg,
    keyFeaturesAr: ['أقدام كاذبة (Pseudopodia) الحركة والتغذية', 'فجوة منقبضة للتوازن المائي', 'غشاء خلوي مرن للغاية']
  },
  {
    id: 'bacteria_smear',
    nameAr: 'مسحة بكتيريا (عصوية وكروية)',
    nameEn: 'Bacterial Smear (Bacilli/Cocci)',
    category: 'microbe',
    descriptionAr: 'خلايا بدائية النواة صغيرة جداً تتطلب تكبيراً عالياً (100x) مع زبدة الزيت لرؤية الشكل والتجمع.',
    recommendedMagnification: 100,
    imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><rect width="800" height="800" fill="#faf5ff"/><g fill="#7e22ce" stroke="#581c87" stroke-width="4"><rect x="150" y="200" width="120" height="40" rx="20" transform="rotate(25 210 220)"/><rect x="350" y="150" width="130" height="40" rx="20" transform="rotate(-15 415 170)"/><rect x="520" y="280" width="115" height="40" rx="20" transform="rotate(45 577 300)"/><rect x="220" y="450" width="125" height="40" rx="20" transform="rotate(-35 282 470)"/><rect x="420" y="520" width="120" height="40" rx="20" transform="rotate(10 480 540)"/><circle cx="180" cy="380" r="20"/><circle cx="220" cy="385" r="20"/><circle cx="260" cy="390" r="20"/><circle cx="480" cy="380" r="20"/><circle cx="515" cy="405" r="20"/><circle cx="620" cy="480" r="20"/></g></svg>',
    realImageUrl: bacteriaRealImg,
    keyFeaturesAr: ['بدائية النواة (لا توجد غلاف نووي)', 'أشكال مختلفة (عصوية، كروية، حلزونية)', 'حجم ميكرومتري صغير جداً']
  }
];

export const CELL_ORGANELLES: CellOrganelle[] = [
  {
    id: 'nucleus',
    nameAr: 'النواة',
    nameEn: 'Nucleus',
    functionAr: 'مركز التحكم بالخلية يحتوي على المادة الوراثية (DNA) ويوجه جميع الأنشطة الخلوية والإنقسام.',
    foundIn: 'both',
    color: 'emerald',
    iconName: 'Dna'
  },
  {
    id: 'mitochondria',
    nameAr: 'الميتوكندريا',
    nameEn: 'Mitochondria',
    functionAr: 'محطة إنتاج الطاقة بالخلية حيث تحول الجلوكوز إلى جزيئات ATP عبر التنفس الخلوي.',
    foundIn: 'both',
    color: 'amber',
    iconName: 'Zap'
  },
  {
    id: 'chloroplast',
    nameAr: 'البلاستيدة الخضراء',
    nameEn: 'Chloroplast',
    functionAr: 'مصنع البناء الضوئي في الخلايا النباتية يمتص الضوء بواسطة الكلوروفيل لصنع الجلوكوز والأكسجين.',
    foundIn: 'plant_only',
    color: 'green',
    iconName: 'Sun'
  },
  {
    id: 'cell_wall',
    nameAr: 'الجدار الخلوي',
    nameEn: 'Cell Wall',
    functionAr: 'جدار صلب خارجي مصنوع من السليلوز يوفر الحماية والدعم الهيكلي للشكل الخلوي النباتي.',
    foundIn: 'plant_only',
    color: 'emerald',
    iconName: 'Shield'
  },
  {
    id: 'cell_membrane',
    nameAr: 'الغشاء الخلوي (البلازمي)',
    nameEn: 'Cell Membrane',
    functionAr: 'غشاء شبه منفذ يحيط بالخلية وينظم دخول وخروج المواد والماء بمهارة عالية.',
    foundIn: 'both',
    color: 'blue',
    iconName: 'Layers'
  },
  {
    id: 'vacuole',
    nameAr: 'الفجوة العصارية',
    nameEn: 'Vacuole',
    functionAr: 'تخزين الماء والأملاح والفضلات. تكون كبيرة ومؤثرة جداً في الخلايا النباتية وصغيرة في الحيوانية.',
    foundIn: 'both',
    color: 'sky',
    iconName: 'Droplet'
  },
  {
    id: 'ribosome',
    nameAr: 'الريبوسوم',
    nameEn: 'Ribosome',
    functionAr: 'عضيات دقيقة غير غشائية تقوم بتصنيع البروتينات اللازمة لبناء وتجديد أجزاء الخلية.',
    foundIn: 'both',
    color: 'purple',
    iconName: 'Cpu'
  }
];

export const CHEMICAL_METALS: ChemicalElement[] = [
  {
    id: 'mg',
    symbol: 'Mg',
    nameAr: 'المغنيسيوم',
    atomicNumber: 12,
    reactivityAr: 'نشط جداً وشدد التفاعل مع الأحماض',
    reactionSpeedSec: 2,
    gasBubblesIntensity: 'explosive',
    tempChangeC: 18,
    color: '#e2e8f0',
    notesAr: 'يتفاعل المغنيسيوم فوراً مع حمض الهيدروكلوريك (HCl) متصدراً غاز الهيدروجين بسرعة وحرارة عالية: Mg + 2HCl → MgCl₂ + H₂↑'
  },
  {
    id: 'zn',
    symbol: 'Zn',
    nameAr: 'الخارصين (الزنك)',
    atomicNumber: 30,
    reactivityAr: 'متوسط النشاط مع الأحماض',
    reactionSpeedSec: 4,
    gasBubblesIntensity: 'high',
    tempChangeC: 10,
    color: '#cbd5e1',
    notesAr: 'يتفاعل الخارصين بانتظام مع تصاعد فقاقيع غاز الهيدروجين وارتفاع متوسط في درجة الحرارة: Zn + 2HCl → ZnCl₂ + H₂↑'
  },
  {
    id: 'fe',
    symbol: 'Fe',
    nameAr: 'الحديد',
    atomicNumber: 26,
    reactivityAr: 'ضعيف إلى متوسط التفاعل',
    reactionSpeedSec: 7,
    gasBubblesIntensity: 'medium',
    tempChangeC: 4,
    color: '#94a3b8',
    notesAr: 'يتفاعل الحديد ببطء مع الحمض مع تصاعد فقاقيع هيدروجين بشكل تدريجي ومستمر: Fe + 2HCl → FeCl₂ + H₂↑'
  },
  {
    id: 'cu',
    symbol: 'Cu',
    nameAr: 'النحاس',
    atomicNumber: 29,
    reactivityAr: 'غير نشط مع الحمض المخفف (لا تفاعل)',
    reactionSpeedSec: 10,
    gasBubblesIntensity: 'none',
    tempChangeC: 0,
    color: '#f97316',
    notesAr: 'النحاس يلي الهيدروجين في سلسلة النشاط الكيميائي ولذلك لا يحل محل الهيدروجين في الحمض المخفف ولا تتصاعد فقاقيع.'
  }
];

export const METALS_NONMETALS_SAMPLES: MetalOrNonMetalElement[] = [
  {
    id: 'copper',
    symbol: 'Cu',
    nameAr: 'النحاس',
    type: 'metal',
    color: '#f97316',
    hasLuster: true,
    isMalleable: true,
    lusterDescriptionAr: 'له لمعان وبريق معدني ناصع عند تسليط الضوء عليه.',
    malleabilityDescriptionAr: 'قابل للطرق والتشكيل؛ ينبسط ويتمدد إلى صفائح رقيقة دون أن يتكسر.'
  },
  {
    id: 'aluminum',
    symbol: 'Al',
    nameAr: 'الألومنيوم',
    type: 'metal',
    color: '#e2e8f0',
    hasLuster: true,
    isMalleable: true,
    lusterDescriptionAr: 'له بريق ولمعان فضي ناصع عاكس للضوء.',
    malleabilityDescriptionAr: 'قابل للطرق والتشكيل بسهولة؛ يتشكل كرقائق وصفائح مرنة.'
  },
  {
    id: 'iron',
    symbol: 'Fe',
    nameAr: 'الحديد',
    type: 'metal',
    color: '#94a3b8',
    hasLuster: true,
    isMalleable: true,
    lusterDescriptionAr: 'له لمعان وبريق معدني عند صقله وتوجيه الإضاءة عليه.',
    malleabilityDescriptionAr: 'قابل للطرق والتشكيل بصلابة دون أن يتفتت.'
  },
  {
    id: 'coal_carbon',
    symbol: 'C',
    nameAr: 'الفحم (الكربون)',
    type: 'nonmetal',
    color: '#334155',
    hasLuster: false,
    isMalleable: false,
    lusterDescriptionAr: 'مادة معتمة سوداء ليس لها أي بريق أو لمعان معدني.',
    malleabilityDescriptionAr: 'غير قابل للطرق والتشكيل؛ هش يتفتت وينكسر فوراً عند الطرق بالمطرقة.'
  },
  {
    id: 'sulfur',
    symbol: 'S',
    nameAr: 'الكبريت',
    type: 'nonmetal',
    color: '#facc15',
    hasLuster: false,
    isMalleable: false,
    lusterDescriptionAr: 'مادة معتمة صفراء خافته تفتقر للبريق واللمعان المعدني.',
    malleabilityDescriptionAr: 'غير قابل للطرق؛ مادة هشة تتحطم وتتفتت إلى مسحوق عند تعرضها للطرق.'
  }
];

export const SCIENCE_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'biology',
    questionAr: 'ما هي العضية المسؤولة عن تحويل الطاقة الكيميائية من الغذاء إلى ATP في الخلية؟',
    optionsAr: ['الريبوسومات', 'الميتوكندريا', 'جهاز جولجي', 'الفجوة العصارية'],
    correctAnswerIndex: 1,
    explanationAr: 'الميتوكندريا هي محطة الطاقة في الخلية حيث تتنفس الخلية خلوياً وتنتج مركب ATP.'
  },
  {
    id: 'q2',
    category: 'biology',
    questionAr: 'أي من التراكيب التالية يوجد في الخلية النباتية ولا يوجد في الخلية الحيوانية؟',
    optionsAr: ['الغشاء البلازمي', 'النواة', 'الجدار الخلوي', 'السيتوبلازم'],
    correctAnswerIndex: 2,
    explanationAr: 'الجدار الخلوي والبلاستيدات الخضراء تراكيب تميز الخلايا النباتية وتمنحها القوة والشكل المنتظم.'
  },
  {
    id: 'q3',
    category: 'physics',
    questionAr: 'إذا تضاعفت كتلة جسم متحرك إلى المثلين مع ثبات سرعته، فماذا يحدث لطاقته الحركية؟',
    optionsAr: ['تتقلص إلى النصف', 'تتضاعف مرتين', 'تزيد 4 أضعاف', 'تبقى ثابتة دون تغيير'],
    correctAnswerIndex: 1,
    explanationAr: 'قانون الطاقة الحركية Ek = 0.5 * m * v²، فتضاعف الكتلة m يؤدي مباشرة لتضاعف الطاقة الحركية مرتين.'
  },
  {
    id: 'q4',
    category: 'physics',
    questionAr: 'أي من المعادن التالية يمتلك أعلى موصلية حرارية ويستخدم بمهارة في نقل الحرارة السريع؟',
    optionsAr: ['الفولاذ المقاوم', 'النحاس', 'الخشب', 'الزجاج'],
    correctAnswerIndex: 1,
    explanationAr: 'النحاس معدن ممتاز التوصيل الحراري والكهربائي بفضل بحر الإلكترونات الحرة في بنية الفلز.'
  },
  {
    id: 'q5',
    category: 'chemistry',
    questionAr: 'ما هي الخواص الفيزيائية المميزة للفلزات مقارنة باللافلزات؟',
    optionsAr: ['اللمعان والبريق المعدني والقابلية للطرق والتشكيل', 'معتمة وغير قابلة للطرق والتشكيل', 'هشة تتفتت عند الطرق وليس لها بريق', 'غازية فقط ولا توجد في حالة صلبة'],
    correctAnswerIndex: 0,
    explanationAr: 'تتميز الفلزات ببريقها ولمعانها المعدني العاكس للضوء وقابليتها للطرق والتشكيل إلى صفائح دون أن تتفتت.'
  },
  {
    id: 'q6',
    category: 'chemistry',
    questionAr: 'ماذا يحدث لحركة وجسيمات المادة الصلبة عند تسخينها حتى تنصهر للتحول إلى سائلة؟',
    optionsAr: ['تزداد طاقة اهتزاز الجسيمات وتضعف القوى بين الجزيئية', 'تتوقف حركة الجسيمات تماماً', 'تزداد قوى التماسك والصلابة', 'تقل الطاقة الحرارية'],
    correctAnswerIndex: 0,
    explanationAr: 'الحرارة تزيد الطاقة الحركية للجسيمات مما يساعدها على التغلب جزئياً على قوى الترابط والتحول للسائل.'
  },
  {
    id: 'q7',
    category: 'earth',
    questionAr: 'ما اسم العملية التي يتم فيها تفتيت الصخور في مكانها دون نقلها بواسطة العوامل الجوية؟',
    optionsAr: ['التعرية', 'التجوية', 'التجميع والتعدين', 'الترسيب'],
    correctAnswerIndex: 1,
    explanationAr: 'التجوية (Weathering) هي تفتيت الصخور مكانها كيميائياً أو ميكانيكياً، بينما التعرية تنقل الفتات.'
  },
  {
    id: 'q8',
    category: 'biology',
    questionAr: 'ماذا يحدث لخلية دم حمراء إذا وُضعت في محلول مفرط التركيز (أعلى اسموزية من الخلية)؟',
    optionsAr: ['تنتفخ وتنفجر', 'تنكمش بسبب خروج الماء منها', 'لا يتغير حجمها إطلاقاً', 'تتضاعف نواتها'],
    correctAnswerIndex: 1,
    explanationAr: 'في المحلول مفرط التركيز يخرج الماء من داخل الخلية ذات التركيز الأعلى مائياً إلى الخارج فتنكمش الخلية.'
  },
  {
    id: 'q9',
    category: 'earth',
    questionAr: 'أي من المواد التالية تتحلل أسرع عند طمرها في التربة الرطبة تحت تأثير الكائنات الحية الدقيقة (ص 97)؟',
    optionsAr: ['قشور الفواكه والخضار والخبز', 'الأكياس والزجاجات البلاستيكية', 'المشابك والدبابيس الفلزية', 'رقائق الألومنيوم المعدنية'],
    correctAnswerIndex: 0,
    explanationAr: 'المواد النباتية والعضوية الطبيعية (كقشور الفواكه والخبز) تتحلل بسرعة بواسطة البكتيريا والفطريات في التربة، بينما البلاستيك والمعادن تقاوم التحلل لمئات السنين وتعتبر من ملوثات البيئة.'
  }
];

export const LAB_SAFETY_RULES = [
  'ارتداء النظارات الواقية والمئزر المعملي أثناء إجراء أي تجربة كيميائية.',
  'عدم تذوق أو استنشاق أي مادة كيميائية بشكل مباشر واستخدام طريقة التلويح باليد.',
  'التأكد من إغلاق صمامات الغاز ومصادر الكهرباء عند الانتهاء من التجربة.',
  'حفظ المواد القابلة للإشتعال بعيداً عن أهبة اللهب والمشاعل.',
  'التعامل بحذر شديد مع الأجهزة الزجاجية والمجهر الضوئي وعدم تحريكه بقوة.'
];
