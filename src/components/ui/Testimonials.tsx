'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Aisha Nwosu',
    role: 'Educator & Campaign Creator',
    avatar: 'AN',
    avatarColor: '#6366F1',
    rating: 5,
    quote: "KindCircle made it incredibly easy to launch my literacy campaign. Within two weeks, I had 40 supporters and raised enough credits to buy books for my entire class. This platform truly cares.",
  },
  {
    id: 2,
    name: 'Marcus Tran',
    role: 'Tech Entrepreneur',
    avatar: 'MT',
    avatarColor: '#0EA5E9',
    rating: 5,
    quote: "I was skeptical about crowdfunding, but KindCircle's transparent process won me over. My open-source project got funded faster than I imagined. The community is genuinely supportive.",
  },
  {
    id: 3,
    name: 'Sofia Reyes',
    role: 'Environmental Activist',
    avatar: 'SR',
    avatarColor: '#22C55E',
    rating: 5,
    quote: "The category discovery feature led so many like-minded people to my clean ocean campaign. I didn't just raise funds — I built a community of supporters who share my vision.",
  },
  {
    id: 4,
    name: 'Daniel Park',
    role: 'Supporter',
    avatar: 'DP',
    avatarColor: '#F59E0B',
    rating: 5,
    quote: "As a supporter, I love how easy it is to find causes I care about. The platform is clean, fast, and I always know exactly where my credits are going. Highly recommend!",
  },
  {
    id: 5,
    name: 'Priya Sharma',
    role: 'Healthcare Worker',
    avatar: 'PS',
    avatarColor: '#6366F1',
    rating: 5,
    quote: "Raised funds for medical equipment for our rural clinic in under a month. KindCircle's reach is remarkable — backers came from three different countries. Life-changing platform.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-24 px-4 bg-neutral-950 overflow-hidden" aria-labelledby="testimonials-title">
      {/* Ambient orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{
              background: 'rgba(245,158,11,0.12)',
              border: '1px solid rgba(245,158,11,0.3)',
              color: '#FBBF24',
            }}
          >
            Community Stories
          </span>
          <h2
            id="testimonials-title"
            className="text-3xl md:text-5xl font-black text-white mb-4"
            style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            What Our{' '}
            <span style={{ background: 'linear-gradient(90deg, #F59E0B, #6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Community
            </span>{' '}Says
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto" style={{ lineHeight: 1.7 }}>
            Real stories from creators and supporters who have experienced the power of the KindCircle community.
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          pagination={{ clickable: true }}
          className="pb-12 testimonial-swiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div
                className="group flex flex-col p-6 rounded-2xl border border-white/8 transition-all duration-300 hover:-translate-y-1 h-full"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
                  minHeight: '260px',
                }}
              >
                {/* Quote mark */}
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-lg mb-4 text-lg font-black"
                  style={{
                    background: `${t.avatarColor}20`,
                    color: t.avatarColor,
                  }}
                  aria-hidden="true"
                >
                  "
                </div>

                {/* Stars */}
                <StarRating count={t.rating} />

                <p className="text-sm text-white/60 flex-grow mb-6 italic" style={{ lineHeight: 1.7 }}>
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-white text-xs font-bold ring-2 ring-white/10"
                    style={{ backgroundColor: t.avatarColor }}
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-white/45">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
