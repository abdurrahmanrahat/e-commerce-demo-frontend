import { useFormContext } from "react-hook-form";
import AsyncProductSelect from "./AsyncProductSelect";

const ProductSelection = () => {
  const { watch } = useFormContext();
  const scope = watch("scope");
  return (
    <div>
      {scope === "specific" && (
        <div className="grid gap-1">
          <label className="text-sm font-medium">
            Select Products <span className="text-red-500">*</span>
          </label>

          <AsyncProductSelect name="productIds" />
        </div>
      )}
    </div>
  );
};

export default ProductSelection;
