import React, { RefObject } from "react";
import { Control, Controller } from "react-hook-form";
import { CalculationFormValues } from "@/app/types/calculationsForm.types";

interface NumberInputProps {
  control: Control<CalculationFormValues, any, CalculationFormValues>;
  inputRef: RefObject<HTMLInputElement | null>;
  currentValue: string;
  errorMessage: string | undefined;
  controllerName: "weight" | "targetHb" | "actualHb";
  measurementUnit: string;
  label: string;
  placeholder: string;
  classes?: string;
}

function hasOneDot(str: string): boolean {
  // regex: start, any chars except dot, one dot, any chars except dot, end

    const regex = /^[^.,]*[.,][^.,]*$/;
  return regex.test(str);
}

const NumberInput = ({
  control,
  inputRef,
  currentValue,
  errorMessage,
  measurementUnit,
  controllerName,
  label,
  placeholder,
  classes,
}: NumberInputProps) => {
  return (
    <div className={`flex items-center ${classes} relative`}>
      <label className="block text-secondary-gray-dark">{label}</label>
      <div
        className="border border-secondary-gray-dark rounded-lg px-4 py-2 cursor-text flex max-w-56"
        onClick={() => inputRef.current?.focus()}
      >
        <Controller
          name={controllerName}
          control={control}
          render={({ field }) => {
            const raw = String(field.value ?? "");
            const size = Math.max(1, raw.length);

            return (
              <input
                {...field}
                maxLength={7}
                placeholder={placeholder}
                className="appearance-none bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 m-0 font-mono"
                size={field.value ? size : 12}
                type="number" inputMode="decimal" step="any"
                value={raw}
                ref={inputRef}
                onChange={(e) => {
                  const isHasOneDot = hasOneDot(field.value.toString());

                  let newChar;

                  console.log('e.target.value.length > field.value.length>>', e.target.value.length > field.value.length)

                  if (e.target.value.length > field.value.length) {
                    for (let i = 0; i < e.target.value.length; i++) {
                      if (field.value[i] !== e.target.value[i]) {
                        newChar = e.target.value[i];
                        break;
                      }
                    }
                  }

                  if (isHasOneDot && newChar === ".") {
                    return;
                  } else {
                    const onlyDigits = e.target.value.replace(/[^0-9.]/g, "");

                    field.onChange(onlyDigits);
                  }
                }}
              />
            );
          }}
        />
        {currentValue && (
          <span className="text-gray-500 -ml-1">{measurementUnit}</span>
        )}
      </div>

      <p className="text-red-600 text-sm absolute top-12 right-0">
        {errorMessage}
      </p>
    </div>
  );
};

export default NumberInput;
