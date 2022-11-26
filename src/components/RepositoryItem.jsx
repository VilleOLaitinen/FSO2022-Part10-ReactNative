import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";

const NumberFormatter = (number) => {
  return number > 999 ? (number / 1000).toFixed(1) + "k" : number;
};

const styles = StyleSheet.create({
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
}) => {
  return (
    <View>
      <View style={styles.containerRow}>
        <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.containerDescriptionClm}>
          <Text fontWeight="bold">{fullName}</Text>
          <Text color="textSecondary">{description}</Text>
          <Text
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
          <Text fontWeight="bold">{NumberFormatter(stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.containerColumn}>
          <Text fontWeight="bold">{NumberFormatter(forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.containerColumn}>
          <Text fontWeight="bold">{reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.containerColumn}>
          <Text fontWeight="bold">{ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
