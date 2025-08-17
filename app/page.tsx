"use client";

import { useForm, Controller } from "react-hook-form";
import { CalculationFormValues } from "@/app/types/calculationsForm.types";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const weightInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CalculationFormValues>({
    defaultValues: {
      weight: "",
    },
  });

  const onSubmit = (data: CalculationFormValues) => {
    console.log("✅ Submitted:", data);
  };

  const [width, setWidth] = useState(20);

  useEffect(() => {
    console.log("weight>>", getValues("weight"));

    setWidth(weightInputRef?.current ? weightInputRef.current.offsetWidth : 0);
  }, [getValues("weight")]);

  const weight = watch("weight");

  function hasOneDot(str: string): boolean {
    // regex: start, any chars except dot, one dot, any chars except dot, end

    const regex = /^[^.]*\.[^.]*$/;
    return regex.test(str);
  }

  function hasTwoDot(str: string): boolean {
    // regex: start, any chars except dot, one dot, any chars except dot, end

    const regex = /\..*\./;
    return regex.test(str);
  }

  return (
    <div className="max-w-full min-h-screen flex flex-col bg-primary-blue-dark">
      <div className="mx-auto my-24 text-secondary-gray-medium bg-secondary-gray-light min-w-1/2 p-4 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
          <div className="flex gap-4">
            <label className="block">Weight</label>
            <div
              className="border rounded-lg px-2 cursor-text flex max-w-56"
              onClick={() => weightInputRef.current?.focus()}
            >
              <Controller
                name="weight"
                control={control}
                render={({ field }) => {
                  const raw = String(field.value ?? "");
                  console.log(
                    "hasOneDot(weight.toString())>>",
                    hasOneDot(weight.toString()),
                  );

                  const size = Math.max(1, raw.length); // 1–3 in your case

                  return (
                    <input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="weight in kg"
                      className="appearance-none bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 m-0 font-mono"
                      size={getValues("weight") ? size : 12}
                      value={raw}
                      ref={weightInputRef}
                      onChange={(e) => {
                        const isHasOneDot = hasOneDot(weight.toString());
                        const isTwoDots = hasTwoDot(weight.toString());
                        let newChar;

                        if (e.target.value.length > weight.length) {
                          for (let i = 0; i < e.target.value.length; i++) {
                            if (weight[i] !== e.target.value[i]) {
                              newChar = e.target.value[i];
                              break;
                            }
                          }
                        }

                        if (isHasOneDot && newChar === ".") {
                          return;
                        } else {
                          const onlyDigits = e.target.value.replace(
                            /[^0-9.]/g,
                            "",
                          );

                          field.onChange(onlyDigits);
                        }
                      }}
                    />
                  );
                }}
              />
              {weight && <span className="text-gray-500 -ml-1">kg</span>}
            </div>

            <p className="text-red-600 text-sm">{errors.weight?.message}</p>
          </div>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
