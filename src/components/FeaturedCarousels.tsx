"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

// Updated movie data with image URLs
const MOVIES = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: "Sci-Fi, Action",
    director: "Christopher Nolan",
    imageUrl:
      "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genre: "Drama",
    director: "Frank Darabont",
    imageUrl:
      "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: "Action, Crime, Drama",
    director: "Christopher Nolan",
    imageUrl:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    genre: "Crime, Drama",
    director: "Quentin Tarantino",
    imageUrl:
      "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Parasite",
    year: 2019,
    rating: 8.6,
    genre: "Comedy, Drama, Thriller",
    director: "Bong Joon Ho",
    imageUrl:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    genre: "Adventure, Drama, Sci-Fi",
    director: "Christopher Nolan",
    imageUrl:
      "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    genre: "Crime, Drama",
    director: "Francis Ford Coppola",
    imageUrl:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    title: "Fight Club",
    year: 1999,
    rating: 8.8,
    genre: "Drama",
    director: "David Fincher",
    imageUrl:
      "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
] as const;

const CONFIG = {
  DRAG_THRESHOLD: 50,
  SWIPE_THRESHOLD: 100,
  CARD_GAP: 1,
  AUTO_RESUME_DELAY: 1000,
  ROTATION_SPEED: 0.2,
  CARD_ASPECT_RATIO: 1.5,
} as const;

type DragState = {
  isDragging: boolean;
  startX: number;
  currentX: number;
  distance: number;
};

const useResponsiveCardSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const updateSize = useCallback(() => {
    const viewportWidth = window.innerWidth;

    // Simple percentage-based calculation with max/min limits
    const baseFontSize = 16; // Standard base font size
    const minWidth = baseFontSize * 10; // 160px minimum
    const maxWidth = baseFontSize * 20; // 320px maximum

    // Calculate width as percentage of viewport (scales smoothly)
    const percentage = Math.min(
      0.25,
      Math.max(0.15, 0.25 - viewportWidth * 0.00005)
    );
    let width = Math.round(viewportWidth * percentage);

    // Apply constraints
    width = Math.max(minWidth, Math.min(width, maxWidth));
    const height = Math.round(width * CONFIG.CARD_ASPECT_RATIO);

    setSize({ width, height });
  }, []);

  useEffect(() => {
    updateSize();
    const handleResize = () => updateSize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateSize]);

  return size;
};
const useAutoAnimation = (isEnabled: boolean, rotationSpeed: number) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isEnabled) return;

    let animationId: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      setRotation((prev) => prev + (rotationSpeed * deltaTime) / 16);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isEnabled, rotationSpeed]);

  return { rotation, setRotation };
};

export default function FeaturedCarousels() {
  const { width: CARD_WIDTH, height: CARD_HEIGHT } = useResponsiveCardSize();
  const [isAutoAnimating, setIsAutoAnimating] = useState(true);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    currentX: 0,
    distance: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { rotation: totalRotation, setRotation: setTotalRotation } =
    useAutoAnimation(isAutoAnimating, CONFIG.ROTATION_SPEED);

  const theta = useMemo(() => 360 / MOVIES.length, []);

  const radius = useMemo(() => {
    const cardWidthInRem = CARD_WIDTH / 16; // Convert px to rem (assuming 16px base)
    const circumference =
      (cardWidthInRem + CONFIG.CARD_GAP) * MOVIES.length * 16; // Back to px
    return Math.round(circumference / (2 * Math.PI));
  }, [CARD_WIDTH]);

  const containerDimensions = useMemo(
    () => ({
      width: Math.round(radius * 2 + CARD_WIDTH + CONFIG.CARD_GAP),
      height: Math.round(CARD_HEIGHT + 100),
    }),
    [radius, CARD_WIDTH, CARD_HEIGHT]
  );

  const pauseAutoAnimation = useCallback(() => {
    setIsAutoAnimating(false);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const scheduleAutoAnimationResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsAutoAnimating(true);
    }, CONFIG.AUTO_RESUME_DELAY);
  }, []);

  const rotateCarousel = useCallback(
    (direction: "left" | "right" | "toIndex", index?: number) => {
      pauseAutoAnimation();

      if (direction === "toIndex" && index !== undefined) {
        const currentIndex = Math.round(totalRotation / theta) % MOVIES.length;
        const diff =
          index -
          (((currentIndex % MOVIES.length) + MOVIES.length) % MOVIES.length);
        setTotalRotation((prev) => prev + diff * theta);
      } else {
        const increment = direction === "left" ? theta : -theta;
        setTotalRotation((prev) => prev + increment);
      }

      scheduleAutoAnimationResume();
    },
    [
      pauseAutoAnimation,
      scheduleAutoAnimationResume,
      totalRotation,
      theta,
      setTotalRotation,
    ]
  );

  const handleDragStart = useCallback(
    (clientX: number) => {
      pauseAutoAnimation();
      setDragState((prev) => ({
        ...prev,
        isDragging: true,
        startX: clientX,
        currentX: clientX,
        distance: 0,
      }));
    },
    [pauseAutoAnimation]
  );

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!dragState.isDragging || !containerRef.current) return;

      const distance = dragState.startX - clientX;
      setDragState((prev) => ({ ...prev, currentX: clientX, distance }));

      const rotationFactor = distance / 10;
      containerRef.current.style.transform = `translateZ(${-radius}px) rotateY(${
        -totalRotation - rotationFactor
      }deg)`;
    },
    [dragState.isDragging, dragState.startX, totalRotation, radius]
  );

  const handleDragEnd = useCallback(() => {
    if (!dragState.isDragging) return;

    setDragState((prev) => ({ ...prev, isDragging: false }));
    const threshold = CONFIG.DRAG_THRESHOLD;
    const absDistance = Math.abs(dragState.distance);

    if (absDistance > threshold) {
      rotateCarousel(dragState.distance > 0 ? "left" : "right");
    } else if (containerRef.current) {
      containerRef.current.style.transform = `translateZ(${-radius}px) rotateY(${-totalRotation}deg)`;
    }

    setDragState((prev) => ({ ...prev, distance: 0 }));
    scheduleAutoAnimationResume();
  }, [
    dragState.isDragging,
    dragState.distance,
    rotateCarousel,
    radius,
    totalRotation,
    scheduleAutoAnimationResume,
  ]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      handleDragStart(e.clientX);
    },
    [handleDragStart]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleDragMove(e.clientX);
    },
    [handleDragMove]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleDragStart(touch.clientX);
    },
    [handleDragStart]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      handleDragMove(touch.clientX);
    },
    [handleDragMove]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 10) {
        rotateCarousel(e.deltaY > 0 ? "left" : "right");
      }
    },
    [rotateCarousel]
  );

  useEffect(() => {
    const cleanup = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };

    if (dragState.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleDragEnd);
    }

    return cleanup;
  }, [dragState.isDragging, handleMouseMove, handleDragEnd, handleTouchMove]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateZ(${-radius}px) rotateY(${-totalRotation}deg)`;
    }
  }, [totalRotation, radius]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          duration: 1.5,
          ease: "power3.out",
        },
      });

      tl.add("start")
        .from(".title-badge", {
          y: 20,
          autoAlpha: 0,
        })
        .from(
          ".title-word",
          {
            y: 30,
            autoAlpha: 0,
            stagger: 0.2,
            duration: 4,
          },
          "start+=0.4"
        );
    },
    { scope: titleRef }
  );

  return (
    <section className="relative bg-linear-to-br from-gray-900 to-black overflow-hidden flex justify-center items-center px-4 py-8">
      <div className="container mx-auto">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative flex-col-center w-full mx-auto">
          {/* Enhanced Title Section */}
          <div className="text-center w-full max-w-4xl">
            <div ref={titleRef} className="mb-4 md:mb-6">
              <span className="title-badge inline-block bg-linear-to-r from-amber-400 via-yellow-400 text-transparent bg-clip-text to-amber-500 font-semibold tracking-wider uppercase mb-2">
                Curated Collection
              </span>
              <h2 className="font-size-hero">
                <span className="title-word bg-linear-to-r from-white via-gray-100 to-gray-300  text-transparent bg-clip-text">
                  Cinematic
                </span>
                <span className="title-word bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500 text-transparent ml-3 bg-clip-text">
                  Masterpieces
                </span>
              </h2>
            </div>

            <div className="mb-6 md:mb-8">
              <p className="text-gray-200">
                Explore timeless classics and modern triumphs that define
                cinematic excellence across generations
              </p>
            </div>

            {/* Divider */}
            <div className="relative w-80 h-0.5 mx-auto">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-gray-500 to-transparent" />
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-amber-500 rounded-full blur-md" />
            </div>
          </div>

          {/* Status Indicator */}

          <div className="relative w-full flex justify-center">
            <div
              className="relative mx-auto"
              style={{
                perspective: "1200px",
                width: `${containerDimensions.width}px`,
                height: `${containerDimensions.height}px`,
                maxWidth: "95vw",
              }}
            >
              {dragState.isDragging && (
                <div className="absolute inset-0 z-50 bg-transparent flex items-center justify-center">
                  <div className="text-white bg-black/70 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-lg font-medium">
                    {dragState.distance > 0
                      ? "← Rotating clockwise"
                      : "Rotating counter-clockwise →"}
                  </div>
                </div>
              )}

              <div
                ref={containerRef}
                className="absolute w-full h-full transition-transform duration-300 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${-radius}px) rotateY(${-totalRotation}deg)`,
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onWheel={handleWheel}
              >
                {MOVIES.map((movie, i) => {
                  const cardRotation = theta * i;
                  return (
                    <article
                      key={movie.id}
                      className="absolute rounded-xl md:rounded-2xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing group transition-all duration-300 hover:scale-105 hover:z-20"
                      style={{
                        width: `${CARD_WIDTH}px`,
                        height: `${CARD_HEIGHT}px`,
                        top: `calc(50% - ${CARD_HEIGHT / 2}px)`,
                        left: `calc(50% - ${CARD_WIDTH / 2}px)`,
                        transform: `rotateY(${cardRotation}deg) translateZ(${radius}px)`,
                      }}
                      onClick={() => rotateCarousel("toIndex", i)}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${movie.imageUrl})` }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent opacity-90" />
                      <div className="relative h-full flex flex-col justify-end p-3 md:p-4 lg:p-6">
                        <div className="absolute top-2 md:top-3 right-2 md:right-4">
                          <span className="bg-yellow-500/90 backdrop-blur-sm text-black px-2 py-0.5 md:px-3 md:py-1 rounded-lg font-bold text-xs md:text-sm whitespace-nowrap">
                            ★ {movie.rating}
                          </span>
                        </div>
                        <div className="absolute top-2 md:top-3 left-2 md:left-4">
                          <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 md:px-3 md:py-1 rounded-lg font-medium text-xs md:text-sm">
                            {movie.year}
                          </span>
                        </div>
                        <div className="mb-2 md:mb-4">
                          <h3 className="text-sm md:text-base lg:text-xl xl:text-2xl font-bold text-white drop-shadow-lg line-clamp-2">
                            {movie.title}
                          </h3>
                          <p className="text-gray-300 text-xs md:text-sm mt-1 font-medium line-clamp-2">
                            {movie.genre}
                          </p>
                        </div>
                        <p className="text-gray-400 text-xs mb-2 md:mb-4 line-clamp-2">
                          Directed by{" "}
                          <span className="text-white font-semibold">
                            {movie.director}
                          </span>
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
