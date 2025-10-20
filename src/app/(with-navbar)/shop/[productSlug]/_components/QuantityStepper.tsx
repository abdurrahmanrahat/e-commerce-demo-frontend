import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

export const QuantityStepper = ({
  value,
  onChange,
  min = 1,
  max = 999,
  size = "md",
}: QuantityStepperProps) => {
  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-10 w-10",
  };

  const inputSizes = {
    sm: "h-7 w-12 text-xs",
    md: "h-9 w-14 text-sm",
    lg: "h-10 w-16 text-base",
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className={sizeClasses[size]}
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3 h-3" />
      </Button>

      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className={`${inputSizes[size]} text-center border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring`}
        aria-label="Quantity"
      />

      <Button
        variant="outline"
        size="icon"
        className={sizeClasses[size]}
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  );
};
