import React from "react";
import { Dropdown } from "../ui/Dropdown";
import { SettingContainer } from "../ui/SettingContainer";
import { useSettings } from "../../hooks/useSettings";
import { useI18n } from "../../lib/i18n";
import type { ClipboardHandling } from "../../lib/types";

interface ClipboardHandlingProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const ClipboardHandlingSetting: React.FC<ClipboardHandlingProps> =
  React.memo(({ descriptionMode = "tooltip", grouped = false }) => {
    const { getSetting, updateSetting, isUpdating } = useSettings();
    const { t } = useI18n();

    const selectedHandling = (getSetting("clipboard_handling") ||
      "dont_modify") as ClipboardHandling;

    const clipboardHandlingOptions = [
      { value: "dont_modify", label: "不修改剪贴板" },
      { value: "copy_to_clipboard", label: "复制到剪贴板" },
    ];

    return (
      <SettingContainer
        title="剪贴板处理"
        description="不修改剪贴板会在转录后保留您当前的剪贴板内容。复制到剪贴板会在粘贴后将转录结果留在剪贴板中。"
        descriptionMode={descriptionMode}
        grouped={grouped}
      >
        <Dropdown
          options={clipboardHandlingOptions}
          selectedValue={selectedHandling}
          onSelect={(value) =>
            updateSetting("clipboard_handling", value as ClipboardHandling)
          }
          disabled={isUpdating("clipboard_handling")}
        />
      </SettingContainer>
    );
  });
