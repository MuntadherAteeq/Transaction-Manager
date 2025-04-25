import { colorSchemeLightWarm, themeQuartz } from "ag-grid-community";
import { useTheme } from "next-themes";

export function useTableTheme() {
  const theme = useTheme();
  const dark = themeQuartz.withParams({
    backgroundColor: "#111111",
    foregroundColor: "#fafafa",
    headerTextColor: "#a1a1aa",
    headerBackgroundColor: "#2b2b2b",
    oddRowBackgroundColor: "#131313",
    headerColumnResizeHandleColor: "#a1a1aa",
    wrapperBorderRadius: "0px 0px 15px 15px",
  });

  const light = themeQuartz.withParams({
    backgroundColor: "#ffffff",
    foregroundColor: "#000000",
    headerTextColor: "#000000",
    headerBackgroundColor: "#f0f0f0",
    oddRowBackgroundColor: "#f9f9f9",
    headerColumnResizeHandleColor: "#000000",
    wrapperBorderRadius: "0px 0px 15px 15px",
  });

  const tableTheme = theme.resolvedTheme === "dark" ? dark : light;
  return tableTheme;
}
