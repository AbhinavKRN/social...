let posts = [];

const newPostInput = document.getElementById("new-post-input");
const newPostButton = document.getElementById("new-post-button");
const feedContainer = document.getElementById("feed-container");

const saveToLocalStorage = () => {
  localStorage.setItem("posts", JSON.stringify(posts));
};

const getFromLocalStorage = () => {
  let p = localStorage.getItem("posts");

  if (!p) {
    posts = [];
    localStorage.setItem("posts", []);
    return;
  }
  posts = JSON.parse(p);
};

newPostButton.onclick = (e) => {
  if (newPostInput.value !== "") {
    addPost(newPostInput.value);
    newPostInput.value = "";
    renderFeed();
  }
};

function toggleClick(idx) {
  posts[idx].liked = !posts[idx].liked;
  renderFeed();
}

function deletePost(idx) {
  posts = posts.filter((v, i) => i !== idx);
  renderFeed();
}

function renderFeed() {
  feedContainer.innerHTML = "";
  posts.forEach((post, idx) => {
    const newPost = newPostHtml(post, idx);
    feedContainer.appendChild(newPost);
  });
  saveToLocalStorage();
}

function openEditBox(idx) {
  const val = window.prompt("Edit the post");
  if (val) {
    posts[idx].text = val;
    renderFeed();
  }
}

function openCommentBox(idx) {
  const val = window.prompt("Enter a new comment");
  if (val) {
    posts[idx].comments.push({ text: val, liked: false });
    renderFeed();
  }
}

function newCommentHtml(comment, postIdx, idx) {
  const newComment = document.createElement("div");
  newComment.innerHTML = `
    <div class="comment flex" id="comment-${idx}">
        <p>${comment.text}</p>
        <div class="flex reply-actions">
            <button onclick="toggleCommentClick(${postIdx},${idx})">${comment.liked ? 'Unlike' : 'Like'}</button>
            <button onclick="deleteComment(${postIdx},${idx})">Delete</button>
        </div>
    </div>`;
  return newComment;
}

function newPostHtml(post, postIdx) {
  const newPost = document.createElement("div");
  newPost.classList.add("post");
  newPost.innerHTML = `
    <div class="post flex ${post.comments.length > 0 ? 'has-comments' : ''}" id="post-${postIdx}">
        <p>${post.text}</p>
        <div class="flex reply-actions">
            <button onclick="openCommentBox(${postIdx})">Comment</button>
            <button onclick="toggleClick(${postIdx})">${post.liked ? 'Unlike' : 'Like'}</button>
            <button onclick="openEditBox(${postIdx})">Edit</button>
            <button onclick="deletePost(${postIdx})">Delete</button>
        </div>
    </div>`;
  const comments = document.createElement("div");
  comments.classList.add("comments-container");
  post.comments.forEach((comment, idx) => {
    const newComment = newCommentHtml(comment, postIdx, idx);
    comments.appendChild(newComment);
  });
  newPost.appendChild(comments);
  return newPost;
}

function addPost(text) {
  posts.push({ text, liked: false, comments: [] });
}
getFromLocalStorage();
renderFeed();
