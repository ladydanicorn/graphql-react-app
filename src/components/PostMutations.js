import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST, UPDATE_POST, DELETE_POST } from '../graphql/mutations';

const PostMutations = ({ onPostCreated, onPostUpdated, onPostDeleted, existingPosts }) => {
  // State for create post form
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('1');
  
  // State for update post form
  const [postId, setPostId] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateBody, setUpdateBody] = useState('');
  
  // State for delete post form
  const [deleteId, setDeleteId] = useState('');
  
  // Setup mutations
  const [createPost, { loading: createLoading, error: createError }] = useMutation(CREATE_POST);
  const [updatePost, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_POST);
  const [deletePost, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_POST);

  // Handle create post submission
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createPost({
        variables: {
          input: {
            title,
            body,
            userId: parseInt(userId, 10)
          }
        }
      });
      
      // Clear form
      setTitle('');
      setBody('');
      setUserId('1');
      
      // Notify parent component
      if (onPostCreated) {
        onPostCreated(data.createPost);
      }
      
      alert('Post created successfully!');
    } catch (err) {
      console.error('Create post error:', err);
    }
  };

  // Handle update post submission
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updatePost({
        variables: {
          id: postId,
          input: {
            title: updateTitle,
            body: updateBody
          }
        }
      });
      
      // Clear form
      setPostId('');
      setUpdateTitle('');
      setUpdateBody('');
      
      // Notify parent component
      if (onPostUpdated) {
        onPostUpdated(data.updatePost);
      }
      
      alert('Post updated successfully!');
    } catch (err) {
      console.error('Update post error:', err);
    }
  };

  // Handle delete post submission
  const handleDeletePost = async (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    try {
      const { data } = await deletePost({
        variables: {
          id: deleteId
        }
      });
      
      // Clear form
      setDeleteId('');
      
      // Notify parent component
      if (onPostDeleted) {
        onPostDeleted(deleteId);
      }
      
      alert('Post deleted successfully!');
    } catch (err) {
      console.error('Delete post error:', err);
    }
  };

  // Auto-fill update form when selecting a post
  const handlePostSelection = (e) => {
    const selectedId = e.target.value;
    setPostId(selectedId);
    
    if (selectedId && existingPosts) {
      const post = existingPosts.find(p => p.id === selectedId);
      if (post) {
        setUpdateTitle(post.title);
        setUpdateBody(post.body);
      }
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
      <h2>GraphQL Mutations Demo</h2>
      
      {/* Create Post Form */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>Create New Post</h3>
        <form onSubmit={handleCreatePost}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="body" style={{ display: 'block', marginBottom: '5px' }}>Body:</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows="4"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="userId" style={{ display: 'block', marginBottom: '5px' }}>User ID:</label>
            <select
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            >
              {[1, 2, 3, 4, 5].map(id => (
                <option key={id} value={id}>User {id}</option>
              ))}
            </select>
          </div>
          
          <button 
            type="submit" 
            disabled={createLoading}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {createLoading ? 'Creating...' : 'Create Post'}
          </button>
          
          {createError && (
            <p style={{ color: 'red', marginTop: '10px' }}>
              Error: {createError.message}
            </p>
          )}
        </form>
      </div>
      
      {/* Update Post Form */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>Update Post</h3>
        <form onSubmit={handleUpdatePost}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="postId" style={{ display: 'block', marginBottom: '5px' }}>Select Post:</label>
            <select
              id="postId"
              value={postId}
              onChange={handlePostSelection}
              required
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">-- Select a post --</option>
              {existingPosts && existingPosts.map(post => (
                <option key={post.id} value={post.id}>
                  {post.title.substring(0, 30)}{post.title.length > 30 ? '...' : ''}
                </option>
              ))}
            </select>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="updateTitle" style={{ display: 'block', marginBottom: '5px' }}>New Title:</label>
            <input
              id="updateTitle"
              type="text"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="updateBody" style={{ display: 'block', marginBottom: '5px' }}>New Body:</label>
            <textarea
              id="updateBody"
              value={updateBody}
              onChange={(e) => setUpdateBody(e.target.value)}
              required
              rows="4"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={updateLoading || !postId}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#2196F3', 
              color: 'white', 
              border: 'none',
              borderRadius: '4px',
              cursor: postId ? 'pointer' : 'not-allowed',
              opacity: postId ? 1 : 0.7
            }}
          >
            {updateLoading ? 'Updating...' : 'Update Post'}
          </button>
          
          {updateError && (
            <p style={{ color: 'red', marginTop: '10px' }}>
              Error: {updateError.message}
            </p>
          )}
        </form>
      </div>
      
      {/* Delete Post Form */}
      <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h3>Delete Post</h3>
        <form onSubmit={handleDeletePost}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="deleteId" style={{ display: 'block', marginBottom: '5px' }}>Select Post to Delete:</label>
            <select
              id="deleteId"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">-- Select a post --</option>
              {existingPosts && existingPosts.map(post => (
                <option key={post.id} value={post.id}>
                  {post.title.substring(0, 30)}{post.title.length > 30 ? '...' : ''}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            type="submit" 
            disabled={deleteLoading || !deleteId}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#f44336', 
              color: 'white', 
              border: 'none',
              borderRadius: '4px',
              cursor: deleteId ? 'pointer' : 'not-allowed',
              opacity: deleteId ? 1 : 0.7
            }}
          >
            {deleteLoading ? 'Deleting...' : 'Delete Post'}
          </button>
          
          {deleteError && (
            <p style={{ color: 'red', marginTop: '10px' }}>
              Error: {deleteError.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostMutations;