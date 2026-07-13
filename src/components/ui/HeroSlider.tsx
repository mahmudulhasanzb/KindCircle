'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    heading: 'Fuel Ideas That Change Lives',
    subtitle: 'Back visionary creators and fund the campaigns that matter most to your community.',
    cta: 'Explore Campaigns',
    href: '/campaigns',
    gradient: 'from-primary/90 via-primary/70 to-secondary/80',
    accentColor: '#6366F1',
  },
  {
    id: 2,
    heading: 'Your Credits, Their Dreams',
    subtitle: 'Every credit you give turns someone's vision into reality. Start supporting today.',
    cta: 'Become a Supporter',
    href: '/sign-up',
    gradient: 'from-secondary/90 via-secondary/70 to-primary/80',
    accentColor: '#0EA5E9',
  },
  {
    id: 3,
    heading: 'Launch Your Campaign',
    subtitle: 'Share your story, set your goal, and let the KindCircle community propel you forward.',
    cta: 'Start a Campaign',
    href: '/sign-up',
    gradient: 'from-accent/80 via-primary/80 to-secondary/70',
    accentColor: '#F59E0B',
  },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full h-[560px] md:h-[640px] overflow-hidden" aria-label="Hero banner">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="w-full h-full hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative w-full h-full flex items-center justify-center bg-gradient-to-br ${slide.gradient}`}
              style={{
                background: `linear-gradient(135deg, var(--primary), var(--secondary))`,
              }}
            >
              {/* Background pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 35%, ${slide.accentColor} 0%, transparent 50%), radial-gradient(circle at 75% 65%, white 0%, transparent 50%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <h1
                  className="text-[2rem] md:text-[3rem] font-extrabold text-white leading-tight mb-4 drop-shadow-lg"
                  style={{ lineHeight: 1.1 }}
                >
                  {slide.heading}
                </h1>
                <p className="text-base md:text-lg text-white/85 mb-8 max-w-xl mx-auto" style={{ lineHeight: 1.6 }}>
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.href}
                  id={`hero-cta-${slide.id}`}
                  className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-lg shadow-lg hover:bg-white/90 transition-all duration-200 cursor-pointer"
                  style={{ borderRadius: '8px' }}
                >
                  {slide.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
