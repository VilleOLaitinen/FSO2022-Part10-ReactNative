import { render, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryItems = getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      //First repo
      expect(
        within(firstRepositoryItem).getByTestId("repoItemFullName")
      ).toHaveTextContent("jaredpalmer/formik");
      expect(
        within(firstRepositoryItem).getByTestId("repoItemDescription")
      ).toHaveTextContent("Build forms in React, without the tears");
      expect(
        within(firstRepositoryItem).getByTestId("repoItemLanguage")
      ).toHaveTextContent("TypeScript");
      expect(
        within(firstRepositoryItem).getByTestId("repoItemForks")
      ).toHaveTextContent("1.6k");
      expect(
        within(firstRepositoryItem).getByTestId("repoItemStars")
      ).toHaveTextContent("21.9k");
      expect(
        within(firstRepositoryItem).getByTestId("repoItemRating")
      ).toHaveTextContent("88");
      expect(
        within(firstRepositoryItem).getByTestId("repoItemReviews")
      ).toHaveTextContent("3");

      //Second repo
      expect(
        within(secondRepositoryItem).getByTestId("repoItemFullName")
      ).toHaveTextContent("async-library/react-async");
      expect(
        within(secondRepositoryItem).getByTestId("repoItemDescription")
      ).toHaveTextContent("Flexible promise-based React data loader");
      expect(
        within(secondRepositoryItem).getByTestId("repoItemLanguage")
      ).toHaveTextContent("JavaScript");
      expect(
        within(secondRepositoryItem).getByTestId("repoItemForks")
      ).toHaveTextContent("69");
      expect(
        within(secondRepositoryItem).getByTestId("repoItemStars")
      ).toHaveTextContent("1.8k");
      expect(
        within(secondRepositoryItem).getByTestId("repoItemRating")
      ).toHaveTextContent("72");
      expect(
        within(secondRepositoryItem).getByTestId("repoItemReviews")
      ).toHaveTextContent("3");
    });
  });
});
