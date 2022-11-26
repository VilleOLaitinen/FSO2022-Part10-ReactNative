import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextAppBar: {
    color: theme.colors.textAppBar,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorAppBar: {
    color: theme.colors.appBar,
  },
  colorBackgroundPrimary: {
    backgroundColor: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  style,
  backgroundColor,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "appBar" && styles.colorTextAppBar,
    color === "primary" && styles.colorPrimary,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    backgroundColor === "primary" && styles.colorBackgroundPrimary,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
