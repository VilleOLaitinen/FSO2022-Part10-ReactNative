import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    paddingBottom: 80,
  },
  picker: {
    marginVertical: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  picker,
  repositories,
  navigationFunction,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const navFunc = navigationFunction ? navigationFunction : null;
  const sortPicker = picker ? picker : null;

  return (
    <View style={styles.list}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={sortPicker}
        renderItem={({ item }) => (
          <Pressable onPress={() => navFunc(item.id)}>
            <RepositoryItem {...item} />
          </Pressable>
        )}
      />
      <View style={styles.separator} />
    </View>
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState("newest");
  const { repositories } = useRepositories(selectedSort);
  const navigate = useNavigate();
  const navigateToRepoView = (id) => {
    navigate(`/repositories/${id}`);
  };

  const picker = () => {
    return (
      <Picker
        style={styles.picker}
        selectedValue={selectedSort}
        onValueChange={(itemValue) => setSelectedSort(itemValue)}
      >
        <Picker.Item label="Latest repositories" value="newest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    );
  };

  return (
    <RepositoryListContainer
      picker={picker}
      repositories={repositories}
      navigationFunction={navigateToRepoView}
    />
  );
};

export default RepositoryList;
