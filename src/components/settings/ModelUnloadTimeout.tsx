import React, { useMemo } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useSettings } from "../../hooks/useSettings";
import { useI18n } from "../../lib/i18n";
import { ModelUnloadTimeout } from "../../lib/types";
import { Dropdown } from "../ui/Dropdown";
import { SettingContainer } from "../ui/SettingContainer";

interface ModelUnloadTimeoutProps {
  descriptionMode?: "tooltip" | "inline";
  grouped?: boolean;
}

export const ModelUnloadTimeoutSetting: React.FC<ModelUnloadTimeoutProps> = ({
  descriptionMode = "inline",
  grouped = false,
}) => {
  const { settings, getSetting, updateSetting } = useSettings();
  const { t } = useI18n();

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimeout = event.target.value as ModelUnloadTimeout;

    try {
      await invoke("set_model_unload_timeout", { timeout: newTimeout });
      updateSetting("model_unload_timeout", newTimeout);
    } catch (error) {
      console.error("Failed to update model unload timeout:", error);
    }
  };

  const currentValue = getSetting("model_unload_timeout") ?? "never";

  const timeoutOptions = [
    { value: "never" as ModelUnloadTimeout, label: "永不" },
    { value: "immediately" as ModelUnloadTimeout, label: "立即" },
    { value: "min2" as ModelUnloadTimeout, label: "2分钟后" },
    { value: "min5" as ModelUnloadTimeout, label: "5分钟后" },
    { value: "min10" as ModelUnloadTimeout, label: "10分钟后" },
    { value: "min15" as ModelUnloadTimeout, label: "15分钟后" },
    { value: "hour1" as ModelUnloadTimeout, label: "1小时后" },
  ];

  const debugTimeoutOptions = [
    ...timeoutOptions,
    { value: "sec5" as ModelUnloadTimeout, label: "5秒后 (调试)" },
  ];

  const options = useMemo(() => {
    return settings?.debug_mode === true ? debugTimeoutOptions : timeoutOptions;
  }, [settings]);

  return (
    <SettingContainer
      title="卸载模型"
      description="当模型在指定时间内未使用时，自动释放GPU/CPU内存"
      descriptionMode={descriptionMode}
      grouped={grouped}
    >
      <Dropdown
        options={options}
        selectedValue={currentValue}
        onSelect={(value) =>
          handleChange({
            target: { value },
          } as React.ChangeEvent<HTMLSelectElement>)
        }
        disabled={false}
      />
    </SettingContainer>
  );
};
