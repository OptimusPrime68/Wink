import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import "./styles/landingPage.css";

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
      <select
        id="languageSupport"
        value={localStorage.getItem("i18nextLng")}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
      </select>
    </>
  );
};

export default Language;
