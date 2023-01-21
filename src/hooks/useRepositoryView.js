import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import { useParams } from "react-router-native";

const useRepositoryView = (first) => {
  const { repositoryId } = useParams();

  const { data, error, loading, fetchMore } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId, first: first },
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first: first,
      },
    });
  };

  if (error) {
    console.log(error);
  }

  return {
    repository: data ? data.repository : undefined,
    loading,
    fetchMore: handleFetchMore,
  };
};
export default useRepositoryView;
