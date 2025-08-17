import * as yup from "yup";

export const calculationFormSchema = yup.object({
  weight: yup.number().required("Weight is required"),
});
