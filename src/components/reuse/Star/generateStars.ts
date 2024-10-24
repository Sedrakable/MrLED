export interface Position {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const generateStarPositions = (
  blockWidth: number,
  blockHeight: number
): Position[] => {
  const ROW_HEIGHT = 200; // Height of each row
  const HORIZONTAL_PADDING = 32; // Minimum distance from edges
  const MIN_STAR_SIZE = 60;
  const MAX_STAR_SIZE = 140;
  const MIN_OPACITY = 0.05; // Opacity for largest stars
  const MAX_OPACITY = 0.3; // Opacity for smallest stars

  // Calculate number of rows
  const numberOfRows = Math.floor(blockHeight / ROW_HEIGHT);
  const positions: Position[] = [];

  // Generate one star for each row
  for (let row = 0; row < numberOfRows; row++) {
    // Calculate y position with some random variation within the row
    const y =
      row * ROW_HEIGHT +
      (Math.random() * (ROW_HEIGHT * 0.6) + ROW_HEIGHT * 0.2);

    // Randomly choose left (0-30%) or right (70-100%) side
    const isLeftSide = Math.random() < 0.5;

    let x;
    if (isLeftSide) {
      // Calculate x position in left 30%
      x =
        Math.random() * (blockWidth * 0.3 - HORIZONTAL_PADDING) +
        HORIZONTAL_PADDING;
    } else {
      // Calculate x position in right 30%
      x =
        blockWidth * 0.7 +
        Math.random() * (blockWidth * 0.3 - HORIZONTAL_PADDING);
    }

    // Generate random size between MIN_STAR_SIZE and MAX_STAR_SIZE
    const size =
      Math.random() * (MAX_STAR_SIZE - MIN_STAR_SIZE) + MIN_STAR_SIZE;

    // Calculate opacity based on size (inverse relationship)
    // When size is MIN_STAR_SIZE -> opacity will be MAX_OPACITY
    // When size is MAX_STAR_SIZE -> opacity will be MIN_OPACITY
    const opacity =
      MAX_OPACITY -
      ((size - MIN_STAR_SIZE) / (MAX_STAR_SIZE - MIN_STAR_SIZE)) *
        (MAX_OPACITY - MIN_OPACITY);

    positions.push({ x, y, size, opacity });
  }

  return positions;
};
