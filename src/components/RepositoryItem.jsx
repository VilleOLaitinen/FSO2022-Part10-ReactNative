import { View, Image, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as Linking from "expo-linking";

const NumberFormatter = (number) => {
  return number > 999 ? (number / 1000).toFixed(1) + "k" : number;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.containerBackground,
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "space-between",
    padding: 6,
  },
  containerColumn: {
    alignItems: "center",
  },
  containerSubRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 6,
  },
  containerDescriptionClm: {
    paddingLeft: 6,
    flexWrap: "wrap",
  },
  languageText: {
    alignSelf: "flex-start",
    borderRadius: 4,
    padding: 4,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 4,
  },
  gitHubButton: {
    alignSelf: "center",
    borderRadius: 4,
    padding: 15,
  },
});

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  ratingAverage,
  reviewCount,
  ownerAvatarUrl,
  showUrlButton,
  url,
}) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.containerRow}>
        <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.containerDescriptionClm}>
          <Text testID="repoItemFullName" fontWeight="bold">
            {fullName}
          </Text>
          <Text testID="repoItemDescription" color="textSecondary">
            {description}
          </Text>
          <Text
            testID="repoItemLanguage"
            style={styles.languageText}
            color="appBar"
            backgroundColor="primary"
          >
            {language}
          </Text>
        </View>
      </View>

      <View style={styles.containerSubRow}>
        <View style={styles.containerColumn}>
          <Text testID="repoItemStars" fontWeight="bold">
            {NumberFormatter(stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.containerColumn}>
          <Text testID="repoItemForks" fontWeight="bold">
            {NumberFormatter(forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.containerColumn}>
          <Text testID="repoItemReviews" fontWeight="bold">
            {reviewCount}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.containerColumn}>
          <Text testID="repoItemRating" fontWeight="bold">
            {ratingAverage}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
      {showUrlButton ? (
        <View style={styles.containerSubRow}>
          <Pressable onPress={() => Linking.openURL(`${url}`)}>
            <Text
              fontWeight="bold"
              color="appBar"
              backgroundColor="primary"
              style={styles.gitHubButton}
            >
              Open in GitHub
            </Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default RepositoryItem;
