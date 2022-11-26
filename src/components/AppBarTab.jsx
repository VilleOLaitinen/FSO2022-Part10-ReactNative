import Text from "./Text";
import { Link } from "react-router-native";

const AppBarTab = ({ label, route }) => {
  return (
    <Link to={route}>
      <Text
        fontSize="subheading"
        fontWeight="bold"
        color="appBar"
        style={{ paddingRight: 15 }}
      >
        {label}
      </Text>
    </Link>
  );
};
export default AppBarTab;
