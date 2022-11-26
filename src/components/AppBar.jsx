import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    paddingLeft: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab label={"Repositories"} route={"/"} />
      <AppBarTab label={"Sign in"} route={"signin"} />
    </View>
  );
};

export default AppBar;
