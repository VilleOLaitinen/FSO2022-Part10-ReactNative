//import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_REPOSITORIES,
  GET_REPOS_HIGHEST_RATED,
  GET_REPOS_LOWEST_RATED,
} from "../graphql/queries";

const useRepositories = (sort) => {
  let query = GET_REPOSITORIES;

  if (sort === "highest") {
    query = GET_REPOS_HIGHEST_RATED;
  } else if (sort === "lowest") {
    query = GET_REPOS_LOWEST_RATED;
  }

  // const [repositories, setRepositories] = useState();

  const { data, error, loading, refetch } = useQuery(query, {
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
