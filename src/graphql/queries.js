import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories($searchKeyword: String, $after: String, $first: Int) {
    repositories(searchKeyword: $searchKeyword, after: $after, first: $first) {
      edges {
        cursor
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
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOS_HIGHEST_RATED = gql`
  query Repositories($searchKeyword: String, $after: String, $first: Int) {
    repositories(
      orderBy: RATING_AVERAGE
      orderDirection: DESC
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        cursor
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
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOS_LOWEST_RATED = gql`
  query Repositories($searchKeyword: String, $after: String, $first: Int) {
    repositories(
      orderBy: RATING_AVERAGE
      orderDirection: ASC
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        cursor
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
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query Repository($repositoryId: ID!, $after: String, $first: Int) {
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
      reviews(after: $after, first: $first) {
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
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
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
