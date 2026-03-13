import { CheckCircle } from "lucide-react";

const steps = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function OrderStatusTimeline({ status }: { status: string }) {
  const activeIndex = steps.indexOf(status);

  return (
    <div className="relative w-full flex items-center justify-between">
      {/* Progress Line */}
      <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200 dark:bg-gray-800">
        <div
          className="h-[2px] bg-primary transition-all duration-500"
          style={{
            width: `${(activeIndex / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>

      {steps.map((step, index) => {
        const active = index <= activeIndex;

        return (
          <div
            key={step}
            className="relative flex flex-col items-center text-center z-10"
          >
            {/* Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
              ${
                active
                  ? "bg-primary border-primary text-white"
                  : "bg-white dark:bg-deep-dark border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
              }`}
            >
              {active ? <CheckCircle size={16} /> : index + 1}
            </div>

            {/* Label */}
            <p
              className={`text-sm mt-2 capitalize ${
                active ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
}
