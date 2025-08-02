import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'
import BlurText from "./BlurText";


import { 
  Cpu, 
  Bot, 
  Wifi, 
  Box, 
  Brain, 
  Zap, 
  Plane, 
  Trophy,
  Users,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Github,
  Instagram,
  Twitter,
  ChevronRight,
  Settings,
  Cog,
  Wrench,
  Gauge,
  ArrowRight,
  Menu,
  X,
  AlignCenter
} from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
  AOS.init({
    duration: 800, // animation duration in ms
    once: false,    // only animate once
    offset: 90,    // offset (in px) from the original trigger point
  });
}, []);

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
  

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate Spline animation properties based on scroll position
  const getSplineStyles = () => {
    const isMobile = window.innerWidth < 900;
    const isTablet = window.innerWidth < 1024;
    
    const heroHeight = window.innerHeight;
    const aboutHeight = window.innerHeight * 0.8;
    const parallaxHeight = 400;
    const workshopsHeight = window.innerHeight * 0.8;
    const whiteShadowHeight = window.innerHeight * 0.8;
    const achievementsHeight = window.innerHeight * 0.8;
    
    // Calculate section positions
    const aboutStart = heroHeight;
    const parallaxStart = aboutStart + aboutHeight;
    const workshopsStart = parallaxStart + parallaxHeight;
    const whiteShadowStart = workshopsStart + workshopsHeight;
    const achievementsStart = whiteShadowStart + whiteShadowHeight;
    const contactStart = achievementsStart + achievementsHeight;

    let translateY =0;
    let scale = 1;
    let opacity = 0.9;

    // Enhanced mobile scaling - much larger for mobile
    const mobileScaleFactor = isMobile ? 4 : isTablet ? 1.0 : 0.8; // Increased mobile scale
    const baseScale = isMobile ? 1: isTablet ? 1.2 : 1.0; // Larger base scale for mobile

    if (scrollY < aboutStart) {
      // Hero section - show head and shoulders properly
      const progress = scrollY / heroHeight;
      translateY = scrollY * (isMobile ? 0.02 : 0.03);
      scale = (baseScale + progress * 0.1) * mobileScaleFactor;
      opacity = 0.8;
    } else if (scrollY < parallaxStart) {
      // About section - transition
      const progress = (scrollY - aboutStart) / aboutHeight;
      translateY = aboutStart * (isMobile ? 0.02 : 0.03) + progress * (isMobile ? 20 : 30);
      scale = (baseScale + 0.1 - progress * 0.15) * mobileScaleFactor;
      opacity = 0.8 - progress * 0.3;
    } else if (scrollY < workshopsStart) {
      // Parallax section - show more body
      const progress = (scrollY - parallaxStart) / parallaxHeight;
      translateY = (aboutStart * (isMobile ? 0.02 : 0.03) + (isMobile ? 20 : 30)) + progress * (isMobile ? 30 : 50);
      scale = (baseScale - 0.05 + progress * 0.2) * mobileScaleFactor;
      opacity = 0.5 + progress * 0.3;
    } else if (scrollY < contactStart) {
      // Workshops to Achievements - show full body
      const progress = (scrollY - workshopsStart) / (contactStart - workshopsStart);
      translateY = (aboutStart * (isMobile ? 0.02 : 0.03) + (isMobile ? 50 : 80)) + progress * (isMobile ? 40 : 60);
      scale = (baseScale + 0.15 + progress * 0.15) * mobileScaleFactor;
      opacity = 0.8 + progress * 0.1;
    } else {
      // Contact section - show legs/full robot
      const progress = Math.min((scrollY - contactStart) / window.innerHeight, 1);
      translateY = (aboutStart * (isMobile ? 0.02 : 0.03) + (isMobile ? 90 : 140)) + progress * (isMobile ? 20 : 30);
      scale = (baseScale + 0.3 + progress * 0.1) * mobileScaleFactor;
      opacity = 0.9;
    }

    // Mobile-specific positioning adjustments
    const translateX = -30;
    const translateZ = 0;

    return {
      transform: `translate3d(${translateX}px, ${-translateY}px, ${translateZ}px) scale(${scale})`,
      opacity: opacity,
      transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
      pointerEvents: 'auto'
    };
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const workshops = [
    {
      title: "Bot Building",
      description: "Arduino, Raspberry Pi, sensors and microcontrollers",
      icon: Bot,
      color: "from-gray-800 to-black",
      image: "./bor.png"
    },
    {
      title: "Internet of Things",
      description: "Home automation, wireless controllers and IoT systems",
      icon: Wifi,
      color: "from-black to-gray-800",
      image: "./about1.png"
    },
    {
      title: "3D Modeling",
      description: "CAD software, design fundamentals and 3D printing",
      icon: Box,
      color: "from-gray-700 to-black",
      image: "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Machine Learning",
      description: "Python programming, algorithms and AI development",
      icon: Brain,
      color: "from-black to-gray-700",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "PCB Design",
      description: "Circuit board principles and electronic design",
      icon: Zap,
      color: "from-gray-800 to-black",
      image: "./pcb design.png"
    },
    {
      title: "Combat Robotics",
      description: "Race bots, Soccer bots, War bots and competitions",
      icon: Settings,
      color: "from-black to-gray-800",
      image: "./warbots.png"
    },
    {
      title: "Drone Division",
      description: "RC drones, fabrication and autonomous flight",
      icon: Plane,
      color: "from-gray-700 to-black",
      image: "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const achievements = [
    {
      year: "2023",
      title: "Technoxian World Cup 2023",
      description: " 2nd Runners-up in Combat Robotics",
      icon: Trophy,
      image: "/winner.jpg"
    },
    {
      year: "2023",
      title: "IIT Bombay Participation",
      description: "Represented NMAMIT in prestigious national competition",
      icon: Users,
      image: "./iit.png"
    },
    {
      year: "2022",
      title: "Regional Championships",
      description: "Multiple victories in Karnataka state robotics events",
      icon: Trophy,
      image: "./treams.png"
    }
  ];

  return (
    <div className="min-h-screen text-gray-900 overflow-x-hidden relative">
      
      {/* Replace Spline Animation with Static Image */}
      <div 
        className="fixed inset-0 flex items-center justify-center z-10 pointer-events-auto"
        style={getSplineStyles() as React.CSSProperties}
      >
        <img
          src="/ro.png" // <-- Replace with your actual image path
          alt="Robotics Club Animation"
          className="w-[120vw] h-[21vh] sm:w-[120vw] sm:h-[55vh] md:w-[160vw] md:h-[190vh] object-contain"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
          loading="eager"
        />
      </div>
      

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-5 hidden md:block">
        <div className="floating-element absolute top-20 left-10 animate-float">
          <Cog className="w-8 h-8 text-gray-400 opacity-30 animate-spin-slow" />
        </div>
        <div className="floating-element absolute top-40 right-20 animate-float-delayed">
          <Settings className="w-6 h-6 text-gray-500 opacity-30 animate-spin-reverse" />
        </div>
        <div className="floating-element absolute top-60 left-1/4 animate-float">
          <Wrench className="w-10 h-10 text-gray-600 opacity-30 rotate-45" />
        </div>
        <div className="floating-element absolute top-80 right-1/3 animate-float-delayed">
          <Gauge className="w-7 h-7 text-gray-400 opacity-30 animate-pulse" />
        </div>
        <div className="floating-element absolute bottom-40 left-20 animate-float">
          <Cog className="w-12 h-12 text-gray-500 opacity-30 animate-spin-slow" />
        </div>
        <div className="floating-element absolute bottom-60 right-10 animate-float-delayed">
          <Settings className="w-9 h-9 text-gray-400 opacity-30 animate-spin-reverse" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-4">
              <img 
    src="/robo.png" 
    alt="Robotics Club Nitte Logo" 
    className="w-17 h-16 bg-transparent" 
    style={{backgroundColor: 'transparent'}}
  />
              <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
                Robotics Club Nitte
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Workshops', 'Achievements', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 hover:text-black transition-colors duration-300 relative group font-medium"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-black transition-colors duration-300"
              >
                {mobileMenuOpen ? <X className="w-6 h-2" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-lg z-40">
              <div className="px-4 py-2 space-y-4">
                {['Home', 'About', 'Workshops', 'Achievements', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left text-gray-700 hover:text-black transition-colors duration-300 font-medium py-2"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content Container */}
      <div className="relative z-20">

        {/* Hero Section - Transparent Background */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-center min-h-screen py-20">
              
              {/* Content - Centered */}
              <div className="relative z-30 text-center max-w-4xl">
                <div className="mb-8 relative md:hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    
                  </div>
                  <div className="relative z-10 flex items-center justify-center">
                    
                  </div>
                </div>
<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>           
<BlurText
  text="Robotics Club Nitte"
  delay={150}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue to-gray-800 bg-clip-text"
  // Try removing text-transparent for debugging:
  // className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-black"
/></div>   
                <p className="text-xl md:text-2xl text-white mb-8 font-semibold drop-shadow-2xl" data-aos="fade-left">
                  Where Innovation Meets Technology
                </p>
                
                <p className="text-lg text-black mb-12 max-w-2xl mx-auto drop-shadow-xl font-semibold" data-aos="fade-up">
                  Official Robotics Club of NMAMIT - Pioneering the future through cutting-edge robotics, IoT, and innovative engineering solutions.
                </p>
                
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-gray-800 to-black rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800/50" data-aos="fade-right"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span data-aos="fade-up">Join Our Revolution</span>
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative bg-gradient-to-br from-stone-100 to-amber-100 z-30" data-aos="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent" data-aos="fade-up">
                About Us
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We are the official robotics club of NMAMIT, dedicated to fostering innovation and technological excellence among students.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center" data-aos="fade-up">
              <div className="space-y-6">
                <div className="bg-blue-600/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400 hover:border-blue-300 transition-all duration-300 shadow-lg " data-aos="fade-up">
                <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
                  <p className="text-white-700 leading-relaxed font-semibold ">
                    To create a platform where students can explore, learn, and innovate in the field of robotics and automation. We focus on practical learning through hands-on projects and collaborative problem-solving.
                  </p>
                </div>
                
                <div className="bg-blue-600/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400 hover:border-blue-300 transition-all duration-300 shadow-lg" data-aos="fade-up">
                  <h3 className="text-2xl font-bold mb-4 text-white">What We Do</h3>
                  <p className="text-white-700 leading-relaxed font-semibold">
                    From bot building and IoT projects to combat robotics and drone technology, we cover all aspects of modern robotics. Our members gain expertise in multidisciplinary engineering through real-world applications.
                  </p>
                </div>
              </div>

              <div className="relative" data-aos="fade-up">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-black/20 rounded-2xl blur-xl"></div>
                <div className="bg-blue-600/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400 hover:border-blue-300 transition-all duration-300 shadow-lg">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <Users className="w-12 h-12 text-gray-800 mx-auto mb-3" />
                      <h4 className="text-2xl font-bold text-black">50+</h4>
                      <p className="text-gray-700">Active Members</p>
                    </div>
                    <div className="text-center">
                      <Trophy className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                      <h4 className="text-2xl font-bold text-black">15+</h4>
                      <p className="text-gray-700">Competitions Won</p>
                    </div>
                    <div className="text-center">
                      <Bot className="w-12 h-12 text-gray-800 mx-auto mb-3" />
                      <h4 className="text-2xl font-bold text-black">100+</h4>
                      <p className="text-gray-700">Projects Built</p>
                    </div>
                    <div className="text-center">
                      <Calendar className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                      <h4 className="text-2xl font-bold text-black">5+</h4>
                      <p className="text-gray-700">Years Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parallax Image Section - Innovation in Action */}
        <section className="relative h-96 overflow-hidden z-30">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white">
              <h3 className="text-4xl md:text-5xl font-bold mb-4">Innovation in Action</h3>
              <p className="text-xl max-w-2xl mx-auto">
                Where cutting-edge technology meets creative engineering solutions
              </p>
            </div>
          </div>
        </section>

        {/* Workshops Section */}
        <section id="workshops" className="py-20 relative bg-gradient-to-br from-amber-50 to-orange-50 z-30" data-aos="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
                Workshops & Training
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Comprehensive hands-on training programs designed to build expertise in cutting-edge technologies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
              {workshops.map((workshop, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800/20" data-aos="fade-up"
                >
                  <div className="relative h-50 overflow-hidden">
                    <img 
                      src={workshop.image} 
                      alt={workshop.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${workshop.color} p-3`}>
                      <workshop.icon className="w-full h-full text-white" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-black group-hover:text-gray-800 transition-colors duration-300">
                      {workshop.title}
                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {workshop.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WhiteShadow Team Section */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-stone-100 to-amber-100 z-30" data-aos="fade-up">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/10 to-black/10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-black bg-clip-text text-red-700">
                Combat Robotics Team
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Our elite combat robotics team representing NMAMIT on national and international platforms.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center" data-aos="fade-up">
              <div className="space-y-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-300 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Achievements</h3>
                  <div className="space-y-4" data-aos="fade-up">
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-6 h-6 text-yellow-600" data-aos="fade-up" />
                      <span className="text-gray-700">2nd Runners-up - Technoxian World Cup 2023</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-gray-800" />
                      <span className="text-gray-700">IIT Bombay Competition Participation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Settings className="w-6 h-6 text-gray-700" />
                      <span className="text-gray-700">Combat Robotics Specialists</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-300 shadow-lg" data-aos="fade-up">
                  <h3 className="text-2xl font-bold mb-4 text-black">Expertise Areas</h3>
                  <ul className="space-y-2 text-gray-700" data-aos="fade-up">
                    <li>• Race Bot Development</li>
                    <li>• Soccer Bot Programming</li>
                    <li>• War Bot Engineering</li>
                    <li>• Combat Strategy & Design</li>
                    <li>• Advanced Control Systems</li>
                  </ul>
                </div>
              </div>

              <div className="relative" data-aos="fade-up">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-black/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-black/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-300 text-center shadow-xl">
                <img 
                          src='./robo.png'
                          
                          className="w-full h-full bg-White"
                        />
                  
                  <h3 className="text-3xl font-bold mb-4 text-red-600 ">Combat Robotics</h3>
                  <p className="text-white mb-6">
                    Elite combat robotics team pushing the boundaries of mechanical engineering and autonomous systems.
                  </p>
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-800 to-black px-6 py-3 rounded-full text-white font-semibold">
                    <Trophy className="w-5 h-5 text-red-700" data-aos="fade-up" />
                    <span data-aos="fade-left">National Champions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-20 relative bg-gradient-to-br from-amber-50 to-orange-50 z-30" data-aos="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
                Our Achievements
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                A timeline of our journey towards excellence in robotics and innovation.
              </p>
            </div>

            <div className="space-y-8" data-aos="fade-up">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-gray-400 transition-all duration-500 hover:scale-105 shadow-lg"
                >
                  <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-50 h-55 md:w-40 md:h-36 rounded-2xl overflow-hidden" data-aos="fade-left">
                        <img 
                          src={achievement.image} 
                          alt={achievement.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-2">
                        <span className="text-2xl font-bold text-gray-800">{achievement.year}</span>
                        <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-gray-800 to-black"></div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-800 transition-colors duration-300">
                        {achievement.title}
                      </h3>
                      
                      <p className="text-gray-700">
                        {achievement.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <achievement.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-gray-800 to-black rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800/50"   onClick={() => window.open("https://roboticsclubnitte.com/Documents/Achievements_AY2K22-23.pdf", "_blank")}>
                <span className="relative z-10 flex items-center space-x-2">
                  <span data-aos="fade-down">Explore More Achievements</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section - Transparent Background */}
        <section id="contact" className="py-20 relative z-30" data-aos="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent drop-shadow-2xl">
                Get In Touch
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-xl">
                Ready to join our robotics revolution? Contact us to learn more about our programs and opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12" data-aos="fade-right">
              <div className="space-y-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-300 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-6 h-6 text-gray-800" />
                      <span className="text-gray-700">NMAMIT, Nitte, Karnataka, India</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-6 h-6 text-gray-800" />
                      <span className="text-gray-700">robotics@nmamit.in</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-6 h-6 text-gray-800" />
                      <span className="text-gray-700">+91 9876543210</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-300 shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-black">Follow Us</h3>
                  <div className="flex space-x-4">
                    <button className="w-12 h-12 bg-gradient-to-r from-gray-800 to-black rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300" data-aos="fade-right">
                      <Instagram className="w-6 h-6 text-white"  />
                    </button>
                    <button className="w-12 h-12 bg-gradient-to-r from-gray-800 to-black rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300" data-aos="fade-up">
                      <Twitter className="w-6 h-6 text-white" />
                    </button>
                    <button className="w-12 h-12 bg-gradient-to-r from-gray-800 to-black rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300" data-aos="fade-left">
                      <Github className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-300 shadow-lg" data-aos="fade-up">
                <h3 className="text-2xl font-bold mb-6 text-black">Send us a Message</h3>
                <form className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-800 focus:shadow-lg focus:shadow-gray-800/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-800 focus:shadow-lg focus:shadow-gray-800/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={4}
                      placeholder="Your Message"
                      className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-800 focus:shadow-lg focus:shadow-gray-800/20 transition-all duration-300"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-gray-800 to-black rounded-xl font-semibold text-white hover:scale-105 hover:shadow-lg hover:shadow-gray-800/50 transition-all duration-300" data-aos="fade-up"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-300 bg-white/80 backdrop-blur-sm z-30 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Bot className="w-8 h-8 text-gray-800" />
                <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
                  Robotics Club Nitte
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                Official Robotics Club of NMAMIT - Shaping the Future of Technology
              </p>
              <p className="text-gray-600 text-sm">
                © 2024 Robotics Club Nitte. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;