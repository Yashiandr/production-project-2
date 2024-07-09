import { buildSelector } from '@/shared/lib/store';
import { JsonSettings } from '../../types/jsonSettings';

const defaultJsonSettings: JsonSettings = {};

export const [useJsonSettings, selectJsonSettings] = buildSelector((state) => state.user?.authData?.jsonSettings ?? defaultJsonSettings);
