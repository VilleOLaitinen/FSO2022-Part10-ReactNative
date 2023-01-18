import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import SignOutTab from "./SignOutTab";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: theme.colors.appBar,
  },
  scrollView: {
    flexDirection: "row",
  },
});

const AppBar = () => {
  // error, loading, refetch
  const { data } = useQuery(ME);
  const currentUser = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab label={"Repositories"} route={"/"} />
        {currentUser === null ? (
          <>
            <AppBarTab label={"Sign in"} route={"signin"} />
            <AppBarTab label={"Sign up"} route={"signup"} />
          </>
        ) : (
          <>
            <AppBarTab label={"Create a review"} route={"create-review"} />
            <SignOutTab />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
