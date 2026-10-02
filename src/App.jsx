import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Briefcase, Gift, Sparkles, Wine, Flame, Palette, Calendar, Compass, 
  Award, Gem, Leaf, Eye, Clock, ShieldCheck, Check, ChevronRight, ChevronLeft, 
  ChevronDown, Phone, Mail, MapPin, CalendarDays, Map, MessageSquare, 
  ArrowRight, ArrowLeft, Star, CheckCircle, Menu, X, CircleDot,
  FileText, Cookie, Lock
} from 'lucide-react';
import satvikLogo from './assets/satvik-logo.png';

// --- Static Data Mockups ---
const SERVICES = [
  { id: 'wedding', icon: Heart, title: "Wedding & Engagements", desc: "Grand royal wedding catering, Sangeet, and Engagement ceremonies with traditional floral setups, live food stalls, and heartfelt hospitality.", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600", label: "Plan Wedding" },
  { id: 'birthday', icon: Gift, title: "Birthday Parties", desc: "Joyful birthday celebrations with custom designer cakes, fun live food counters, fresh snacks, and colorful party decoration.", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600", label: "Plan Birthday" },
  { id: 'corporate', icon: Briefcase, title: "Corporate Events", desc: "Professional pure veg breakfast, executive lunch buffets, high tea, and annual meets for corporate conferences and business gatherings.", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600", label: "Corporate Inquiry" },
  { id: 'private', icon: Sparkles, title: "Social Gatherings", desc: "Family reunions, Anniversaries, Griha Pravesh, and sacred religious pujas served with 100% pure satvik vegetarian food.", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600", label: "Book Gathering" },
  { id: 'buffet', icon: Wine, title: "Catering Service", desc: "Authentic pure vegetarian catering cooked with 100% pure desi ghee in royal brass and copper ware with live tandoors and sweets.", img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600", label: "View Catering" },
  { id: 'live-counters', icon: Flame, title: "Live Food Counters", desc: "Famous Delhi and Jaipur Chaat, sizzling Tandoori Paneer Tikka, fresh Dosa counters, and hot Desi Ghee Jalebi with Rabdi.", img: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&q=80&w=600", label: "Explore Live Stalls" },
  { id: 'decor', icon: Palette, title: "Event Planning & Decor", desc: "Traditional flower mandap designs, ambient fairy lighting, royal stage backdrops, and complete guest hospitality management.", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600", label: "View Decor Designs" },
  { id: 'outdoor', icon: Compass, title: "Lawn & Destination Catering", desc: "Full kitchen setup for heritage forts, open lawns, farmhouses, and destination wedding venues across Jaipur and Rajasthan.", img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600", label: "Plan Lawn Event" },
];

const DISHES = [
  { id: 1, category: "starters", tag: "Most Loved", title: "Royal Shahi Paneer Tikka", desc: "Fresh cottage cheese cubes marinated in hung curd, saffron, and aromatic spices, roasted golden in clay tandoor.", type: "Veg", isVeg: true, pair: "Served with Mint Chutney & Onions", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600" },
  { id: 2, category: "mains", tag: "Chef Special", title: "Dal Makhani Dum Pukht", desc: "Black lentils slow-cooked overnight on charcoal with pure desi ghee, fresh cream, and traditional spices.", type: "Veg", isVeg: true, pair: "Best paired with Butter Naan", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600" },
  { id: 3, category: "indian", tag: null, title: "Shahi Paneer Lababdar", desc: "Soft paneer cubes cooked in a rich tomato, cashew nut, and butter gravy, finished with fresh cream.", type: "Veg", isVeg: true, pair: "Pairs with Missi Roti & Kulcha", img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600" },
  { id: 4, category: "starters", tag: "Popular", title: "Chandni Chowk Dahi Papdi Chaat", desc: "Crisp fried flour wafers topped with boiled potatoes, sweet curd, roasted cumin, and sweet-sour chutneys.", type: "Veg", isVeg: true, pair: "Traditional Delhi Street Taste", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600" },
  { id: 5, category: "desserts", tag: "Wedding Special", title: "Hot Desi Ghee Jalebi with Rabdi", desc: "Crispy golden jalebis soaked in saffron sugar syrup, served piping hot with thick creamy malai rabdi.", type: "Veg", isVeg: true, pair: "Royal Indian Sweet", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600" },
  { id: 6, category: "beverages", tag: "Welcome Drink", title: "Royal Kesar Pista Thandai", desc: "A refreshing traditional welcome drink prepared with chilled milk, ground almonds, pistachios, saffron, and cardamom.", type: "Mocktail", isVeg: true, pair: "Traditional Auspicious Welcome", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600" },
  { id: 7, category: "live-counters", tag: "Live Station", title: "Live Amritsari Chole Kulche", desc: "Crispy tandoori kulchas stuffed with spiced potatoes and paneer, served hot with tangy Amritsari chole.", type: "Veg", isVeg: true, pair: "Freshly Made Live at Venue", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600" },
  { id: 8, category: "indian", tag: "Royal Feast", title: "Lucknowi Subz Awadhi Biryani", desc: "Long-grain basmati rice layered with fresh vegetables, saffron milk, and fried onions, cooked on slow dum.", type: "Veg", isVeg: true, pair: "Served with Boondi Raita & Salan", img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600" },
];

const GALLERY_ITEMS = [
  { id: 1, tag: "Buffet", title: "Grand Indian Wedding Buffet", img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200", thumb: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600" },
  { id: 2, tag: "Decoration", title: "Royal Floral Mandap Setup", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200", thumb: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600" },
  { id: 3, tag: "Culinary", title: "Traditional Thali Presentation", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200", thumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600" },
  { id: 4, tag: "Reception", title: "Celebration Toast & Welcome", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200", thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600" },
  { id: 5, tag: "Ambiance", title: "Evening Lawn Wedding Lights", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1200", thumb: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600" },
  { id: 6, tag: "Behind the Scenes", title: "Master Chefs at Work", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200", thumb: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600" },
];

const TESTIMONIALS = [
  { id: 1, name: "Rajesh & Sunita Sharma", event: "Grand Wedding, Jaipur", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150", text: "\"Satvik Delights made our daughter's wedding in Jaipur truly royal. The pure vegetarian food was so tasty and fresh, especially the live chaat and hot jalebis. All our guests and relatives loved the hospitality!\"" },
  { id: 2, name: "Vikram Singhania", event: "Corporate Annual Meet, Mumbai", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150", text: "\"Very professional team. They served hot, delicious vegetarian meals to over 500 guests on time with wonderful manners. Highly recommended for corporate events.\"" },
  { id: 3, name: "Dr. Ananya Mukherjee", event: "Griha Pravesh Puja, Bangalore", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150", text: "\"We requested 100% pure satvik food without onion and garlic for our house warming ceremony. Everything was prepared with pure desi ghee and great devotion.\"" }
];

const EVENT_CATEGORIES = [
  { id: 'wedding', sub: "ROYAL CELEBRATION", title: "Wedding & Engagements", desc: "Traditional flower mandaps, royal stage decor, and grand wedding feasts.", img: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600" },
  { id: 'birthday', sub: "FAMILY FUN", title: "Birthday Parties", desc: "Themed setups with custom designer cakes, starters, and live food stalls.", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600" },
  { id: 'corporate', sub: "BUSINESS MEETS", title: "Corporate Events", desc: "Punctual lunch buffets, executive high tea, and corporate annual meets.", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600" },
  { id: 'private-dinner', sub: "SACRED CEREMONIES", title: "Social Gatherings", desc: "Griha Pravesh, Anniversaries, and auspicious family community celebrations.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600" },
  { id: 'buffet', sub: "ROYAL ZAIKA", title: "Catering Service", desc: "100% pure desi ghee delicacies served in royal brass and copper ware.", img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600" },
];

const FAQS = [
  { q: "Do you prepare 100% pure vegetarian food?", a: "Yes, we are 100% pure vegetarian caterers. We prepare all food with fresh vegetables, pure desi ghee, and top-quality ingredients." },
  { q: "Can you provide food without onion and garlic (Jain/Satvik)?", a: "Yes, absolutely! We specialize in authentic Jain and Satvik food without onion and garlic for family pujas, festivals, and celebrations." },
  { q: "Do you handle complete wedding decoration?", a: "Yes, we provide full wedding decor including traditional flower mandaps, lighting, stage design, and dining table setups." },
  { q: "What live food counters do you offer?", a: "We offer famous live counters like Delhi Chaat, Tandoori Paneer Tikka, South Indian Dosa, Pav Bhaji, and hot Jalebi with Rabdi." },
  { q: "How early should we book our event?", a: "For wedding dates and auspicious muhurats, we recommend booking 2 to 6 months in advance to reserve your preferred date." },
  { q: "Can we do a food tasting before booking?", a: "Yes, we happily arrange menu tasting sessions for you and your family to finalize your favorite dishes with our head chef." },
  { q: "Can menus be customized for our event?", a: "Yes, every menu is completely customized according to your family traditions, taste preferences, and guest count." }
];

const BLOG_ARTICLES = [
  { 
    id: 'blog-1', 
    date: "JULY 02, 2026 • WEDDING TIPS", 
    title: "How to Plan the Perfect Indian Wedding Menu", 
    desc: "A simple guide to choosing delicious welcome drinks, live chaat stalls, rich main courses, and traditional sweets for your big day.", 
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=600",
    content: "When planning an Indian wedding, the food is the heart of the celebration. Guests remember the taste and hospitality for years. Start by offering refreshing traditional welcome drinks like Kesar Thandai or fresh fruit mocktails. For the evening, set up live interactive counters such as Delhi Chaat and hot Tandoor starters so guests can enjoy fresh food while mingling. In the main course, balance rich dishes like Dal Makhani and Shahi Paneer with light seasonal vegetables and fragrant Basmati biryani. Always conclude with classic hot sweets like Desi Ghee Jalebi and Malai Rabdi."
  },
  { 
    id: 'blog-2', 
    date: "JUNE 24, 2026 • FOOD SPECIALTIES", 
    title: "Top 5 Live Counters Every Wedding Guest Loves", 
    desc: "From crispy golgappas to hot jalebi-rabdi, see why live interactive stalls make Indian weddings joyful and memorable.", 
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    content: "Live counters bring energy, freshness, and excitement to any Indian wedding or family gathering. Guests love watching their food being freshly prepared right in front of them. The most popular counters include: 1. Golgappa & Chaat Counter with multiple flavored waters; 2. Sizzling Tandoor for fresh Paneer Tikka; 3. Live Dosa & Uttapam station; 4. Street-style Pav Bhaji; and 5. Hot Jalebi with thick Rabdi. Fresh food made on demand ensures maximum taste, hygiene, and smiles."
  },
  { 
    id: 'blog-3', 
    date: "MAY 18, 2026 • TRADITIONAL HOSPITALITY", 
    title: "The Art of Indian Hospitality: Atithi Devo Bhava", 
    desc: "How treating guests with warmth, pure vegetarian food, and respectful service turns a function into an unforgettable family blessing.", 
    img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600",
    content: "In Indian culture, serving food is considered the highest form of service. 'Atithi Devo Bhava' means treating every guest as God. At Satvik Delights, we train our service team to attend to every elder, child, and guest with a smile and gentle respect. From keeping warm rotis circulating to ensuring water glasses are never empty, true hospitality lies in anticipating what your family and guests need before they even ask."
  }
];

export default function App() {
  // --- Routing & View States ---
  // 'home' represents the full landing page. Specific subpages are:
  // 'about-page', 'services-page', 'wedding', 'corporate', 'birthday', 'private', 
  // 'buffet', 'live-counters', 'decor', 'planning', 'outdoor', 'blog-1', 'blog-2', 'blog-3'
  const [currentPage, setCurrentPage] = useState('home');
  const [cookieConsent, setCookieConsent] = useState(() => {
    try {
      return localStorage.getItem('satvik_cookie_consent') || null;
    } catch {
      return null;
    }
  });

  const handleCookieChoice = (choice) => {
    try {
      localStorage.setItem('satvik_cookie_consent', choice);
    } catch (e) {
      console.error(e);
    }
    setCookieConsent(choice);
  };

  // Loader & Layout States
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [menuFilter, setMenuFilter] = useState('all');
  
  // Custom Cursor
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  
  // Parallax / Scroll Variables
  const [scrollY, setScrollY] = useState(0);

  // 3D Perspective Hero Card Rotation
  const [heroCardRotate, setHeroCardRotate] = useState({ x: 10, y: -15 });

  // Lightbox Gallery State
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

  // Testimonials Carousel State
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Accordion FAQ State
  const [faqIdx, setFaqIdx] = useState(null);

  // Multi-step wizard booking form states
  const [formStep, setFormStep] = useState(1);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    eventType: '',
    eventDate: '',
    guestCount: '',
    diningStyles: [],
    decorRequired: '',
    fullName: '',
    email: '',
    phone: '',
    customRequests: ''
  });

  // --- Refs ---
  const trustSectionRef = useRef(null);
  const trustCounterRan = useRef(false);
  const [counters, setCounters] = useState({ events: 0, menus: 0, chefs: 0, executions: 0 });

  // --- Effects ---

  // Page Reveal Loader Timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderVisible(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Ensure dark-theme class is never active
  useEffect(() => {
    document.documentElement.classList.remove('dark-theme');
  }, []);

  // Scroll Listeners & Active Anchor Handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrolled(window.scrollY > 50);

      if (currentPage === 'home') {
        const sections = ['home', 'about', 'services', 'menu', 'gallery', 'blog', 'contact'];
        let currentSection = 'home';
        
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
              currentSection = sectionId;
            }
          }
        }
        setActiveLink(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Track Mouse Movement for Custom Cursor
  useEffect(() => {
    const trackMouse = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', trackMouse);
    return () => window.removeEventListener('mousemove', trackMouse);
  }, []);

  // Initialize Intersection Observers for Counter
  useEffect(() => {
    if (currentPage !== 'home' || loaderVisible) return;

    const observerOptions = { threshold: 0.2 };
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !trustCounterRan.current) {
          trustCounterRan.current = true;
          const targets = { events: 500, menus: 150, chefs: 99, executions: 100 };
          const duration = 2000;
          const stepsCount = duration / 16;
          
          let currentStep = 0;
          const interval = setInterval(() => {
            currentStep++;
            setCounters({
              events: Math.min(Math.ceil((targets.events / stepsCount) * currentStep), targets.events),
              menus: Math.min(Math.ceil((targets.menus / stepsCount) * currentStep), targets.menus),
              chefs: Math.min(Math.ceil((targets.chefs / stepsCount) * currentStep), targets.chefs),
              executions: Math.min(Math.ceil((targets.executions / stepsCount) * currentStep), targets.executions)
            });

            if (currentStep >= stepsCount) {
              clearInterval(interval);
            }
          }, 16);
        }
      });
    }, observerOptions);

    if (trustSectionRef.current) {
      counterObserver.observe(trustSectionRef.current);
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-card');
    revealElements.forEach(el => revealObserver.observe(el));

    return () => {
      counterObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [currentPage, loaderVisible]);

  // Scroll to top on page switches
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // --- Handlers ---
  const handleHeroMouseMove = (e) => {
    const xAxis = (window.innerWidth / 2 - e.clientX) / 25;
    const yAxis = (window.innerHeight / 2 - e.clientY) / 25;
    setHeroCardRotate({ x: yAxis, y: xAxis });
  };

  const handleHeroMouseLeave = () => {
    setHeroCardRotate({ x: 10, y: -15 });
  };

  const handleCardMouseMove = (e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (y / (rect.height / 2)) * -8;
    const rotateY = (x / (rect.width / 2)) * 8;
    cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleCardMouseLeave = (cardEl) => {
    if (!cardEl) return;
    cardEl.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const handleLightboxNav = (direction) => {
    let nextIdx = lightbox.index + direction;
    if (nextIdx < 0) nextIdx = GALLERY_ITEMS.length - 1;
    if (nextIdx >= GALLERY_ITEMS.length) nextIdx = 0;
    setLightbox(prev => ({ ...prev, index: nextIdx }));
  };

  // Form helpers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const styles = [...prev.diningStyles];
      if (checked) {
        styles.push(value);
      } else {
        const index = styles.indexOf(value);
        if (index > -1) styles.splice(index, 1);
      }
      return { ...prev, diningStyles: styles };
    });
  };

  const validateStep = (step) => {
    if (step === 1) {
      return formData.eventType !== '' && formData.eventDate !== '' && formData.guestCount !== '';
    }
    if (step === 2) {
      return formData.decorRequired !== '';
    }
    return true;
  };

  const handlePrevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleNextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(prev => prev + 1);
    } else {
      alert("Please fill out all required inputs on this step.");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.phone) {
      console.log('Bespoke Inquiry Received:', formData);
      setFormSuccess(true);
    } else {
      alert("Please fill out all required inputs.");
    }
  };

  // Switch navigation pages smoothly
  const handleNavigation = (target) => {
    setIsMobileMenuOpen(false);
    
    // Check if target is a home section anchor or a subpage
    if (['home', 'about', 'services', 'menu', 'gallery', 'blog', 'contact'].includes(target)) {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        // Let state resolve, then scroll
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveLink(target);
    } else {
      setCurrentPage(target);
      setActiveLink(target);
    }
  };

  // --- Subpage Layout Components ---

  // Dedicated Detailed About Page
  const renderAboutPage = () => (
    <section className="about-page-view" style={{ padding: '10rem 0 6rem 0' }}>
      <div className="container">
        <button className="btn btn-outline-dark btn-sm mb-4" onClick={() => setCurrentPage('home')} style={{ marginBottom: '2.5rem' }}>
          <ArrowLeft size={16} /> Return to Home
        </button>
        
        <span className="section-tag">OUR TRADITION &amp; HERITAGE</span>
        <h2 className="section-title">The Tradition of Satvik Delights</h2>
        <p className="section-lead" style={{ margin: '0 0 4rem 0' }}>Bringing family joy and rich Indian culinary traditions to life with 100% pure vegetarian catering.</p>

        <div className="grid-2" style={{ marginBottom: '6rem' }}>
          <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" alt="Kitchen operations" style={{ borderRadius: '16px' }} />
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-black)' }}>Our Values &amp; Tradition</h3>
            <p className="section-desc">We believe that food served at weddings and auspicious family celebrations should be pure, delicious, and prepared with deep devotion. From traditional brass and copper presentation to warm hospitality, we make sure every guest feels welcomed and respected.</p>
            <p className="section-desc">Our master chefs cook with fresh vegetables, pure desi ghee, and authentic whole spices to prepare royal North Indian, Awadhi, Rajasthani, South Indian, and live fusion food counters that satisfy guests of every generation.</p>
          </div>
        </div>

        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <span className="section-tag">LEADERSHIP &amp; EXPERT TEAM</span>
          <h2 className="section-title">The People Behind Satvik Delights</h2>
        </div>

        <div className="grid-3">
          <div className="process-card" style={{ padding: '3rem 2rem' }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" alt="Banwari Yadav" style={{ width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 1.5rem auto', border: '2px solid var(--color-gold)' }} />
            <h3>Banwari Yadav</h3>
            <p className="section-tag" style={{ fontSize: '0.65rem', marginTop: '0.3rem' }}>Founder &amp; Director</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-gold-dark)', fontWeight: 600, marginTop: '0.5rem' }}>+91 9413345428</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-dark)', marginTop: '0.8rem' }}>Leading Satvik Delights with a motto: "We Plan, We Design, We Deliver Memories". Dedicated to providing royal catering and unforgettable celebrations across Jaipur.</p>
          </div>

          <div className="process-card" style={{ padding: '3rem 2rem' }}>
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" alt="Aman Yadav" style={{ width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 1.5rem auto', border: '2px solid var(--color-gold)' }} />
            <h3>Aman Yadav</h3>
            <p className="section-tag" style={{ fontSize: '0.65rem', marginTop: '0.3rem' }}>Operations &amp; Event Lead</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-gold-dark)', fontWeight: 600, marginTop: '0.5rem' }}>+91 8079085977</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-dark)', marginTop: '0.8rem' }}>Managing on-ground event operations, live food stalls, banquet setups, and personal client hospitality for weddings and corporate galas.</p>
          </div>

          <div className="process-card" style={{ padding: '3rem 2rem' }}>
            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400" alt="Maharaj Ramdas Sharma" style={{ width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 1.5rem auto', border: '2px solid var(--color-gold)' }} />
            <h3>Maharaj Ramdas Sharma</h3>
            <p className="section-tag" style={{ fontSize: '0.65rem', marginTop: '0.3rem' }}>Master Chef &amp; Halwai</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-gold-dark)', fontWeight: 600, marginTop: '0.5rem' }}>Head of Culinary</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-dark)', marginTop: '0.8rem' }}>Over 25 years of mastery in royal Rajasthani zaika, pure desi ghee traditional sweets, and authentic North Indian wedding buffets.</p>
          </div>
        </div>
      </div>
    </section>
  );

  // Dedicated Detailed Services List Page
  const renderServicesPage = () => (
    <section className="services-page-view" style={{ padding: '10rem 0 6rem 0', backgroundColor: 'var(--color-ivory)' }}>
      <div className="container">
        <button className="btn btn-outline-dark btn-sm mb-4" onClick={() => setCurrentPage('home')} style={{ marginBottom: '2.5rem' }}>
          <ArrowLeft size={16} /> Return to Home
        </button>
        
        <span className="section-tag">OUR SERVICES</span>
        <h2 className="section-title">Catering &amp; Event Services</h2>
        <p className="section-lead" style={{ margin: '0 0 4rem 0' }}>Explore our complete range of traditional Indian catering and event decoration services for weddings, family functions, and corporate meets.</p>

        <div className="grid-3">
          {SERVICES.map(service => {
            let cardRef = null;
            return (
              <div 
                key={service.id} 
                ref={el => cardRef = el}
                className="service-card"
                style={{ backgroundColor: 'var(--color-white)' }}
                onMouseMove={(e) => handleCardMouseMove(e, cardRef)}
                onMouseLeave={() => handleCardMouseLeave(cardRef)}
                onClick={() => setCurrentPage(service.id)}
              >
                <div className="card-img-holder">
                  <img src={service.img} alt={service.title} />
                </div>
                <div className="card-body">
                  <div className="service-icon"><service.icon /></div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <button className="card-cta" style={{ cursor: 'pointer' }}>
                    View Details <ChevronRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  // Individual Service Detail Views
  const renderServiceDetailView = (id, title, img, detailText, points) => (
    <section className="service-detail-view" style={{ padding: '10rem 0 6rem 0' }}>
      <div className="container">
        <button className="btn btn-outline-dark btn-sm" onClick={() => setCurrentPage('home')} style={{ marginBottom: '2.5rem' }}>
          <ArrowLeft size={16} /> Return to Home
        </button>

        <div className="grid-2">
          <div>
            <span className="section-tag">SERVICE DETAILS</span>
            <h2 className="section-title">{title}</h2>
            <p className="section-desc">{detailText}</p>
            
            <div style={{ marginTop: '2rem' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-black)' }}>What is Included:</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {points.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.95rem' }}>
                    <Check size={16} style={{ color: 'var(--color-gold-dark)' }} /> {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <a href="#contact" className="btn btn-gold btn-glow" onClick={() => handleNavigation('contact')}>
                Book This Service
              </a>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <img src={img} alt={title} style={{ borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', width: '100%', height: '500px', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </section>
  );

  // Individual Blog Article View
  const renderBlogDetailView = (id) => {
    const article = BLOG_ARTICLES.find(a => a.id === id);
    if (!article) return null;

    return (
      <section className="blog-detail-view" style={{ padding: '10rem 0 6rem 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <button className="btn btn-outline-dark btn-sm" onClick={() => setCurrentPage('home')} style={{ marginBottom: '2.5rem' }}>
            <ArrowLeft size={16} /> Return to Home
          </button>

          <span className="section-tag">{article.date}</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--color-black)', margin: '1rem 0 2rem 0', lineHeight: '1.2' }}>{article.title}</h1>
          
          <img src={article.img} alt={article.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px', marginBottom: '3rem' }} />
          
          <div className="blog-content-body" style={{ fontSize: '1.1rem', lineHeight: '1.9', color: 'var(--color-gray-dark)' }}>
            <p style={{ marginBottom: '1.5rem' }}>{article.content}</p>
            <p style={{ marginBottom: '1.5rem' }}>At Satvik Delights, we believe that food is the heart of every Indian celebration. We make sure every dish is prepared with fresh ingredients, pure desi ghee, and authentic spices with proper hygiene.</p>
            <blockquote style={{ borderLeft: '3px solid var(--color-gold)', paddingLeft: '1.5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--color-black)', margin: '2.5rem 0' }}>
              "Good food brings families together. When guests eat with a smile and give their blessings, that is our true reward."
            </blockquote>
            <p>To book catering or discuss a customized pure vegetarian food menu for your wedding, reception, or family function, please contact our team today.</p>
          </div>
        </div>
      </section>
    );
  };

  // --- Legal & Policy Layout Components ---

  // Legal Navigation Tabs Switcher
  const renderLegalTabs = (activeTab) => (
    <div className="legal-nav-tabs">
      <button 
        type="button"
        className={`legal-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
        onClick={() => handleNavigation('privacy')}
      >
        <ShieldCheck size={16} /> Privacy Policy
      </button>
      <button 
        type="button"
        className={`legal-tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
        onClick={() => handleNavigation('terms')}
      >
        <FileText size={16} /> Terms of Service
      </button>
      <button 
        type="button"
        className={`legal-tab-btn ${activeTab === 'cookies' ? 'active' : ''}`}
        onClick={() => handleNavigation('cookies')}
      >
        <Cookie size={16} /> Cookie Policy
      </button>
    </div>
  );

  // Common Contact Assistance Card for Legal Pages
  const renderLegalContactBox = () => (
    <div className="legal-contact-box">
      <h4>Have Questions About Our Policies?</h4>
      <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-gray-dark)' }}>
        We are always here to assist you. If you have questions about our policies or wish to discuss pure vegetarian catering for your upcoming wedding or family celebration, please reach out directly:
      </p>
      <div className="legal-contact-details">
        <div className="legal-contact-item">
          <Phone size={18} />
          <div>
            <strong>Banwari Yadav:</strong> <a href="tel:+919413345428" style={{ color: 'var(--color-gold-dark)', fontWeight: 600 }}>+91 9413345428</a>
          </div>
        </div>
        <div className="legal-contact-item">
          <Phone size={18} />
          <div>
            <strong>Aman Yadav:</strong> <a href="tel:+918079085977" style={{ color: 'var(--color-gold-dark)', fontWeight: 600 }}>+91 8079085977</a>
          </div>
        </div>
        <div className="legal-contact-item">
          <Mail size={18} />
          <div>
            <strong>Email:</strong> <a href="mailto:satvikdelightcaterers@gmail.com" style={{ color: 'var(--color-gold-dark)' }}>satvikdelightcaterers@gmail.com</a>
          </div>
        </div>
        <div className="legal-contact-item">
          <MapPin size={18} />
          <div>
            <strong>Address:</strong> Janta Colony, Jaipur, Rajasthan
          </div>
        </div>
      </div>
    </div>
  );

  // 1. Dedicated Privacy Policy View
  const renderPrivacyPolicy = () => (
    <section className="legal-page-view">
      <div className="container legal-container">
        <div className="legal-header">
          <div style={{ marginBottom: '1.5rem' }}>
            <button className="btn btn-outline-dark btn-sm" onClick={() => handleNavigation('home')}>
              <ArrowLeft size={16} /> Return to Home
            </button>
          </div>
          <span className="section-tag">LEGAL &amp; PRIVACY</span>
          <h1 className="section-title">Privacy Policy</h1>
          <p className="legal-meta">Last Updated: October 2026 • Satvik Delights — Events &amp; Caterer, Jaipur, Rajasthan</p>
        </div>

        {renderLegalTabs('privacy')}

        <div className="legal-highlight-card">
          <div className="legal-highlight-card-header">
            <ShieldCheck size={22} />
            <h3>Our Simple Privacy Promise</h3>
          </div>
          <p>
            At <strong>Satvik Delights</strong>, we value your trust. We treat your family and personal event details with the highest respect and care. We only collect the basic information needed to discuss your food menu, plan your celebration, and coordinate our catering service. <strong>We will never sell, rent, or share your personal details with third-party telemarketers or advertisers.</strong>
          </p>
        </div>

        <div className="legal-content-body">
          <div className="legal-section">
            <h3><span className="legal-section-num">1</span> Information We Collect</h3>
            <p>When you contact us by phone, WhatsApp, or through our website booking form, we may collect the following basic details:</p>
            <ul className="legal-list">
              <li><CheckCircle size={16} /> <strong>Contact Details:</strong> Your full name, mobile number, WhatsApp number, and email address.</li>
              <li><CheckCircle size={16} /> <strong>Event Information:</strong> The type of function (Wedding, Ring Ceremony, Birthday, Griha Pravesh Puja, Corporate event), event date, and venue location in Jaipur or Rajasthan.</li>
              <li><CheckCircle size={16} /> <strong>Catering Requirements:</strong> Estimated number of guests, meal choices (lunch, dinner, high-tea), and specific dietary traditions (100% pure Satvik food, Jain food without onion/garlic, live counter preferences).</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">2</span> How We Use Your Information</h3>
            <p>We use your information strictly for legitimate catering and event management purposes:</p>
            <ul className="legal-list">
              <li><CheckCircle size={16} /> To get in touch with you to understand your celebration plan and dietary needs.</li>
              <li><CheckCircle size={16} /> To design custom pure vegetarian menus and schedule food tasting sessions.</li>
              <li><CheckCircle size={16} /> To coordinate on-ground chefs, halwais, live stalls, and banquet staff on your event day.</li>
              <li><CheckCircle size={16} /> To send event confirmations, booking details, and service updates.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">3</span> Sharing of Information</h3>
            <p>
              We do not sell, rent, or trade your personal information with any third party. Your information is only accessible to our core event coordination and catering team (led by Banwari Yadav and Aman Yadav) to ensure your function runs smoothly. We only share necessary logistics details (such as venue directions) with trusted setup crews strictly as required to execute your event.
            </p>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">4</span> Data Protection &amp; Security</h3>
            <p>
              We take appropriate security measures to safeguard your phone numbers and event details from unauthorized access, alteration, or disclosure. All booking records and customer inquiries are handled responsibly.
            </p>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">5</span> Your Rights &amp; Control</h3>
            <p>You have full control over your contact information with us. You can contact us at any time to:</p>
            <ul className="legal-list">
              <li><CheckCircle size={16} /> Ask what personal information we have stored for your event.</li>
              <li><CheckCircle size={16} /> Request corrections or updates to your contact numbers, guest count, or address.</li>
              <li><CheckCircle size={16} /> Request that we delete your inquiry data from our records once your event is completed.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">6</span> Updates to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time to reflect improvements in our services or changes in legal regulations. Any updates will be posted on this page with an updated effective date.
            </p>
          </div>

          {renderLegalContactBox()}
        </div>
      </div>
    </section>
  );

  // 2. Dedicated Terms of Service View
  const renderTermsOfService = () => (
    <section className="legal-page-view">
      <div className="container legal-container">
        <div className="legal-header">
          <div style={{ marginBottom: '1.5rem' }}>
            <button className="btn btn-outline-dark btn-sm" onClick={() => handleNavigation('home')}>
              <ArrowLeft size={16} /> Return to Home
            </button>
          </div>
          <span className="section-tag">LEGAL &amp; AGREEMENT</span>
          <h1 className="section-title">Terms of Service</h1>
          <p className="legal-meta">Last Updated: October 2026 • Satvik Delights — Events &amp; Caterer, Jaipur, Rajasthan</p>
        </div>

        {renderLegalTabs('terms')}

        <div className="legal-highlight-card">
          <div className="legal-highlight-card-header">
            <FileText size={22} />
            <h3>Clear, Fair &amp; Transparent Terms</h3>
          </div>
          <p>
            Welcome to <strong>Satvik Delights</strong>. We take immense pride in our authentic pure vegetarian cuisine and warm Indian hospitality ("Atithi Devo Bhava"). These simple terms describe how we work together with our valued clients to ensure every wedding, birthday, and celebration is executed with perfection.
          </p>
        </div>

        <div className="legal-content-body">
          <div className="legal-section">
            <h3><span className="legal-section-num">1</span> Scope of Our Services</h3>
            <p>
              Satvik Delights provides pure vegetarian catering services, live food counter setups (Chaat, Tandoor, Sweets, Dosa), event planning, and floral/stage decoration services for weddings, corporate meetings, and social gatherings in Janta Colony, Jaipur and across Rajasthan.
            </p>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">2</span> Booking &amp; Date Confirmation</h3>
            <ul className="legal-list">
              <li><CheckCircle size={16} /> An event date is officially confirmed once both parties agree on the event plan and the advance booking arrangement is finalized.</li>
              <li><CheckCircle size={16} /> Due to high demand during auspicious wedding muhurats and festival dates, bookings are accepted on a first-come, first-served basis. We encourage reserving dates well in advance.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">3</span> Food Menu &amp; Guest Count Finalization</h3>
            <ul className="legal-list">
              <li><CheckCircle size={16} /> <strong>100% Pure Vegetarian:</strong> We strictly serve pure vegetarian dishes. Special Jain / Satvik preparation (without onion and garlic) is available upon request.</li>
              <li><CheckCircle size={16} /> <strong>Menu Finalization:</strong> The complete food menu and live counter selections should be finalized at least 7 to 10 days prior to the event date to allow our culinary team to source fresh vegetables, pure desi ghee, and top-grade spices.</li>
              <li><CheckCircle size={16} /> <strong>Guaranteed Guest Count:</strong> The minimum guaranteed guest count must be confirmed prior to the event. Catering preparations and fresh food quantities will be arranged accordingly.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">4</span> Food Quality, Purity &amp; Hygiene Standards</h3>
            <p>
              We maintain uncompromising hygiene standards. Our team cooks in clean, sanitized kitchen setups. All hot dishes are served using premium warmers and chafing dishes, and live counter staff follow proper hygiene protocols (clean aprons, caps, and gloves).
            </p>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">5</span> Venue Facilities &amp; Client Cooperation</h3>
            <p>To ensure smooth service, the client agrees to provide or arrange:</p>
            <ul className="legal-list">
              <li><CheckCircle size={16} /> Timely access to the event venue for our kitchen setup, decor setup, and service staff.</li>
              <li><CheckCircle size={16} /> A clean cooking and staging area with adequate lighting, safe electricity points for live stalls, and clean running water supply.</li>
              <li><CheckCircle size={16} /> A designated coordinator from the family or company to liaise with our event manager on the day of the function.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">6</span> Date Changes &amp; Rescheduling</h3>
            <p>
              We understand that unforeseen family circumstances, weather conditions, or venue changes may arise. In such cases:
            </p>
            <ul className="legal-list">
              <li><CheckCircle size={16} /> Please notify our team as early as possible if you need to reschedule your event date.</li>
              <li><CheckCircle size={16} /> We will do our absolute best to accommodate your new date based on calendar and team availability.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">7</span> Mutual Respect &amp; Hospitality</h3>
            <p>
              We believe in the sacred tradition of <em>"Atithi Devo Bhava"</em> (Guest is God). Our service captains, servers, and chefs are trained to serve every guest with courtesy, patience, and warmth. We kindly request the same respect and cooperation for our hard-working team at the venue.
            </p>
          </div>

          {renderLegalContactBox()}
        </div>
      </div>
    </section>
  );

  // 3. Dedicated Cookie Policy View
  const renderCookiePolicy = () => (
    <section className="legal-page-view">
      <div className="container legal-container">
        <div className="legal-header">
          <div style={{ marginBottom: '1.5rem' }}>
            <button className="btn btn-outline-dark btn-sm" onClick={() => handleNavigation('home')}>
              <ArrowLeft size={16} /> Return to Home
            </button>
          </div>
          <span className="section-tag">TRANSPARENCY &amp; PRIVACY</span>
          <h1 className="section-title">Cookie Policy</h1>
          <p className="legal-meta">Last Updated: October 2026 • Satvik Delights — Events &amp; Caterer, Jaipur, Rajasthan</p>
        </div>

        {renderLegalTabs('cookies')}

        <div className="legal-highlight-card">
          <div className="legal-highlight-card-header">
            <Cookie size={22} />
            <h3>What This Cookie Policy Covers</h3>
          </div>
          <p>
            This Cookie Policy explains in plain and simple English how <strong>Satvik Delights</strong> uses cookies and local browser storage on our website. We keep things simple, transparent, and respectful of your browsing privacy.
          </p>
        </div>

        {/* Interactive Cookie Preference Manager Box */}
        <div className="cookie-preference-box">
          <div>
            <div className="cookie-status-indicator">
              Current Cookie Status: 
              <span className={`cookie-status-badge ${cookieConsent === 'accepted' ? 'accepted' : cookieConsent === 'declined' ? 'declined' : 'default'}`}>
                {cookieConsent === 'accepted' ? 'Accepted' : cookieConsent === 'declined' ? 'Declined' : 'Not Set (Default)'}
              </span>
            </div>
            <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.85rem', color: 'var(--color-gray-dark)' }}>
              You can update or change your cookie choices for this device at any time.
            </p>
          </div>
          <div className="cookie-pref-actions">
            <button 
              type="button"
              className={`btn btn-sm ${cookieConsent === 'accepted' ? 'btn-gold' : 'btn-outline-dark'}`}
              onClick={() => handleCookieChoice('accepted')}
            >
              <CheckCircle size={14} /> Accept Cookies
            </button>
            <button 
              type="button"
              className={`btn btn-sm ${cookieConsent === 'declined' ? 'btn-gold' : 'btn-outline-dark'}`}
              onClick={() => handleCookieChoice('declined')}
            >
              <X size={14} /> Decline Non-Essential
            </button>
          </div>
        </div>

        <div className="legal-content-body">
          <div className="legal-section">
            <h3><span className="legal-section-num">1</span> What is a Cookie?</h3>
            <p>
              A cookie is a small text file saved on your computer, tablet, or smartphone when you visit a website. Cookies allow the website to recognize your device and remember your settings (such as dark mode preference or keeping an inquiry form filled while you browse), making your visit faster and more convenient.
            </p>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">2</span> How We Use Cookies</h3>
            <p>We use only limited and essential cookies on this website. Here is how they work:</p>
            <ul className="legal-list">
              <li>
                <CheckCircle size={16} />
                <div>
                  <strong>Essential &amp; Preference Cookies:</strong> These cookies remember your display choices (such as whether you turned on Dark Mode) and store your cookie consent preference so the cookie banner does not keep bothering you.
                </div>
              </li>
              <li>
                <CheckCircle size={16} />
                <div>
                  <strong>Inquiry Form Session Storage:</strong> When you navigate between steps in our booking inquiry wizard, local browser storage temporarily keeps your selected event type and guest count so you do not have to retype them if you navigate back.
                </div>
              </li>
              <li>
                <CheckCircle size={16} />
                <div>
                  <strong>Anonymous Performance Analytics:</strong> These help us understand which of our catering services (such as Wedding Catering or Live Chaat counters) are most popular so we can improve our menu offerings.
                </div>
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">3</span> What We Never Do</h3>
            <ul className="legal-list">
              <li><CheckCircle size={16} /> We do NOT use third-party advertising tracking cookies that follow you around the internet.</li>
              <li><CheckCircle size={16} /> We do NOT sell or share your browsing activity with any data brokerage or marketing company.</li>
              <li><CheckCircle size={16} /> We do NOT store sensitive personal or financial details inside cookies.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">4</span> How You Can Manage or Block Cookies</h3>
            <p>You have full control over cookies:</p>
            <ul className="legal-list">
              <li><CheckCircle size={16} /> Use the interactive preference buttons above on this page to Accept or Decline cookies anytime.</li>
              <li><CheckCircle size={16} /> Most modern web browsers (Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge) allow you to block or delete cookies from your browser settings menu.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3><span className="legal-section-num">5</span> Contact Us</h3>
            <p>
              If you have any questions about our use of cookies or privacy practices, please contact us.
            </p>
          </div>

          {renderLegalContactBox()}
        </div>
      </div>
    </section>
  );

  return (
    <>
      {/* Custom Luxury Cursor */}
      <div 
        className={`custom-cursor ${cursorHover ? 'hover' : ''}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <div 
        className="custom-cursor-dot"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* Page Reveal Loader */}
      {loaderVisible && (
        <div className="page-reveal-loader" id="pageLoader">
          <div className="loader-content">
            <img src={satvikLogo} alt="Satvik Delights - Events & Caterer" className="loader-logo-img" />
            <div className="loader-line-container">
              <div className="loader-line"></div>
            </div>
            <p className="loader-tagline">We Plan • We Design • We Deliver Memories</p>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }} onMouseEnter={() => setCursorHover(true)} onMouseLeave={() => setCursorHover(false)} aria-label="Satvik Delights - Events & Caterer">
            <img src={satvikLogo} alt="Satvik Delights - Events & Caterer" className="logo-img" />
          </a>
          
          <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <a 
              href="#home" 
              className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
              onClick={() => handleNavigation('home')}
              onMouseEnter={() => setCursorHover(true)} 
              onMouseLeave={() => setCursorHover(false)}
            >
              Home
            </a>
            <a 
              href="#about" 
              className={`nav-link ${activeLink === 'about' || currentPage === 'about-page' ? 'active' : ''}`}
              onClick={() => handleNavigation('about-page')}
              onMouseEnter={() => setCursorHover(true)} 
              onMouseLeave={() => setCursorHover(false)}
            >
              About
            </a>
            <a 
              href="#services" 
              className={`nav-link ${activeLink === 'services' || currentPage === 'services-page' ? 'active' : ''}`}
              onClick={() => handleNavigation('services-page')}
              onMouseEnter={() => setCursorHover(true)} 
              onMouseLeave={() => setCursorHover(false)}
            >
              Services
            </a>
            <a 
              href="#menu" 
              className={`nav-link ${activeLink === 'menu' ? 'active' : ''}`}
              onClick={() => handleNavigation('menu')}
              onMouseEnter={() => setCursorHover(true)} 
              onMouseLeave={() => setCursorHover(false)}
            >
              Menu
            </a>
            <a 
              href="#gallery" 
              className={`nav-link ${activeLink === 'gallery' ? 'active' : ''}`}
              onClick={() => handleNavigation('gallery')}
              onMouseEnter={() => setCursorHover(true)} 
              onMouseLeave={() => setCursorHover(false)}
            >
              Gallery
            </a>
            <a 
              href="#blog" 
              className={`nav-link ${activeLink === 'blog' || currentPage.startsWith('blog-') ? 'active' : ''}`}
              onClick={() => handleNavigation('blog')}
              onMouseEnter={() => setCursorHover(true)} 
              onMouseLeave={() => setCursorHover(false)}
            >
              Insights
            </a>
            <a 
              href="#contact" 
              className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavigation('contact')}
              onMouseEnter={() => setCursorHover(true)} 
              onMouseLeave={() => setCursorHover(false)}
            >
              Contact
            </a>
          </nav>

          <div className="nav-actions">
            <a href="tel:+919413345428" className="btn btn-outline btn-nav" onMouseEnter={() => setCursorHover(true)} onMouseLeave={() => setCursorHover(false)}>
              Call Now
            </a>
            <button 
              className="mobile-toggle" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onMouseEnter={() => setCursorHover(true)} 
              onMouseLeave={() => setCursorHover(false)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- Dynamic Content Rendering (Routing) --- */}
      {currentPage === 'home' && (
        <>
          {/* Redesigned Hero Section (Ultra-Modern Premium Layout) */}
          <section className="hero-section" id="home">
            <div className="container hero-container">
              <div className="hero-content">
                <span className="hero-subtitle">WE PLAN • WE DESIGN • WE DELIVER MEMORIES</span>
                <h1 className="hero-title-modern">
                  <span className="serif-italic-gold">Royal Weddings</span> &amp;<br />
                  <span className="sans-bold-dark">Pure Veg Catering</span>
                </h1>
                <p className="hero-desc">
                  We plan, we design, we deliver memories. Providing premier wedding &amp; engagement planning, royal pure veg catering, corporate events, and social gatherings in Janta Colony, Jaipur, Rajasthan.
                </p>
                <div className="hero-ctas">
                  <a href="#contact" className="btn btn-gold btn-glow" onClick={() => handleNavigation('contact')} onMouseEnter={() => setCursorHover(true)} onMouseLeave={() => setCursorHover(false)}>
                    Book Your Event
                  </a>
                  <a href="tel:+919413345428" className="btn btn-outline-dark" onMouseEnter={() => setCursorHover(true)} onMouseLeave={() => setCursorHover(false)}>
                    Call: +91 9413345428
                  </a>
                </div>
              </div>

              <div className="hero-media-composition">
                {/* Rotating Brand Seal */}
                <div className="rotating-badge-container">
                  <svg viewBox="0 0 100 100" className="rotating-svg">
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                    <text fontValues="7" fill="var(--color-gold-dark)" letterSpacing="1.8" style={{ fontSize: '5.8px', fontWeight: '500', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
                      <textPath href="#circlePath">
                        • WE PLAN • WE DESIGN • WE DELIVER MEMORIES •
                      </textPath>
                    </text>
                  </svg>
                </div>

                <div className="hero-media-card main-media">
                  <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=850" alt="Royal Indian wedding banquet setup" />
                  <div className="media-border-gilded"></div>
                  
                  {/* Floating modern pill badge */}
                  <div className="modern-badge-pill">
                    <Sparkles size={14} style={{ color: 'var(--color-gold-dark)' }} />
                    <span>100% Pure Desi Ghee</span>
                  </div>
                </div>
                
                <div className="hero-media-card secondary-media" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
                  <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=650" alt="Authentic Indian catering service" />
                  <div className="media-badge-glass">
                    <span className="badge-tag">Royal Indian Zaika</span>
                    <span className="badge-title">Awadhi &amp; Rajasthani Feasts</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="scroll-indicator">
              <span className="scroll-text">Scroll to explore</span>
              <div className="scroll-dot"></div>
            </div>
          </section>

          {/* Trust Bar */}
          <section className="trust-bar" ref={trustSectionRef}>
            <div className="container trust-container">
              <div className="trust-item">
                <h4 className="trust-number">{counters.events}+</h4>
                <p className="trust-label">Events Served</p>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <h4 className="trust-number">{counters.menus}+</h4>
                <p className="trust-label">Custom Menus Designed</p>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <h4 className="trust-number">{counters.chefs}+</h4>
                <p className="trust-label">Gourmet Chefs Team</p>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <h4 className="trust-number">{counters.executions}%</h4>
                <p className="trust-label">Hygienic Execution</p>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="about-section" id="about">
            <div className="container grid-2">
              <div className="about-images">
                <div className="image-wrapper main-img">
                  <img 
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" 
                    alt="Michelin style plating close up" 
                    className="scroll-parallax"
                    style={{ transform: `translateY(${(scrollY - 1000) * 0.05}px)` }}
                  />
                </div>
                <div className="image-wrapper secondary-img">
                  <img 
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600" 
                    alt="Luxury tablescape decor" 
                    className="scroll-parallax-reverse"
                    style={{ transform: `translateY(${(scrollY - 1000) * -0.04}px)` }}
                  />
                </div>
                <div className="about-stamp">
                  <div className="stamp-inner">
                    <span>EST. 2012 • ARTISAN CATERING</span>
                  </div>
                </div>
              </div>
              
              <div className="about-content">
                <span className="section-tag">OUR TRADITION</span>
                <h2 className="section-title">Serving Royal Feasts with Pure Indian Hospitality</h2>
                <p className="section-desc">
                  At Satvik Delights, we believe in the sacred tradition of 'Atithi Devo Bhava' — treating every guest as God. For over 15 years, we have been preparing authentic pure vegetarian food with pure desi ghee and fresh ingredients for grand Indian weddings, family functions, and celebrations.
                </p>

                <div className="about-pillars">
                  <div className="pillar-item">
                    <div className="pillar-icon-box">
                      <Award />
                    </div>
                    <div>
                      <h3>Authentic Traditional Taste</h3>
                      <p>Time-tested recipes from Awadh, Rajasthan, Punjab, Gujarat, and South India prepared by experienced master chefs.</p>
                    </div>
                  </div>

                  <div className="pillar-item">
                    <div className="pillar-icon-box">
                      <Gem />
                    </div>
                    <div>
                      <h3>100% Pure Desi Ghee &amp; Satvik</h3>
                      <p>We use only fresh vegetables, pure dairy, and cold-pressed oils. Special Satvik and Jain food without onion-garlic is always available.</p>
                    </div>
                  </div>
                </div>

                <div className="about-quotes">
                  <blockquote>
                    "In our Indian culture, serving food is love, blessing, and tradition. We serve every plate with pure devotion and respect."
                    <cite>— Maharaj Ramdas Sharma, Head Culinary Master</cite>
                  </blockquote>
                </div>
                
                <button className="btn btn-outline" onClick={() => setCurrentPage('about-page')} style={{ marginTop: '2rem' }}>
                  Read Our Story &amp; Heritage
                </button>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="services-section" id="services">
            <div className="container text-center">
              <span className="section-tag">OUR SERVICES</span>
              <h2 className="section-title">Catering &amp; Event Services for Every Celebration</h2>
              <p className="section-lead">From grand royal wedding feasts to family celebrations and pujas, we make every occasion special with delicious food and traditional hospitality.</p>
            </div>

            <div className="container grid-3 services-grid">
              {SERVICES.map(service => {
                let cardRef = null;
                return (
                  <div 
                    key={service.id} 
                    ref={el => cardRef = el}
                    className="service-card reveal-card"
                    onMouseMove={(e) => handleCardMouseMove(e, cardRef)}
                    onMouseLeave={() => handleCardMouseLeave(cardRef)}
                    onClick={() => setCurrentPage(service.id)}
                  >
                    <div className="card-img-holder">
                      <img src={service.img} alt={service.title} />
                    </div>
                    <div className="card-body">
                      <div className="service-icon"><service.icon /></div>
                      <h3>{service.title}</h3>
                      <p>{service.desc}</p>
                      <button className="card-cta" style={{ cursor: 'pointer' }}>
                        View Details <ChevronRight />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Why Choose Us Bento Grid */}
          <section className="why-choose-us" id="why-choose">
            <div className="container text-center">
              <span className="section-tag">WHY CHOOSE US</span>
              <h2 className="section-title">Pure Taste, High Hygiene &amp; Royal Hospitality</h2>
              <p className="section-lead">Every little detail matters in an Indian family celebration. Discover why families trust Satvik Delights.</p>
            </div>

            <div className="container bento-grid">
              {/* Row 1: Span 2 + Span 1 = 3 cols */}
              <div className="bento-card bento-wide reveal-card">
                <div className="bento-text">
                  <span className="bento-badge">CULINARY MASTERS</span>
                  <h3>Royal Maharaj &amp; Head Chefs</h3>
                  <p>Our kitchens are led by traditional culinary masters and master halwais with over 20 years of experience in royal Rajasthani, Awadhi, and North Indian wedding feasts and pure desi ghee sweets.</p>
                </div>
                <div className="bento-img-frame">
                  <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800" alt="Royal Maharaj Head Chef" />
                </div>
              </div>

              <div className="bento-card reveal-card">
                <div>
                  <span className="bento-badge">PURITY GUARANTEE</span>
                  <h3>100% Pure Desi Ghee &amp; Veg</h3>
                  <p>We cook exclusively with pure cow desi ghee, fresh daily milk paneer, and handpicked spices. Dedicated Satvik and Jain food options available with complete devotion.</p>
                </div>
                <div className="bento-card-bottom">
                  <span className="bento-mini-tag">Pure Cow Ghee</span>
                  <div className="bento-icon"><Leaf /></div>
                </div>
              </div>

              {/* Row 2: Span 1 + Span 1 + Span 1 = 3 cols */}
              <div className="bento-card reveal-card">
                <div>
                  <span className="bento-badge">ROYAL SETUP</span>
                  <h3>Royal Table Presentation</h3>
                  <p>Food served in traditional brass and copper vessels with royal dining setup, fresh floral arrangements, velvet linens, and warm lights.</p>
                </div>
                <div className="bento-card-bottom">
                  <span className="bento-mini-tag">Traditional Ware</span>
                  <div className="bento-icon"><Eye /></div>
                </div>
              </div>

              <div className="bento-card reveal-card">
                <div>
                  <span className="bento-badge">TIMELINESS</span>
                  <h3>Punctual &amp; Prompt Service</h3>
                  <p>All live counters, welcome drinks, and hot dishes are ready and served precisely on time, honoring your auspicious wedding muhurat and event schedule.</p>
                </div>
                <div className="bento-card-bottom">
                  <span className="bento-mini-tag">On-Time Always</span>
                  <div className="bento-icon"><Clock /></div>
                </div>
              </div>

              <div className="bento-card reveal-card">
                <div>
                  <span className="bento-badge">HOSPITALITY</span>
                  <h3>Courteous &amp; Polite Staff</h3>
                  <p>Our service staff is well-dressed and trained in traditional Indian hospitality — 'Atithi Devo Bhava' — attending to all elders and guests with warmth and respect.</p>
                </div>
                <div className="bento-card-bottom">
                  <span className="bento-mini-tag">Atithi Devo Bhava</span>
                  <div className="bento-icon"><Heart /></div>
                </div>
              </div>

              {/* Row 3: Span 2 + Span 1 = 3 cols */}
              <div className="bento-card bento-wide reveal-card">
                <div className="bento-text">
                  <span className="bento-badge">HYGIENE &amp; SAFETY</span>
                  <h3>Clean &amp; Sanitized Kitchens</h3>
                  <p>We maintain strict food safety and hygiene. Our cooking areas, live stalls, and serving counters are cleaned continuously to guarantee fresh, healthy, and safe food for all your guests.</p>
                </div>
                <div className="bento-img-frame">
                  <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" alt="Clean Sanitized Kitchens" />
                </div>
              </div>

              <div className="bento-card reveal-card">
                <div>
                  <span className="bento-badge">OUR MOTTO</span>
                  <h3>Memories Delivered with Love</h3>
                  <p>Over 500+ successful celebrations in Jaipur &amp; Rajasthan. Personal event care from Banwari Yadav and Aman Yadav for your big family day.</p>
                </div>
                <div className="bento-card-bottom">
                  <span className="bento-mini-tag">★★★★★ 5-Star Service</span>
                  <div className="bento-icon"><ShieldCheck /></div>
                </div>
              </div>
            </div>
          </section>

          {/* Event Categories Showcase */}
          <section className="event-categories">
            <div className="container text-center">
              <span className="section-tag">EVENT CELEBRATIONS</span>
              <h2 className="section-title">Grand Celebrations &amp; Themes</h2>
              <p className="section-lead">Explore our wedding themes, mandap setups, and traditional decorations for memorable family gatherings.</p>
            </div>

            <div className="categories-carousel-container">
              <div className="categories-grid">
                {EVENT_CATEGORIES.map(category => (
                  <div key={category.id} className="category-card reveal-card" onClick={() => setCurrentPage(category.id)} style={{ cursor: 'pointer' }}>
                    <img src={category.img} alt={category.title} />
                    <div className="category-overlay">
                      <span className="category-sub">{category.sub}</span>
                      <h3>{category.title}</h3>
                      <p>{category.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Menu Showcase */}
          <section className="menu-experience" id="menu">
            <div className="container text-center">
              <span className="section-tag">TRADITIONAL FOOD &amp; SWEETS</span>
              <h2 className="section-title">Our Pure Veg Food Menu</h2>
              <p className="section-lead">Freshly cooked food prepared with pure desi ghee and rich Indian spices by our expert halwais and chefs.</p>
              
              <div className="menu-filters-container">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'starters', label: 'Starters & Snacks' },
                  { id: 'mains', label: 'Main Course' },
                  { id: 'indian', label: 'Breads & Tandoor' },
                  { id: 'continental', label: 'Chinese & Continental' },
                  { id: 'desserts', label: 'Mithai & Sweets' },
                  { id: 'beverages', label: 'Drinks & Shakes' },
                  { id: 'live-counters', label: 'Live Chaat & Stalls' }
                ].map(filter => (
                  <button 
                    key={filter.id} 
                    className={`menu-filter-btn ${menuFilter === filter.id ? 'active' : ''}`}
                    onClick={() => setMenuFilter(filter.id)}
                    onMouseEnter={() => setCursorHover(true)} 
                    onMouseLeave={() => setCursorHover(false)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="container grid-3 menu-items-grid">
              {DISHES.filter(dish => menuFilter === 'all' || dish.category === menuFilter).map(dish => (
                <div key={dish.id} className="menu-dish-card reveal-card">
                  <div className="dish-img-wrapper">
                    <img src={dish.img} alt={dish.title} />
                    {dish.tag && <span className="dish-badge">{dish.tag}</span>}
                  </div>
                  <div className="dish-info">
                    <div className="dish-meta">
                      <h3>{dish.title}</h3>
                      <span className={`dish-type ${dish.isVeg ? 'veg' : dish.category === 'beverages' ? 'beverage' : 'non-veg'}`}>
                        <CircleDot /> {dish.type}
                      </span>
                    </div>
                    <p className="dish-desc">{dish.desc}</p>
                    <div className="dish-footer">
                      <span className="dish-pair">{dish.pair}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Masonry Gallery */}
          <section className="gallery-section" id="gallery">
            <div className="container text-center">
              <span className="section-tag">PHOTO GALLERY</span>
              <h2 className="section-title">Our Event &amp; Catering Photos</h2>
              <p className="section-lead">Take a look at our royal wedding stages, live food counters, and happy family moments.</p>
            </div>

            <div className="container masonry-gallery">
              {GALLERY_ITEMS.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="masonry-item reveal-card" 
                  onClick={() => setLightbox({ isOpen: true, index: idx })}
                  onMouseEnter={() => setCursorHover(true)} 
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <img src={item.thumb} alt={item.title} />
                  <div className="item-overlay">
                    <span className="overlay-tag">{item.tag}</span>
                    <h4>{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lightbox Modal */}
          {lightbox.isOpen && (
            <div className="lightbox active" onClick={() => setLightbox(prev => ({ ...prev, isOpen: false }))}>
              <button className="lightbox-close" onClick={() => setLightbox(prev => ({ ...prev, isOpen: false }))}>&times;</button>
              <button 
                className="lightbox-nav lightbox-prev" 
                onClick={(e) => { e.stopPropagation(); handleLightboxNav(-1); }}
                onMouseEnter={() => setCursorHover(true)} 
                onMouseLeave={() => setCursorHover(false)}
              >
                &#10094;
              </button>
              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img src={GALLERY_ITEMS[lightbox.index].img} alt={GALLERY_ITEMS[lightbox.index].title} />
                <p className="lightbox-caption">{GALLERY_ITEMS[lightbox.index].title}</p>
              </div>
              <button 
                className="lightbox-nav lightbox-next" 
                onClick={(e) => { e.stopPropagation(); handleLightboxNav(1); }}
                onMouseEnter={() => setCursorHover(true)} 
                onMouseLeave={() => setCursorHover(false)}
              >
                &#10095;
              </button>
            </div>
          )}

          {/* Testimonials Carousel Section */}
          <section className="testimonials-section">
            <div className="container text-center">
              <span className="section-tag">CUSTOMER REVIEWS</span>
              <h2 className="section-title">What Our Guests Say</h2>
              <p className="section-lead">Read how families and corporate clients loved our food, hospitality, and arrangements.</p>
            </div>

            <div className="container testimonials-wrapper">
              <div 
                className="testimonials-slider" 
                style={{ transform: `translateX(-${testimonialIdx * 100}%)` }}
              >
                {TESTIMONIALS.map(t => (
                  <div key={t.id} className="testimonial-card">
                    <div className="client-meta">
                      <img src={t.img} alt={t.name} className="client-avatar" />
                      <div>
                        <h4>{t.name}</h4>
                        <span className="client-event">{t.event}</span>
                      </div>
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="fill-gold" />
                        ))}
                      </div>
                    </div>
                    <p className="testimonial-text">{t.text}</p>
                  </div>
                ))}
              </div>

              <div className="slider-controls">
                <button 
                  className="slider-btn prev" 
                  onClick={() => setTestimonialIdx(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  onMouseEnter={() => setCursorHover(true)} 
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <ChevronLeft />
                </button>
                <button 
                  className="slider-btn next" 
                  onClick={() => setTestimonialIdx(prev => (prev + 1) % TESTIMONIALS.length)}
                  onMouseEnter={() => setCursorHover(true)} 
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="process-section">
            <div className="container text-center">
              <span className="section-tag">HOW WE WORK</span>
              <h2 className="section-title">Easy 5-Step Process</h2>
              <p className="section-lead">From your first call to the last dessert served, we handle everything with care.</p>
            </div>

            <div className="container grid-5 process-grid">
              {[
                { step: "01", title: "Talk to Us", desc: "Tell us your event date, expected guest count, and venue location." },
                { step: "02", title: "Choose Menu & Sweets", desc: "Pick your favorite pure ghee sabzis, live chaat stalls, and mithai." },
                { step: "03", title: "Confirm Details", desc: "We finalize your custom menu, setup timing, and serving arrangements." },
                { step: "04", title: "Live Setup & Cooking", desc: "Our halwais, chefs, and service team arrive early to prepare fresh food." },
                { step: "05", title: "Enjoy With Guests", desc: "Sit back, enjoy delicious hot meals, and celebrate with your family." }
              ].map((item, idx) => (
                <div key={idx} className="process-card reveal-card">
                  <div className="step-num">{item.step}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Conversion CTA Section */}
          <section className="conversion-cta">
            <div className="cta-overlay-glow"></div>
            <div className="container text-center relative-z">
              <span className="cta-badge">WE PLAN • WE DESIGN • WE DELIVER MEMORIES</span>
              <h2 className="cta-headline">Planning an Event in Jaipur or Rajasthan?</h2>
              <p className="cta-subtext">Contact Banwari Yadav (+91 9413345428) or Aman Yadav (+91 8079085977) to discuss your food menu, decor, and event arrangements.</p>
              <div className="cta-actions">
                <a href="#contact" className="btn btn-gold btn-glow" onClick={() => handleNavigation('contact')} onMouseEnter={() => setCursorHover(true)} onMouseLeave={() => setCursorHover(false)}>
                  Request a Quote
                </a>
                <a 
                  href="https://wa.me/919413345428" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline"
                  onMouseEnter={() => setCursorHover(true)} 
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <Phone /> WhatsApp Us
                </a>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="faq-section">
            <div className="container grid-2">
              <div>
                <span className="section-tag">COMMON QUESTIONS</span>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-desc">Got questions about our food, catering, or event booking? Here are quick answers. You can also call us directly.</p>
                <a href="#contact" className="btn btn-outline-dark" onClick={() => handleNavigation('contact')} onMouseEnter={() => setCursorHover(true)} onMouseLeave={() => setCursorHover(false)}>
                  Ask a Question
                </a>
              </div>

              <div className="faq-accordion">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className={`faq-item ${faqIdx === idx ? 'active' : ''}`}>
                    <button 
                      className="faq-trigger" 
                      onClick={() => setFaqIdx(prev => prev === idx ? null : idx)}
                      onMouseEnter={() => setCursorHover(true)} 
                      onMouseLeave={() => setCursorHover(false)}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown />
                    </button>
                    <div 
                      className="faq-panel"
                      style={{ maxHeight: faqIdx === idx ? '200px' : '0px' }}
                    >
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Editorial Blog Section */}
          <section className="blog-section" id="blog">
            <div className="container text-center">
              <span className="section-tag">OUR BLOG &amp; STORIES</span>
              <h2 className="section-title">Indian Wedding &amp; Food Guides</h2>
              <p className="section-lead">Helpful tips and guides on choosing wedding menus, live chaat stalls, and planning great family events.</p>
            </div>

            <div className="container grid-3 blog-grid">
              {BLOG_ARTICLES.map((article) => (
                <div key={article.id} className="blog-card reveal-card" onClick={() => setCurrentPage(article.id)} style={{ cursor: 'pointer' }}>
                  <div className="blog-img-holder">
                    <img src={article.img} alt={article.title} />
                  </div>
                  <div className="blog-body">
                    <span className="blog-date">{article.date}</span>
                    <h3>{article.title}</h3>
                    <p>{article.desc}</p>
                    <button className="blog-read-more" style={{ cursor: 'pointer' }}>
                      Read More <ArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="contact-section" id="contact">
            <div className="container grid-2">
              <div className="contact-info">
                <span className="section-tag">GET IN TOUCH</span>
                <h2 className="section-title">Book Your Catering &amp; Event</h2>
                <p className="section-desc">Talk to our team about your upcoming event. We will help you select the best pure veg menu and provide a quick estimate.</p>

                <div className="info-list">
                  <div className="info-item">
                    <Phone />
                    <div>
                      <span>Call &amp; WhatsApp (Founders)</span>
                      <a href="tel:+919413345428" className="info-link">+91 9413345428 <span style={{ fontSize: '0.85rem', color: 'var(--color-gray-dark)', fontWeight: 400 }}>(Banwari Yadav)</span></a>
                      <a href="tel:+918079085977" className="info-link" style={{ marginTop: '0.4rem' }}>+91 8079085977 <span style={{ fontSize: '0.85rem', color: 'var(--color-gray-dark)', fontWeight: 400 }}>(Aman Yadav)</span></a>
                    </div>
                  </div>
                  <div className="info-item">
                    <Mail />
                    <div>
                      <span>Official Email</span>
                      <a href="mailto:satvikdelightcaterers@gmail.com" className="info-link">satvikdelightcaterers@gmail.com</a>
                    </div>
                  </div>
                  <div className="info-item">
                    <MapPin />
                    <div>
                      <span>Office &amp; Address</span>
                      <span className="info-text">Janta Colony, Jaipur, Rajasthan</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <CalendarDays />
                    <div>
                      <span>Visiting Hours</span>
                      <span className="info-text">Mon - Sun: 09:00 AM - 09:00 PM IST</span>
                    </div>
                  </div>
                </div>

                <div className="map-placeholder">
                  <iframe 
                    title="Satvik Delights Jaipur Map Location"
                    src="https://maps.google.com/maps?q=Janta%20Colony,%20Jaipur,%20Rajasthan,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div className="map-overlay-badge">
                    <div className="map-overlay-info">
                      <MapPin size={20} />
                      <div>
                        <span>Janta Colony, Jaipur, Rajasthan</span>
                        <small>We Plan • We Design • We Deliver Memories</small>
                      </div>
                    </div>
                    <a 
                      href="https://maps.google.com/?q=Janta+Colony,+Jaipur,+Rajasthan,+India" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-gold btn-sm"
                      style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem' }}
                      onMouseEnter={() => setCursorHover(true)} 
                      onMouseLeave={() => setCursorHover(false)}
                    >
                      Open in Maps <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Booking Form Wizard */}
              <div className="contact-form-card" id="formCard">
                <h3 className="form-title">Book Catering &amp; Events</h3>
                <p className="form-subtitle">Fill in your event details below to get a quick callback and quote.</p>
                
                {!formSuccess ? (
                  <form onSubmit={handleFormSubmit}>
                    {/* Step 1: Event Details */}
                    <div className={`form-step ${formStep === 1 ? 'active' : ''}`}>
                      <div className="step-badge">Step 1 of 3: Event Details</div>
                      
                      <div className="form-group">
                        <label htmlFor="eventType">What event are you planning? *</label>
                        <select id="eventType" name="eventType" value={formData.eventType} onChange={handleInputChange} required>
                          <option value="" disabled>Select event type...</option>
                          <option value="wedding">Wedding &amp; Engagements</option>
                          <option value="birthday">Birthday Parties</option>
                          <option value="corporate">Corporate Events</option>
                          <option value="private">Social Gatherings (Griha Pravesh &amp; Pujas)</option>
                          <option value="buffet">Catering Service (Royal Buffet &amp; Live Stalls)</option>
                          <option value="other">Other Family Celebration</option>
                        </select>
                      </div>

                      <div className="grid-2-form">
                        <div className="form-group">
                          <label htmlFor="eventDate">Event Date *</label>
                          <input type="date" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="guestCount">Estimated Guests *</label>
                          <input type="number" id="guestCount" name="guestCount" placeholder="e.g. 250" min="10" value={formData.guestCount} onChange={handleInputChange} required />
                        </div>
                      </div>

                      <button 
                        type="button" 
                        className="btn btn-gold btn-full btn-next" 
                        onClick={handleNextStep}
                        onMouseEnter={() => setCursorHover(true)} 
                        onMouseLeave={() => setCursorHover(false)}
                      >
                        Next: Food &amp; Decor <ArrowRight />
                      </button>
                    </div>

                    {/* Step 2: Custom Preferences */}
                    <div className={`form-step ${formStep === 2 ? 'active' : ''}`}>
                      <div className="step-badge">Step 2 of 3: Food &amp; Decor Setup</div>

                      <div className="form-group">
                        <label>Food &amp; Catering Style (Select all that apply)</label>
                        <div className="checkbox-group">
                          <label className="checkbox-label">
                            <input type="checkbox" name="diningStyles" value="plated" checked={formData.diningStyles.includes('plated')} onChange={handleCheckboxChange} /> Royal Sit-Down Dinner (Pangat)
                          </label>
                          <label className="checkbox-label">
                            <input type="checkbox" name="diningStyles" value="buffet" checked={formData.diningStyles.includes('buffet')} onChange={handleCheckboxChange} /> Grand Royal Buffet
                          </label>
                          <label className="checkbox-label">
                            <input type="checkbox" name="diningStyles" value="live-counters" checked={formData.diningStyles.includes('live-counters')} onChange={handleCheckboxChange} /> Live Chaat &amp; Stalls
                          </label>
                          <label className="checkbox-label">
                            <input type="checkbox" name="diningStyles" value="mixology" checked={formData.diningStyles.includes('mixology')} onChange={handleCheckboxChange} /> Welcome Drinks &amp; Thandai Bar
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="decorRequired">Do you also need flower and stage decoration? *</label>
                        <select id="decorRequired" name="decorRequired" value={formData.decorRequired} onChange={handleInputChange} required>
                          <option value="" disabled>Choose option...</option>
                          <option value="yes">Yes, need full flower decoration and stage setup</option>
                          <option value="no">No, catering food only</option>
                          <option value="discuss">Will discuss on phone call</option>
                        </select>
                      </div>

                      <div className="form-actions-step">
                        <button 
                          type="button" 
                          className="btn btn-outline-dark btn-prev" 
                          onClick={handlePrevStep}
                          onMouseEnter={() => setCursorHover(true)} 
                          onMouseLeave={() => setCursorHover(false)}
                        >
                          <ArrowLeft /> Back
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-gold btn-next" 
                          onClick={handleNextStep}
                          onMouseEnter={() => setCursorHover(true)} 
                          onMouseLeave={() => setCursorHover(false)}
                        >
                          Next: Contact Details <ArrowRight />
                        </button>
                      </div>
                    </div>

                    {/* Step 3: Contact details */}
                    <div className={`form-step ${formStep === 3 ? 'active' : ''}`}>
                      <div className="step-badge">Step 3 of 3: Your Contact Details</div>

                      <div className="form-group">
                        <label htmlFor="fullName">Your Full Name *</label>
                        <input type="text" id="fullName" name="fullName" placeholder="e.g. Rajesh Sharma" value={formData.fullName} onChange={handleInputChange} required />
                      </div>

                      <div className="grid-2-form">
                        <div className="form-group">
                          <label htmlFor="email">Email Address *</label>
                          <input type="email" id="email" name="email" placeholder="e.g. rajesh.sharma@gmail.com" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Phone Number *</label>
                          <input type="tel" id="phone" name="phone" placeholder="e.g. +91 98101 23456" value={formData.phone} onChange={handleInputChange} required />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="customRequests">Special Food Requests (Jain food, no onion-garlic, live sweets, etc.)</label>
                        <textarea id="customRequests" name="customRequests" placeholder="Write any specific requirements like Jain food, extra live counters, or venue details..." rows="3" value={formData.customRequests} onChange={handleInputChange}></textarea>
                      </div>

                      <div className="form-actions-step">
                        <button 
                          type="button" 
                          className="btn btn-outline-dark btn-prev" 
                          onClick={handlePrevStep}
                          onMouseEnter={() => setCursorHover(true)} 
                          onMouseLeave={() => setCursorHover(false)}
                        >
                          <ArrowLeft /> Back
                        </button>
                        <button 
                          type="submit" 
                          className="btn btn-gold btn-glow"
                          onMouseEnter={() => setCursorHover(true)} 
                          onMouseLeave={() => setCursorHover(false)}
                        >
                          Send Inquiry <Check />
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="form-success-message active">
                    <div className="success-icon"><CheckCircle /></div>
                    <h3>Inquiry Received! Dhanyawaad!</h3>
                    <p>Thank you for reaching out to Satvik Delights. Our event coordinator will call you shortly to discuss your menu and share complete details.</p>
                    <button 
                      type="button" 
                      className="btn btn-gold btn-sm" 
                      onClick={resetForm}
                      onMouseEnter={() => setCursorHover(true)} 
                      onMouseLeave={() => setCursorHover(false)}
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Render Dedicated Subpages */}
      {currentPage === 'about-page' && renderAboutPage()}
      {currentPage === 'services-page' && renderServicesPage()}

      {/* Service Detail Subpages */}
      {currentPage === 'wedding' && renderServiceDetailView(
        'wedding', 
        'Indian Wedding Catering & Royal Feasts', 
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
        'Your wedding is a once-in-a-lifetime celebration. At Satvik Delights, we prepare royal Indian wedding feasts with pure desi ghee, fresh ingredients, and traditional hospitality. From welcome drinks to midnight snacks, our team serves delicious food that will delight your family and guests.',
        ['100% Pure Desi Ghee vegetarian food', 'Free menu tasting for up to 6 family members', 'Dedicated wedding catering manager on site', 'Traditional welcome drinks, fresh juices, and kesar thandai']
      )}

      {currentPage === 'corporate' && renderServiceDetailView(
        'corporate', 
        'Corporate Events & Office Meets', 
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
        'Serve hot, clean, and delicious food at your office conferences, annual meetings, and team parties. We set up timely buffets with fresh rotis, sabzis, snacks, and sweets.',
        ['Punctual setup and quick buffet lines', 'Clean, hygienic, and fresh food preparation', 'Special high-tea and snack packages', 'Professional catering manager to manage everything']
      )}

      {currentPage === 'birthday' && renderServiceDetailView(
        'birthday', 
        'Birthday Parties & Family Celebrations', 
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200',
        'Celebrate birthdays and family milestones with fun live food stalls! Enjoy hot pav bhaji, crispy pizzas, fresh jalebi, chaat counters, and custom designer cakes.',
        ['Custom birthday cakes and dessert table', 'Live food stalls with chaat, pasta, and noodles', 'Colorful balloon and flower backdrop decoration', 'Polite service staff to attend kids and elders']
      )}

      {currentPage === 'private' && renderServiceDetailView(
        'private', 
        'Small Family Gatherings & Home Dinners', 
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1200',
        'Enjoy authentic halwai-cooked food right in your home. Our master cooks and service boys bring fresh ingredients, cook delicious hot food, and clean up afterwards.',
        ['Personal chef and service staff at your home', 'Freshly cooked hot rotis, pooris, and special sabzis', 'Traditional brass or bone-china dining setup', 'Complete cleaning after the dinner']
      )}

      {currentPage === 'buffet' && renderServiceDetailView(
        'buffet', 
        'Royal Indian Buffet Catering', 
        'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200',
        'Make your feast unforgettable with our royal buffet setup. We serve warm gravies in royal brass and copper handis, with live roti tandoors and fresh salad displays.',
        ['Traditional copper and brass food warmers', 'Live tandoor making hot naan, roti, and kulcha', 'Wide spread of salads, raita, papad, and chutneys', 'Regular food refills so nothing runs out']
      )}

      {currentPage === 'live-counters' && renderServiceDetailView(
        'live-counters', 
        'Live Chaat & Hot Food Stalls', 
        'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&q=80&w=1200',
        'Bring the exciting taste of Indian street food to your event! We set up clean, live stalls for Delhi Golgappe, crispy Tikki, Pav Bhaji, hot Dosas, and fresh Jalebi.',
        ['Delhi style Golgappe with 5 types of flavored water', 'Crispy Aloo Tikki with sweet and green chutney', 'Live tandoor and hot snacks counter', 'Live Jalebi and Rabdi station']
      )}

      {currentPage === 'decor' && renderServiceDetailView(
        'decor', 
        'Mandap & Event Decoration', 
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
        'Our decoration team creates beautiful floral mandaps, fairy light backdrops, and elegant stage seating to make your wedding and pooja look grand and festive.',
        ['Fresh marigold, rose, and orchid floral setups', 'Beautiful warm lighting and fairy lights', 'Traditional brass diyas and rangoli welcome', 'Comfortable seating and royal sofa setups']
      )}

      {currentPage === 'planning' && renderServiceDetailView(
        'planning', 
        'Complete Event Management', 
        'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&q=80&w=1200',
        'From venue decoration to guest hospitality and catering, we handle every detail so you can enjoy the celebration with your family stress-free.',
        ['Step-by-step event schedule and coordination', 'Dedicated coordinator on venue all day', 'Smooth management of food, sound, and lighting', 'Guest assistance and warm welcoming service']
      )}

      {currentPage === 'outdoor' && renderServiceDetailView(
        'outdoor', 
        'Lawn & Farmhouse Catering', 
        'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1200',
        'Planning a celebration in an open garden or farmhouse? We set up complete mobile kitchens and live stalls, serving hot and fresh food under the open sky.',
        ['Complete outdoor kitchen setup with clean drinking water', 'Weather-proof live food stalls and tandoor', 'Trained service team for big outdoor lawns', 'Clean and tidy waste management']
      )}

      {/* Categories details alias pages */}
      {currentPage === 'reception' && renderServiceDetailView(
        'reception', 
        'Grand Reception & Welcome Lounges', 
        'https://images.unsplash.com/photo-1505232458627-58b6f4816f6a?auto=format&fit=crop&q=80&w=1200',
        'Welcome your guests in style with refreshing welcome drinks, hot kebabs, paneer tikka, and a royal dinner buffet designed for evening receptions.',
        ['Traditional Kesar Thandai and fresh fruit mocktails', 'Hot paneer tikkas and kebabs served on tables', 'Grand stage and backdrop setup', 'Polite hospitality staff welcoming guests']
      )}

      {currentPage === 'engagement' && renderServiceDetailView(
        'engagement', 
        'Roka & Ring Ceremony', 
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
        'Start your new journey with a sweet celebration. We provide festive decoration, high-tea snacks, live chaat stalls, and a royal family lunch or dinner.',
        ['Flower ring ceremony backdrop', 'Sweet hampers and traditional mithai display', 'Fresh snacks and live counters', 'Family dining table arrangements']
      )}

      {currentPage === 'anniversary' && renderServiceDetailView(
        'anniversary', 
        'Anniversary & Milestone Parties', 
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200',
        'Celebrate your silver, golden, or annual wedding anniversary with close friends and family. Enjoy special traditional dishes and soulful hospitality.',
        ['Custom cake cutting and floral stage', 'Special family favorite dishes prepared by Maharaj', 'Warm and respectful table service', 'Memorable photo backdrop setup']
      )}

      {currentPage === 'festival' && renderServiceDetailView(
        'festival', 
        'Festivals, Dandiya & Community Pujas', 
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200',
        'Celebrate Diwali, Navratri Dandiya, Holi, or Ganesh Utsav with pure satvik food prepared without onion-garlic if needed, full of festive spirit.',
        ['Special 100% pure Satvik or Jain food options', 'Live festive sweets like Gujiya, Jalebi, and Halwa', 'Traditional festive theme decor with flowers and diyas', 'Large crowd management with fast buffet lines']
      )}

      {currentPage === 'private-dinner' && renderServiceDetailView(
        'private-dinner', 
        'Griha Pravesh & Puja Feast', 
        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200',
        'Celebrate housewarmings, Havans, and Satyanarayan Pujas with pure, sanctified satvik food prepared with utmost devotion, desi ghee, and hygiene.',
        ['Pure Desi Ghee Satvik preparation (no onion/garlic on request)', 'Traditional Pangat or Buffet dining setup', 'Prasad and pure sweets preparation', 'Complete post-event cleaning of your home']
      )}

      {/* Render Specific Blog post subpages */}
      {currentPage.startsWith('blog-') && renderBlogDetailView(currentPage)}

      {/* Render Legal & Policy subpages */}
      {currentPage === 'privacy' && renderPrivacyPolicy()}
      {currentPage === 'terms' && renderTermsOfService()}
      {currentPage === 'cookies' && renderCookiePolicy()}

      {/* Sticky Mobile Action Bar */}
      <div className="mobile-sticky-action-bar">
        <a href="tel:+919413345428" className="sticky-action-item">
          <Phone />
          <span>Call</span>
        </a>
        <a href="https://wa.me/919413345428" target="_blank" rel="noopener noreferrer" className="sticky-action-item">
          <MessageSquare />
          <span>WhatsApp</span>
        </a>
        <a href="#contact" className="sticky-action-item action-enquire" onClick={() => handleNavigation('contact')}>
          <Calendar />
          <span>Enquire Now</span>
        </a>
      </div>

      {/* Luxury Minimal Footer */}
      <footer className="footer">
        <div className="container grid-4 footer-top">
          {/* Col 1 */}
          <div className="footer-col brand-col">
            <a href="#" className="footer-brand-logo-link" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }} aria-label="Satvik Delights">
              <img src={satvikLogo} alt="Satvik Delights - Events & Caterer" className="footer-logo-img" />
            </a>
            <p style={{ color: 'var(--color-gold-dark)', fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.08rem', margin: '0.6rem 0 0.4rem 0', textTransform: 'uppercase' }}>
              We Plan • We Design • We Deliver Memories
            </p>
            <p className="footer-desc">Pure vegetarian catering and event planning in Janta Colony, Jaipur, Rajasthan.</p>
            
            <div style={{ fontSize: '0.82rem', color: 'var(--color-gray-dark)', marginTop: '0.8rem', lineHeight: '1.7' }}>
              <div><strong>Banwari Yadav:</strong> <a href="tel:+919413345428" style={{ color: 'var(--color-gold-dark)', fontWeight: 600 }}>+91 9413345428</a></div>
              <div><strong>Aman Yadav:</strong> <a href="tel:+918079085977" style={{ color: 'var(--color-gold-dark)', fontWeight: 600 }}>+91 8079085977</a></div>
              <div><strong>Email:</strong> <a href="mailto:satvikdelightcaterers@gmail.com" style={{ color: 'var(--color-gold-dark)' }}>satvikdelightcaterers@gmail.com</a></div>
              <div><strong>Address:</strong> Janta Colony, Jaipur, Rajasthan</div>
            </div>

            <div className="social-links" style={{ marginTop: '1.2rem' }}>
              <a href="#" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" aria-label="Linkedin">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home" onClick={() => handleNavigation('home')}>Home</a></li>
              <li><a href="#about" onClick={() => handleNavigation('about-page')}>About Us</a></li>
              <li><a href="#services" onClick={() => handleNavigation('services-page')}>Services</a></li>
              <li><a href="#menu" onClick={() => handleNavigation('menu')}>Food Menu</a></li>
              <li><a href="#gallery" onClick={() => handleNavigation('gallery')}>Photo Gallery</a></li>
              <li><button type="button" className="footer-link-btn" onClick={() => handleNavigation('privacy')}>Privacy Policy</button></li>
              <li><button type="button" className="footer-link-btn" onClick={() => handleNavigation('terms')}>Terms of Service</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-col">
            <h3>Our Services</h3>
            <ul className="footer-links">
              <li><a href="#services" onClick={() => handleNavigation('wedding')}>Wedding &amp; Engagements</a></li>
              <li><a href="#services" onClick={() => handleNavigation('birthday')}>Birthday Parties</a></li>
              <li><a href="#services" onClick={() => handleNavigation('corporate')}>Corporate Events</a></li>
              <li><a href="#services" onClick={() => handleNavigation('private')}>Social Gatherings</a></li>
              <li><a href="#services" onClick={() => handleNavigation('buffet')}>Catering Service</a></li>
              <li><a href="#services" onClick={() => handleNavigation('live-counters')}>Live Food Counters</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="footer-col">
            <h3>Stay Updated</h3>
            <p className="newsletter-sub">Subscribe to get our latest food menu updates and festival catering offers.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your Email Address" aria-label="Email Address for newsletter" required />
              <button type="submit" aria-label="Subscribe"><ArrowRight size={18} /></button>
            </form>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>&copy; 2026 Satvik Delights - Events &amp; Caterer. All rights reserved.</p>
          <div className="footer-bottom-links">
            <button type="button" className="footer-link-btn" onClick={() => handleNavigation('privacy')}>Privacy Policy</button>
            <span className="divider">|</span>
            <button type="button" className="footer-link-btn" onClick={() => handleNavigation('terms')}>Terms of Service</button>
            <span className="divider">|</span>
            <button type="button" className="footer-link-btn" onClick={() => handleNavigation('cookies')}>Cookie Policy</button>
          </div>
        </div>
      </footer>

      {/* Floating Cookie Consent Banner */}
      {!cookieConsent && currentPage !== 'cookies' && (
        <div className="cookie-consent-banner" role="region" aria-label="Cookie consent banner">
          <div className="cookie-consent-header">
            <Cookie size={20} />
            <h4>Cookie Preferences</h4>
          </div>
          <p className="cookie-consent-text">
            We use basic cookies to ensure our website functions smoothly and remember your preferences. You can accept all, decline non-essential cookies, or read our policy.
          </p>
          <div className="cookie-consent-actions">
            <button 
              type="button" 
              className="btn btn-gold btn-sm" 
              onClick={() => handleCookieChoice('accepted')}
            >
              Accept All
            </button>
            <button 
              type="button" 
              className="btn btn-outline-dark btn-sm" 
              onClick={() => handleCookieChoice('declined')}
            >
              Decline
            </button>
            <button 
              type="button" 
              className="cookie-link-btn" 
              onClick={() => handleNavigation('cookies')}
            >
              Cookie Policy
            </button>
          </div>
        </div>
      )}
    </>
  );
}
