import * as yup from "yup";

export const calculationFormSchema = yup.object({
  weight: yup.number().required("Weight parameter is required"),
  targetHb: yup.number().required("Target hemoglobin level is required"),
  actualHb: yup.number().required("Email is required"),
});
