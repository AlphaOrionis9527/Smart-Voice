import React, { useEffect, useState } from "react";
import { type as getOsType } from "@tauri-apps/plugin-os";
import { Dropdown } from "../ui/Dropdown";
import { SettingContainer } from "../ui/SettingContainer";
import { useSettings } from "../../hooks/useSettings";
import { useI18n } from "../../lib/i18n";
import type { PasteMethod } from "../../lib/types";

interface PasteMethodProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const PasteMethodSetting: React.FC<PasteMethodProps> = React.memo(
  ({ descriptionMode = "tooltip", grouped = false }) => {
    const { getSetting, updateSetting, isUpdating } = useSettings();
    const { t } = useI18n();
    const [osType, setOsType] = useState<string>("unknown");

    useEffect(() => {
      setOsType(getOsType());
    }, []);

    const selectedMethod = (getSetting("paste_method") ||
      "ctrl_v") as PasteMethod;

    const getPasteMethodOptions = (osType: string) => {
      const baseOptions = [
        { value: "ctrl_v", label: "剪贴板 (Ctrl+V)" },
        { value: "direct", label: "直接输入" },
      ];

      // Add Shift+Insert option for Windows and Linux only
      if (osType === "windows" || osType === "linux") {
        baseOptions.push({
          value: "shift_insert",
          label: "剪贴板 (Shift+Insert)",
        });
      }

      return baseOptions;
    };

    const pasteMethodOptions = getPasteMethodOptions(osType);

    return (
      <SettingContainer
        title="粘贴方法"
        description="剪贴板 (Ctrl+V) 模拟 Ctrl/Cmd+V 按键从剪贴板粘贴。直接输入尝试使用系统输入法，如果可能的话，否则逐个按键输入到文本字段中。剪贴板 (Shift+Insert) 使用更通用的 Shift+Insert 快捷键，适用于终端应用和 SSH 客户端。"
        descriptionMode={descriptionMode}
        grouped={grouped}
        tooltipPosition="bottom"
      >
        <Dropdown
          options={pasteMethodOptions}
          selectedValue={selectedMethod}
          onSelect={(value) =>
            updateSetting("paste_method", value as PasteMethod)
          }
          disabled={isUpdating("paste_method")}
        />
      </SettingContainer>
    );
  },
);
