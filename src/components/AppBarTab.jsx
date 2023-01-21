import { StyleSheet } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  appBarTab: {
    marginHorizontal: 10,
  },
});

const AppBarTab = ({ label, route }) => {
  return (
    <Link to={route}>
      <Text
        fontSize="subheading"
        fontWeight="bold"
        color="appBar"
        style={styles.appBarTab}
      >
        {label}
      </Text>
    </Link>
  );
};
export default AppBarTab;
