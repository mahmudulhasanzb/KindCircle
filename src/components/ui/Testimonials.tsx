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
    quote: "KindCircle made it incredibly easy to launch my literacy campaign. Within two weeks, I had 40 supporters and raised enough credits to buy books for my entire class. This platform truly cares.",
  },
  {
    id: 2,
    name: 'Marcus Tran',
    role: 'Tech Entrepreneur',
    avatar: 'MT',
    avatarColor: '#0EA5E9',
    quote: "I was skeptical about crowdfunding, but KindCircle's transparent process won me over. My open-source project got funded faster than I imagined. The community is genuinely supportive.",
  },
  {
    id: 3,
    name: 'Sofia Reyes',
    role: 'Environmental Activist',
    avatar: 'SR',
    avatarColor: '#22C55E',
    quote: "The category discovery feature led so many like-minded people to my clean ocean campaign. I didn't just raise funds — I built a community of supporters who share my vision.",
  },
  {
    id: 4,
    name: 'Daniel Park',
    role: 'Supporter',
    avatar: 'DP',
    avatarColor: '#F59E0B',
    quote: "As a supporter, I love how easy it is to find causes I care about. The platform is clean, fast, and I always know exactly where my credits are going. Highly recommend!",
  },
  {
    id: 5,
    name: 'Priya Sharma',
    role: 'Healthcare Worker',
    avatar: 'PS',
    avatarColor: '#6366F1',
    quote: "Raised funds for medical equipment for our rural clinic in under a month. KindCircle's reach is remarkable — backers came from three different countries. Life-changing platform.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4" aria-labelledby="testimonials-title">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2
            id="testimonials-title"
            className="text-2xl md:text-[2rem] font-bold text-foreground mb-3"
            style={{ lineHeight: 1.2 }}
          >
            What Our Community Says
          </h2>
          <p className="text-[var(--text-secondary)] text-base max-w-lg mx-auto" style={{ lineHeight: 1.6 }}>
            Real stories from creators and supporters who have experienced the power of the KindCircle community.
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          pagination={{ clickable: true }}
          className="pb-10 testimonial-swiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div
                className="flex flex-col p-5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-white/5 hover:shadow-[0_4px_12px_rgba(99,102,241,0.12)] transition-all duration-200 h-full cursor-default"
                style={{ borderRadius: '12px', padding: '20px', minHeight: '220px' }}
              >
                {/* Quote mark */}
                <svg
                  className="mb-3 opacity-30"
                  width="32" height="32" viewBox="0 0 24 24" fill="var(--primary)"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className="text-sm text-[var(--text-secondary)] flex-grow mb-4 italic" style={{ lineHeight: 1.6 }}>
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  {/* Avatar */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-white text-xs font-bold"
                    style={{ borderRadius: '9999px', backgroundColor: t.avatarColor }}
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{t.role}</p>
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
