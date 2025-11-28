import { create } from 'zustand';
import { useSettings } from '../hooks/useSettings';

export type Locale = 'en' | 'zh-CN';

interface Translation { [key: string]: string | Translation; }

interface I18nStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Translation> = {
  en: {
    general: 'General',
    advanced: 'Advanced',
    postprocessing: 'Post Process',
    history: 'History',
    debug: 'Debug',
    about: 'About',
    language: 'Language',
    ui_language: 'UI Language',
    select_language: 'Select the language for the user interface',
    english: 'English',
    chinese: '中文',
    sound: 'Sound',
    handy_shortcut: 'Handy Shortcut',
    push_to_talk: 'Push To Talk',
    microphone: 'Microphone',
    audio_feedback: 'Audio Feedback',
    output_device: 'Output Device',
    please_grant_accessibility: 'Please grant accessibility permissions for Handy',
    grant: 'Grant',
    // Add more translations as needed
  },
  'zh-CN': {
    general: '通用',
    advanced: '高级',
    postprocessing: '后处理',
    history: '历史',
    debug: '调试',
    about: '关于',
    language: '语言',
    ui_language: '界面语言',
    select_language: '选择用户界面的语言',
    english: 'English',
    chinese: '中文',
    sound: '声音',
    handy_shortcut: 'Handy 快捷键',
    push_to_talk: '按键说话',
    microphone: '麦克风',
    audio_feedback: '音频反馈',
    output_device: '输出设备',
    please_grant_accessibility: '请为 Handy 授予辅助功能权限',
    grant: '授予',
    // Add more translations as needed
  },
};

const getTranslation = (key: string, locale: Locale): string => {
  const keys = key.split('.');
  let result: any = translations[locale];
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof result === 'string' ? result : key;
};

export const useI18n = create<I18nStore>((set, get) => ({
  locale: 'en',
  
  setLocale: (locale) => {
    set({ locale });
  },
  
  t: (key) => {
    const { locale } = get();
    return getTranslation(key, locale);
  },
}));

// Hook to sync UI language with settings
export const useUILanguage = () => {
  const { getSetting, updateSetting } = useSettings();
  const { setLocale, locale } = useI18n();
  
  // Initialize locale from settings
  const uiLanguage = getSetting('ui_language') as Locale || 'en';
  if (uiLanguage !== locale) {
    setLocale(uiLanguage);
  }
  
  const handleUILanguageChange = async (newLocale: Locale) => {
    await updateSetting('ui_language', newLocale);
    setLocale(newLocale);
  };
  
  return {
    uiLanguage,
    handleUILanguageChange,
  };
};
