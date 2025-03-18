import React, { useState, useEffect } from 'react';
import PostMutations from '../components/PostMutations';

const MutationDemo = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch initial mock data
  useEffect(() => {
    // Simulate API call
    const fetchMockPosts = () => {
      setTimeout(() => {
        // Mock data similar to what GraphQLZero would return
        const mockPosts = [
          {
            id: "1",
            title: "Introduction to GraphQL",
            body: "GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data.",
            userId: 1
          },
          {
            id: "2",
            title: "Working with Apollo Client",
            body: "Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL.",
            userId: 1
          },
          {
            id: "3",
            title: "GraphQL vs REST",
            body: "Unlike REST APIs, GraphQL APIs are organized in terms of types and fields, not endpoints. This makes GraphQL APIs more flexible and efficient.",
            userId: 2
          }
        ];
        
        setPosts(mockPosts);
        setLoading(false);
      }, 1000); 
    };
    
    fetchMockPosts();
  }, []);
  
  const handlePostCreated = (newPost) => {
    const nextId = Math.max(...posts.map(p => parseInt(p.id))) + 1;
    const postWithId = { ...newPost, id: nextId.toString() };
    
    // Add new post to local state
    setPosts([...posts, postWithId]);
  };
  
  const handlePostUpdated = (updatedPost) => {
    // Update post in local state
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };
  
  const handlePostDeleted = (deletedId) => {
    // Remove post from local state
    setPosts(posts.filter(post => post.id !== deletedId));
  };
  
  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;
  
  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>GraphQL Mutations Demo</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {/* Post Mutations Section */}
        <PostMutations 
          onPostCreated={handlePostCreated}
          onPostUpdated={handlePostUpdated}
          onPostDeleted={handlePostDeleted}
          existingPosts={posts}
        />
        
        {/* Posts List Section */}
        <div>
          <h2>Posts ({posts.length})</h2>
          
          {posts.length === 0 ? (
            <p>No posts found. Create a new post to get started!</p>
          ) : (
            <div>
              {posts.map(post => (
                <div 
                  key={post.id}
                  style={{
                    marginBottom: '20px',
                    padding: '15px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    backgroundColor: 'white'
                  }}
                >
                  <h3>{post.title}</h3>
                  <p style={{ color: '#666' }}>
                    <strong>ID:</strong> {post.id} | 
                    <strong> Author:</strong> User {post.userId}
                  </p>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#ffeecc', borderRadius: '5px' }}>
        <h3>Implementation Note</h3>
        <p>
          Since the GraphQLZero API is experiencing connection issues, this implementation demonstrates 
          GraphQL mutations using local state management. In a production environment, these operations 
          would interact with a real GraphQL API.
        </p>
        <p>
          The code for the actual GraphQL mutations is available in the <code>mutations.js</code> file and follows 
          the GraphQLZero schema for:
        </p>
        <ul>
          <li>Creating new posts</li>
          <li>Updating existing posts</li>
          <li>Deleting posts</li>
        </ul>
      </div>
    </div>
  );
};

export default MutationDemo;