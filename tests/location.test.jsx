import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_POSTS } from '../src/graphql/queries';
import QueryDemo from '../src/pages/QueryDemo';

// Mock data for countries query
const mocks = [
  {
    request: {
      query: GET_POSTS,
    },
    result: {
      data: {
        countries: [
          {
            code: "US",
            name: "United States",
            capital: "Washington D.C.",
            continent: {
              name: "North America"
            }
          },
          {
            code: "CA",
            name: "Canada",
            capital: "Ottawa",
            continent: {
              name: "North America"
            }
          }
        ]
      }
    },
  }
];

// Test case to render the location name when data is fetched
test('renders location names when data is fetched', async () => {
  // Render the component with mocked data
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <QueryDemo />
    </MockedProvider>
  );

  // Initially should show loading
  expect(screen.getByText(/Loading countries/i)).toBeInTheDocument();

  // Wait for data to be loaded and check if country names are rendered
  await waitFor(() => {
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });
});