// Color definitions for the water dashboard
export const BASE_COLOR = "#4E4456";      // Dark Purple/Aubergine
export const SECONDARY_COLOR = "#8A7A94";  // Lighter Purple
export const ACCENT_COLOR = "#8ACCD5";     // Teal/Light Blue
export const SUCCESS_COLOR = "#50C878";    // Green
export const WARNING_COLOR = "#FFB347";    // Orange
export const DANGER_COLOR = "#FF6B6B";     // Red
export const INFO_COLOR = "#5BC0DE";       // Blue
export const NEUTRAL_COLOR = "#ADB5BD";    // Gray

// Zone-specific colors
export const ZONE_COLORS = [
  "#8ACCD5", // Teal/Light Blue (primary accent)
  "#4E4456", // Dark Purple/Aubergine
  "#5BC0DE", // Info Blue
  "#50C878", // Success Green
  "#FFB347", // Warning Orange
  "#FF6B6B", // Danger Red
];

// Function to generate a gradient
export const generateGradient = (startColor: string, endColor: string) => {
  return `linear-gradient(135deg, ${startColor} 0%, ${endColor} 100%)`;
};