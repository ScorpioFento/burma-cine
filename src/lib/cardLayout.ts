/**
 * -----------------------------------------------------------
 * Calculate responsive card width/height based on:
 *   - fixed number of columns, OR
 *   - responsive rules based on max viewport width.
 *
 * Example usage:
 *
 * 1) Fixed layout:
 *    calculateCardSize(viewportWidth, {
 *      fixedColumns: 4,
 *      columnGap: 12,
 *      aspectRatio: 1.4
 *    })
 *
 * 2) Responsive layout:
 *    calculateCardSize(viewportWidth, {
 *      responsiveRules: [
 *        { maxWidth: 640, columns: 2 },
 *        { maxWidth: 768, columns: 3 },
 *        { maxWidth: 1024, columns: 4 },
 *        { maxWidth: Infinity, columns: 6 }
 *      ],
 *      columnGap: 16,
 *      aspectRatio: 1.3
 *    })
 *
 * @returns { width: number, height: number }
 * -----------------------------------------------------------
 */

export interface ResponsiveRule {
  maxWidth: number;
  columns: number;
}

export interface CardLayoutOptions {
  fixedColumns?: number | null;     
  responsiveRules?: ResponsiveRule[] | null; 
  columnGap?: number;                
  aspectRatio?: number;              
}

export function calculateCardSize(
  viewportWidth: number,
  options: CardLayoutOptions = {}
): { width: number; height: number } {
  if (!viewportWidth || viewportWidth <= 0) {
    return { width: 0, height: 0 };
  }

  const {
    fixedColumns = null,
    responsiveRules = null,
    columnGap = 0,
    aspectRatio = 1,
  } = options;

 
  let columns = fixedColumns;

  if (!columns && responsiveRules?.length) {
    const matchedRule =
      responsiveRules.find((rule) => viewportWidth <= rule.maxWidth) ??
      responsiveRules[responsiveRules.length - 1];

    columns = matchedRule?.columns ?? 1;
  }
  if (!columns || columns <= 0) columns = 1;
  const totalGap = columnGap * (columns - 1);
  const cardWidth = (viewportWidth - totalGap) / columns;
  const cardHeight = cardWidth * aspectRatio;

  return {
    width: Math.round(cardWidth),
    height: Math.round(cardHeight),
  };
}

