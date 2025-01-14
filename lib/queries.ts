export const getUserTotalStarsQuery = `
  query($username: String!) {
    user(login: $username) {
      repositories(first: 100, ownerAffiliations: OWNER) {
        edges {
          node {
            stargazerCount
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const getUserLanguagesQuery = `
  query GetUserLanguages($username: String!) {
    user(login: $username) {
      repositories(first: 10, orderBy: { field: PUSHED_AT, direction: DESC }) {
        nodes {
          isFork
          languages(first: 10) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const getUserPinnedReposQuery = `
  query GetUserPinnedRepos($username: String!) {
    user(login: $username) {
      pinnedItems(first: 4, types: REPOSITORY) {
        edges {
          node {
            ... on Repository {
              name
              url
              stargazerCount
              languages(first: 3) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
