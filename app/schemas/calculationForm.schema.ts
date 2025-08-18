import * as yup from "yup";

export const calculationFormSchema = yup.object({
  weight: yup.string().required("Weight is required"),
  targetHb: yup.string().required("Target Hb is required"),
  actualHb: yup.string().required("Actual Hb is required"),
});
