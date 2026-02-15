type UIImageProps = {
  src: string;
  alt?: string;
  ratio?: string;
  fit?: "cover" | "contain";
  className?: string;
};

export function Image({
  src,
  alt = "",
  ratio = "",
  fit = "cover",
  className = "",
}: UIImageProps) {
  return (
    <div
      className={`w-full h-auto overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img src={src} alt={alt} className={`w-full h-full object-${fit}`} />
    </div>
  );
}
