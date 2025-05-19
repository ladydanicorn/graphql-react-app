import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_POSTS, GET_POSTS_BY_USER } from '../src/graphql/queries';
import QueryDemo from '../src/pages/QueryDemo';

// Mock data for all countries
const allCountriesMock = [
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
          },
          {
            code: "JP",
            name: "Japan",
            capital: "Tokyo",
            continent: {
              name: "Asia"
            }
          }
        ]
      }
    },
  }
];

// Mock for user event
const userEvent = {
  selectOptions: jest.fn()
};

// Basic test to check if country names are rendered
test('renders country names when data is fetched', async () => {
  // Render the component with the mocked provider
  render(
    <MockedProvider mocks={allCountriesMock} addTypename={false}>
      <QueryDemo />
    </MockedProvider>
  );

  // Initially should show loading
  expect(screen.getByText(/Loading countries/i)).toBeInTheDocument();

  // Wait for the data to be loaded
  await waitFor(() => {
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  // Check if all countries from the mock data are rendered
  expect(screen.getByText('Canada')).toBeInTheDocument();
  expect(screen.getByText('Japan')).toBeInTheDocument();
});