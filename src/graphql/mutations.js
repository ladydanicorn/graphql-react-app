import { gql } from "@apollo/client";

// Task 1: Mutation to create a new post
export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
      userId
    }
  }
`;

// Task 2: Mutation to update an existing post
export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
      userId
    }
  }
`;

// Task 3: Mutation to delete a post
export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;