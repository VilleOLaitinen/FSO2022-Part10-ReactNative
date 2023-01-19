import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          id
          fullName
          forksCount
          language
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
          url
        }
      }
    }
  }
`;

export const GET_REPOS_HIGHEST_RATED = gql`
  query {
    repositories(orderBy: RATING_AVERAGE, orderDirection: DESC) {
      edges {
        node {
          description
          id
          fullName
          forksCount
          language
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
          url
        }
      }
    }
  }
`;

export const GET_REPOS_LOWEST_RATED = gql`
  query {
    repositories(orderBy: RATING_AVERAGE, orderDirection: ASC) {
      edges {
        node {
          description
          id
          fullName
          forksCount
          language
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
          url
        }
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      description
      fullName
      forksCount
      language
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
