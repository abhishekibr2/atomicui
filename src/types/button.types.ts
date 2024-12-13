export interface ButtonConfig {
  label?: string;
  variant?: 'link' | 'outline' | 'default' | 'destructive' | 'secondary' | 'ghost'; // Match the variants from your Button component
  color?: string; // Color can be a hex code or a color name
  size?: 'small' | 'medium' | 'large'; // Define sizes
  onClick?: () => void; // Click handler
}
