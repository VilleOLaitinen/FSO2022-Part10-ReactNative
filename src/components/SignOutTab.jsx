import { StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  appBarTab: {
    marginHorizontal: 15,
  },
});

const SignOutTab = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const logOut = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
  };

  return (
    <Pressable onPress={logOut}>
      <Text
        fontSize="subheading"
        fontWeight="bold"
        color="appBar"
        style={styles.appBarTab}
      >
        {"Sign Out"}
      </Text>
    </Pressable>
  );
};
export default SignOutTab;
