import React, { useState } from "react";
import QueryDemo from "./pages/QueryDemo";
import MutationDemo from "./pages/MutationDemo";

function App() {
  const [activeTab, setActiveTab] = useState('part1');
  
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header>
        <h1>GraphQL Assignment</h1>
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setActiveTab('part1')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'part1' ? '#4285f4' : '#f0f0f0',
              color: activeTab === 'part1' ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px 0 0 5px',
              cursor: 'pointer'
            }}
          >
            Part 1: GraphQL Queries
          </button>
          <button 
            onClick={() => setActiveTab('part2')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'part2' ? '#4285f4' : '#f0f0f0',
              color: activeTab === 'part2' ? 'white' : 'black',
              border: 'none',
              borderRadius: '0 5px 5px 0',
              cursor: 'pointer'
            }}
          >
            Part 2: GraphQL Mutations
          </button>
        </div>
      </header>
      
      {activeTab === 'part1' ? <QueryDemo /> : <MutationDemo />}
    </div>
  );
}

export default App;