"use client";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TOption = {
  value: string;
  label: string;
};

type TMYMultiSelectProps = {
  name: string;
  options: TOption[];
  placeholder?: string;
};

const MYMultiSelect = ({
  name,
  options,
  placeholder = "Select options...",
}: TMYMultiSelectProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedValues: string[] = watch(name) || [];
  const [open, setOpen] = useState(false);

  const addItem = (value: string) => {
    if (!selectedValues.includes(value)) {
      setValue(name, [...selectedValues, value]);
    }
  };

  const removeItem = (value: string) => {
    setValue(
      name,
      selectedValues.filter((v) => v !== value),
    );
  };

  const hasError = !!errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <div className="space-y-2">
          {/* Trigger */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div
                className={`flex flex-wrap gap-2 p-2 min-h-[44px] w-full cursor-pointer
                  border rounded-md transition-all
                  ${
                    hasError
                      ? "border-red-500"
                      : "border-gray-200 hover:border-primary"
                  }
                  bg-light-gray dark:bg-deep-dark`}
              >
                {selectedValues.length > 0 ? (
                  selectedValues.map((val) => {
                    const label =
                      options.find((o) => o.value === val)?.label || val;

                    return (
                      <Badge
                        key={val}
                        className="flex items-center gap-1 bg-primary text-white"
                      >
                        {label}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(val);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    );
                  })
                ) : (
                  <span className="text-sm text-gray-500 px-1">
                    {placeholder}
                  </span>
                )}
              </div>
            </PopoverTrigger>

            {/* Dropdown */}
            <PopoverContent className="p-2 w-full">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No option found</CommandEmpty>

                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => addItem(option.value)}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Error */}
          {hasError && (
            <p className="text-red-500 text-sm">
              {(errors[name]?.message as string) || "Invalid field"}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default MYMultiSelect;
