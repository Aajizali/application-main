import { Platform, Dimensions } from 'react-native';

// Guideline (Figma design frame) dimensions all design-spec sizes are based on.
export const GUIDELINE_BASE_WIDTH = 440;
export const GUIDELINE_BASE_HEIGHT = 956;

const getDimensions = () => {
  const { width, height } = Dimensions.get('window');
  if (Platform.OS === 'web') {
    const cappedWidth = Math.min(width, 480);
    const maxCappedHeight = cappedWidth * (GUIDELINE_BASE_HEIGHT / GUIDELINE_BASE_WIDTH);
    const cappedHeight = Math.min(height, maxCappedHeight);
    return { width: cappedWidth, height: cappedHeight };
  }
  return { width, height };
};

// Re-export wp and hp, but computed using our custom dimensions for Web compatibility
export const wp = percentage => {
  const { width } = getDimensions();
  const value = parseFloat(percentage);
  return (value / 100) * width;
};

export const hp = percentage => {
  const { height } = getDimensions();
  const value = parseFloat(percentage);
  return (value / 100) * height;
};

// Scale a design-spec size responsively to the screen.
export const responsiveWidth = size => {
  const { width } = getDimensions();
  return (size / GUIDELINE_BASE_WIDTH) * width;
};

export const responsiveHeight = size => {
  const { height } = getDimensions();
  return (size / GUIDELINE_BASE_HEIGHT) * height;
};
