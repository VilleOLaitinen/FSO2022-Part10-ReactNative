import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
import useSignUp from "../hooks/useSignUp";

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
  username: "",
  password: "",
  verpassword: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(1, "Username needs to be at least 1 character long")
    .max(30, "Username lenght cannot exceed 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password needs to be at least 5 characters long")
    .max(50, "Password lenght cannot exceed 50 characters"),
  verpassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf(
      [yup.ref("password"), null],
      "Confirmation does not match the password"
    ),
});

const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput
        name="verpassword"
        placeholder="Password confirmation"
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
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password, verpassword } = values;
    console.log(username, password, verpassword);

    const user = { username, password };

    try {
      const res = await signUp(user);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
