export type DevicePreset = 'fluid' | 'iphone16' | 'galaxy24' | 'tablet';

export interface DeviceConfig {
  id: DevicePreset;
  name: string;
  width: string;
  height: string;
  frameClass: string;
  isMobileSize: boolean;
}

export const DEVICE_PRESETS: Record<DevicePreset, DeviceConfig> = {
  fluid: {
    id: 'fluid',
    name: 'Full Screen',
    width: '100%',
    height: '100%',
    frameClass: 'w-full h-full rounded-none border-0',
    isMobileSize: false,
  },
  iphone16: {
    id: 'iphone16',
    name: 'iPhone 16 Pro',
    width: '402px',
    height: '874px',
    frameClass: 'max-w-[402px] max-h-[874px] rounded-[48px] border-[10px] border-slate-800 shadow-2xl',
    isMobileSize: true,
  },
  galaxy24: {
    id: 'galaxy24',
    name: 'Galaxy S24',
    width: '393px',
    height: '852px',
    frameClass: 'max-w-[393px] max-h-[852px] rounded-[38px] border-[8px] border-slate-800 shadow-2xl',
    isMobileSize: true,
  },
  tablet: {
    id: 'tablet',
    name: 'iPad Mini',
    width: '744px',
    height: '920px',
    frameClass: 'max-w-[744px] max-h-[920px] rounded-[32px] border-[10px] border-slate-800 shadow-2xl',
    isMobileSize: false,
  },
};

export const EMBED_URL = 'https://smart-hishab.vercel.app/';
