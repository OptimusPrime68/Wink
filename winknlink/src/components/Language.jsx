import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Language = () => {
  const { i18n, t } = useTranslation(["common"]);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <Select
          labelId="demo-select-small"
          value={localStorage.getItem("i18nextLng")}
          onChange={handleLanguageChange}
          label="Language"
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
          <MenuItem value="es">Español</MenuItem>
        </Select>
      </FormControl>
      {/* <select
        id="languageSupport"
        value={localStorage.getItem("i18nextLng")}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
      </select> */}
    </>
  );
};

export default Language;
