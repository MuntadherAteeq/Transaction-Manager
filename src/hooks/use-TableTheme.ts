import { colorSchemeLightWarm, themeQuartz } from "ag-grid-community";
import { useTheme } from "next-themes";

export function useTableTheme() {
  const theme = useTheme();
  const myTheme = themeQuartz.withParams({
    backgroundColor: "#111111",
    foregroundColor: "#fafafa",
    headerTextColor: "#a1a1aa",
    headerBackgroundColor: "#2b2b2b",
    oddRowBackgroundColor: "#131313",
    headerColumnResizeHandleColor: "#a1a1aa",
    wrapperBorderRadius: "0px 0px 15px 15px",
  });
  const tableTheme =
    theme.resolvedTheme === "dark"
      ? myTheme
      : themeQuartz.withPart(colorSchemeLightWarm);
  return tableTheme;
}
