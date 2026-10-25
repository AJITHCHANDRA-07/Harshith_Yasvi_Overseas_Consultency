import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   CONSTANTS – exact data from production site
═══════════════════════════════════════════════════════ */
const WA_NUM_1 = "919989884094";
const WA_NUM_2 = "919390677123";
const WA_DISPLAY_1 = "+91 99898 84094";
const WA_DISPLAY_2 = "+91 93906 77123";
const WA_NUM = WA_NUM_1;

const wa = (t = "", num = WA_NUM_1) =>
  `https://wa.me/${num}${t ? `?text=${encodeURIComponent(t)}` : ""}`;

const COUNTRIES = [
  {
    id: "uk",
    flag: "🇬🇧",
    name: "United Kingdom",
    landmark: "Big Ben & Westminster, London",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    intakes: "Sep · Jan",
    blurb: "One-year master's, strong global brand value & post-study graduate routes.",
    extra: ["CAS from the university", "TB test certificate"]
  },
  {
    id: "canada",
    flag: "🇨🇦",
    name: "Canada",
    landmark: "Lake Louise, Banff National Park",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80",
    intakes: "Sep · Jan · May",
    blurb: "Wide course choice, co-op work terms & 3-year PGWP post-study pathways.",
    extra: ["Proof of tuition payment", "GIC / proof of living funds"]
  },
  {
    id: "australia",
    flag: "🇦🇺",
    name: "Australia",
    landmark: "Sydney Opera House & Harbour",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    intakes: "Feb · Jul",
    blurb: "Career-focused courses, world-class cities & extensive post-study visas.",
    extra: ["Confirmation of Enrolment (CoE)", "Genuine Student statement", "OSHC health cover"]
  },
  {
    id: "nz",
    flag: "🇳🇿",
    name: "New Zealand",
    landmark: "Milford Sound & Queenstown",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80",
    intakes: "Feb · Jul",
    blurb: "Safe, peaceful, top-tier research universities & practical hands-on learning.",
    extra: ["Offer of Place", "Police and medical certificates"]
  },
  {
    id: "ireland",
    flag: "🇮🇪",
    name: "Ireland",
    landmark: "Cliffs of Moher & Dublin Tech Hub",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=800&q=80",
    intakes: "Sep · Jan",
    blurb: "Europe's leading tech & pharma hub, English-speaking with 2-year stay back.",
    extra: ["Proof of tuition payment", "Private medical insurance"]
  },
  {
    id: "germany",
    flag: "🇩🇪",
    name: "Germany",
    landmark: "Brandenburg Gate, Berlin",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
    intakes: "Oct · Apr",
    blurb: "Tuition-free world-class public universities with 18-month job seeker visa.",
    extra: ["Blocked account proof", "APS certificate", "Health insurance"]
  },
];

const INTAKES = [
  { country: "UK",          dates: "Sep · Jan" },
  { country: "Canada",      dates: "Sep · Jan · May" },
  { country: "Australia",   dates: "Feb · Jul" },
  { country: "New Zealand", dates: "Feb · Jul" },
  { country: "Ireland",     dates: "Sep · Jan" },
  { country: "Germany",     dates: "Oct · Apr" },
];

const STATS = [
  { n: "1,200+", label: "students guided" },
  { n: "96%",    label: "visa success rate" },
  { n: "150+",   label: "partner universities" },
  { n: "9",      label: "years in Hyderabad" },
];

const SERVICES = [
  {
    stage: "Stage 1", title: "Before you apply",
    items: [
      { icon: "👤", title: "Profile evaluation & career counselling", desc: "We assess your academics, goals and budget." },
      { icon: "🎓", title: "University & course guidance",           desc: "A shortlist that fits your profile." },
      { icon: "🏆", title: "Scholarship guidance",                  desc: "Find and apply for funding you qualify for." },
    ],
  },
  {
    stage: "Stage 2", title: "Applying",
    items: [
      { icon: "📄", title: "Application support",    desc: "Documents, SOPs and submissions handled." },
      { icon: "💬", title: "Interview preparation",  desc: "Mock interviews for universities and visas." },
      { icon: "🛂", title: "Visa guidance",           desc: "Checklists, filing and follow-up." },
    ],
  },
  {
    stage: "Stage 3", title: "After admission",
    items: [
      { icon: "✈️", title: "Pre-departure support",        desc: "Travel, forex and packing briefing." },
      { icon: "🏠", title: "Accommodation assistance",     desc: "Help finding a safe place to stay." },
      { icon: "💼", title: "Part-time work options",       desc: "Know the rules and where to look." },
      { icon: "📍", title: "Post-arrival support",         desc: "We stay in touch after you land." },
    ],
  },
];

const STEPS = [
  { n: "01", title: "Counselling",  desc: "Meet a counsellor. We understand your profile, goals and budget." },
  { n: "02", title: "Shortlist",    desc: "We recommend countries, courses and universities that fit." },
  { n: "03", title: "Apply & visa", desc: "We prepare documents, submit applications and file your visa." },
  { n: "04", title: "Fly & settle", desc: "Pre-departure briefing, accommodation and support after you land." },
];

const WHY_CHECKS = [
  "One counsellor from your first call to your arrival",
  "A written cost estimate before you pay any application fee",
  "Honest advice, even when the answer is a different country or course",
  "Help with visa, accommodation and travel, not just admission",
  "An office in Vanasthalipuram you and your parents can visit",
];

const STORIES = [
  {
    av: "SK",
    name: "Suresh Kumar",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    meta: "MSc Data Analytics · Ireland · 2025",
    quote: "They told us honestly that my first choice was over our budget and found a better course in Ireland. My parents were part of every call."
  },
  {
    av: "RR",
    name: "Rithika Reddy",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    meta: "MBA · Canada · 2024",
    quote: "My visa was refused once with another agent. Yasvi went through the refusal letter line by line, and the second application was approved."
  },
  {
    av: "PV",
    name: "P. Venkat Rao (Parent)",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    meta: "Son studying in Germany · 2025",
    quote: "As a parent I wanted to know every cost up front. We got a written estimate before we paid anything, and it was accurate."
  },
];

const PARENTS = [
  { icon: "📄", title: "Every cost, in writing",  desc: "Tuition, living costs, visa and travel, estimated per university before you pay any application fee." },
  { icon: "💬", title: "You stay in the loop",    desc: "Parents can join every counselling call, and we send updates at each step: offers, deposits, visa, travel." },
  { icon: "🛂", title: "Documents done right",    desc: "We check financial and academic documents carefully, because most visa refusals come from avoidable mistakes." },
  { icon: "🏠", title: "Safe landing",            desc: "Accommodation help, pre-departure briefing and a contact after arrival, so your child is never on their own." },
];

const CHECKLIST_BASE = [
  "Valid passport",
  "Offer letter from the university",
  "Academic transcripts and certificates",
  "English test score (IELTS / PTE / TOEFL / Duolingo)",
  "Proof of funds and sponsor documents",
  "Statement of purpose",
];

const GUIDES = [
  { meta: "Guide · 5 min read",    title: "UK or Ireland for a one-year master's?",              desc: "Costs, work options after study and how to choose between the two.",               waText: "Hi Yasvi, I read your guide on UK vs Ireland and have a question." },
  { meta: "Guide · 4 min read",    title: "Studying in Germany with low tuition: what to know",  desc: "Blocked account, APS certificate and English-taught programmes explained.",         waText: "Hi Yasvi, I read your Germany guide and have a question." },
  { meta: "Checklist · 3 min read",title: "Visa refused before? Five things to fix",             desc: "The most common reasons for refusal and how a stronger application addresses them.",waText: "Hi Yasvi, I had a visa refusal and want to discuss it." },
];

const FAQ = [
  { q: "How much does it cost to study abroad?",         a: "It depends on the country, course and city. Before you apply, we give you a written estimate of tuition, living costs and visa fees for each university on your shortlist, so your family can plan with real numbers." },
  { q: "Do I need IELTS?",                               a: "Most universities ask for an English test such as IELTS, PTE, TOEFL or Duolingo. Some accept your school English marks instead. We check the exact requirement for every university on your list." },
  { q: "Can I get a scholarship?",                       a: "Many universities offer merit scholarships and tuition fee reductions. We find the ones you are eligible for and help you prepare the application." },
  { q: "When should I start the process?",               a: "Ideally 8 to 12 months before your intake. That leaves time for English tests, applications and the visa. Shorter timelines are possible for some courses, so talk to us even if your intake is close." },
  { q: "My visa was refused before. Can I still apply?", a: "Yes. We go through the refusal reasons with you and prepare a stronger application, with the documents and explanations the visa officer will look for." },
  { q: "Do you help after I reach my country?",          a: "Yes. We help with accommodation, guide you on part-time work rules and stay in touch after you land." },
];

const QUIZ_QUESTIONS = [
  { q: "What is your total budget?",               opts: [["Lower",          { germany: 3, ireland: 1, nz: 1 }],["Medium", { canada: 2, uk: 2, nz: 2, ireland: 2 }],["Higher", { australia: 2, uk: 2, canada: 1 }]] },
  { q: "How long a course do you want?",           opts: [["One year",        { uk: 3, ireland: 3 }],             ["Two years", { canada: 2, australia: 2, germany: 2, nz: 2 }]] },
  { q: "How important is working after study?",    opts: [["Very",            { canada: 3, australia: 3, germany: 2 }],["Somewhat", { uk: 2, ireland: 2, nz: 2 }]] },
  { q: "When do you want to start?",               opts: [["Within 6 months", { uk: 2, canada: 2, ireland: 2 }], ["Feb / Jul", { australia: 3, nz: 3 }],["Oct / Apr", { germany: 3 }]] },
  { q: "How is your English test status?",         opts: [["Score ready",     { uk: 1, canada: 1, australia: 1, ireland: 1, nz: 1 }],["Not taken yet", { germany: 1, canada: 1 }]] },
];

/* ═══════════════════════════════════════════════════════
   3D GLOBE using Three.js from CDN
═══════════════════════════════════════════════════════ */
function Globe3D() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const rotationY = useRef(0.2);
  const rotationX = useRef(-0.16);
  const velocityX = useRef(0);
  const velocityY = useRef(0.0035);

  const DEST_PINS = [
    { id: "uk",        lat: 51.5,   lon: -0.1,   country: "United Kingdom", city: "London",    flag: "🇬🇧", color: "#38bdf8", glow: "#0ea5e9" },
    { id: "canada",    lat: 43.65,  lon: -79.38, country: "Canada",         city: "Toronto",   flag: "🇨🇦", color: "#4ade80", glow: "#16a34a" },
    { id: "australia", lat: -33.87, lon: 151.2,  country: "Australia",      city: "Sydney",    flag: "🇦🇺", color: "#fbbf24", glow: "#d97706" },
    { id: "nz",        lat: -36.85, lon: 174.76, country: "New Zealand",    city: "Auckland",  flag: "🇳🇿", color: "#c084fc", glow: "#9333ea" },
    { id: "ireland",   lat: 53.33,  lon: -6.25,  country: "Ireland",        city: "Dublin",    flag: "🇮🇪", color: "#f43f5e", glow: "#e11d48" },
    { id: "germany",   lat: 52.52,  lon: 13.4,   country: "Germany",        city: "Berlin",    flag: "🇩🇪", color: "#fb923c", glow: "#ea580c" },
    { id: "hyd",       lat: 17.38,  lon: 78.48,  country: "India (Hyderabad)", city: "Start",  flag: "🇮🇳", color: "#fef08a", glow: "#eab308" },
  ];

  // Continent outlines (lat, lon)
  const CONTINENTS = [
    // Europe & Scandinavia
    [[71,28],[68,14],[62,5],[55,8],[54,14],[58,20],[65,24],[71,28]],
    [[55,8],[50,-1],[44,-1],[43,3],[43,7],[46,13],[48,17],[54,14],[55,8]],
    // UK
    [[58.5,-3.5],[57.5,-2.0],[56.0,-2.8],[54.0,0.2],[51.5,1.4],[50.5,-1.8],[50.2,-5.3],[51.8,-5.2],[53.4,-3.0],[55.0,-5.0],[58.5,-5.0],[58.5,-3.5]],
    // Ireland
    [[55.2,-7.3],[54.2,-5.8],[52.2,-6.2],[51.5,-9.8],[53.2,-10.0],[54.5,-8.5],[55.2,-7.3]],
    // Africa
    [[37,10],[32,32],[22,38],[12,44],[5,48],[-5,40],[-15,40],[-28,32],[-34,22],[-34,18],[-22,14],[-5,12],[5,3],[5,-4],[12,-16],[22,-16],[32,-8],[36,-5],[37,10]],
    // Madagascar
    [[-12,49],[-16,50],[-25,47],[-25,43],[-18,44],[-12,49]],
    // Asia
    [[72,70],[73,130],[65,170],[60,165],[55,140],[40,130],[35,120],[22,114],[10,105],[1,104],[8,77],[22,69],[25,62],[15,52],[12,44],[28,34],[35,36],[42,48],[50,55],[60,60],[72,70]],
    // India subcontinent
    [[35,74],[31,78],[27,88],[22,89],[16,82],[10,80],[8,77],[15,73],[21,69],[24,68],[31,70],[35,74]],
    // Japan
    [[45,142],[43,145],[35,140],[34,136],[38,138],[45,142]],
    // Australia
    [[-11,142],[-15,145],[-24,153],[-32,152],[-38,147],[-38,140],[-35,115],[-22,114],[-15,124],[-14,136],[-11,142]],
    // New Zealand North & South
    [[-34.5,173],[-37,175],[-41.5,175],[-39,174],[-37,177],[-34.5,173]],
    [[-41,173],[-46.5,168],[-47,167],[-43,171],[-41,173]],
    // North America (Canada, Alaska, US, Mexico)
    [[71,-156],[65,-168],[60,-165],[55,-130],[48,-124],[38,-123],[32,-117],[24,-110],[18,-105],[15,-92],[22,-97],[30,-88],[25,-80],[35,-75],[45,-66],[52,-56],[60,-64],[68,-65],[70,-90],[70,-130],[71,-156]],
    // South America
    [[11,-74],[8,-60],[5,-52],[-2,-44],[-8,-35],[-22,-41],[-34,-53],[-45,-65],[-55,-66],[-50,-74],[-35,-72],[-18,-70],[-5,-80],[2,-77],[11,-74]],
  ];

  // Procedural high-density land dots covering the globe
  const LAND_DOTS = [
    // North America & Canada
    [64,-150],[60,-140],[58,-120],[55,-105],[54,-90],[56,-75],[50,-120],[50,-100],[50,-80],[45,-75],[45,-90],[45,-110],[42,-83],[38,-77],[38,-95],[38,-115],[34,-84],[34,-100],[34,-118],[30,-90],[26,-80],[25,-100],[20,-100],[52,-115],[53,-113],[49,-123],[45,-73],[43,-79],[46,-64],[58,-64],[55,-60],[62,-114],[68,-133],
    // South America
    [8,-65],[5,-73],[3,-60],[0,-50],[-5,-40],[-8,-55],[-10,-75],[-15,-48],[-15,-60],[-20,-45],[-23,-46],[-25,-57],[-30,-60],[-33,-70],[-35,-58],[-40,-65],[-48,-70],[-52,-68],
    // UK & Ireland
    [51.5,-0.1],[53.4,-2.2],[55.9,-3.2],[57.1,-2.1],[54.6,-5.9],[53.3,-6.2],[51.9,-8.5],[52.6,-8.6],
    // Europe
    [52.5,13.4],[48.8,2.3],[50.8,4.3],[52.3,4.9],[51.2,10.4],[48.1,11.5],[47.3,8.5],[45.4,9.2],[41.9,12.5],[40.4,-3.7],[38.7,-9.1],[43.6,1.4],[45.7,4.8],[50.1,14.4],[52.2,21.0],[53.5,10.0],[59.3,18.0],[60.2,24.9],[59.9,10.7],[55.7,12.5],[56.9,24.1],[54.7,25.3],[44.4,26.1],[42.7,23.3],[37.9,23.7],[41.0,28.9],
    // Africa
    [36.8,10.1],[33.5,-7.6],[30.0,31.2],[24.7,46.7],[15.5,32.5],[14.7,-17.4],[9.0,7.5],[6.5,3.3],[5.6,-0.2],[4.0,9.7],[1.3,36.8],[-1.3,36.8],[-4.4,15.3],[-8.8,13.2],[-15.4,28.3],[-17.8,31.0],[-22.5,17.0],[-26.2,28.0],[-33.9,18.4],[-29.8,31.0],
    // India & Neighborhood
    [28.6,77.2],[19.0,72.8],[17.38,78.48],[13.0,80.2],[12.9,77.6],[22.5,88.3],[23.0,72.5],[26.9,75.8],[25.6,85.1],[15.3,73.8],[11.0,76.9],[8.5,76.9],[24.8,67.0],[31.5,74.3],[33.7,73.0],[6.9,79.8],[23.8,90.4],[27.7,85.3],
    // East & SE Asia
    [39.9,116.4],[31.2,121.4],[23.1,113.2],[22.3,114.1],[37.5,126.9],[35.6,139.6],[34.6,135.5],[43.0,141.3],[13.7,100.5],[10.8,106.6],[1.3,103.8],[3.1,101.6],[-6.2,106.8],[-7.2,112.7],[14.5,120.9],
    // Australia & NZ
    [-33.87,151.2],[-37.8,144.9],[-27.4,153.0],[-31.9,115.8],[-34.9,138.6],[-12.4,130.8],[-23.7,133.8],[-42.8,147.3],[-36.85,174.76],[-41.28,174.77],[-43.53,172.63],[-45.87,170.5],
  ];

  function latLonToVec3(lat, lon, r) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return {
      x: -r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.cos(phi),
      z: r * Math.sin(phi) * Math.sin(theta),
    };
  }

  function handleCountryClick(id) {
    const el = document.getElementById("c-" + id) || document.getElementById("countries");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H, R;
    function resize() {
      const dpr = Math.min(2.5, window.devicePixelRatio || 1);
      const rect = containerRef.current.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      R = Math.min(W, H) * 0.40;
    }
    resize();

    function rotatePoint(p, rx, ry) {
      const x = p.x * Math.cos(ry) + p.z * Math.sin(ry);
      const z = -p.x * Math.sin(ry) + p.z * Math.cos(ry);
      const y2 = p.y * Math.cos(rx) - z * Math.sin(rx);
      const z2 = p.y * Math.sin(rx) + z * Math.cos(rx);
      return { x, y: y2, z: z2 };
    }

    function project(p) {
      const fov = R * 4.2;
      const scale = fov / (fov + p.z);
      return {
        x: W / 2 + p.x * scale,
        y: H / 2 - p.y * scale,
        scale,
        z: p.z,
      };
    }

    const comets = DEST_PINS.filter(d => d.id !== "hyd").map((_, i) => ({
      t: (i * 0.17) % 1,
      speed: 0.005 + (i % 3) * 0.001,
    }));

    function drawGlobe() {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const rx = rotationX.current, ry = rotationY.current;

      /* 1. Deep cosmic space aura */
      const spaceAura = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.5);
      spaceAura.addColorStop(0, "rgba(56,189,248,0.22)");
      spaceAura.addColorStop(0.35, "rgba(99,102,241,0.14)");
      spaceAura.addColorStop(0.7, "rgba(15,23,42,0.06)");
      spaceAura.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = spaceAura;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2);
      ctx.fill();

      /* 2. Soft atmospheric corona */
      const corona = ctx.createRadialGradient(cx, cy, R * 0.96, cx, cy, R * 1.25);
      corona.addColorStop(0, "rgba(56,189,248,0.36)");
      corona.addColorStop(0.4, "rgba(99,102,241,0.18)");
      corona.addColorStop(1, "rgba(56,189,248,0)");
      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx.fill();

      /* 3. Volumetric 3D ocean sphere */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      const ocean = ctx.createRadialGradient(
        cx - R * 0.35,
        cy - R * 0.35,
        R * 0.05,
        cx + R * 0.2,
        cy + R * 0.2,
        R * 1.2
      );
      ocean.addColorStop(0,    "#38bdf8"); // bright cyan zenith
      ocean.addColorStop(0.12, "#0284c7"); // vibrant azure
      ocean.addColorStop(0.32, "#1d4ed8"); // royal sapphire
      ocean.addColorStop(0.58, "#1e3a8a"); // deep cobalt
      ocean.addColorStop(0.82, "#0f172a"); // twilight navy
      ocean.addColorStop(1,    "#020617"); // midnight space
      ctx.fillStyle = ocean;
      ctx.fillRect(0, 0, W, H);

      /* 4. Glowing 3D longitude & latitude lines */
      ctx.save();
      for (let lat = -75; lat <= 75; lat += 25) {
        const pts = [];
        for (let lon2 = 0; lon2 <= 360; lon2 += 4) {
          const p = latLonToVec3(lat, lon2, R);
          pts.push(project(rotatePoint(p, rx, ry)));
        }
        ctx.beginPath();
        pts.forEach((pr, i) => (i === 0 ? ctx.moveTo(pr.x, pr.y) : ctx.lineTo(pr.x, pr.y)));
        ctx.closePath();
        const isEq = lat === 0;
        ctx.strokeStyle = isEq ? "rgba(56,189,248,0.48)" : "rgba(147,197,253,0.14)";
        ctx.lineWidth = isEq ? 1.0 : 0.5;
        ctx.stroke();
      }
      for (let lon2 = 0; lon2 < 360; lon2 += 30) {
        const pts = [];
        for (let lat = -90; lat <= 90; lat += 4) {
          const p = latLonToVec3(lat, lon2, R);
          pts.push(project(rotatePoint(p, rx, ry)));
        }
        ctx.beginPath();
        pts.forEach((pr, i) => (i === 0 ? ctx.moveTo(pr.x, pr.y) : ctx.lineTo(pr.x, pr.y)));
        ctx.strokeStyle = "rgba(147,197,253,0.12)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.restore();

      /* 5. Continent polygons */
      for (const ring of CONTINENTS) {
        const pts3d = ring.map(([la, lo]) => rotatePoint(latLonToVec3(la, lo, R * 0.998), rx, ry));
        const front = pts3d.filter(v => v.z > -R * 0.35).length;
        if (front < ring.length * 0.35) continue;

        ctx.save();
        ctx.shadowColor = "rgba(45,212,191,0.65)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        pts3d.forEach((p3, i) => {
          const pr = project(p3);
          i === 0 ? ctx.moveTo(pr.x, pr.y) : ctx.lineTo(pr.x, pr.y);
        });
        ctx.closePath();
        ctx.fillStyle = "rgba(20,184,166,0.28)";
        ctx.strokeStyle = "rgba(94,234,212,0.75)";
        ctx.lineWidth = 1.3;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      /* 6. Dense glowing land dots matrix */
      for (const [la, lo] of LAND_DOTS) {
        const p3d = rotatePoint(latLonToVec3(la, lo, R), rx, ry);
        if (p3d.z < -R * 0.15) continue;
        const pr = project(p3d);
        const alpha = Math.max(0.1, (p3d.z + R * 0.15) / (R * 1.15));
        ctx.save();
        ctx.shadowColor = "rgba(45,212,191,0.9)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(pr.x, pr.y, 1.8 * pr.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94,234,212,${(alpha * 0.9).toFixed(2)})`;
        ctx.fill();
        ctx.restore();
      }

      ctx.restore(); /* End ocean sphere clip */

      /* 7. Thick neon atmosphere rim */
      const atm = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.08);
      atm.addColorStop(0, "rgba(56,189,248,0)");
      atm.addColorStop(0.65, "rgba(56,189,248,0.24)");
      atm.addColorStop(0.85, "rgba(99,102,241,0.30)");
      atm.addColorStop(1, "rgba(56,189,248,0.04)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.08, 0, Math.PI * 2);
      ctx.fillStyle = atm;
      ctx.fill();

      /* 8. Specular lens glare */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      const spec = ctx.createRadialGradient(
        cx - R * 0.44,
        cy - R * 0.44,
        0,
        cx - R * 0.28,
        cy - R * 0.28,
        R * 0.65
      );
      spec.addColorStop(0, "rgba(255,255,255,0.35)");
      spec.addColorStop(0.4, "rgba(255,255,255,0.08)");
      spec.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = spec;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      /* 9. 3D flight arcs & animated travelling photons */
      const hyd = DEST_PINS.find(d => d.id === "hyd");
      const hyd3d = rotatePoint(latLonToVec3(hyd.lat, hyd.lon, R), rx, ry);
      const hydPr = project(hyd3d);

      const destOnly = DEST_PINS.filter(d => d.id !== "hyd");
      destOnly.forEach((dest, i) => {
        const dest3d = rotatePoint(latLonToVec3(dest.lat, dest.lon, R), rx, ry);
        const destPr = project(dest3d);

        // Check visibility
        if (hyd3d.z < -R * 0.65 && dest3d.z < -R * 0.65) return;
        const alpha = Math.max(0, Math.min(1, ((hyd3d.z + R) / (2 * R)) * ((dest3d.z + R) / (2 * R)))) * 0.95;

        // Peak arc control point in 3D
        const mx = (hydPr.x + destPr.x) / 2;
        const my = (hydPr.y + destPr.y) / 2 - R * 0.32;

        /* Glowing dashed trajectory */
        ctx.save();
        ctx.shadowColor = dest.glow;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(hydPr.x, hydPr.y);
        ctx.quadraticCurveTo(mx, my, destPr.x, destPr.y);
        ctx.strokeStyle = dest.color + Math.round(alpha * 0.55 * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 1.8;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        /* Moving photon particle */
        comets[i].t = (comets[i].t + comets[i].speed) % 1;
        const pt = comets[i].t;
        const bx = (1 - pt) * (1 - pt) * hydPr.x + 2 * (1 - pt) * pt * mx + pt * pt * destPr.x;
        const by = (1 - pt) * (1 - pt) * hydPr.y + 2 * (1 - pt) * pt * my + pt * pt * destPr.y;

        ctx.save();
        ctx.shadowColor = dest.color;
        ctx.shadowBlur = 20;
        // Outer glow
        ctx.beginPath();
        ctx.arc(bx, by, 8, 0, Math.PI * 2);
        ctx.fillStyle = dest.color + Math.round(alpha * 0.4 * 255).toString(16).padStart(2, "0");
        ctx.fill();
        // Inner white photon
        ctx.beginPath();
        ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.restore();
      });

      /* 10. Destination pins and floating AR badges */
      const pulseCycle = (Date.now() % 1600) / 1600;
      const allPins = DEST_PINS.map(dest => {
        const p3 = rotatePoint(latLonToVec3(dest.lat, dest.lon, R), rx, ry);
        return { dest, proj: project(p3), z: p3.z };
      }).sort((a, b) => a.z - b.z);

      for (const { dest, proj, z } of allPins) {
        if (z < -R * 0.22) continue;
        const alpha = Math.max(0, (z + R * 0.22) / (R * 1.22));
        const isHyd = dest.id === "hyd";

        ctx.save();
        // Concentric pulse wave
        const pr = (isHyd ? R * 0.08 : R * 0.06) + pulseCycle * R * 0.08;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, pr, 0, Math.PI * 2);
        ctx.fillStyle = dest.color + Math.round((1 - pulseCycle) * alpha * 0.3 * 255).toString(16).padStart(2, "0");
        ctx.fill();

        // Second pulse wave for Hyderabad
        if (isHyd) {
          const pr2 = R * 0.05 + ((pulseCycle + 0.5) % 1) * R * 0.08;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, pr2, 0, Math.PI * 2);
          ctx.fillStyle = dest.color + Math.round((1 - ((pulseCycle + 0.5) % 1)) * alpha * 0.2 * 255).toString(16).padStart(2, "0");
          ctx.fill();
        }

        // Solid mid ring
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, isHyd ? R * 0.04 : R * 0.026, 0, Math.PI * 2);
        ctx.strokeStyle = dest.color;
        ctx.lineWidth = isHyd ? 2.5 : 1.8;
        ctx.globalAlpha = alpha * 0.85;
        ctx.stroke();

        // Intense core dot
        ctx.shadowColor = dest.glow;
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, isHyd ? R * 0.022 : R * 0.016, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.restore();

        // 3D Glass Pill Badge with highlighted English Country Name
        if (z > -R * 0.05) {
          ctx.save();
          const badgeText = `${dest.flag} ${dest.country}`;
          ctx.font = `bold 11px 'DM Sans', -apple-system, sans-serif`;
          const textW = ctx.measureText(badgeText).width;
          const badgeW = textW + 18;
          const badgeH = 24;
          const bx = proj.x - badgeW / 2;
          const by = proj.y - (isHyd ? R * 0.075 : R * 0.062) - badgeH;

          // Glass pill backdrop
          ctx.shadowColor = "rgba(0,0,0,0.45)";
          ctx.shadowBlur = 10;
          ctx.fillStyle = isHyd ? "rgba(15,23,42,0.92)" : "rgba(15,23,42,0.88)";
          ctx.beginPath();
          ctx.roundRect(bx, by, badgeW, badgeH, 12);
          ctx.fill();

          // Highlighted border glow
          ctx.strokeStyle = dest.color;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = alpha * 0.90;
          ctx.stroke();

          // Highlighted English text
          ctx.shadowColor = dest.glow;
          ctx.shadowBlur = 8;
          ctx.fillStyle = isHyd ? "#fef08a" : dest.color;
          ctx.globalAlpha = alpha;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(badgeText, proj.x, by + badgeH / 2);
          ctx.restore();
        }
      }

      /* 11. Soft depth shadow under globe */
      const shadow = ctx.createRadialGradient(cx, cy + R * 1.08, 0, cx, cy + R * 1.08, R * 0.78);
      shadow.addColorStop(0, "rgba(2,6,23,0.65)");
      shadow.addColorStop(0.5, "rgba(2,6,23,0.22)");
      shadow.addColorStop(1, "rgba(2,6,23,0)");
      ctx.beginPath();
      ctx.ellipse(cx, cy + R + 18, R * 0.72, R * 0.14, 0, 0, Math.PI * 2);
      ctx.fillStyle = shadow;
      ctx.fill();
    }

    function animate() {
      if (!isDragging.current) {
        rotationY.current += velocityY.current;
        velocityX.current *= 0.94;
        velocityY.current = velocityY.current * 0.975 + 0.0035 * 0.025;
        rotationX.current += velocityX.current;
        rotationX.current = Math.max(-0.65, Math.min(0.65, rotationX.current));
      }
      drawGlobe();
      rafRef.current = requestAnimationFrame(animate);
    }
    animate();

    function onMouseDown(e) {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    }
    function onMouseMove(e) {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      velocityY.current = dx * 0.006;
      velocityX.current = dy * 0.006;
      rotationY.current += dx * 0.006;
      rotationX.current += dy * 0.006;
      rotationX.current = Math.max(-0.65, Math.min(0.65, rotationX.current));
      lastMouse.current = { x: e.clientX, y: e.clientY };
    }
    function onMouseUp() {
      isDragging.current = false;
    }
    function onTouchStart(e) {
      isDragging.current = true;
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    function onTouchMove(e) {
      if (!isDragging.current) return;
      const dx = e.touches[0].clientX - lastMouse.current.x;
      const dy = e.touches[0].clientY - lastMouse.current.y;
      velocityY.current = dx * 0.006;
      velocityX.current = dy * 0.006;
      rotationY.current += dx * 0.006;
      rotationX.current += dy * 0.006;
      rotationX.current = Math.max(-0.65, Math.min(0.65, rotationX.current));
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);

    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="globe-wrap">
      <canvas ref={canvasRef} className="globe-canvas" />
      <p className="globe-hint">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
        </svg>
        Drag to rotate in 3D
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   QUIZ
═══════════════════════════════════════════════════════ */
function Quiz() {
  const [step, setStep]   = useState(0);
  const [score, setScore] = useState({});
  const done = step >= QUIZ_QUESTIONS.length;

  function pick(pts) {
    const s = { ...score };
    Object.entries(pts).forEach(([k, v]) => (s[k] = (s[k] || 0) + v));
    setScore(s);
    setStep(step + 1);
  }

  const top = Object.entries(score)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => COUNTRIES.find(c => c.id === k)?.name)
    .filter(Boolean);

  return (
    <div className="quiz-card">
      {!done ? (
        <>
          <div className="quiz-bar">
            <span style={{ width: `${(step / QUIZ_QUESTIONS.length) * 100}%` }} />
          </div>
          <p className="quiz-step">Question {step + 1} of {QUIZ_QUESTIONS.length}</p>
          <h3 className="quiz-q">{QUIZ_QUESTIONS[step].q}</h3>
          <div className="quiz-opts">
            {QUIZ_QUESTIONS[step].opts.map(([label, pts]) => (
              <button key={label} className="quiz-opt" onClick={() => pick(pts)}>{label}</button>
            ))}
          </div>
        </>
      ) : (
        <div className="quiz-result">
          <h3>Countries worth discussing</h3>
          <ul className="ticks">
            {top.map(n => <li key={n}>{n}</li>)}
          </ul>
          <div className="quiz-actions">
            <a className="btn btn-wa" href={wa(`Hi, my quiz suggested: ${top.join(", ")}. I'd like a free profile check.`)} target="_blank" rel="noopener noreferrer">
              Get a free profile check
            </a>
            <button className="btn btn-ghost" onClick={() => { setStep(0); setScore({}); }}>Start again</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FAQ ITEM
═══════════════════════════════════════════════════════ */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-icon">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="faq-a"><p>{a}</p></div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CHECKLIST TAB
═══════════════════════════════════════════════════════ */
function ChecklistSection() {
  const [active, setActive] = useState("uk");
  const country = COUNTRIES.find(c => c.id === active);
  return (
    <section className="section" id="checklists">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Free checklists</p>
          <h2 className="h2">Visa document checklists</h2>
          <p className="lead">The usual student visa documents for each country. Rules change often, so we always confirm the current list for your case.</p>
        </div>
        <div className="checklist-tabs">
          {COUNTRIES.map(c => (
            <button key={c.id} className={`tab-btn${active === c.id ? " active" : ""}`} onClick={() => setActive(c.id)}>
              {c.flag} {c.name}
            </button>
          ))}
        </div>
        <div className="checklist-body">
          <ul className="ticks">
            {CHECKLIST_BASE.map(i => <li key={i}>{i}</li>)}
            {country?.extra.map(i => <li key={i} className="extra">{i}</li>)}
          </ul>
          <a className="btn btn-wa" href={wa(`Hi Yasvi, can you send me the ${country?.name} visa checklist?`)} target="_blank" rel="noopener noreferrer">
            Ask us to confirm your list
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CSS
═══════════════════════════════════════════════════════ */
const CSS = `
:root{
  --bg-deep:#080b12;
  --bg-card:#0e1422;
  --bg-card-hover:#131c30;
  --ink:#f8fafc;
  --mute:#94a3b8;
  --line:rgba(255,255,255,0.08);
  --yellow:#fde047;
  --yellow-glow:#fef08a;
  --yellow-deep:#eab308;
  --blue:#fde047;
  --sky:rgba(253,224,71,0.12);
  --paper:#080b12;
  --wa:#1faa59;
  --night:#05070d;
  --peach:#090d17;
  --sun:#0b101c;
  --accent:#fde047;
  --r:14px;
}
*{box-sizing:border-box;margin:0;padding:0}
.ys{
  font-family:'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color:#f8fafc;
  background:#080b12;
  background-image:radial-gradient(ellipse 80% 50% at 50% -10%, rgba(253,224,71,0.05), transparent 70%);
  line-height:1.65;
  scroll-behavior:smooth;
  overflow-x:hidden;
}
.ys a{color:inherit;text-decoration:none}
.ys h1,.ys h2,.ys h3{font-family:'Fraunces',Georgia,serif;font-weight:500;line-height:1.12;margin:0;color:#ffffff}
.ys h1{font-size:clamp(2.8rem,6vw,4.8rem)}
.ys h1 em{color:#fde047;font-style:italic;text-shadow:0 0 24px rgba(253,224,71,0.25)}
.h2{font-size:clamp(1.8rem,3.5vw,2.8rem);margin-bottom:.5rem;color:#ffffff}
.h2 em{color:#fde047;font-style:italic;text-shadow:0 0 20px rgba(253,224,71,0.25)}
p{margin:0 0 .5rem}
.wrap{max-width:1160px;margin:0 auto;padding:0 22px}
.section{padding:80px 0}
.section-head{margin-bottom:48px}
.section-head .lead,.lead{color:#94a3b8;max-width:58ch;margin-top:10px}
.eyebrow{font-size:.8rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fde047;margin-bottom:8px}
.eyebrow-light{color:#fde047}

/* ── ANNOUNCE ── */
.announce{background:#04060b;color:#cbd5e1;border-bottom:1px solid rgba(253,224,71,0.12);font-size:.86rem;padding:9px 22px;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;position:relative}
.announce a{text-decoration:underline;color:#fde047}
.announce-close{background:none;border:0;color:#94a3b8;cursor:pointer;font-size:1.2rem;padding:0 4px;margin-left:8px}
.announce-close:hover{color:#fff}
.sample-tag{font-size:.7rem;background:#fde047;color:#080c14;padding:2px 7px;border-radius:4px;font-weight:700}

/* ── NAV (Elevated Dock with Button Pills & Flashlight Separation Line) ── */
.nav{
  position:sticky;
  top:0;
  background:rgba(6,9,16,0.95);
  backdrop-filter:blur(24px);
  -webkit-backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(253,224,71,0.22);
  box-shadow:0 14px 36px -8px rgba(0,0,0,0.85);
  z-index:100;
  padding:0 22px;
}

/* Flashlight Line Separator underneath Header */
.nav-flashlight-line{
  position:absolute;
  left:0;
  right:0;
  bottom:-1.5px;
  height:2.5px;
  background:linear-gradient(90deg, transparent 0%, rgba(253,224,71,0.2) 20%, rgba(253,224,71,0.5) 50%, rgba(253,224,71,0.2) 80%, transparent 100%);
  overflow:hidden;
  pointer-events:none;
}

.nav-flashlight-beam{
  position:absolute;
  top:0;
  height:100%;
  width:420px;
  max-width:85%;
  background:linear-gradient(90deg, transparent 0%, rgba(253,224,71,0.3) 15%, #ffffff 48%, #fde047 52%, rgba(253,224,71,0.4) 85%, transparent 100%);
  box-shadow:0 0 16px 3px #fde047, 0 0 32px 6px rgba(253,224,71,0.65), 0 1px 12px 2px #ffffff;
  border-radius:999px;
  animation:flashlightSweep 5.5s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
}

@keyframes flashlightSweep{
  0%{
    left:-120px;
    opacity:0.75;
    filter:drop-shadow(0 0 10px #fde047);
  }
  50%{
    left:calc(50% - 210px);
    opacity:1;
    filter:drop-shadow(0 0 22px #fde047) drop-shadow(0 0 8px #ffffff);
    transform:scaleY(1.3);
  }
  100%{
    left:calc(100% - 300px);
    opacity:0.75;
    filter:drop-shadow(0 0 10px #fde047);
  }
}

/* Downward Flashlight Spotlight Aura */
.nav-flashlight-glow{
  position:absolute;
  left:0;
  right:0;
  bottom:-48px;
  height:48px;
  background:radial-gradient(ellipse 60% 100% at 50% 0%, rgba(253,224,71,0.24) 0%, rgba(253,224,71,0.08) 50%, transparent 75%);
  pointer-events:none;
  filter:blur(6px);
  animation:flashlightAura 4s ease-in-out infinite alternate;
}

@keyframes flashlightAura{
  0%{
    opacity:0.7;
    transform:scaleX(0.9);
  }
  100%{
    opacity:1;
    transform:scaleX(1.1);
  }
}
.nav-inner{max-width:1160px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:70px;gap:16px}
.logo{display:flex;flex-direction:column;line-height:1}
.logo-word{font-family:'Fraunces',serif;font-size:1.4rem;font-weight:600;letter-spacing:.02em;color:#ffffff}
.logo-word span{color:#fde047;text-shadow:0 0 14px rgba(253,224,71,0.4)}
.logo-sub{font-size:.62rem;color:#94a3b8;letter-spacing:.06em;text-transform:uppercase;font-family:'DM Sans',sans-serif}

/* Separate Button Pills in Header */
.nav-links{display:flex;gap:8px;align-items:center}
.nav-btn-link{
  display:inline-flex;
  align-items:center;
  gap:6px;
  background:rgba(255,255,255,0.06);
  border:1px solid rgba(255,255,255,0.12);
  padding:8px 18px;
  border-radius:999px;
  font-size:.86rem;
  font-weight:600;
  color:#e2e8f0;
  text-decoration:none;
  transition:all .2s cubic-bezier(0.16,1,0.3,1);
  box-shadow:0 2px 8px rgba(0,0,0,0.3);
}
.nav-btn-link:hover{
  background:rgba(253,224,71,0.14);
  border-color:#fde047;
  color:#fef08a;
  transform:translateY(-2px);
  box-shadow:0 6px 18px rgba(253,224,71,0.22);
}
.nav-actions{display:flex;align-items:center;gap:10px}
.burger{display:none;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:8px;padding:6px 10px;font-size:1.1rem;color:#fff;cursor:pointer}

/* ── BTNS ── */
.btn{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#fde047 0%,#eab308 100%);color:#080c14;padding:11px 22px;border-radius:999px;font-weight:700;border:0;cursor:pointer;font-size:.95rem;font-family:'DM Sans',sans-serif;transition:filter .18s,transform .12s,box-shadow .18s;box-shadow:0 4px 16px rgba(253,224,71,0.25)}
.btn:hover{filter:brightness(1.1);transform:translateY(-1px);box-shadow:0 8px 24px rgba(253,224,71,0.4)}
.btn-sm{padding:8px 16px;font-size:.85rem}
.btn-ghost{background:rgba(255,255,255,0.06);color:#f8fafc;border:1.5px solid rgba(255,255,255,0.16)}
.btn-ghost:hover{background:rgba(255,255,255,0.12);border-color:#fde047;color:#fde047}
.btn-outline{background:rgba(253,224,71,0.08);color:#fef08a;border:1.5px solid #fde047;box-shadow:0 2px 10px rgba(0,0,0,0.3)}
.btn-outline:hover{background:rgba(253,224,71,0.18);color:#ffffff}
.btn-wa{background:var(--wa);color:#fff;box-shadow:0 4px 16px rgba(31,170,89,0.35)}
.btn-wa:hover{filter:brightness(1.08)}
.btn-lg{padding:14px 28px;font-size:1rem}
.btn-block{width:100%;justify-content:center}
.ico-wa{width:18px;height:18px;flex-shrink:0}

/* ── HERO ── */
.hero{padding:64px 0 48px;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.hero-eyebrow{font-size:.82rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#fde047;margin-bottom:18px}
.hero-title{margin-bottom:20px;color:#ffffff}
.hero-lead{color:#94a3b8;font-size:1.05rem;max-width:46ch;margin-bottom:32px}
.hero-ctas{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:36px}
.hero-foot{display:flex;align-items:center;gap:28px;margin-top:12px;font-size:.88rem;color:#94a3b8}
.hero-stat{display:flex;align-items:center;gap:8px}
.stat-bar{width:3px;height:20px;background:#fde047;border-radius:2px;box-shadow:0 0 10px #fde047}
.scrollcue{color:#fde047;display:flex;align-items:center;gap:6px;font-size:.85rem;font-weight:600}
.scrollcue-ring{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:1.5px solid #fde047;border-radius:50%;animation:bounce 1.5s ease-in-out infinite}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}

/* ── GLOBE ── */
.globe-wrap{position:relative;width:100%;aspect-ratio:1;max-width:540px;margin:auto;cursor:grab;user-select:none;touch-action:none}
.globe-wrap:active{cursor:grabbing}
.globe-canvas{display:block;width:100%;height:100%;filter:drop-shadow(0 16px 36px rgba(0,0,0,0.6))}
.globe-hint{position:absolute;bottom:8px;left:50%;transform:translateX(-50%);font-size:.74rem;color:#f8fafc;background:rgba(15,22,38,0.88);backdrop-filter:blur(8px);padding:5px 14px;border-radius:999px;box-shadow:0 4px 14px rgba(0,0,0,0.4);border:1px solid rgba(253,224,71,0.25);pointer-events:none;white-space:nowrap;display:flex;align-items:center;gap:6px;font-weight:600;letter-spacing:.01em}

/* ── COUNTRIES ── */
.countries-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-bottom:28px}
.country-card{display:flex;flex-direction:column;border:1.5px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;background:#0e1422;box-shadow:0 6px 20px rgba(0,0,0,0.4);transition:all .28s cubic-bezier(0.16,1,0.3,1);cursor:pointer;position:relative}
.country-card:hover{border-color:#fde047;box-shadow:0 18px 40px rgba(0,0,0,0.6),0 0 20px rgba(253,224,71,0.16);transform:translateY(-4px)}
.country-card-media{position:relative;width:100%;height:190px;overflow:hidden;background:#141d30}
.country-card-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(0.16,1,0.3,1)}
.country-card:hover .country-card-img{transform:scale(1.08)}
.country-media-overlay{position:absolute;inset:0;background:linear-gradient(to top, rgba(7,10,18,0.92) 0%, rgba(7,10,18,0.25) 55%, transparent 100%);display:flex;align-items:flex-end;padding:12px 14px}
.country-landmark-tag{color:#ffffff;font-size:.76rem;font-weight:600;background:rgba(0,0,0,0.65);backdrop-filter:blur(8px);padding:4px 11px;border-radius:999px;border:1px solid rgba(255,255,255,0.22);display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 8px rgba(0,0,0,0.3)}
.country-card-content{padding:20px 22px 24px;display:flex;flex-direction:column;gap:8px;flex:1}
.country-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:2px}
.country-flag{font-size:2rem;line-height:1}
.country-tag{font-size:.72rem;font-weight:700;color:#080c14;background:#fde047;padding:3px 10px;border-radius:999px;letter-spacing:.03em;text-transform:uppercase}
.country-name{font-family:'Fraunces',serif;font-size:1.35rem;font-weight:600;color:#ffffff;letter-spacing:-.01em}
.country-intakes{font-size:.82rem;color:#fde047;font-weight:600;display:inline-flex;align-items:center;gap:4px}
.country-intakes b{color:#ffffff;font-weight:600}
.country-blurb{font-size:.9rem;color:#94a3b8;margin-top:2px;line-height:1.55}
.country-cta{margin-top:auto;padding-top:14px;color:#fde047;font-size:.88rem;font-weight:700;display:inline-flex;align-items:center;gap:5px;transition:gap .15s ease}
.country-card:hover .country-cta{gap:9px}
.guides-nav{display:flex;align-items:center;gap:10px;font-size:.88rem;flex-wrap:wrap;margin-bottom:16px}
.guides-nav span{color:#94a3b8;font-weight:600}
.guide-link{display:inline-flex;align-items:center;gap:6px;background:#0e1422;border:1px solid rgba(255,255,255,0.12);padding:6px 14px;border-radius:999px;color:#e2e8f0;font-size:.82rem;font-weight:600;transition:all .15s ease}
.guide-link:hover{border-color:#fde047;color:#fde047;background:rgba(253,224,71,0.08);transform:translateY(-1px)}
.countries-more{font-size:.9rem;color:#94a3b8}
.countries-more a{color:#fde047;font-weight:600}

/* ── INTAKES + STORY SIDE ── */
.hero-extras{padding:0 0 64px;display:grid;grid-template-columns:340px 1fr;gap:24px;align-items:start}
.panel{background:#0e1422;border:1px solid rgba(255,255,255,0.08);border-radius:18px;overflow:hidden}
.panel-dark{background:#080c14;color:#fff;border-color:rgba(253,224,71,0.15)}
.intakes{padding:28px 26px}
.intakes h2{color:#fde047;margin-bottom:14px;font-size:.78rem;letter-spacing:.1em}
.intakes-list{list-style:none;display:flex;flex-direction:column;gap:9px}
.intakes-list li{display:flex;justify-content:space-between;font-size:.9rem;border-bottom:1px solid rgba(255,255,255,.08);padding-bottom:9px}
.intakes-list li:last-child{border:0;padding:0}
.intakes-list li span{color:#fde047}
.intakes-list li b{color:#fff}
.intakes-note{font-size:.78rem;color:#64748b;margin-top:14px}
.intakes-cta{display:inline-block;margin-top:14px;color:#fde047;font-size:.85rem;font-weight:600;text-decoration:underline}
.story-card{overflow:hidden}
.story-card-head{padding:18px 20px 12px}
.story-card-img-wrap{position:relative;width:100%;height:200px;overflow:hidden}
.story-card-img{width:100%;height:100%;object-fit:cover;display:block}
.story-img-tag{position:absolute;bottom:10px;left:12px;background:rgba(8,12,20,0.92);backdrop-filter:blur(6px);color:#fde047;font-size:.76rem;font-weight:600;padding:4px 12px;border-radius:999px;border:1px solid rgba(253,224,71,0.25)}
.story-card-text{padding:16px 20px 20px}
.story-card-title{font-family:'Fraunces',serif;font-size:1.05rem;font-weight:600;color:#ffffff;margin-bottom:6px}
.story-card-quote{font-size:.88rem;color:#94a3b8;font-style:italic}

/* ── TRUST ── */
.trust{background:#080d16;padding:40px 0;border-top:1px solid rgba(253,224,71,0.12);border-bottom:1px solid rgba(253,224,71,0.12)}
.trust-row{display:flex;align-items:center;gap:40px;flex-wrap:wrap;justify-content:center}
.trust-stat{text-align:center}
.trust-stat b{display:block;font-family:'Fraunces',serif;font-size:2.4rem;color:#fde047;line-height:1;text-shadow:0 0 16px rgba(253,224,71,0.25)}
.trust-stat span{font-size:.82rem;color:#94a3b8;margin-top:2px;display:block}
.trust-reviews{display:flex;flex-direction:column;align-items:center;gap:2px;text-decoration:none}
.trust-reviews .stars{color:#fde047;letter-spacing:2px;font-size:1.1rem}
.trust-reviews b{font-family:'Fraunces',serif;font-size:2rem;color:#fde047}
.trust-reviews span{font-size:.82rem;color:#94a3b8}
.trust-note{text-align:center;font-size:.78rem;color:#94a3b8;margin-top:14px;display:flex;align-items:center;gap:8px;justify-content:center}

/* ── QUIZ ── */
.section-finder{background:#080b12;padding:80px 0}
.quiz-card{background:#0e1422;border:1.5px solid rgba(253,224,71,0.18);border-radius:18px;padding:32px;max-width:560px;box-shadow:0 12px 36px rgba(0,0,0,0.5)}
.quiz-bar{height:4px;background:rgba(255,255,255,0.08);border-radius:2px;margin-bottom:20px;overflow:hidden}
.quiz-bar span{display:block;height:100%;background:#fde047;border-radius:2px;transition:width .3s}
.quiz-step{font-size:.8rem;color:#fde047;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px}
.quiz-q{font-family:'Fraunces',serif;font-size:1.2rem;color:#ffffff;margin-bottom:18px}
.quiz-opts{display:flex;flex-direction:column;gap:10px}
.quiz-opt{background:#080c14;border:1.5px solid rgba(255,255,255,0.1);border-radius:10px;padding:13px 16px;text-align:left;cursor:pointer;font:inherit;font-size:.95rem;color:#f8fafc;transition:border-color .15s,background .15s}
.quiz-opt:hover{border-color:#fde047;background:rgba(253,224,71,0.08);color:#fef08a}
.quiz-result h3{font-family:'Fraunces',serif;font-size:1.3rem;color:#ffffff;margin-bottom:14px}
.quiz-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}

/* ── SERVICES (Interactive & Ultra-Professional) ── */
.bg-sun{background:linear-gradient(180deg,#0b101c 0%,#080b12 100%)}
.stages{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.stage{background:#0e1422;border:1.5px solid rgba(255,255,255,0.08);border-radius:22px;padding:32px 28px;transition:all .28s cubic-bezier(0.16,1,0.3,1);display:flex;flex-direction:column;position:relative;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.35)}
.stage::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#fde047,#eab308);opacity:0;transition:opacity .25s ease}
.stage:hover{transform:translateY(-5px);border-color:#fde047;box-shadow:0 18px 40px rgba(0,0,0,0.6),0 0 20px rgba(253,224,71,0.12)}
.stage:hover::before{opacity:1}
.stage-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.stage-num{font-size:.74rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#080c14;background:#fde047;padding:4px 12px;border-radius:999px}
.stage-badge{font-size:.74rem;color:#94a3b8;font-weight:600}
.stage-title{font-family:'Fraunces',serif;font-size:1.25rem;font-weight:600;color:#ffffff;margin-bottom:20px}
.svc-list{list-style:none;display:flex;flex-direction:column;gap:16px}
.svc-item{display:flex;align-items:flex-start;gap:14px;padding:12px;border-radius:14px;transition:all .2s ease;background:transparent}
.svc-item:hover{background:rgba(253,224,71,0.06);transform:translateX(5px)}
.svc-icon-box{width:44px;height:44px;border-radius:12px;background:rgba(253,224,71,0.10);border:1px solid rgba(253,224,71,0.25);display:flex;align-items:center;justify-content:center;font-size:1.35rem;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:transform .2s ease;color:#fde047}
.svc-item:hover .svc-icon-box{transform:scale(1.1) rotate(4deg)}
.svc-title{font-weight:700;font-size:.95rem;color:#ffffff;display:block;margin-bottom:2px}
.svc-desc{font-size:.84rem;color:#94a3b8;line-height:1.5}

/* ── PROCESS ── */
.bg-night{background:#04070e;color:#fff}
.bg-night .eyebrow{color:#fde047}
.bg-night .h2{color:#fff}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;list-style:none;position:relative;margin-top:48px}
.steps::before{content:'';position:absolute;top:24px;left:12%;right:12%;height:2px;background:rgba(253,224,71,0.2)}
.step{padding:0 16px;text-align:center}
.step-dot{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#fde047 0%,#eab308 100%);color:#080c14;font-family:'Fraunces',serif;font-size:1.1rem;font-weight:700;margin-bottom:16px;position:relative;z-index:1;box-shadow:0 0 16px rgba(253,224,71,0.35)}
.step h3{color:#fff;font-size:1rem;margin-bottom:8px}
.step p{color:#94a3b8;font-size:.88rem}

/* ── WHY ── */
.bg-peach{background:#090d17}
.why-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.why-img-wrap{position:relative}
.why-img{width:100%;height:380px;object-fit:cover;border-radius:20px;display:block;box-shadow:0 14px 36px rgba(0,0,0,0.6)}
.why-badge{position:absolute;bottom:-18px;left:-18px;background:#0e1422;border:1px solid rgba(253,224,71,0.3);border-radius:14px;padding:14px 20px;display:flex;align-items:center;gap:12px;box-shadow:0 12px 32px rgba(0,0,0,.6);color:#ffffff}
.why-badge-icon{width:38px;height:38px;border-radius:50%;background:rgba(253,224,71,0.15);display:flex;align-items:center;justify-content:center;font-size:1.15rem;color:#fde047}
.why-badge b{font-size:.92rem;display:block;color:#ffffff}
.why-badge span{font-size:.78rem;color:#94a3b8}
.checks{list-style:none;display:flex;flex-direction:column;gap:12px;margin-top:20px}
.checks li{display:flex;align-items:flex-start;gap:10px;font-size:.95rem;color:#e2e8f0}
.check-icon{color:#fde047;font-size:1.1rem;flex-shrink:0;margin-top:1px}

/* ── TEAM ── */
.bg-soft{background:#080b12}
.team-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.person{background:#0e1422;border:1.5px solid rgba(255,255,255,0.08);border-radius:18px;padding:28px}
.person-top{display:flex;align-items:center;gap:14px;margin-bottom:14px}
.avatar{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#fde047,#eab308);color:#080c14;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;flex-shrink:0}
.avatar-lg{width:60px;height:60px;font-size:1rem}
.person-name{font-family:'Fraunces',serif;font-size:1.1rem;color:#ffffff}
.person-role{font-size:.82rem;color:#94a3b8;margin-top:2px}
.person-langs{font-size:.78rem;color:#fde047;font-weight:600}
.person-quote{font-style:italic;color:#cbd5e1;font-size:.9rem;border-left:3px solid #fde047;padding-left:14px;margin:14px 0}
.person-facts{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:20px}
.person-facts li{display:flex;align-items:center;gap:8px;font-size:.88rem;color:#94a3b8}
.office{background:#0e1422;border:1.5px solid rgba(255,255,255,0.08);border-radius:18px;overflow:hidden}
.office-photo{height:180px;background:#141d30;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:#94a3b8;font-size:.85rem}
.office-body{padding:22px}
.office-body h3{font-family:'Fraunces',serif;font-size:1.05rem;color:#ffffff;margin-bottom:8px}
.office-body address{font-style:normal;font-size:.88rem;color:#94a3b8;margin-bottom:12px}
.office-hours{display:flex;align-items:center;gap:6px;font-size:.84rem;color:#94a3b8;margin-bottom:14px}
.office-links{display:flex;gap:10px;flex-wrap:wrap}

/* ── STORIES ── */
.stories-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-bottom:24px}
.story{background:#0e1422;border:1.5px solid rgba(255,255,255,0.08);border-radius:20px;padding:26px;display:flex;flex-direction:column;gap:14px;position:relative;box-shadow:0 6px 20px rgba(0,0,0,0.35);transition:transform .2s ease,box-shadow .2s ease}
.story:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(0,0,0,0.5),0 0 16px rgba(253,224,71,0.12);border-color:#fde047}
.stars{color:#fde047;letter-spacing:2px;font-size:1.05rem}
.story blockquote{font-size:.92rem;color:#cbd5e1;line-height:1.65;font-style:italic}
.story figcaption{display:flex;align-items:center;gap:12px;margin-top:auto;padding-top:10px;border-top:1px solid rgba(255,255,255,.08)}
.story-avatar-img{width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid #fde047;flex-shrink:0;box-shadow:0 2px 8px rgba(253,224,71,0.25)}
.story figcaption b{display:block;font-size:.92rem;color:#ffffff}
.story figcaption small{font-size:.78rem;color:#94a3b8}
.stories-more{font-size:.9rem;text-align:center;color:#94a3b8}
.stories-more a{color:#fde047;font-weight:600}

/* ── PARENTS ── */
.parents-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-bottom:32px}
.pcard{background:#0e1422;border:1.5px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px}
.pcard-icon{font-size:1.6rem;margin-bottom:10px;display:block}
.pcard h3{font-family:'Fraunces',serif;font-size:1rem;color:#ffffff;margin-bottom:8px}
.pcard p{font-size:.88rem;color:#94a3b8}
.parents-cta{text-align:center}
.parents-cta p{color:#94a3b8;margin-bottom:14px}

/* ── CHECKLIST ── */
.checklist-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
.tab-btn{border:1.5px solid rgba(255,255,255,0.12);background:#0e1422;color:#cbd5e1;padding:8px 14px;border-radius:999px;cursor:pointer;font:inherit;font-size:.88rem;transition:all .15s}
.tab-btn:hover{border-color:#fde047;color:#fde047}
.tab-btn.active{background:#fde047;color:#080c14;border-color:#fde047;font-weight:700;box-shadow:0 4px 16px rgba(253,224,71,0.3)}
.checklist-body{background:#0e1422;border:1.5px solid rgba(253,224,71,0.18);border-radius:16px;padding:28px;max-width:500px}
.ticks{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:20px}
.ticks li{display:flex;align-items:flex-start;gap:8px;font-size:.92rem;color:#e2e8f0}
.ticks li::before{content:"✓";color:#fde047;font-weight:700;flex-shrink:0;margin-top:1px}
.ticks li.extra::before{content:"✓";color:#4ade80}

/* ── GUIDES ── */
.guides-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.guide-card{background:#0e1422;border:1.5px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px}
.guide-meta{font-size:.75rem;color:#94a3b8;margin-bottom:8px;font-weight:500}
.guide-card h3{font-family:'Fraunces',serif;font-size:1rem;color:#ffffff;margin-bottom:8px}
.guide-card p{font-size:.86rem;color:#94a3b8;margin-bottom:16px}
.guide-card a{color:#fde047;font-size:.85rem;font-weight:600}
.guide-card a:hover{text-decoration:underline}

/* ── FAQ ── */
.faq-list{max-width:680px;margin:0 auto}
.faq-item{border-bottom:1px solid rgba(255,255,255,0.08)}
.faq-q{width:100%;background:none;border:0;text-align:left;padding:18px 0;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;font:inherit;font-size:.95rem;font-weight:600;color:#ffffff}
.faq-icon{color:#fde047;font-size:1.3rem;font-weight:300;flex-shrink:0}
.faq-a{padding:0 0 16px}
.faq-a p{color:#94a3b8;font-size:.92rem;line-height:1.7}

/* ── CONTACT ── */
.contact-panel{background:#05080f;border-radius:24px;border:1.5px solid rgba(253,224,71,0.22);padding:0;display:grid;grid-template-columns:1fr 1fr;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.7)}
.contact-info{padding:48px 40px;display:flex;flex-direction:column;gap:24px}
.contact-info .eyebrow{color:#fde047}
.contact-info .h2{color:#ffffff}
.contact-info .lead{color:#94a3b8}
.contact-list{list-style:none;display:flex;flex-direction:column;gap:16px}
.contact-list li{display:flex;align-items:flex-start;gap:12px}
.contact-list-icon{font-size:1.2rem;margin-top:2px;flex-shrink:0}
.contact-list li > div span{display:block;font-size:.75rem;color:#94a3b8;margin-bottom:2px;text-transform:uppercase;letter-spacing:.05em}
.contact-list li > div a{color:#ffffff;font-size:.95rem}
.copy-btn{background:rgba(253,224,71,0.1);border:1px solid rgba(253,224,71,0.25);color:#fde047;border-radius:6px;padding:3px 10px;font-size:.75rem;cursor:pointer;margin-left:auto;flex-shrink:0}
.contact-form{background:#0a0f1d;padding:48px 40px;border-left:1px solid rgba(255,255,255,0.06)}
.field{margin-bottom:16px}
.field label{display:block;font-weight:600;font-size:.88rem;margin-bottom:6px;color:#e2e8f0}
.field label .opt{font-weight:400;color:#94a3b8}
.field input,.field select{width:100%;font:inherit;font-size:.95rem;padding:12px 14px;border:1.5px solid rgba(255,255,255,0.12);border-radius:10px;background:#05070d;color:#ffffff;transition:border-color .15s}
.field input:focus,.field select:focus{outline:0;border-color:#fde047;box-shadow:0 0 0 3px rgba(253,224,71,0.18)}
.field select option{background:#0a0f1d;color:#ffffff}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-note{font-size:.78rem;color:#94a3b8;margin-top:10px;line-height:1.5}
.form-note a{color:#fde047}

/* ── SEPARATION DIVIDER ABOVE FOOTER ── */
.footer-divider-ornament{display:flex;align-items:center;justify-content:center;gap:20px;max-width:1160px;margin:80px auto 0;padding:0 22px}
.footer-divider-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(253,224,71,0.28) 50%,transparent)}
.footer-divider-emblem{font-size:.78rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#fde047;display:flex;align-items:center;gap:8px;white-space:nowrap;background:rgba(253,224,71,0.08);border:1px solid rgba(253,224,71,0.25);padding:6px 18px;border-radius:999px;box-shadow:0 0 18px rgba(253,224,71,0.14)}

/* ── FOOTER (Visually separate from body) ── */
.footer{position:relative;margin-top:28px;background:linear-gradient(180deg,#030612 0%,#010206 100%);color:#94a3b8;border-top:2px solid rgba(253,224,71,0.35);box-shadow:0 -28px 65px rgba(0,0,0,0.9),inset 0 1px 0 rgba(255,255,255,0.08);padding:0 0 32px}
.footer-top-glow{position:absolute;top:-2px;left:50%;transform:translateX(-50%);width:min(540px,85%);height:3px;background:linear-gradient(90deg,transparent,rgba(253,224,71,0.4) 20%,#fde047 50%,rgba(253,224,71,0.4) 80%,transparent);box-shadow:0 0 20px #fde047,0 0 36px rgba(253,224,71,0.35);pointer-events:none}

/* Pre-footer Callout Strip */
.footer-callout-strip{background:rgba(255,255,255,0.02);border-bottom:1px solid rgba(255,255,255,0.07);padding:32px 0}
.footer-callout-card{display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap}
.footer-callout-info{max-width:480px}
.footer-callout-badge{display:inline-block;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#fde047;background:rgba(253,224,71,0.1);border:1px solid rgba(253,224,71,0.22);padding:3px 10px;border-radius:999px;margin-bottom:8px}
.footer-callout-info h3{font-family:'Fraunces',serif;font-size:1.35rem;color:#ffffff;margin-bottom:6px}
.footer-callout-info p{font-size:.86rem;color:#94a3b8;line-height:1.5;margin:0}

.footer-callout-numbers{display:flex;gap:14px;flex-wrap:wrap}
.footer-num-badge{display:flex;align-items:center;gap:12px;background:#080d1a;border:1.5px solid rgba(253,224,71,0.22);padding:10px 16px;border-radius:14px;color:#ffffff;text-decoration:none;transition:all .2s ease;box-shadow:0 4px 16px rgba(0,0,0,0.4)}
.footer-num-badge:hover{border-color:#fde047;transform:translateY(-2px);box-shadow:0 8px 24px rgba(253,224,71,0.25)}
.footer-num-badge .fnb-icon{font-size:1.4rem;background:rgba(31,170,89,0.18);color:#22c55e;width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center}
.footer-num-badge .fnb-text{display:flex;flex-direction:column}
.footer-num-badge .fnb-text small{font-size:.7rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.04em}
.footer-num-badge .fnb-text strong{font-size:.92rem;color:#f8fafc}
.footer-num-badge .fnb-arrow{font-size:.95rem;color:#fde047;margin-left:4px}

/* Main Footer Grid */
.footer-main-wrap{padding-top:48px}
.footer-grid{display:grid;grid-template-columns:2fr 1.1fr 1.1fr 1.6fr;gap:36px;margin-bottom:44px}
.footer-brand .logo-word{color:#fff}
.footer-brand .logo-sub{color:#94a3b8}
.footer-tag{font-style:italic;margin-top:12px;color:#fde047;font-size:.92rem}
.footer-about{font-size:.85rem;margin-top:10px;color:#94a3b8;max-width:32ch;line-height:1.6}
.footer-loc-badge{display:inline-flex;align-items:center;gap:6px;font-size:.76rem;color:#e2e8f0;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:4px 10px;border-radius:999px;margin-top:14px}

.footer-col h3{color:#fde047;font-size:.92rem;margin-bottom:16px;font-weight:700;letter-spacing:.03em;position:relative;display:inline-block}
.footer-col h3::after{content:"";display:block;width:24px;height:2px;background:#fde047;margin-top:6px;border-radius:2px}
.footer-col a{display:block;font-size:.86rem;margin-bottom:10px;color:#94a3b8;transition:all .15s ease}
.footer-col a:hover{color:#fde047;transform:translateX(2px)}
.footer-col address{font-style:normal;font-size:.84rem;line-height:1.65;color:#94a3b8;margin-top:12px}

.footer-contact-block{display:flex;flex-direction:column;gap:12px;margin-bottom:14px}
.footer-contact-item{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:10px 12px;transition:border-color .18s}
.footer-contact-item:hover{border-color:rgba(253,224,71,0.35)}
.footer-ci-head{display:flex;align-items:center;justify-content:space-between;font-size:.72rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px}
.footer-ci-num{color:#ffffff!important;font-weight:700!important;font-size:.9rem!important;margin-bottom:2px!important}
.footer-ci-wa{color:#22c55e!important;font-size:.78rem!important;font-weight:600;display:inline-flex!important;align-items:center;gap:4px;margin-bottom:0!important}
.footer-ci-wa:hover{color:#4ade80!important}

/* Footer Bottom */
.footer-bottom{border-top:1px solid rgba(255,255,255,.08);background:#000205;padding:22px 0 10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;font-size:.8rem;color:#64748b}
.footer-bottom-links{display:flex;align-items:center;gap:16px}
.footer-bottom a{color:#94a3b8;transition:color .15s}
.footer-bottom a:hover{color:#fde047}
.back-to-top-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#cbd5e1;padding:5px 12px;border-radius:999px;font-size:.76rem;cursor:pointer;display:inline-flex;align-items:center;gap:4px;transition:all .15s}
.back-to-top-btn:hover{background:rgba(253,224,71,0.15);border-color:#fde047;color:#fde047}

/* Contact List dual numbers styles */
.contact-line-box{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:2px}
.contact-num-link{color:#ffffff;font-size:1rem;font-weight:700}
.contact-btns-group{display:flex;align-items:center;gap:6px}
.wa-chip-btn{background:rgba(31,170,89,0.18);border:1px solid rgba(31,170,89,0.35);color:#4ade80;font-size:.75rem;font-weight:600;padding:3px 9px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;text-decoration:none;transition:all .15s}
.wa-chip-btn:hover{background:rgba(31,170,89,0.3);color:#ffffff;border-color:#22c55e}

/* Form WhatsApp destination selector */
.wa-dest-wrap{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px 14px;margin-bottom:18px}
.wa-dest-title{display:block;font-size:.8rem;font-weight:600;color:#cbd5e1;margin-bottom:8px}
.wa-dest-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.wa-dest-btn{background:#060810;border:1.5px solid rgba(255,255,255,0.1);border-radius:8px;padding:9px 10px;text-align:left;color:#ffffff;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:8px;transition:all .15s}
.wa-dest-btn.active{border-color:#fde047;background:rgba(253,224,71,0.08);box-shadow:0 0 12px rgba(253,224,71,0.12)}
.wa-dest-btn:hover{border-color:#fde047}
.wa-dest-radio{width:14px;height:14px;border-radius:50%;border:2px solid #94a3b8;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.wa-dest-btn.active .wa-dest-radio{border-color:#fde047}
.wa-dest-btn.active .wa-dest-radio::after{content:"";width:6px;height:6px;background:#fde047;border-radius:50%}
.wa-dest-text{display:flex;flex-direction:column}
.wa-dest-text strong{font-size:.78rem;color:#f8fafc;line-height:1.2}
.wa-dest-text span{font-size:.7rem;color:#94a3b8}

.form-dual-send{display:flex;flex-direction:column;gap:8px;margin-top:4px}
.wa-quick-row{display:flex;gap:8px;margin-top:4px}
.wa-quick-send-btn{flex:1;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:#e2e8f0;font-size:.75rem;padding:7px 10px;border-radius:8px;cursor:pointer;font-family:inherit;transition:all .15s;text-align:center}
.wa-quick-send-btn:hover{background:rgba(31,170,89,0.16);border-color:#22c55e;color:#ffffff}

/* ── STICKY MOBILE ACTION BAR ── */
.actionbar{position:fixed;left:0;right:0;bottom:0;display:none;gap:0;background:rgba(8,12,20,0.96);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-top:1px solid rgba(253,224,71,0.2);z-index:900;box-shadow:0 -4px 18px rgba(0,0,0,0.6);padding-bottom:env(safe-area-inset-bottom,0px)}
.actionbar-call-box{flex:1.2;display:flex}
.actionbar-call-box a{flex:1;display:flex;align-items:center;justify-content:center;gap:4px;padding:13px 4px;font-weight:700;font-size:.78rem;text-decoration:none;color:#fde047;background:#090d18;border-right:1px solid rgba(255,255,255,0.08);transition:all .15s ease}
.actionbar-call-box a:active{background:rgba(253,224,71,0.12)}
.actionbar-wa-1,.actionbar-wa-2{flex:1;display:flex;align-items:center;justify-content:center;gap:4px;padding:13px 4px;font-weight:700;font-size:.78rem;text-decoration:none;color:#fff;transition:all .15s ease}
.actionbar-wa-1{background:var(--wa);border-right:1px solid rgba(255,255,255,0.12)}
.actionbar-wa-1:active{filter:brightness(0.92)}
.actionbar-wa-2{background:#0f766e}
.actionbar-wa-2:active{filter:brightness(0.92)}

/* ── FLOATING WA WIDGET ── */
.wa-float-container{position:fixed;right:22px;bottom:92px;z-index:950;display:flex;flex-direction:column;align-items:flex-end}
.wa-popup-card{position:absolute;bottom:calc(100% + 14px);right:0;width:320px;max-width:calc(100vw - 32px);background:#090d18;border:1.5px solid rgba(253,224,71,0.3);border-radius:18px;box-shadow:0 20px 45px rgba(0,0,0,0.85);overflow:hidden;animation:waPop .2s cubic-bezier(0.16,1,0.3,1);z-index:960}
@keyframes waPop{from{opacity:0;transform:scale(0.92) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
.wa-popup-header{background:linear-gradient(135deg,#064e3b 0%,#047857 100%);padding:14px 16px;color:#ffffff;display:flex;align-items:center;justify-content:space-between}
.wa-popup-header-title{display:flex;align-items:center;gap:10px}
.wa-popup-header-title .wa-pop-ico{font-size:1.4rem}
.wa-popup-header-title strong{display:block;font-size:.92rem;line-height:1.2}
.wa-popup-header-title span{font-size:.72rem;opacity:.9}
.wa-popup-close{background:none;border:0;color:#ffffff;font-size:1.3rem;cursor:pointer;padding:0 4px;opacity:.8;line-height:1}
.wa-popup-close:hover{opacity:1}
.wa-popup-body{padding:14px 14px 10px;display:flex;flex-direction:column;gap:10px;background:#090d18}
.wa-popup-option{display:flex;align-items:center;gap:12px;padding:11px 12px;background:#0e1424;border:1px solid rgba(255,255,255,0.08);border-radius:12px;text-decoration:none;transition:all .18s ease}
.wa-popup-option:hover{border-color:#fde047;background:rgba(253,224,71,0.06);transform:translateX(2px)}
.wa-pop-opt-avatar{position:relative;width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#1faa59 0%,#0f766e 100%);color:#ffffff;font-weight:700;font-size:.82rem;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.wa-pop-dot{position:absolute;bottom:0;right:0;width:10px;height:10px;border-radius:50%;background:#22c55e;border:2px solid #090d18}
.wa-pop-opt-text{flex:1;min-width:0}
.wa-pop-opt-text small{display:block;font-size:.7rem;color:#94a3b8;margin-bottom:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wa-pop-opt-text strong{display:block;font-size:.88rem;color:#ffffff;font-weight:700}
.wa-pop-opt-btn{font-size:.75rem;font-weight:700;color:#fde047;background:rgba(253,224,71,0.12);padding:4px 9px;border-radius:6px;flex-shrink:0}
.wa-popup-footer{background:#060810;border-top:1px solid rgba(255,255,255,0.05);padding:8px 14px;font-size:.72rem;color:#64748b;text-align:center}

.wa-float{background:var(--wa);color:#fff;border:0;cursor:pointer;border-radius:50%;width:54px;height:54px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(31,170,89,0.45);position:relative;transition:transform .18s,box-shadow .18s}
.wa-float:hover{transform:scale(1.08);box-shadow:0 10px 28px rgba(31,170,89,0.6)}
.wa-float.open{background:#0e1424;border:1.5px solid #fde047}
.wa-float-badge{position:absolute;top:-6px;right:-4px;background:#fde047;color:#080c14;font-size:.65rem;font-weight:800;padding:2px 6px;border-radius:999px;box-shadow:0 2px 6px rgba(0,0,0,0.5);letter-spacing:.02em;white-space:nowrap}
.wa-float-label{position:absolute;right:64px;background:#090d18;color:#fde047;border:1px solid rgba(253,224,71,0.3);font-size:.76rem;font-weight:600;padding:5px 12px;border-radius:999px;white-space:nowrap;box-shadow:0 4px 14px rgba(0,0,0,0.5);pointer-events:none;transition:opacity .15s}

/* ── MOBILE NAV DROPDOWN ── */
.nav-mobile-dropdown{background:#090d18;border-top:1px solid rgba(253,224,71,0.2);box-shadow:0 16px 36px rgba(0,0,0,0.7);padding:14px 20px 20px;display:flex;flex-direction:column;gap:6px;animation:slideDown .22s cubic-bezier(0.16,1,0.3,1)}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.nav-mobile-link{font-size:.98rem;font-weight:600;color:#f8fafc;padding:12px 14px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);transition:all .15s ease;display:flex;align-items:center;justify-content:space-between}
.nav-mobile-link:hover,.nav-mobile-link:active{background:rgba(253,224,71,0.12);border-color:#fde047;color:#fef08a}

/* ── STEP CONTENT ── */
.step-content{display:flex;flex-direction:column}

/* ── TABLET & MEDIUM SCREENS (<= 900px) ── */
@media(max-width:900px){
  .wrap{padding:0 20px}
  .section{padding:60px 0}
  .section-head{margin-bottom:36px}
  .hero{grid-template-columns:1fr;gap:32px;padding:36px 0 28px;text-align:center}
  .hero-eyebrow{margin-bottom:12px;font-size:.78rem}
  .hero-title{font-size:clamp(2.1rem,7.5vw,3.2rem);margin-bottom:14px;line-height:1.15}
  .hero-lead{font-size:.96rem;margin:0 auto 22px;max-width:44ch}
  .hero-ctas{justify-content:center;gap:10px;margin-bottom:24px}
  .hero-foot{justify-content:center;flex-wrap:wrap;gap:16px;margin-top:10px;font-size:.84rem}
  .globe-wrap{max-width:340px;margin:16px auto 0}
  .globe-hint{font-size:.72rem;padding:4px 12px}
  .hero-extras{grid-template-columns:1fr;gap:20px;padding:0 0 44px}
  .intakes{padding:24px 20px}
  .story-card-img-wrap{height:180px}
  .trust{padding:32px 0}
  .stages{grid-template-columns:1fr;gap:20px}
  .stage{padding:26px 22px;border-radius:18px}
  .countries-grid{grid-template-columns:repeat(2,1fr);gap:18px}
  .stories-grid{grid-template-columns:1fr;gap:18px}
  .parents-grid{grid-template-columns:1fr;gap:16px}
  .why-grid{grid-template-columns:1fr;gap:36px}
  .team-grid{grid-template-columns:1fr;gap:20px}
  .contact-panel{grid-template-columns:1fr}
  .contact-info{padding:36px 28px;gap:20px}
  .contact-form{padding:36px 28px}
  .footer{padding:0 0 calc(84px + env(safe-area-inset-bottom, 0px))}
  .footer-callout-card{flex-direction:column;align-items:flex-start;gap:20px}
  .footer-callout-numbers{width:100%;flex-direction:column}
  .footer-num-badge{width:100%;justify-content:space-between}
  .footer-grid{grid-template-columns:1fr 1fr;gap:32px 24px;margin-bottom:32px}
  .steps{grid-template-columns:repeat(2,1fr);row-gap:28px}
  .steps::before{display:none}
  .guides-grid{grid-template-columns:1fr;gap:16px}
  .actionbar{display:flex}
  .wa-float-container{bottom:calc(66px + env(safe-area-inset-bottom, 0px));right:16px}
}

/* ── MOBILE SCREENS (<= 640px) ── */
@media(max-width:640px){
  .wrap{padding:0 16px}
  .section{padding:50px 0}
  .section-head{margin-bottom:28px}
  .section-head .lead,.lead{font-size:.9rem}
  .h2{font-size:clamp(1.6rem,6vw,2.2rem)}
  .nav{padding:0 16px}
  .nav-inner{height:60px}
  .nav-links{display:none}
  .nav-btn{display:none}
  .burger{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:8px;font-size:1.15rem}
  .trust-row{display:grid;grid-template-columns:repeat(2,1fr);gap:20px 14px}
  .trust-reviews{grid-column:span 2}
  .trust-stat b{font-size:1.9rem}
  .trust-reviews b{font-size:1.85rem}
  .trust-note{font-size:.74rem;margin-top:16px;padding:0 8px}
  .quiz-card{padding:22px 18px;border-radius:16px}
  .quiz-q{font-size:1.05rem;margin-bottom:14px}
  .quiz-opt{padding:11px 14px;font-size:.9rem}
  .quiz-actions{flex-direction:column}
  .quiz-actions .btn{width:100%;justify-content:center}
  .checklist-tabs{gap:6px;overflow-x:auto;flex-wrap:nowrap;padding-bottom:6px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
  .checklist-tabs::-webkit-scrollbar{display:none}
  .tab-btn{padding:7px 12px;font-size:.82rem;white-space:nowrap;flex-shrink:0}
  .checklist-body{padding:22px 18px;width:100%;max-width:100%}
  .checklist-body .btn{width:100%;justify-content:center}
}

/* ── PHONES & SMALL SCREENS (<= 580px) ── */
@media(max-width:580px){
  .countries-grid{grid-template-columns:1fr;gap:18px}
  .country-card-media{height:180px}
  .country-card-content{padding:18px 18px 20px}
  .country-landmark-tag{font-size:.72rem;padding:3px 9px}
  .footer-grid{grid-template-columns:1fr;gap:26px}
  .footer-bottom{flex-direction:column;text-align:center;gap:12px;padding-top:18px}
  .footer-bottom-links{flex-direction:column;gap:8px}
  .wa-dest-grid{grid-template-columns:1fr}
  .steps{grid-template-columns:1fr;row-gap:20px;margin-top:28px}
  .step{display:flex;align-items:flex-start;text-align:left;gap:16px;padding:0}
  .step-dot{width:40px;height:40px;font-size:.95rem;flex-shrink:0;margin-bottom:0}
  .step-content h3{font-size:.95rem;margin-bottom:3px}
  .step-content p{font-size:.84rem}
  .why-img{height:250px}
  .why-badge{position:relative;bottom:0;left:0;margin-top:14px;width:100%;border-radius:12px;padding:12px 16px}
  .contact-info{padding:26px 18px}
  .contact-form{padding:26px 18px}
  .field-row{grid-template-columns:1fr;gap:12px}
  .field input,.field select{font-size:16px!important;padding:12px 14px}
  .wa-float-label{display:none}
  .wa-float-btn{width:48px;height:48px;font-size:1.3rem}
}

/* ── EXTRA COMPACT PHONES (<= 420px) ── */
@media(max-width:420px){
  .wrap{padding:0 12px}
  .hero{padding:28px 0 20px;gap:24px}
  .hero-title{font-size:clamp(1.95rem,8.5vw,2.5rem)}
  .hero-ctas .btn{width:100%;justify-content:center}
  .globe-wrap{max-width:280px}
  .stage{padding:20px 16px}
  .svc-item{padding:8px 4px;gap:10px}
  .svc-icon-box{width:38px;height:38px;font-size:1.2rem}
  .person{padding:20px 16px}
  .office-body{padding:18px 16px}
  .story{padding:18px 16px}
  .pcard{padding:18px 16px}
  .btn-lg{padding:12px 20px;font-size:.95rem}
}

@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
export default function YasviConsultancy() {
  const [bar, setBar]   = useState(true);
  const [menu, setMenu] = useState(false);
  const [tab, setTab]   = useState("uk");
  const [faqOpen, setFaqOpen] = useState(null);
  const [copied, setCopied] = useState(null);
  const [waPopupOpen, setWaPopupOpen] = useState(false);
  const [targetWa, setTargetWa] = useState(WA_NUM_1);
  const [form, setForm] = useState({
    name: "", phone: "", country: "United Kingdom", intake: "September 2027", course: "",
  });

  const set = k => e => setForm({ ...form, [k]: e.target.value });

  const sendTo = (targetNum) => {
    const text = `Hi Yasvi Overseas, I'm ${form.name || "a student"} (${form.phone || "No phone provided"}). Country: ${form.country}. Intake: ${form.intake}.${form.course ? ` Course: ${form.course}.` : ""} I'd like to book a counselling session.`;
    window.open(wa(text, targetNum), "_blank");
  };

  const send = e => {
    e.preventDefault();
    sendTo(targetWa);
  };

  const copyPhone = (numStr = WA_DISPLAY_1, key = "num1") => {
    navigator.clipboard?.writeText(numStr).then(() => {
      setCopied(key); setTimeout(() => setCopied(null), 1800);
    });
  };

  const NAV = [
    ["#countries", "Countries"], ["#services", "Services"],
    ["#parents", "For parents"], ["#stories", "Stories"],
    ["#faq", "FAQ"], ["#contact", "Contact"],
  ];

  return (
    <div className="ys" id="top">
      <style>{CSS}</style>

      {/* ANNOUNCE */}
      {bar && (
        <div className="announce">
          <span className="sample-tag">Sample</span>
          <span>Spot admission day for UK September 2027 intake · Saturday at our Vanasthalipuram office</span>
          <a href={wa("Hi Yasvi, I'd like to register for the spot admission day.")} target="_blank" rel="noopener noreferrer">Register on WhatsApp</a>
          <button className="announce-close" onClick={() => setBar(false)} aria-label="Dismiss">×</button>
        </div>
      )}

      {/* NAV */}
      <header className="nav">
        <div className="nav-inner">
          <a href="#top" className="logo">
            <span className="logo-word">YΛ<span>SVI</span></span>
            <span className="logo-sub">Overseas Consultancy</span>
          </a>
          <nav className="nav-links" aria-label="Main">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} className="nav-btn-link">{label}</a>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="btn btn-outline nav-btn" style={{ padding: "8px 18px", fontSize: ".88rem" }} href="#contact">Book Counselling</a>
            <button className="burger" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? "✕" : "☰"}</button>
          </div>
        </div>
        {menu && (
          <div className="nav-mobile-dropdown">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenu(false)} className="nav-mobile-link">
                <span>{label}</span>
                <span style={{ color: "var(--blue)", fontSize: "1.1rem" }}>→</span>
              </a>
            ))}
            <a className="btn btn-wa btn-block" href="#contact" onClick={() => setMenu(false)} style={{ marginTop: "6px" }}>Book Counselling on WhatsApp</a>
          </div>
        )}

        {/* FLASHLIGHT SEPARATION LINE & GLOW */}
        <div className="nav-flashlight-line" aria-hidden="true">
          <div className="nav-flashlight-beam" />
        </div>
        <div className="nav-flashlight-glow" aria-hidden="true" />
      </header>

      <main id="main">

        {/* HERO */}
        <section className="wrap">
          <div className="hero">
            <div className="hero-main">
              <p className="hero-eyebrow">Overseas education consultancy · Hyderabad</p>
              <h1 className="hero-title">
                Every dream<br />has a <em>destination.</em>
              </h1>
              <p className="hero-lead">
                Personal guidance from course shortlist to visa, for the UK, Canada, Australia, New Zealand, Ireland and Germany.
              </p>
              <div className="hero-ctas">
                <a className="btn btn-wa btn-lg" href="#contact">Book a counselling session</a>
                <a className="btn btn-ghost" href="#countries">Explore destinations</a>
              </div>
              <div className="hero-foot">
                <p className="hero-stat"><span className="stat-bar" />From Hyderabad to 6 study destinations</p>
                <a className="scrollcue" href="#countries">
                  Scroll to explore <span className="scrollcue-ring">↓</span>
                </a>
              </div>
            </div>
            <Globe3D />
          </div>
        </section>

        {/* COUNTRIES */}
        <section className="section" id="countries">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Destinations</p>
              <h2 className="h2">Study <em>destinations</em></h2>
              <p className="lead">Six countries we know inside out. Tap a country to ask us about courses, costs and intakes.</p>
            </div>
            <div className="countries-grid">
              {COUNTRIES.map(c => (
                <a key={c.id} id={`c-${c.id}`} className="country-card" href={wa(`Hi Yasvi, I'd like to know about studying in ${c.name}.`)} target="_blank" rel="noopener noreferrer">
                  <div className="country-card-media">
                    <img src={c.image} alt={`${c.landmark} in ${c.name}`} className="country-card-img" loading="lazy" />
                    <div className="country-media-overlay">
                      <span className="country-landmark-tag">📍 {c.landmark}</span>
                    </div>
                  </div>
                  <div className="country-card-content">
                    <div className="country-card-top">
                      <span className="country-flag">{c.flag}</span>
                      <span className="country-tag">Study in {c.name}</span>
                    </div>
                    <h3 className="country-name">{c.name}</h3>
                    <span className="country-intakes">🗓️ Intakes: <b>{c.intakes}</b></span>
                    <p className="country-blurb">{c.blurb}</p>
                    <span className="country-cta">Explore programs in {c.name} →</span>
                  </div>
                </a>
              ))}
            </div>
            <nav className="guides-nav" aria-label="Country guides">
              <span>Full country guides:</span>
              {COUNTRIES.map(c => (
                <a key={c.id} href={`#c-${c.id}`} className="guide-link">
                  {c.flag} {c.name}
                </a>
              ))}
            </nav>
            <p className="countries-more">Looking at another country? <a href={wa("Hi Yasvi, I'd like to know about studying in another country.")} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a>.</p>
          </div>
        </section>

        {/* INTAKES + STORY PANEL */}
        <section className="wrap" style={{ paddingBottom: 64 }}>
          <div className="hero-extras">
            <div>
              <div className="panel panel-dark intakes">
                <h2 className="eyebrow-light" style={{ fontSize: ".75rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>Main intakes</h2>
                <ul className="intakes-list">
                  {INTAKES.map(({ country, dates }) => (
                    <li key={country}><span>{country}</span><b>{dates}</b></li>
                  ))}
                </ul>
                <p className="intakes-note">Dates vary by university and course.</p>
                <a className="intakes-cta" href={wa("Hi Yasvi, which intake should I plan for?")} target="_blank" rel="noopener noreferrer">Ask which intake suits you</a>
              </div>
            </div>
            <div className="panel story-card">
              <div className="story-card-head">
                <h2 className="eyebrow" style={{ margin: "14px 20px 0" }}>Student journeys</h2>
              </div>
              <div className="story-card-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85"
                  alt="Student journeys from Hyderabad to abroad"
                  className="story-card-img"
                  loading="lazy"
                />
                <span className="story-img-tag">🎓 Hyderabad to Global Campuses</span>
              </div>
              <div className="story-card-text">
                <p className="story-card-title">From our desk in Hyderabad to campuses abroad.</p>
                <p className="story-card-quote">"Honest advice, one counsellor, every step handled."</p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="trust" aria-label="Yasvi at a glance">
          <div className="wrap">
            <div className="trust-row">
              {STATS.map(({ n, label }) => (
                <div key={label} className="trust-stat">
                  <b>{n}</b><span>{label}</span>
                </div>
              ))}
              <a className="trust-reviews" href="https://www.google.com/maps/search/?api=1&query=Yasvi+Overseas+Consultancy+Vanasthalipuram+Hyderabad" target="_blank" rel="noopener noreferrer">
                <span className="stars">★★★★★</span>
                <b>4.9</b>
                <span>from 180 Google reviews</span>
              </a>
            </div>
            <p className="trust-note"><span className="sample-tag">Sample</span> <span>Figures shown are placeholders until the client confirms their numbers.</span></p>
          </div>
        </section>

        {/* FINDER / QUIZ */}
        <section className="section-finder" id="finder">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">2-minute check</p>
              <h2 className="h2">Not sure which country suits you?</h2>
              <p className="lead">Answer five quick questions. We will suggest the countries worth discussing, and a counsellor will check your full profile for free.</p>
            </div>
            <Quiz />
          </div>
        </section>

        {/* SERVICES */}
        <section className="section bg-sun" id="services">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Services</p>
              <h2 className="h2">Our <em>services</em></h2>
              <p className="lead">Ten services, grouped by where you are in your journey.</p>
            </div>
            <div className="stages">
              {SERVICES.map(({ stage, title, items }) => (
                <div key={stage} className="stage">
                  <div className="stage-head">
                    <span className="stage-num">{stage}</span>
                    <span className="stage-badge">{items.length} Key Services</span>
                  </div>
                  <h3 className="stage-title">{title}</h3>
                  <ul className="svc-list">
                    {items.map(({ icon, title: t, desc }) => (
                      <li key={t} className="svc-item">
                        <div className="svc-icon-box">{icon}</div>
                        <div>
                          <span className="svc-title">{t}</span>
                          <span className="svc-desc">{desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section bg-night" id="process">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">How it works</p>
              <h2 className="h2">How it <em>works</em></h2>
            </div>
            <ol className="steps" style={{ listStyle: "none" }}>
              {STEPS.map(({ n, title, desc }) => (
                <li key={n} className="step">
                  <span className="step-dot">{n}</span>
                  <div className="step-content">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WHY YASVI */}
        <section className="section bg-peach" id="why">
          <div className="wrap">
            <div className="why-grid">
              <div className="why-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85"
                  alt="Group of friends enjoying university life abroad"
                  className="why-img"
                  loading="lazy"
                />
                <div className="why-badge">
                  <div className="why-badge-icon">✅</div>
                  <div><b>One counsellor</b><span>from first call to arrival</span></div>
                </div>
              </div>
              <div>
                <p className="eyebrow">Why Yasvi</p>
                <h2 className="h2">Why students choose <em>Yasvi</em></h2>
                <p className="lead" style={{ marginBottom: 8 }}>We tell you what fits your profile and budget, even when the answer is a different country or course.</p>
                <ul className="checks">
                  {WHY_CHECKS.map(c => (
                    <li key={c}>
                      <span className="check-icon">✓</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MEET US */}
        <section className="section bg-soft" id="team">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Meet us</p>
              <h2 className="h2">Meet your <em>counsellor</em></h2>
              <p className="lead">You will know exactly who is handling your application, and you are always welcome to visit.</p>
            </div>
            <div className="team-grid">
              <div className="person">
                <span className="sample-tag">Sample</span>
                <div className="person-top" style={{ marginTop: 8 }}>
                  <div className="avatar avatar-lg">YC</div>
                  <div>
                    <div className="person-name">Counsellor name</div>
                    <div className="person-role">Founder & Senior Counsellor · 9 years</div>
                    <div className="person-langs">English · Telugu · Hindi</div>
                  </div>
                </div>
                <blockquote className="person-quote">"I sit with every student and parent myself. If a country or course is not right for your profile or budget, I will tell you before you spend a rupee."</blockquote>
                <ul className="person-facts">
                  <li>🎓 Guided students into universities in all six countries</li>
                  <li>🏆 Trained by partner universities on admissions and visas</li>
                </ul>
                <a className="btn btn-wa" href={wa("Hi Yasvi, I'd like to book a session with the counsellor.")} target="_blank" rel="noopener noreferrer">Book a session</a>
              </div>
              <div className="office">
                <div className="office-photo">
                  <span className="sample-tag">Sample</span>
                  <span style={{ fontSize: "2rem" }}>🏢</span>
                  <span>Office photo goes here</span>
                </div>
                <div className="office-body">
                  <h3>Visit our office</h3>
                  <address>402, 4th Floor, MS Complex, Kamala Nagar Road No. 12, Vanasthalipuram, Hyderabad</address>
                  <p className="office-hours">📍 Mon – Sat · 10:00 am – 7:00 pm <span className="sample-tag">Sample</span></p>
                  <div className="office-links">
                    <a className="btn btn-ghost btn-sm" href="https://www.google.com/maps/search/?api=1&query=Yasvi+Overseas+Consultancy+MS+Complex+Kamala+Nagar+Vanasthalipuram+Hyderabad" target="_blank" rel="noopener noreferrer">Get directions</a>
                    <a className="btn btn-ghost btn-sm" href="tel:+919989884094">Call: 99898 84094</a>
                    <a className="btn btn-ghost btn-sm" href="tel:+919390677123">Call: 93906 77123</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STUDENT STORIES */}
        <section className="section" id="stories">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Student stories</p>
              <h2 className="h2">Student <em>stories</em></h2>
              <p className="lead">A few of the students and families we have worked with, in their own words.</p>
            </div>
            <div className="stories-grid">
              {STORIES.map(({ av, name, img, meta, quote }) => (
                <figure key={name + meta} className="story">
                  <div className="stars">★★★★★</div>
                  <blockquote>"{quote}"</blockquote>
                  <figcaption>
                    <img src={img} alt={name} className="story-avatar-img" loading="lazy" />
                    <div>
                      <b>{name}</b>
                      <small>{meta}</small>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="stories-more">
              <a href="https://www.google.com/maps/search/?api=1&query=Yasvi+Overseas+Consultancy+Vanasthalipuram+Hyderabad" target="_blank" rel="noopener noreferrer">Read our reviews on Google</a>
            </p>
          </div>
        </section>

        {/* FOR PARENTS */}
        <section className="section bg-soft" id="parents">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">For parents</p>
              <h2 className="h2">For <em>parents</em></h2>
              <p className="lead">Sending a child abroad is a family decision. Here is how we keep you informed and in control.</p>
            </div>
            <div className="parents-grid">
              {PARENTS.map(({ icon, title, desc }) => (
                <div key={title} className="pcard">
                  <span className="pcard-icon">{icon}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
            <div className="parents-cta">
              <p>Want to talk it through as a family?</p>
              <a className="btn btn-wa" href={wa("Hi Yasvi, we'd like to book a parent and student counselling session.")} target="_blank" rel="noopener noreferrer">Book a family session</a>
            </div>
          </div>
        </section>

        {/* CHECKLIST */}
        <ChecklistSection />

        {/* GUIDES */}
        <section className="section bg-soft" id="updates">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Guides & updates</p>
              <h2 className="h2">Guides</h2>
            </div>
            <div className="guides-grid">
              {GUIDES.map(({ meta, title, desc, waText }) => (
                <article key={title} className="guide-card">
                  <span className="sample-tag">Sample</span>
                  <p className="guide-meta">{meta}</p>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  <a href={wa(waText)} target="_blank" rel="noopener noreferrer">Ask us about this →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Questions</p>
              <h2 className="h2">Frequently asked <em>questions</em></h2>
              <p className="lead">Straight answers to the questions we hear most. Anything else, ask us on WhatsApp.</p>
            </div>
            <div className="faq-list">
              {FAQ.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section wrap" id="contact">
          <div className="contact-panel">
            <div className="contact-info">
              <p className="eyebrow">Book counselling</p>
              <h2 className="h2">Book a counselling session</h2>
              <p className="lead" style={{ color: "#94a3b8" }}>Send your details and we will reply on WhatsApp to fix a counselling session.</p>
              <ul className="contact-list">
                <li>
                  <span className="contact-list-icon">📞</span>
                  <div style={{ flex: 1 }}>
                    <span>Helpline 1 · Call / WhatsApp</span>
                    <div className="contact-line-box">
                      <a href="tel:+919989884094" className="contact-num-link">+91 99898 84094</a>
                      <div className="contact-btns-group">
                        <a href={wa("Hi Yasvi Overseas, I would like to enquire about counselling.", WA_NUM_1)} target="_blank" rel="noopener noreferrer" className="wa-chip-btn">
                          💬 WhatsApp
                        </a>
                        <button className="copy-btn" onClick={() => copyPhone("+91 99898 84094", "num1")}>
                          {copied === "num1" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <span className="contact-list-icon">💬</span>
                  <div style={{ flex: 1 }}>
                    <span>Helpline 2 · Call / WhatsApp</span>
                    <div className="contact-line-box">
                      <a href="tel:+919390677123" className="contact-num-link">+91 93906 77123</a>
                      <div className="contact-btns-group">
                        <a href={wa("Hi Yasvi Overseas, I would like to enquire about counselling.", WA_NUM_2)} target="_blank" rel="noopener noreferrer" className="wa-chip-btn">
                          💬 WhatsApp
                        </a>
                        <button className="copy-btn" onClick={() => copyPhone("+91 93906 77123", "num2")}>
                          {copied === "num2" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <span className="contact-list-icon">📍</span>
                  <div>
                    <span>Office</span>
                    <a href="https://www.google.com/maps/search/?api=1&query=MS+Complex+Kamala+Nagar+Road+No+12+Vanasthalipuram+Hyderabad" target="_blank" rel="noopener noreferrer">
                      402, 4th Floor, MS Complex, Kamala Nagar Road No. 12, Vanasthalipuram, Hyderabad
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <form className="contact-form" id="leadForm" onSubmit={send} noValidate>
              <div className="field">
                <label htmlFor="f-name">Full name</label>
                <input id="f-name" name="name" type="text" autoComplete="name" placeholder="e.g. Ananya Reddy" required value={form.name} onChange={set("name")} />
              </div>
              <div className="field">
                <label htmlFor="f-phone">Phone number</label>
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" placeholder="10-digit mobile number" required value={form.phone} onChange={set("phone")} />
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="f-country">Preferred country</label>
                  <select id="f-country" name="country" value={form.country} onChange={set("country")}>
                    {COUNTRIES.map(c => <option key={c.id}>{c.name}</option>)}
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-intake">Intake</label>
                  <select id="f-intake" name="intake" value={form.intake} onChange={set("intake")}>
                    <option>January 2027</option>
                    <option>May 2027</option>
                    <option>September 2027</option>
                    <option>2028</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-course">Course of interest <span className="opt">(optional)</span></label>
                <input id="f-course" name="course" type="text" placeholder="e.g. MS Computer Science" value={form.course} onChange={set("course")} />
              </div>

              {/* WhatsApp Destination Selector */}
              <div className="wa-dest-wrap">
                <span className="wa-dest-title">Send Inquiry via WhatsApp Helpline:</span>
                <div className="wa-dest-grid">
                  <button
                    type="button"
                    className={`wa-dest-btn ${targetWa === WA_NUM_1 ? "active" : ""}`}
                    onClick={() => setTargetWa(WA_NUM_1)}
                  >
                    <span className="wa-dest-radio" />
                    <div className="wa-dest-text">
                      <strong>Helpline 1</strong>
                      <span>+91 99898 84094</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`wa-dest-btn ${targetWa === WA_NUM_2 ? "active" : ""}`}
                    onClick={() => setTargetWa(WA_NUM_2)}
                  >
                    <span className="wa-dest-radio" />
                    <div className="wa-dest-text">
                      <strong>Helpline 2</strong>
                      <span>+91 93906 77123</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="form-dual-send">
                <button className="btn btn-wa btn-lg btn-block" type="submit">
                  💬 Send on WhatsApp ({targetWa === WA_NUM_1 ? "+91 99898 84094" : "+91 93906 77123"})
                </button>
                <div className="wa-quick-row">
                  <button type="button" className="wa-quick-send-btn" onClick={() => sendTo(WA_NUM_1)}>
                    Send to Line 1 (+91 99898 84094)
                  </button>
                  <button type="button" className="wa-quick-send-btn" onClick={() => sendTo(WA_NUM_2)}>
                    Send to Line 2 (+91 93906 77123)
                  </button>
                </div>
              </div>
              <p className="form-note">Opens WhatsApp with your details filled in. Connect with either counsellor directly.</p>
            </form>
          </div>
        </section>

      </main>

      {/* SEPARATION DIVIDER ABOVE FOOTER */}
      <div className="footer-divider-ornament">
        <div className="footer-divider-line" />
        <div className="footer-divider-emblem">✦ YASVI OVERSEAS CONSULTANCY ✦</div>
        <div className="footer-divider-line" />
      </div>

      {/* FOOTER (Visually separate from body) */}
      <footer className="footer">
        <div className="footer-top-glow" />

        {/* Pre-footer Callout Band */}
        <div className="footer-callout-strip">
          <div className="wrap">
            <div className="footer-callout-card">
              <div className="footer-callout-info">
                <span className="footer-callout-badge">📍 Hyderabad Head Office</span>
                <h3>Start your study abroad journey today</h3>
                <p>Walk in for personalized counselling or connect instantly via WhatsApp with our senior consultants.</p>
              </div>
              <div className="footer-callout-numbers">
                <a href={wa("Hi Yasvi Overseas, I would like to enquire about counselling.", WA_NUM_1)} target="_blank" rel="noopener noreferrer" className="footer-num-badge">
                  <span className="fnb-icon">💬</span>
                  <div className="fnb-text">
                    <small>Helpline 1 · WhatsApp</small>
                    <strong>+91 99898 84094</strong>
                  </div>
                  <span className="fnb-arrow">→</span>
                </a>
                <a href={wa("Hi Yasvi Overseas, I would like to enquire about counselling.", WA_NUM_2)} target="_blank" rel="noopener noreferrer" className="footer-num-badge">
                  <span className="fnb-icon">💬</span>
                  <div className="fnb-text">
                    <small>Helpline 2 · WhatsApp</small>
                    <strong>+91 93906 77123</strong>
                  </div>
                  <span className="fnb-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="wrap footer-main-wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#top" className="logo">
                <span className="logo-word">YΛ<span>SVI</span></span>
                <span className="logo-sub">Overseas Consultancy</span>
              </a>
              <p className="footer-tag">Your Dreams · Our Guidance</p>
              <p className="footer-about">Personal, honest guidance for students in Hyderabad, from the first counselling session to your first week abroad.</p>
              <span className="footer-loc-badge">📍 Vanasthalipuram, Hyderabad</span>
            </div>
            <nav className="footer-col" aria-label="Destinations">
              <h3>Country guides</h3>
              {COUNTRIES.map(c => <a key={c.id} href={`#countries`}>{c.name}</a>)}
            </nav>
            <nav className="footer-col" aria-label="Company">
              <h3>Explore</h3>
              <a href="#services">Services</a>
              <a href="#process">How it works</a>
              <a href="#why">Why Yasvi</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Book counselling</a>
            </nav>
            <div className="footer-col">
              <h3>Visit or call</h3>
              <div className="footer-contact-block">
                <div className="footer-contact-item">
                  <div className="footer-ci-head">
                    <span>Helpline 1</span>
                    <span>Counselling</span>
                  </div>
                  <a href="tel:+919989884094" className="footer-ci-num">📞 +91 99898 84094</a>
                  <a href={wa("", WA_NUM_1)} target="_blank" rel="noopener noreferrer" className="footer-ci-wa">💬 Chat on WhatsApp →</a>
                </div>
                <div className="footer-contact-item">
                  <div className="footer-ci-head">
                    <span>Helpline 2</span>
                    <span>Admissions</span>
                  </div>
                  <a href="tel:+919390677123" className="footer-ci-num">📞 +91 93906 77123</a>
                  <a href={wa("", WA_NUM_2)} target="_blank" rel="noopener noreferrer" className="footer-ci-wa">💬 Chat on WhatsApp →</a>
                </div>
              </div>
              <address>402, 4th Floor, MS Complex,<br />Kamala Nagar Road No. 12,<br />Vanasthalipuram, Hyderabad</address>
              <a href="https://www.google.com/maps/search/?api=1&query=Yasvi+Overseas+Consultancy+MS+Complex+Kamala+Nagar+Vanasthalipuram+Hyderabad" target="_blank" rel="noopener noreferrer" style={{ marginTop: 8, display: "inline-block", color: "#fde047" }}>📍 Open in Google Maps</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Yasvi Overseas Consultancy. All rights reserved.</p>
            <div className="footer-bottom-links">
              <span>Details you share are used only to reply to you</span>
              <a href="#top" className="back-to-top-btn">▲ Back to top</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE ACTION BAR (Both WhatsApp numbers) */}
      <nav className="actionbar" aria-label="Quick contact">
        <div className="actionbar-call-box">
          <a href="tel:+919989884094" title="Call Line 1">📞 Call 1</a>
          <a href="tel:+919390677123" title="Call Line 2">📞 Call 2</a>
        </div>
        <a className="actionbar-wa-1" href={wa("", WA_NUM_1)} target="_blank" rel="noopener noreferrer">💬 WA 1</a>
        <a className="actionbar-wa-2" href={wa("", WA_NUM_2)} target="_blank" rel="noopener noreferrer">💬 WA 2</a>
      </nav>

      {/* FLOATING WA WIDGET (Both numbers selector) */}
      <div className="wa-float-container">
        {waPopupOpen && (
          <div className="wa-popup-card">
            <div className="wa-popup-header">
              <div className="wa-popup-header-title">
                <span className="wa-pop-ico">💬</span>
                <div>
                  <strong>Chat on WhatsApp</strong>
                  <span>Choose a helpline to connect</span>
                </div>
              </div>
              <button 
                type="button" 
                className="wa-popup-close" 
                onClick={() => setWaPopupOpen(false)}
                aria-label="Close"
              >×</button>
            </div>
            <div className="wa-popup-body">
              <a 
                href={wa("Hi Yasvi Overseas, I'd like to enquire about studying abroad.", WA_NUM_1)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="wa-popup-option"
                onClick={() => setWaPopupOpen(false)}
              >
                <div className="wa-pop-opt-avatar">
                  <span>Y1</span>
                  <span className="wa-pop-dot" />
                </div>
                <div className="wa-pop-opt-text">
                  <small>Helpline 1 · Counselling & Spot Admissions</small>
                  <strong>+91 99898 84094</strong>
                </div>
                <span className="wa-pop-opt-btn">Chat →</span>
              </a>

              <a 
                href={wa("Hi Yasvi Overseas, I'd like to enquire about studying abroad.", WA_NUM_2)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="wa-popup-option"
                onClick={() => setWaPopupOpen(false)}
              >
                <div className="wa-pop-opt-avatar" style={{ background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)" }}>
                  <span>Y2</span>
                  <span className="wa-pop-dot" />
                </div>
                <div className="wa-pop-opt-text">
                  <small>Helpline 2 · Admissions & Visa Enquiries</small>
                  <strong>+91 93906 77123</strong>
                </div>
                <span className="wa-pop-opt-btn">Chat →</span>
              </a>
            </div>
            <div className="wa-popup-footer">
              <span>⚡ Usually replies within 15 minutes</span>
            </div>
          </div>
        )}

        <button 
          type="button" 
          className={`wa-float ${waPopupOpen ? "open" : ""}`} 
          onClick={() => setWaPopupOpen(!waPopupOpen)} 
          aria-label="Chat with Yasvi on WhatsApp - 2 numbers available"
        >
          <span className="wa-float-badge">2 Lines</span>
          <span className="wa-float-label">WhatsApp Us</span>
          <span className="wa-float-btn">{waPopupOpen ? "✕" : "💬"}</span>
        </button>
      </div>
    </div>
  );
}