import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const QuantityStepper = ({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityStepperProps) => {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center gap-2 border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="min-w-[2rem] text-center font-medium">{value}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
