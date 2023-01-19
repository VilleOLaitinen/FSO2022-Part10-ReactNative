import { FlatList, View, StyleSheet, Pressable, TextInput } from "react-native";
import React from "react";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  list: {
    paddingBottom: 80,
  },
  picker: {
    marginTop: 5,
    marginBottom: 15,
  },
  txtinput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return this.props.header();
  };

  render() {
    const { repositories, navigationFunction } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    const navFunc = navigationFunction ? navigationFunction : null;

    return (
      <View style={styles.list}>
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={this.renderHeader}
          renderItem={({ item }) => (
            <Pressable onPress={() => navFunc(item.id)}>
              <RepositoryItem {...item} />
            </Pressable>
          )}
        />
        <View style={styles.separator} />
      </View>
    );
  }
}

/* export const RepositoryListContainer = ({
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
}; */

const RepositoryList = () => {
  const [filter, setFilter] = useState("");
  const [value] = useDebounce(filter, 500);
  const [selectedSort, setSelectedSort] = useState("newest");
  const { repositories } = useRepositories(selectedSort, value);
  const navigate = useNavigate();
  const navigateToRepoView = (id) => {
    navigate(`/repositories/${id}`);
  };

  const header = () => {
    return (
      <View>
        <TextInput
          style={styles.txtinput}
          placeholder="Type here to filter repositories"
          onChangeText={(newText) => setFilter(newText)}
        />
        <Picker
          style={styles.picker}
          selectedValue={selectedSort}
          onValueChange={(itemValue) => setSelectedSort(itemValue)}
        >
          <Picker.Item label="Latest repositories" value="newest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      </View>
    );
  };

  return (
    <RepositoryListContainer
      header={header}
      repositories={repositories}
      navigationFunction={navigateToRepoView}
    />
  );
};

export default RepositoryList;
