import React from "react";
import { MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      size="small"
      border="none"
      sx={{ color: "black", ml: 2 ,border:'none'}}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="ar">العربية</MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;
