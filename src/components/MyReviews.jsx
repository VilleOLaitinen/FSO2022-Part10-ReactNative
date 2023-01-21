import { View, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { ME } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.containerBackground,
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
  },
  containerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "space-between",
    padding: 10,
    backgroundColor: theme.colors.containerBackground,
  },
  containerColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
    padding: 5,
    marginStart: 5,
  },
  list: {
    paddingBottom: 80,
  },
  ratingContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.buttonBlue,
  },
  reviewContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  button: {
    height: 50,
    width: 165,
    borderRadius: 3,
    padding: 15,
    marginVertical: 5,
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "space-around",
    padding: 10,
    backgroundColor: theme.colors.containerBackground,
  },
});

const deleteConfirm = (id, deletefunction) => {
  Alert.alert("Delete review", "Are you sure you want to delete this review?", [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "Delete", onPress: () => deletefunction(id) },
  ]);
};

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, deletefunction, navigatefunction }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <View style={styles.ratingContainer}>
          <Text color="primary" fontWeight="bold" fontSize="subheading">
            {review.rating}
          </Text>
        </View>
        <View style={styles.containerColumn}>
          <Text fontWeight="bold" fontSize="subheading">
            {review.repository.fullName}
          </Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), "MM/dd/yyyy")}
          </Text>
        </View>
      </View>

      <View style={styles.reviewContainer}>
        <Text>{review.text}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigatefunction(review.repositoryId)}>
          <Text
            color="appBar"
            backgroundColor="primary"
            fontWeight="bold"
            style={styles.button}
          >
            View repository
          </Text>
        </Pressable>
        <Pressable onPress={() => deleteConfirm(review.id, deletefunction)}>
          <Text
            color="appBar"
            backgroundColor="error"
            fontWeight="bold"
            style={styles.button}
          >
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const navigate = useNavigate();

  const { data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const [mutate, { error }] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
      return null;
    },
  });

  const deleteReview = async (id) => {
    const res = await mutate({ variables: { deleteReviewId: id } });

    if (res.data && !error) {
      refetch();
    }
  };

  const navigateToRepoView = (id) => {
    navigate(`/repositories/${id}`);
  };

  const reviewNodes = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          deletefunction={deleteReview}
          navigatefunction={navigateToRepoView}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
