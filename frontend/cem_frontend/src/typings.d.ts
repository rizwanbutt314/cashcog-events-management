// * GLOBAL CLIENT TYPINGS =====================================================
// * Globally declared modules, types, and interfaces. Can be used anywhere in
// * the project without importing directly.
// * ===========================================================================

declare module "*.scss"; // for TypeScript to recognize SCSS files

// * Configurations

interface RouteConfig {
  component?: React.SFC | React.ComponentClass;
  isExact?: boolean;
  isPublic?: boolean;
  path?: string;
  slug: string;
  title: string;
  redirectTo?: string;
  isFourOFour?: boolean;
  routes?: RouteConfig[];
}

// * Types

type HttpRequestStatus = "pending" | "success" | "error";
type FormattedMessageId = string;
type MessageOrComponent = FormattedMessageId | React.ReactNode;

type DeviceContextState = {
  atRisk: number;
  deviceList: Device[];
  deviceCount: number;
  licenseCount: number;
  loadingDevices: boolean;
  loadingFilter: boolean;
  loadingLicense: boolean;
  searchTerm: string;
  selectedDeviceId: number | null;
  selectedFilters: string[];
  error: string | null;
  enabled: number[];
}

type Action = {
  type: string;
  payload?: any;
}

type Device = {
  id: number;
  client_user_name: string;
  device_settings: DeviceSettings;
  pending_settings: DeviceSettings;
  is_online: boolean;
  platform_group: string;
  name: string;
  offline_hours: number;
  device_status: DeviceStatus;
  risk_score: number;
}

type TCardEvent= {
  id: number;
  uuid: string;
  description: string;
  created_at: string;
  amount: number;
  currency: string;
  employee_uuid: string;
  employee_first_name: string;
  employee_last_name: string;
  status: string;
}

type DeviceSettings = {
  execution_control?: boolean;
  suspicious_file_detection?: boolean;
  pua_adware_protection?: boolean;
}

type DeviceStatus = {
  host_mac_address: string;
  operating_system: string;
  personal_firewall?: boolean;
  exploit_protection?: boolean;
  trusted_application_verification?: boolean;
  credential_guard?: boolean;
  user_access_control?: boolean;
  full_disk_encryption?: boolean;
}

// * Models

interface User {
  email: string;
  first_name?: string;
  last_name?: string;
  is_superuser?: boolean;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface SelectList {
  text: any;
  value: any;
  selected?: boolean;
  disabled?: boolean;
}

interface SelectBoxItem {
  text: string;
  id: any;
  disabled: boolean;
  selected?: boolean | undefined; //TO DO
}

interface Campaign {
  campaign_name: string;
  user_id: number;
}

interface NotificationCard {
  title?: string;
  message?: any;
  time?: string;
  id: any;
  tooltipInfo?: string;
  event?: string;
  icon?: any;
  eventMessage?:string;
}