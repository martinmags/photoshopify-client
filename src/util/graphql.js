import gql from "graphql-tag";

export const FETCH_PHOTOS_QUERY = gql`
  query {
    photos {
      username
      id
      likes
      filepublicid
    }
  }
`;

export const FETCH_USERS_QUERY = gql`
  query {
    users {
      username
      id
    }
  }
`;

export const FETCH_OWN_PHOTOS_QUERY = gql`
  query photosByUsername($username: String!) {
    photosByUsername(username: $username) {
      likes
      filepublicid
      id
      username
    }
  }
`;
