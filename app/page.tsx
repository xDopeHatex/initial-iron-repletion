"use client";

import { useForm } from "react-hook-form";
import { CalculationFormValues } from "@/app/types/calculationsForm.types";
import { useRef, useState } from "react";
import NumberInput from "@/app/components/numberInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { calculationFormSchema } from "@/app/schemas/calculationForm.schema";

export default function Home() {
  const weightInputRef = useRef<HTMLInputElement>(null);
  const actualHbInputRef = useRef<HTMLInputElement>(null);
  const targetHbInputRef = useRef<HTMLInputElement>(null);

  const [totalCumulativeDoseMg, setTotalCumulativeDoseMg] = useState<
    string | null
  >(null);
  const [doseMg, setDoseMg] = useState("300");

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid, isSubmitted },
    watch,
  } = useForm<CalculationFormValues>({
    resolver: yupResolver(calculationFormSchema),
    defaultValues: {
      weight: "",
      actualHb: "",
      targetHb: "12",
    },
    mode: "onChange",
  });

  const isButtonDisabled = (isSubmitted && !isValid) || isSubmitting;

  const onSubmit = (data: CalculationFormValues) => {
    const weightKg = Number(data.weight);
    const actualHb = Number(data.actualHb);
    const targetHb = Number(data.targetHb);

    const totalCumulativeDoseMg =
      (targetHb - actualHb) * weightKg * 0.24 + 15 * weightKg;

    setTotalCumulativeDoseMg(totalCumulativeDoseMg.toFixed(2).toString());

    if (weightKg < 42.9) {
      setDoseMg(`${(weightKg * 7).toFixed(2)}`);
    } else {
      setDoseMg("300");
    }
  };

  const weightWatcher = watch("weight");
  const actualHbWatcher = watch("actualHb");
  const targetHbWatcher = watch("targetHb");

  const howManyTimesGive = Number(totalCumulativeDoseMg) / Number(doseMg);
  const rounded = Math.round(howManyTimesGive * 100) / 100;
  const isInteger = Number.isInteger(rounded);
  const integerPart = Math.floor(howManyTimesGive);
  const fractionalPart = howManyTimesGive - integerPart;
  const fractionalDose = (fractionalPart * Number(doseMg)).toFixed(2);

  const isMostLikelyValueError =
    Number(totalCumulativeDoseMg) < 1 || Number(doseMg) < 1;

  return (
    <div className="max-w-full min-h-screen flex flex-col bg-primary-blue-dark">
      <div className="mx-auto my-24 text-secondary-gray-medium bg-secondary-gray-light min-w-1/2 p-4 rounded-lg flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-sm">
          <NumberInput
            classes="gap-[3.8rem]"
            measurementUnit="kg"
            controllerName="weight"
            label="Weight"
            placeholder="Weight in kg"
            control={control}
            inputRef={weightInputRef}
            currentValue={weightWatcher}
            errorMessage={errors.weight?.message}
          />
          <NumberInput
            classes="gap-10"
            measurementUnit="g/dl"
            controllerName="actualHb"
            label="Actual Hb"
            placeholder="Actual Hb in g/dl"
            control={control}
            inputRef={actualHbInputRef}
            currentValue={actualHbWatcher}
            errorMessage={errors.actualHb?.message}
          />
          <NumberInput
            classes="gap-10"
            measurementUnit="g/dl"
            controllerName="targetHb"
            label="Target Hb"
            placeholder="Target Hb in g/dl"
            control={control}
            inputRef={targetHbInputRef}
            currentValue={targetHbWatcher}
            errorMessage={errors.targetHb?.message}
          />

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-secondary-gray-dark"
            disabled={isButtonDisabled}
          >
            {totalCumulativeDoseMg ? "Recalculate" : "Calculate"}
          </button>
        </form>
        {totalCumulativeDoseMg && !isMostLikelyValueError && (
          <div className="bg-secondary-green-dark w-full mt-12 rounded-lg py-8 px-2 text-secondary-gray-light flex flex-col justify-center items-center gap-4">
            <p>
              Total Iron deficit :{" "}
              <span className="text-lg">{totalCumulativeDoseMg} mg</span>
            </p>
            <p>
              Recommended maximum single dose :{" "}
              <span className="text-lg">{doseMg} mg</span>
            </p>
            {isInteger ? (
              <p>
                Administer <span className="text-lg">{doseMg} mg</span>{" "}
                <span className="text-lg">{howManyTimesGive} times</span>, every
                3-7 days
              </p>
            ) : (
              <p>
                Administer <span className="text-lg">{doseMg} mg</span>{" "}
                <span className="text-lg">{integerPart} times</span> and{" "}
                <span className="text-lg">{fractionalDose} mg</span> 1 time
                every 3-7 days
              </p>
            )}
            {/*{Number(doseMg) <= 100 && (*/}
            {/*  <p>*/}
            {/*    For children over 1 month old: Dilute {doseMg} mg 1:1 with NS Infuse over 30 min*/}
            {/*  </p>*/}
            {/*)}*/}
            {/*{300 > Number(doseMg) > 100 && (*/}
            {/*    <p>*/}
            {/*      For children over 1 month old: Dilute {doseMg} */}
            {/*    </p>*/}
            {/*)}*/}
            {/*{Number(doseMg) === 300 && (*/}
            {/*    <p>*/}
            {/*      For children over 1 month old: Dilute {doseMg} in 250ml. NS. Infuse at least 1 1/2 hours */}
            {/*    </p>*/}
            {/*)}*/}
          </div>
        )}
        {totalCumulativeDoseMg && isMostLikelyValueError && (
          <div className="bg-secondary-green-dark w-full mt-12 rounded-lg py-8 px-2 text-secondary-gray-light flex flex-col justify-center items-center gap-4">
            <p>Please chech the values again, it seems there's a mistake</p>
          </div>
        )}
      </div>
    </div>
  );
}
