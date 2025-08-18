import * as yup from "yup";
import { calculationFormSchema } from "@/app/schemas/calculationForm.schema";

export type CalculationFormValues = {
  weight: string;
  targetHb: string;
  actualHb: string;
};
