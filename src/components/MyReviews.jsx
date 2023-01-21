import { View, FlatList, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
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
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
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
    </View>
  );
};

const MyReviews = () => {
  const { data } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const reviewNodes = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
