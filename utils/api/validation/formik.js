

export const validateForFormik = shema =>
  (values) => {
    const result = shema.safeParse(values);
    if (result.success) return {};
    const errors = {};
    Object.keys(result.error.format()).forEach((key) => {
      if (key !== "_errors") {
        errors[key] = result.error.format()[key]?._errors?.[0];
      }
    });
    return errors;
  };
