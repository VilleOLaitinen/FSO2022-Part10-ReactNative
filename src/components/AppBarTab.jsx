import { Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = () => {
  return (
    <Pressable onPress={() => console.log("I got pressed!")}>
      <Text fontSize="subheading" fontWeight="bold" color="appBar">
        Repositories
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
