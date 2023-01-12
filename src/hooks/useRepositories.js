//import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  // const [repositories, setRepositories] = useState();

  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const fetchRepositories = () => {
    refetch();
  };

  if (error) {
    console.log(error);
  }

  /*   useEffect(() => {
    if (!loading && data) {
      setRepositories(data.repositories);
    }
  }, [data]); */

  return {
    repositories: data ? data.repositories : undefined,
    loading,
    refetch: fetchRepositories,
  };
};

export default useRepositories;
