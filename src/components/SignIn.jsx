import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: theme.colors.containerBackground,
  },
  button: {
    height: 50,
    width: 300,
    borderRadius: 3,
    padding: 15,
    marginVertical: 15,
    textAlign: "center",
  },
  field: {
    height: 50,
    width: 300,
    marginTop: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 3,
  },
});

const initialValues = {
  name: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const onSubmit = (values) => {
  console.log(values);
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.field}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        style={styles.field}
      />
      <Pressable onPress={onSubmit}>
        <Text
          color="appBar"
          backgroundColor="primary"
          fontWeight="bold"
          style={styles.button}
        >
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;