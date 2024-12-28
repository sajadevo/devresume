// @utils
import {
  GraphQLClient,
  type Variables,
  type RequestDocument,
} from "graphql-request";

const endpoint = "https://api.github.com/graphql";

export const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
  },
});

export async function fetchGraphQL(
  query: RequestDocument,
  variables?: Variables
) {
  return client.request(query, variables);
}
