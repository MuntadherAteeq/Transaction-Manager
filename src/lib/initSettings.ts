// lib/initSettings.ts
import prisma from "@/lib/prisma";

export async function initializeSettings() {
  const settingNames = [
    "companyName",
    "companyAddress",
    "companyPhone",
    "companyEmail",
    "companyLogo",
    "companyWebsite",
    "companyTaxId",
    "companyRegistrationNumber",
    "companyBankAccount",
    "companyCurrency",
    "SecretKey",
  ] as const;

  type SettingName = (typeof settingNames)[number];

  type Setting = {
    name: SettingName;
    value: string;
  };

  const defaultSettings: Setting[] = settingNames.map((name) => ({
    name,
    value: "",
  }));

  // Remove settings not included in settingNames
  await prisma.settings.deleteMany({
    where: {
      name: {
        notIn: Array.from(settingNames),
      },
    },
  });

  for (const setting of defaultSettings) {
    await prisma.settings.upsert({
      where: { name: setting.name },
      update: {}, // Prevent any updates
      create: setting,
    });
  }
}
