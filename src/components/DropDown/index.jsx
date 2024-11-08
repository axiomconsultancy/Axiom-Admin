// CategoryDropdown.js
import { Select } from "@mantine/core";

const CategoryDropdown = ({ label, placeholder, data, form, validateName }) => {

    const categoryLabel = data.map((category)=> {
        return category.label
    })

    console.log("categoryLabel : " , categoryLabel)

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={categoryLabel} // Pass options array here
      {...form.getInputProps(validateName)}
      withAsterisk
    />
  );
};

export default CategoryDropdown;
