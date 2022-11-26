// import { Pressable } from "react-native";
import Text from "./Text";
import { Link } from "react-router-native";

// <Pressable onPress={() => console.log("I got pressed!")}>
// </Pressable>

const AppBarTab = ({ label, route }) => {
  return (
    <Link to={route}>
      <Text fontSize="subheading" fontWeight="bold" color="appBar">
        {label}
      </Text>
    </Link>
  );
};
export default AppBarTab;
