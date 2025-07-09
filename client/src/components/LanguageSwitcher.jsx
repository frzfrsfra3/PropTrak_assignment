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
      sx={{ 
        color: "black", 
        ml: 2,
        border: 'none',
        '& .MuiSelect-icon': {
          color: 'black' // ensures the dropdown icon is visible
        }
      }}
    >
      <MenuItem value="en">
        <div className="flex items-center">
          <img 
            src="https://flagcdn.com/w20/gb.png" 
            alt="English" 
            className="w-5 h-5 mr-2"
          />
          English
        </div>
      </MenuItem>
      <MenuItem value="ar">
        <div className="flex items-center">
          <img 
            src="https://flagcdn.com/w20/sa.png" 
            alt="العربية" 
            className="w-5 h-5 mr-2"
          />
          العربية
        </div>
      </MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;