import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import RepositoryView from "./RepositoryView";
import AppBar from "./AppBar";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route
          path="/repositories/:repositoryId"
          element={<RepositoryView />}
        />
        <Route path="signin" element={<SignIn />} exact />
        <Route path="create-review" element={<CreateReview />} exact />
        <Route path="signup" element={<SignUp />} exact />
        <Route path="myreviews" element={<MyReviews />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
