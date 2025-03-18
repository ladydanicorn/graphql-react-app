import { gql } from "@apollo/client";

// Query to get all countries
export const GET_POSTS = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      continent {
        name
      }
    }
  }
`;

// Query to filter countries by continent code
export const GET_POSTS_BY_USER = gql`
  query GetCountriesByContinent($code: ID!) {
    continent(code: $code) {
      name
      countries {
        code
        name
        capital
        continent {
          name
        }
      }
    }
  }
`;