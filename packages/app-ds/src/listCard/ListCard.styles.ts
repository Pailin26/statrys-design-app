import { StyleSheet } from "react-native";
import {
  ListCardBackground,
  ListCardBorderColor,
  ListCardBorderWidth,
  ListCardRadius,
  ListCardPaddingHorizontal,
} from "@statrys/tokens";

// Every value here comes from semantic/listCard.json.
export const styles = StyleSheet.create({
  card: {
    width: "100%",
    overflow: "hidden",
    borderRadius: ListCardRadius,
    backgroundColor: ListCardBackground,
    borderWidth: ListCardBorderWidth,
    borderColor: ListCardBorderColor,
    paddingHorizontal: ListCardPaddingHorizontal,
  },
  gray: { borderColor: "transparent" },
});
