# GraphQL React App

A React application demonstrating GraphQL queries and mutations.

## Overview

This project demonstrates key GraphQL concepts using React and Apollo Client:
- GraphQL queries with filtering
- GraphQL mutations (create, update, delete)

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/ladydanicorn/graphql-react-app.git
   cd graphql-react-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Implementation Notes

Due to connectivity issues with the GraphQLZero API, this project uses:
1. **Countries GraphQL API** for query demonstration
2. **Local state management** to simulate mutations

## Requirements Fulfilled

### GraphQL Queries
- **Task 1:** Created basic GraphQL query to fetch data (implemented with countries)
- **Task 2:** Extended query to include additional fields (code, name, capital, continent)
- **Task 3:** Modified query to filter data using parameters (continent code)

### GraphQL Mutations
- **Task 1:** Implemented mutation to create a new post
- **Task 2:** Implemented mutation to update an existing post
- **Task 3:** Implemented mutation to delete a post based on ID

## Project Structure

```
src/
├── components/
│   └── PostMutations.js     # UI for mutations
├── graphql/
│   ├── mutations.js         # GraphQL mutations
│   └── queries.js           # GraphQL queries
├── pages/
│   ├── MutationDemo.js      # Mutations demonstration
│   └── QueryDemo.js         # Queries demonstration
└── App.js                   # Main application with tab navigation
```

## Technologies Used

- React
- Apollo Client
- GraphQL

## Repository

https://github.com/ladydanicorn/graphql-react-app