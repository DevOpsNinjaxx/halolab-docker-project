import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');

  const postsApiUrl = "http://localhost:8000/api/posts";
  const commentsApiUrl = "http://localhost:8001/api/comments";

  useEffect(() => {
    (async () => {
      const response = await fetch(postsApiUrl);
      const content = await response.json();
      setPosts(content);
    })();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    const res = await fetch(postsApiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
      })
    });
    const createdPost = await res.json();

    if (!createdPost.comments) {
      createdPost.comments = [];
    }

    setPosts([...posts, createdPost]);
  }

  const deletePost = async (postId) => {
    await fetch(`${postsApiUrl}/${postId}`, {
      method: "DELETE",
    });

    setPosts(posts.filter((post) => post.id !== postId));
  }

  const createComment = async (e, post_id) => {
    e.preventDefault();
    const response = await fetch(commentsApiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post_id,
        text: comment
      })
    });
    const createdComment = await response.json();
    setComment('');

    setPosts(posts.map(p => {
      if (p.id === post_id) {
        p.comments.push(createdComment);
      }
      return p;
    }));
  }

  return (
    <div className="App container">
      <form className="row my-5" onSubmit={createPost}>
        <div className="col-4">
          <h2>Create a Post</h2>
          <input className="form-control mb-3" onChange={(e) => setTitle(e.target.value)} value={title} />
          <textarea className="form-control mb-3" onChange={(e) => setDescription(e.target.value)} value={description} />
          <button className="btn btn-primary" type="submit">POST</button>
        </div>
      </form>

      <main>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
          {posts.length > 0 && posts.map((post) => (
            <div className="col" key={post.id}>
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">{post.title}</h4>
                </div>
                <div className="card-body">
                  <p className="card-title pricing-card-title">{post.description}</p>
                  <form onSubmit={(e) => createComment(e, post.id)}>
                    <input className="w-100 form-control" onChange={(e) => setComment(e.target.value)} value={comment} />
                  </form>
                </div>
                {post.comments && post.comments.map((comment) => (
                  <div className="card-footer py-3" key={comment.id}>
                    {comment.text}
                  </div>
                ))}
                <div className="card-footer py-3">
                  <button className="btn btn-danger" onClick={() => deletePost(post.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
