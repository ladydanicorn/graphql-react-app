import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
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

// Mock data for filtered countries (Europe)
const europeMock = [
  {
    request: {
      query: GET_POSTS_BY_USER,
      variables: { code: "EU" }
    },
    result: {
      data: {
        continent: {
          name: "Europe",
          countries: [
            {
              code: "FR",
              name: "France",
              capital: "Paris",
              continent: {
                name: "Europe"
              }
            },
            {
              code: "DE",
              name: "Germany",
              capital: "Berlin",
              continent: {
                name: "Europe"
              }
            },
            {
              code: "IT",
              name: "Italy",
              capital: "Rome",
              continent: {
                name: "Europe"
              }
            }
          ]
        }
      }
    },
  }
];

describe('Location Component Tests', () => {
  test('renders country names when data is fetched', async () => {
    // Render the component with the mocked provider
    render(
      <MockedProvider mocks={allCountriesMock} addTypename={false}>
        <QueryDemo />
      </MockedProvider>
    );

    // Initially should show loading
    expect(screen.getByText(/Loading countries/i)).toBeInTheDocument();

    // Wait for to data load
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    // Check if all countries from mock data are rendered
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  test('displays the correct country details', async () => {
    render(
      <MockedProvider mocks={allCountriesMock} addTypename={false}>
        <QueryDemo />
      </MockedProvider>
    );

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    // Check for capital cities
    expect(screen.getByText(/Washington D.C./i)).toBeInTheDocument();
    expect(screen.getByText(/Ottawa/i)).toBeInTheDocument();
    expect(screen.getByText(/Tokyo/i)).toBeInTheDocument();

    // Check for continent information
    const northAmericaTexts = screen.getAllByText(/North America/i);
    expect(northAmericaTexts.length).toBeGreaterThanOrEqual(2); // At least 2 countries in North America

    const asiaTexts = screen.getAllByText(/Asia/i);
    expect(asiaTexts.length).toBeGreaterThanOrEqual(1); // At least 1 country in Asia
  });

  test('filters countries by continent', async () => {
    render(
      <MockedProvider mocks={[...allCountriesMock, ...europeMock]} addTypename={false}>
        <QueryDemo />
      </MockedProvider>
    );

    // Wait for initial data to load
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    // Select Europe from the dropdown
    const selectElement = screen.getByLabelText(/Filter by Continent/i);
    userEvent.selectOptions(selectElement, 'EU');

    // Wait for filtered data to load
    await waitFor(() => {
      expect(screen.getByText('Countries in Europe')).toBeInTheDocument();
    });

    // Check European countries are displayed
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.getByText('Italy')).toBeInTheDocument();

    // Confirm North American countries are no longer displayed
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
    expect(screen.queryByText('Canada')).not.toBeInTheDocument();
  });
});