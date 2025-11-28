import React from "react";
import { ToggleSwitch } from "../ui/ToggleSwitch";
import { useSettings } from "../../hooks/useSettings";
import { useI18n } from "../../lib/i18n";

interface PushToTalkProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const PushToTalk: React.FC<PushToTalkProps> = React.memo(
  ({ descriptionMode = "tooltip", grouped = false }) => {
    const { getSetting, updateSetting, isUpdating } = useSettings();
    const { t } = useI18n();

    const pttEnabled = getSetting("push_to_talk") || false;

    return (
      <ToggleSwitch
        checked={pttEnabled}
        onChange={(enabled) => updateSetting("push_to_talk", enabled)}
        isUpdating={isUpdating("push_to_talk")}
        label={t("push_to_talk")}
        description="按住录音，松开停止"
        descriptionMode={descriptionMode}
        grouped={grouped}
      />
    );
  },
);
