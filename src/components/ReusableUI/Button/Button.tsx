import { Button } from "@/components/ui/button";
import { ButtonConfig } from "@/types/button.types";

export function ReusableButton({ config }: { config: ButtonConfig }) {

  return (
    <Button
      variant={config.variant || 'default'}
      style={{ backgroundColor: config.variant === 'outline' ? 'transparent' : config.color, color: config.variant === 'outline' ? config.color : '#fff' }}
      className={`btn-${config.size || 'medium'}`} // Assuming you have CSS classes for sizes
      onClick={config.onClick || (() => {})}
    >
      {config.label || 'Button'}
    </Button>
  );
}