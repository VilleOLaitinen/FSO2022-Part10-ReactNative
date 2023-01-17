import { StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  appBarTab: {
    marginHorizontal: 15,
  },
});

const SignOutTab = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const navigate = useNavigate();

  const logOut = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
    navigate("/");
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
