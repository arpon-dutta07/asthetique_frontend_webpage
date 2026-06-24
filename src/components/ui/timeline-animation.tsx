"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

type TimelineContentProps = {
  as?: any;
  className?: string;
  animationNum?: number;
  customVariants?: any;
  timelineRef?: React.RefObject<HTMLElement | null>;
  children?: React.ReactNode;
};

export const TimelineContent = ({
  as = "div",
  className,
  animationNum = 0,
  customVariants,
  timelineRef,
  children,
}: TimelineContentProps) => {
  const localRef = useRef<HTMLElement>(null);
  // Trigger animation when the element scrolls into view
  const targetRef = timelineRef || localRef;
  const isInView = useInView(targetRef, { once: true, margin: "-80px 0px" });

  // Resolve custom motion component (e.g. motion.h1, motion.p, motion.div)
  // @ts-ignore
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      ref={localRef}
      className={className}
      variants={customVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
    >
      {children}
    </MotionComponent>
  );
};
