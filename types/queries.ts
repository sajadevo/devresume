interface UserStars {
  user: {
    repositories: {
      edges: {
        node: {
          stargazerCount: number;
        };
      }[];
    };
  };
}

interface UserLanguages {
  user: {
    repositories: {
      nodes: {
        isFork: boolean;
        languages: {
          edges: {
            node: {
              name: string;
            };
          }[];
        };
      }[];
    };
  };
}

interface UserPinnedRepo {
  user: {
    pinnedItems: {
      edges: {
        node: {
          name: string;
          url: string;
          stargazerCount: number;
          languages: {
            edges: {
              node: {
                name: string;
              };
            }[];
          };
        };
      }[];
    };
  };
}
