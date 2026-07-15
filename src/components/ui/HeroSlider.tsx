'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const slides = [
  {
    id: 1,
    heading: 'Fuel Ideas That',
    headingAccent: 'Change Lives',
    subtitle: 'Back visionary creators and fund the campaigns that matter most to your community.',
    cta: 'Explore Campaigns',
    href: '/campaigns',
    image: '/hero_community.png',
    accentColor: '#6366F1',
    gradientFrom: 'rgba(99,102,241,0.3)',
    gradientTo: 'rgba(99,102,241,0.05)',
  },
  {
    id: 2,
    heading: 'Your Credits,',
    headingAccent: 'Their Dreams',
    subtitle: "Every credit you give turns someone's vision into reality. Start supporting today.",
    cta: 'Become a Supporter',
    href: '/register',
    image: '/hero_support.png',
    accentColor: '#0EA5E9',
    gradientFrom: 'rgba(14,165,233,0.3)',
    gradientTo: 'rgba(14,165,233,0.05)',
  },
  {
    id: 3,
    heading: 'Launch Your',
    headingAccent: 'Campaign',
    subtitle: 'Share your story, set your goal, and let the KindCircle community propel you forward.',
    cta: 'Start a Campaign',
    href: '/register',
    image: '/hero_launch.png',
    accentColor: '#F59E0B',
    gradientFrom: 'rgba(245,158,11,0.3)',
    gradientTo: 'rgba(245,158,11,0.05)',
  },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden" aria-label="Hero banner">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="w-full h-full hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center overflow-hidden bg-neutral-950">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={slide.id === 1}
                  className="object-cover opacity-20 select-none pointer-events-none"
                  sizes="100vw"
                />
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/40" />
              </div>

              {/* Animated accent orb */}
              <div
                className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${slide.gradientFrom} 0%, transparent 65%)`,
                  filter: 'blur(60px)',
                  animation: 'floatY 7s ease-in-out infinite',
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${slide.gradientFrom} 0%, transparent 70%)`,
                  filter: 'blur(80px)',
                  opacity: 0.5,
                }}
              />

              {/* Content */}
              <div className="relative z-10 px-8 sm:px-16 lg:px-24 max-w-4xl">
                {/* Slide indicator badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6"
                  style={{
                    background: `rgba(${slide.accentColor === '#6366F1' ? '99,102,241' : slide.accentColor === '#0EA5E9' ? '14,165,233' : '245,158,11'},0.15)`,
                    border: `1px solid ${slide.accentColor}40`,
                    color: slide.accentColor,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: slide.accentColor }}
                  />
                  KindCircle Platform
                </div>

                <h1
                  className="text-4xl sm:text-5xl md:text-[4rem] lg:text-[4.5rem] font-black text-white leading-tight mb-6"
                  style={{ lineHeight: 1.05, letterSpacing: '-0.03em' }}
                >
                  {slide.heading}{' '}
                  <span style={{ color: slide.accentColor }}>{slide.headingAccent}</span>
                </h1>

                <p
                  className="text-base md:text-xl text-white/65 mb-10 max-w-xl"
                  style={{ lineHeight: 1.7 }}
                >
                  {slide.subtitle}
                </p>

                <div className="flex items-center gap-4">
                  <Link
                    href={slide.href}
                    id={`hero-cta-${slide.id}`}
                    className="inline-flex items-center gap-2.5 font-bold text-sm px-8 py-4 rounded-xl text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                    style={{
                      background: `linear-gradient(135deg, ${slide.accentColor}, ${slide.accentColor}CC)`,
                      boxShadow: `0 8px 32px ${slide.accentColor}50`,
                    }}
                  >
                    {slide.cta}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/campaigns"
                    className="text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-1"
                  >
                    Browse all
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none z-10" />
    </section>
  );
}

