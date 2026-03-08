import { useMemo } from "react";
import { Image } from "../ui/Image";
import { calculateCardSize } from "../../lib/cardLayout";
import { useViewportWidth } from "../../hooks/useViewPortWidth";
import "./Banner.css";

type BannerItem = {
  id : Number;
  img: string;
  title: string;
  genres: string;
  year: string;
  imdb_rating? : string;
};

const GAP = 16;
const SPEED = 80;
const ASPECT_RATIO = 0.8;

const RESPONSIVE_RULES = [
  { maxWidth: 400, columns: 1.1 },
  { maxWidth: 480, columns: 1.3 },
  { maxWidth: 640, columns: 1.8 },
  { maxWidth: 768, columns: 2 },
  { maxWidth: 1024, columns: 2.5 },
  { maxWidth: 1280, columns: 3 },
  { maxWidth: Infinity, columns: 4 },
];

const BANNERS: BannerItem[] = [
  { 
    id : 1,
    img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
    title: "Movie 1",
    genres: "Documentary",
    year: "2019",
  },
  { 
    id : 2,
    img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
    title: "Movie 2",
    genres: "Horror",
    year: "2021",
  },
  {
    id : 3,
    img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
    title: "Movie 3",
    genres: "Documentary",
    year: "2017",
  },
  {
    id : 4,
    img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
    title: "Movie 4",
    genres: "Action",
    year: "2019",
  },
   {
    id : 5,
    img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
    title: "Movie 5",
    genres: "Action",
    year: "2019",
  },
  {
    id : 6,
    img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
    title: "Movie 6",
    genres: "Action",
    year: "2019",
  },
   {
    id : 7,
    img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
    title: "Movie 7",
    genres: "Action",
    year: "2019",
  },
   {
    id : 8,
    img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
    title: "Movie 8",
    genres: "Action",
    year: "2019",
  },

  
];

export default function Banner() {
  const { width: viewportWidth, isResizing } = useViewportWidth();

  const { width: cardWidth, height: cardHeight } = useMemo(() => {
    return calculateCardSize(viewportWidth, {
      responsiveRules: RESPONSIVE_RULES,
      columnGap: GAP,
      aspectRatio: ASPECT_RATIO,
    });
  }, [viewportWidth]);

  const loopItems = useMemo(() => [...BANNERS, ...BANNERS], []);

  const trackWidth = BANNERS.length * (cardWidth + GAP);
  const duration = trackWidth / SPEED;

  return (
    <section className="relative overflow-hidden py-4">
      <div
        className={`flex ${isResizing ? "" : "animate-carousel"}`}
        style={
          {
            "--track-width": `${trackWidth}px`,
            "--duration": `${duration}s`,
            gap: `${GAP}px`,
          } as React.CSSProperties
        }
      >
        {loopItems.map((item, index) => (
          <BannerCard
            key={`${item.id}-${index}`}
            item={item}
            width={cardWidth}
            height={cardHeight}
          />
        ))}
      </div>
    </section>
  );
}
function BannerCard({
  item,
  width,
  height,
}: {
  item: BannerItem;
  width: number;
  height: number;
}) {
  return (
    <article
      className="shrink-0 rounded-xl overflow-hidden"
      style={{
        width,
        height,
        background:
          "linear-gradient(135deg, rgba(47, 128, 237, 0.15) 0%, rgba(19, 23, 32, 0.9) 100%)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="relative group w-full h-full">
        <Image
          src={item.img}
          alt={item.title}
          fit="cover"
          className="transition-transform duration-500 group-hover:scale-110 w-full h-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
        <figcaption className="absolute bottom-4 left-4 right-4 text-white z-10">
          <h2 className="text-lg md:text-xl font-bold mb-2 drop-shadow-lg">
            {item.title}
          </h2>
          <div className="flex gap-3 items-center">
            <span className="bg-primary/80 px-3 py-1 rounded text-sm font-medium">
              {item.genres}
            </span>
            <span className="bg-black/50 px-3 py-1 rounded text-sm">
              {item.year}
            </span>
          </div>
        </figcaption>
      </div>
    </article>
  );
}
