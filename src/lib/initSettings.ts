// lib/initSettings.ts

export async function initializeSettings() {
  const defaultSettings = [
    { name: "siteTitle", value: "My App" },
    { name: "theme", value: "light" },
  ];

  for (const setting of defaultSettings) {
    await prisma.settings.upsert({
      where: { name: setting.name },
      update: {}, // Prevent any updates
      create: setting,
    });
  }
}
