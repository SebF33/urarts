// SPDX-FileCopyrightText: 2025 David Haz
// SPDX-License-Identifier: MIT
// Modifié par Sébastien Flouriot le 22/02/2025

import { DELAY_REACH_HREF } from "@utils/constants.ts";
import { h } from "preact";
import { motion, useAnimation, useMotionValue, useTransform } from "motion";
import { useEffect, useRef, useState } from "preact/hooks";


interface GalleryImage {
  artist_slug: string;
  id: string;
  url: string;
}


export default function RollingGallery(
  props: {
    readonly autoplay: boolean;
    readonly images: GalleryImage[];
    readonly pauseOnHover: boolean;
  },
) {
  const innerWidth = 768;
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(globalThis.innerWidth <= innerWidth);

  const autoplayRef = useRef();
  const controls = useAnimation();
  const dragFactor = 0.05;
  const draggable = false;
  const duration = 2;
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = props.images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const interval = 2000;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 0.1,
        ease: "easeOut",
      },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  
  useEffect(() => {
    if (props.autoplay) {
      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - (360 / faceCount),
          transition: { duration: duration, ease: "linear" },
        });
      }, interval);

      return () => clearInterval(autoplayRef.current);
    }
  }, [props.autoplay, rotation, controls, faceCount]);


  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(globalThis.innerWidth <= innerWidth);
    };

    globalThis.addEventListener("resize", handleResize);

    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);

  
  const handleMouseEnter = () => {
    if (props.autoplay && props.pauseOnHover) {
      clearInterval(autoplayRef.current);
      controls.stop();
    }
  };


  const handleMouseLeave = () => {
    if (props.autoplay && props.pauseOnHover) {
      controls.start({
        rotateY: rotation.get() - (360 / faceCount),
        transition: { duration: duration, ease: "linear" },
      });

      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - (360 / faceCount),
          transition: { duration: duration, ease: "linear" },
        });
      }, interval);
    }
  };


  function handleClick(event: h.JSX.TargetedMouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const href = (event.currentTarget as HTMLAnchorElement).href;
    setTimeout(() => {
      window.location.href = href;
    }, DELAY_REACH_HREF);
  }


  return (
    <div class="rolling-gallery-container">
      <div class="rolling-gallery-content">
        <motion.div
          animate={controls}
          class="rolling-gallery-track"
          drag="x"
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateY: rotation,
            transform: transform,
            transformStyle: "preserve-3d",
          }}
        >
          {props.images.map((p, i) => (
            <div
              key={i}
              class="rolling-gallery-item"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`}}
            >
              <a
                href={"/art/" + p.artist_slug + "?alone&id=" + p.id}
                onClick={handleClick}
                class="cursor-pointer"
                draggable={draggable}
              >
                <img loading="lazy"
                  src={p.url}
                  class="rolling-gallery-img transform-gpu will-change-transform"
                  alt="Urarts"
                  draggable={draggable}
                />
              </a>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
