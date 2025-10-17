import * as yup from "yup";

export const calculationFormSchema = yup.object({
  weight: yup.string().required("Weight is required"),
  targetHb: yup.string().required("Target Hb is required"),
  actualHb: yup.string().required("Actual Hb is required").test(
      "less-than-target",
      "Actual Hb must be less than Target Hb",
      function (value) {
        const { targetHb } = this.parent;

        const targetHbNumber = Number(targetHb)
        const actualHbNuumber = Number(value)
        if (actualHbNuumber == null || targetHbNumber == null) return true;
        return actualHbNuumber < targetHbNumber;
      }
  ),
});
