import React from "react";
import { SettingContainer } from "../ui/SettingContainer";
import { useUILanguage, useI18n } from "../../lib/i18n";
import { useSettings } from "../../hooks/useSettings";
import { ResetButton } from "../ui/ResetButton";

interface UILanguageSelectorProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const UILanguageSelector: React.FC<UILanguageSelectorProps> = ({
  descriptionMode = "tooltip",
  grouped = false,
}) => {
  const { getSetting, updateSetting, resetSetting, isUpdating } = useSettings();
  const { uiLanguage, handleUILanguageChange } = useUILanguage();
  const { t } = useI18n();

  const languages = [
    { value: "en", label: "English" },
    { value: "zh-CN", label: "中文" },
  ];

  const selectedLanguageName = languages.find((lang) => lang.value === uiLanguage)?.label || "English";

  const handleReset = async () => {
    await resetSetting("ui_language");
  };

  return (
    <SettingContainer
      title={t("ui_language")}
      description={t("select_language")}
      descriptionMode={descriptionMode}
      grouped={grouped}
    >
      <div className="flex items-center space-x-1">
        <div className="relative">
          <select
            className={`px-2 py-1 text-sm font-semibold bg-mid-gray/10 border border-mid-gray/80 rounded min-w-[200px] text-left transition-all duration-150 ${isUpdating("ui_language") ? "opacity-50 cursor-not-allowed" : "hover:bg-logo-primary/10 cursor-pointer hover:border-logo-primary"}`}
            value={uiLanguage}
            onChange={(e) => handleUILanguageChange(e.target.value as "en" | "zh-CN")}
            disabled={isUpdating("ui_language")}
          >
            {languages.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>
        </div>
        <ResetButton
          onClick={handleReset}
          disabled={isUpdating("ui_language")}
        />
      </div>
      {isUpdating("ui_language") && (
        <div className="absolute inset-0 bg-mid-gray/10 rounded flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-logo-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </SettingContainer>
  );
};
