import RepositoryItem from "./RepositoryItem";
import useRepositoryView from "../hooks/useRepositoryView";
import Text from "./Text";
import theme from "../theme";
import { FlatList, StyleSheet, View } from "react-native";
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

const RepositoryInfo = ({ repository }) => {
  return repository ? (
    <View>
      <RepositoryItem {...repository} showUrlButton={true} />
      <ItemSeparator />
    </View>
  ) : null;
};

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
            {review.user.username}
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

const RepositoryView = () => {
  const { repository } = useRepositoryView();
  const reviewNodes = repository?.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryView;
