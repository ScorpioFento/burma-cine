function calculateCarouselCardSize(
  containerWidth: number,
  totalItems: number,
  options: {
    minWidth?: number;
    maxWidth?: number;
    aspectRatio?: number;
    spacingFactor?: number; // adjust carousel spacing
  } = {}
) {
  const {
    minWidth = 180,
    maxWidth = 320,
    aspectRatio = 1.25,
    spacingFactor = 1.2,
  } = options;

  if (!containerWidth || containerWidth <= 0) {
    return {
      cardWidth: minWidth,
      cardHeight: minWidth * aspectRatio,
      radius: 300,
    };
  }

  // Make card width responsive to screen size
  let cardWidth = Math.min(maxWidth, Math.max(minWidth, containerWidth * 0.2));

  // Calculate height
  const cardHeight = cardWidth * aspectRatio;

  // Calculate dynamic radius based on card width + spacing
  const radius = Math.round(
    (cardWidth * spacingFactor) / (2 * Math.tan(Math.PI / totalItems))
  );

  return { cardWidth, cardHeight, radius };
}

//* Use for Query string
function toQueryString<T extends object>(params: T): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (
      value !== undefined &&
      value !== null &&
      (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean")
    ) {
      searchParams.append(key, String(value));
    }
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export { calculateCarouselCardSize, toQueryString };
