interface CheckoutStepsProps {
  currentStep: 1 | 2 | 3;
}

export const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  const steps = [
    { number: 1, label: "Cart" },
    { number: 2, label: "Checkout" },
    { number: 3, label: "Confirmation" },
  ];

  return (
    <div className="flex items-center justify-center gap-4 md:gap-8 py-6">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-semibold transition-colors ${
                step.number === currentStep
                  ? "bg-primary text-primary-foreground"
                  : step.number < currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step.number}
            </div>
            <span
              className={`text-sm md:text-base font-medium ${
                step.number === currentStep
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`h-[2px] w-12 md:w-24 ${
                step.number < currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
