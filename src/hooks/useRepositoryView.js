import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import { useParams } from "react-router-native";

const useRepositoryView = () => {
  const { repositoryId } = useParams();

  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId },
  });

  if (error) {
    console.log(error);
  }

  return { repository: data ? data.repository : undefined, loading };
};
export default useRepositoryView;
