"use client";

import React, { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";

function ClientFeedback() {
  const testimonialRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -15,
      opacity: 0,
    },
  };

  return (
    <div className="w-full bg-transparent" ref={testimonialRef}>
      <section className="relative h-full text-brand-white py-6 bg-transparent">
        <article className="max-w-screen-md mx-auto text-center space-y-3 mb-12">
          <TimelineContent
            as="h3"
            className="text-3xl md:text-4xl font-serif font-normal uppercase tracking-wide text-brand-white"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            TRUSTED BY DISCERNING PATRONS
          </TimelineContent>
          <TimelineContent
            as="p"
            className="mx-auto text-brand-gray max-w-md text-xs md:text-sm font-light tracking-wide"
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            Let's hear how our patrons feel about their newly curated architectural spaces.
          </TimelineContent>
        </article>

        {/* Testimonials Bento Grid */}
        <div className="lg:grid lg:grid-cols-3 gap-6 flex flex-col w-full px-1">
          {/* Column 1 */}
          <div className="flex flex-col gap-6 h-full">
            <TimelineContent
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 flex flex-col justify-between relative bg-brand-dark/40 hover:bg-brand-dark/60 backdrop-blur-md overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 p-8 transition-all duration-500 hover:scale-[1.01]"
            >
              {/* Subtle grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>
              <article className="relative z-10 flex flex-col h-full justify-between gap-8 mt-auto">
                <p className="font-serif italic text-base md:text-lg text-brand-white/90 leading-relaxed">
                  "AESTHETIQUE transformed our Soho penthouse into a serene, tactile sanctuary. Their detailed custom millwork planning and execution are completely unmatched in the industry."
                </p>
                <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-5">
                  <div>
                    <h4 className="font-sans font-bold text-sm tracking-wide text-brand-white uppercase">
                      Guillermo Rauch
                    </h4>
                    <p className="text-[10px] text-brand-gray tracking-widest font-mono uppercase">CEO, Vercel</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop"
                    alt="Guillermo Rauch"
                    className="w-12 h-12 rounded-xl object-cover border border-black/10 dark:border-white/10"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={2}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:h-fit lg:shrink-0 flex flex-col justify-between relative bg-brand-dark/40 hover:bg-brand-dark/60 backdrop-blur-md overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 p-8 transition-all duration-500 hover:scale-[1.01]"
            >
              <article className="relative z-10 flex flex-col justify-between gap-6">
                <p className="font-serif italic text-sm md:text-base text-brand-white/90 leading-relaxed">
                  "Their capability to blend Scandinavian minimalism with warm Japanese tones created our dream workspace."
                </p>
                <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-5">
                  <div>
                    <h4 className="font-sans font-bold text-sm tracking-wide text-brand-white uppercase">
                      Rika Shinoda
                    </h4>
                    <p className="text-[10px] text-brand-gray tracking-widest font-mono uppercase">CEO of Kintsugi</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=150&auto=format&fit=crop"
                    alt="Rika Shinoda"
                    className="w-12 h-12 rounded-xl object-cover border border-black/10 dark:border-white/10"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6 h-full">
            <TimelineContent
              animationNum={3}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 flex flex-col justify-between relative bg-brand-dark/40 hover:bg-brand-dark/60 backdrop-blur-md overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 p-8 transition-all duration-500 hover:scale-[1.01]"
            >
              <article className="relative z-10 flex flex-col h-full justify-between gap-6 mt-auto">
                <p className="font-serif italic text-sm md:text-base text-brand-white/90 leading-relaxed">
                  "Their team is highly professional, and their innovative lighting solutions have truly transformed the way we experience our home from day to night."
                </p>
                <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-5">
                  <div>
                    <h4 className="font-sans font-bold text-sm tracking-wide text-brand-white uppercase">
                      Reacher
                    </h4>
                    <p className="text-[10px] text-brand-gray tracking-widest font-mono uppercase">CEO of OdeaoLabs</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=150&auto=format&fit=crop"
                    alt="Reacher"
                    className="w-12 h-12 rounded-xl object-cover border border-black/10 dark:border-white/10"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={4}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 flex flex-col justify-between relative bg-brand-dark/40 hover:bg-brand-dark/60 backdrop-blur-md overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 p-8 transition-all duration-500 hover:scale-[1.01]"
            >
              <article className="relative z-10 flex flex-col h-full justify-between gap-6 mt-auto">
                <p className="font-serif italic text-sm md:text-base text-brand-white/90 leading-relaxed">
                  "We're extremely satisfied. The bespoke travertine fireplace and custom ceiling details exceeded our expectations."
                </p>
                <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-5">
                  <div>
                    <h4 className="font-sans font-bold text-sm tracking-wide text-brand-white uppercase">
                      Marcus V.
                    </h4>
                    <p className="text-[10px] text-brand-gray tracking-widest font-mono uppercase">CEO of Verde Studio</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=150&auto=format&fit=crop"
                    alt="Marcus"
                    className="w-12 h-12 rounded-xl object-cover border border-black/10 dark:border-white/10"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={5}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 flex flex-col justify-between relative bg-brand-dark/40 hover:bg-brand-dark/60 backdrop-blur-md overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 p-8 transition-all duration-500 hover:scale-[1.01]"
            >
              <article className="relative z-10 flex flex-col h-full justify-between gap-6 mt-auto">
                <p className="font-serif italic text-sm md:text-base text-brand-white/90 leading-relaxed">
                  "Exceptional eye for spatial choreography. They transformed our high-ceiling loft while maintaining its industrial character."
                </p>
                <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-5">
                  <div>
                    <h4 className="font-sans font-bold text-sm tracking-wide text-brand-white uppercase">
                      Steven Sunny
                    </h4>
                    <p className="text-[10px] text-brand-gray tracking-widest font-mono uppercase">Founder, Boxefi</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1740102074295-c13fae3e4f8a?q=80&w=150&auto=format&fit=crop"
                    alt="Steven Sunny"
                    className="w-12 h-12 rounded-xl object-cover border border-black/10 dark:border-white/10"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6 h-full">
            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="lg:h-fit lg:shrink-0 flex flex-col justify-between relative bg-brand-dark/40 hover:bg-brand-dark/60 backdrop-blur-md overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 p-8 transition-all duration-500 hover:scale-[1.01]"
            >
              <article className="relative z-10 flex flex-col justify-between gap-6">
                <p className="font-serif italic text-sm md:text-base text-brand-white/90 leading-relaxed">
                  "Aesthetique is a key partner in translating our lifestyle habits into spatial luxury."
                </p>
                <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-5">
                  <div>
                    <h4 className="font-sans font-bold text-sm tracking-wide text-brand-white uppercase">
                      Sarah & David K.
                    </h4>
                    <p className="text-[10px] text-brand-gray tracking-widest font-mono uppercase">Casa Noir</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=150&auto=format&fit=crop"
                    alt="Sarah & David"
                    className="w-12 h-12 rounded-xl object-cover border border-black/10 dark:border-white/10"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={7}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 flex flex-col justify-between relative bg-brand-dark/40 hover:bg-brand-dark/60 backdrop-blur-md overflow-hidden rounded-[2rem] border border-black/5 dark:border-white/5 p-8 transition-all duration-500 hover:scale-[1.01]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>
              <article className="relative z-10 flex flex-col h-full justify-between gap-8 mt-auto">
                <p className="font-serif italic text-base md:text-lg text-brand-white/90 leading-relaxed">
                  "Their attention to custom joinery, lighting integration, and FF&E curation created a masterclass in modern living. The team is incredibly responsive and dedicated to absolute excellence."
                </p>
                <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-5">
                  <div>
                    <h4 className="font-sans font-bold text-sm tracking-wide text-brand-white uppercase">
                      Elena R.
                    </h4>
                    <p className="text-[10px] text-brand-gray tracking-widest font-mono uppercase">Aurora Living</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=150&auto=format&fit=crop"
                    alt="Elena R."
                    className="w-12 h-12 rounded-xl object-cover border border-black/10 dark:border-white/10"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientFeedback;
