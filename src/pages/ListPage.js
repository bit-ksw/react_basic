import { useState, useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';

const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = () => {
    axios.get('http://localhost:3001/posts').then((res) => {
      setPosts(res.data)
      setLoading(false)
    })
  }

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    console.log('delete blog')
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts(prevPosts => prevPosts.filter(p => p.id !== id))
    })
  }

  const renderBlogList = () => {
    if (loading) {
      return (
        <LoadingSpinner />
      );
    }

    if (posts.length === 0) {
      return (
        <div>No blog posts found</div>
      )
    }

    return posts.map(post => {
      return (
        <Card
          key={post.id}
          id={post.id}
          title={post.title}
          onClick={() => history.push(`/blogs/${post.id}`)}
        >
          <div>
            <button
              className='btn btn-danger btn-sm'
              onClick={(e) => deleteBlog(e, post.id)}
            >
              Delete
            </button>
          </div>
        </Card>
      )
    })
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h1>Blogs</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">
            Create New
          </Link>
        </div>
      </div>
      {renderBlogList()}
    </div>
  )
}

export default ListPage;
