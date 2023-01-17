import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

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
  owner: "",
  name: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  owner: yup.string().required("Repository owner name is required"),
  name: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating cannot be less than 0")
    .max(100, "Rating cannot exceed 100"),
  text: yup.string().optional(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="owner"
        placeholder="Repository owner name"
        style={styles.field}
      />
      <FormikTextInput
        name="name"
        placeholder="Repository name"
        style={styles.field}
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        style={styles.field}
      />
      <FormikTextInput
        name="text"
        placeholder="Review"
        style={styles.field}
        multiline={true}
      />
      <Pressable onPress={onSubmit}>
        <Text
          color="appBar"
          backgroundColor="primary"
          fontWeight="bold"
          style={styles.button}
        >
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [mutate] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const onSubmit = async (values) => {
    const { owner, name, rating, text } = values;

    const review = {
      ownerName: owner,
      rating: Number(rating),
      repositoryName: name,
      text,
    };

    try {
      const res = await mutate({ variables: { review } });

      if (res.data.createReview) {
        navigate(`/repositories/${res.data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
