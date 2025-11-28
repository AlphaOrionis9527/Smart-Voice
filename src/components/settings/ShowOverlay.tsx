import React from "react";
import { Dropdown } from "../ui/Dropdown";
import { SettingContainer } from "../ui/SettingContainer";
import { useSettings } from "../../hooks/useSettings";
import { useI18n } from "../../lib/i18n";
import type { OverlayPosition } from "../../lib/types";

interface ShowOverlayProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const ShowOverlay: React.FC<ShowOverlayProps> = React.memo(
  ({ descriptionMode = "tooltip", grouped = false }) => {
    const { getSetting, updateSetting, isUpdating } = useSettings();
    const { t } = useI18n();

    const selectedPosition = (getSetting("overlay_position") ||
      "bottom") as OverlayPosition;

    const overlayOptions = [
      { value: "none", label: "无" },
      { value: "bottom", label: "底部" },
      { value: "top", label: "顶部" },
    ];

    return (
      <SettingContainer
        title="覆盖层位置"
        description="在录制和转录过程中显示视觉反馈覆盖层"
        descriptionMode={descriptionMode}
        grouped={grouped}
      >
        <Dropdown
          options={overlayOptions}
          selectedValue={selectedPosition}
          onSelect={(value) =>
            updateSetting("overlay_position", value as OverlayPosition)
          }
          disabled={isUpdating("overlay_position")}
        />
      </SettingContainer>
    );
  },
);
