
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToggleViewProps {
  options: string[];
  defaultOption?: string;
  onChange?: (option: string) => void;
  className?: string;
}

export const ToggleView = ({
  options,
  defaultOption,
  onChange,
  className,
}: ToggleViewProps) => {
  const [activeOption, setActiveOption] = useState(defaultOption || options[0]);

  const handleOptionChange = (option: string) => {
    setActiveOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className={cn("inline-flex bg-secondary rounded-lg p-1", className)}>
      {options.map((option) => (
        <Button
          key={option}
          variant={activeOption === option ? "default" : "ghost"}
          className={cn(
            "rounded-md text-sm font-medium transition-colors",
            activeOption === option 
              ? "bg-white text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => handleOptionChange(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default ToggleView;
