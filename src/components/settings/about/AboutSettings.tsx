import React, { useState, useEffect } from "react";
import { getVersion } from "@tauri-apps/api/app";
import { openUrl } from "@tauri-apps/plugin-opener";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { SettingContainer } from "../../ui/SettingContainer";
import { Button } from "../../ui/Button";
import { AppDataDirectory } from "../AppDataDirectory";
import { useI18n } from "../../../lib/i18n";

export const AboutSettings: React.FC = () => {
  const [version, setVersion] = useState("");
  const { t } = useI18n();

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const appVersion = await getVersion();
        setVersion(appVersion);
      } catch (error) {
        console.error("Failed to get app version:", error);
        setVersion("0.1.2");
      }
    };

    fetchVersion();
  }, []);

  const handleDonateClick = async () => {
    try {
      await openUrl("https://handy.computer/donate");
    } catch (error) {
      console.error("Failed to open donate link:", error);
    }
  };

  return (
      <div className="max-w-3xl w-full mx-auto space-y-6">
        <SettingsGroup title={t("about")}>
          <SettingContainer
            title="版本"
            description="Handy 当前版本"
            grouped={true}
          >
            <span className="text-sm font-mono">v{version}</span>
          </SettingContainer>

          <AppDataDirectory descriptionMode="tooltip" grouped={true} />

          <SettingContainer
            title="源代码"
            description="查看源代码并贡献"
            grouped={true}
          >
            <Button
              variant="secondary"
              size="md"
              onClick={() => openUrl("https://github.com/cjpais/Handy")}
            >
              在 GitHub 上查看
            </Button>
          </SettingContainer>

          <SettingContainer
            title="支持开发"
            description="帮助我们继续开发 Handy"
            grouped={true}
          >
            <Button variant="primary" size="md" onClick={handleDonateClick}>
              捐赠
            </Button>
          </SettingContainer>
        </SettingsGroup>

        <SettingsGroup title="致谢">
          <SettingContainer
            title="Whisper.cpp"
            description="OpenAI Whisper 自动语音识别模型的高性能推理实现"
            grouped={true}
            layout="stacked"
          >
            <div className="text-sm text-mid-gray">
              Handy 使用 Whisper.cpp 进行快速的本地语音转文本处理。
              感谢 Georgi Gerganov 和贡献者的出色工作。
            </div>
          </SettingContainer>
        </SettingsGroup>
      </div>
    );
};
