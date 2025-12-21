"use client";
import { useRef } from "react";

type BannerItem = {
  img: string;
  title: string;
  genres: string;
  year: string;
};

export default function Banner() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const banners: BannerItem[] = [
    {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Documentary",
      year: "2019",
    },
    {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Horror",
      year: "2021",
    },
    {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Documentary",
      year: "2017",
    },
      {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Documentary",
      year: "2019",
    },
    {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Horror",
      year: "2021",
    },
    {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Documentary",
      year: "2017",
    },
      {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Documentary",
      year: "2019",
    },
    {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Horror",
      year: "2021",
    },
    {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Documentary",
      year: "2017",
    },
      {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Documentary",
      year: "2019",
    },
    {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Horror",
      year: "2021",
    },
    {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Documentary",
      year: "2017",
    },
      {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Documentary",
      year: "2019",
    },
    {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Horror",
      year: "2021",
    },
    {
      img: "https://flixtv.volkovdesign.com/main/img/home/4.jpg",
      title: "The Empty Man",
      genres: "Documentary",
      year: "2017",
    },
  ];

  return (
    <section className="relative py-6">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-hidden group"
      > 
        <div className="flex gap-5 animate-scroll-loop group-hover:[animation-play-state:paused]">
        {banners.map((item, index) => (
          <BannerCard key={index} item={item} />
        ))}
        </div>
      </div>
    </section>
  );
}
function BannerCard({ item }: { item: BannerItem }) {
  return (
    <article className="card min-w-[300px] relative overflow-hidden rounded-xl group/card">
      <figure>
        <img
          src={item.img}
          alt={`${item.title} movie poster`}
          className="w-full h-64 object-cover transition duration-500 group-hover/card:scale-110"
        />
        <figcaption className="absolute bottom-3 left-3 text-white z-10 pointer-events-auto">
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-sm opacity-80 flex items-center gap-2 leading-tight">
            <span>{item.genres}</span>
            <span>{item.year}</span>
          </p>
        </figcaption>
      </figure>
    </article>
  );
}
