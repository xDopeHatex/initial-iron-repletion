"use client";

import { useForm } from "react-hook-form";
import { CalculationFormValues } from "@/app/types/calculationsForm.types";
import { calculationFormSchema } from "@/app/schemas/calculationForm.schema";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Home() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CalculationFormValues>({
    resolver: yupResolver(calculationFormSchema),
    defaultValues: {
      weight: 0,
      targetHb: 0,
      actualHb: 0,
    },
  });

  const onSubmit = (data: CalculationFormValues) => {
    console.log("✅ Submitted:", data);
  };

  return (
    <div className="max-w-full min-h-screen flex flex-col bg-primary-blue-dark">
      <div className="mx-auto my-24 text-secondary-gray-medium bg-secondary-gray-light min-w-1/2 p-4 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
          <div>
            <label className="block">Weight</label>
            <input
              type="number"
              {...register("weight", { valueAsNumber: true })}
              className="border p-2 w-full"
            />
            <p className="text-red-600 text-sm">{errors.weight?.message}</p>
          </div>

          <div>
            <label className="block">Target Hb</label>
            <input
              type="number"
              {...register("targetHb", { valueAsNumber: true })}
              className="border p-2 w-full"
            />
            <p className="text-red-600 text-sm">{errors.targetHb?.message}</p>
          </div>

          <div>
            <label className="block">Actual Hb</label>
            <input
              type="number"
              {...register("actualHb", { valueAsNumber: true })}
              className="border p-2 w-full"
            />
            <p className="text-red-600 text-sm">{errors.actualHb?.message}</p>
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
