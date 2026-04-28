import { siteConfig } from "../../config/site.config";
import readSettingApi from "../../api/settings/readSetting";
export const revalidate = 86400;

type SettingWrapperProps = {
  slug?: string;
  defaultPhone?: string;
  Component: React.ComponentType<{ phone?: string }>;
};

export default async function SettingWrapper({
  slug,
  defaultPhone = siteConfig.contactInfo.phone,
  Component,
}: SettingWrapperProps) {
  let phone = defaultPhone;
  const res = await readSettingApi();
  if (res.success && res.result.length > 0) {
    const matchSetting = res.result.find((item) => item.slug === slug);
    if (matchSetting) {
      phone = matchSetting.numberphone;
    }
  }

  return <Component phone={phone} />;
}
