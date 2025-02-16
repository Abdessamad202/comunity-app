export const handleInputChange = (e, setErrors, setFormData) => {
  if (!e || !e.target) return;

  const { name, value } = e.target;
  if (!name) return; // check it the input name exists

  setErrors?.((prev) => ({ ...prev, [name]: "" })); // remove errors

  setFormData?.((prev) => ({
    ...prev,
    [name]: name === "code" ? value.slice(0, 6) : value.trim(), // specify the number of chars in the feild
  }));
};
