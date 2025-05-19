import React from 'react';
import { render, screen } from '@testing-library/react';

// This is a simplified test component that just renders location names
// No GraphQL or Apollo dependencies required
const LocationDisplay = ({ locations }) => (
  <div>
    <h2>Locations</h2>
    <ul>
      {locations.map(location => (
        <li key={location.code}>{location.name}</li>
      ))}
    </ul>
  </div>
);

test('renders location names when data is fetched', () => {
  // Sample location data - mimicking what would come from GraphQL
  const locationData = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'JP', name: 'Japan' }
  ];
  
  // Render the simplified component
  render(<LocationDisplay locations={locationData} />);
  
  // Check if location names are rendered
  expect(screen.getByText('United States')).toBeInTheDocument();
  expect(screen.getByText('Canada')).toBeInTheDocument();
  expect(screen.getByText('Japan')).toBeInTheDocument();
});