const newPostInput = document.getElementById("new-post-input");
const newPostButton = document.getElementById("new-post-button");
const feedContainer = document.getElementById("feed-container");
let posts = [];
function loadPostsFromLocalStorage() {
    const storedPosts = localStorage.getItem("posts");
    posts = storedPosts ? JSON.parse(storedPosts) : [];
}
function savePostsToLocalStorage() {
    localStorage.setItem("posts", JSON.stringify(posts));
}
function addPost(text) {
    const newPost = {
        text: text,
        liked: false,
        comments: []
    };
    posts.push(newPost);
    renderFeed();
}
function deletePost(postIndex) {
    posts.splice(postIndex, 1);
    renderFeed();
}
function toggleLike(postIndex) {
    posts[postIndex].liked = !posts[postIndex].liked;
    renderFeed();
}
function renderComment(comment, postIndex, commentIndex) {
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment");
    commentContainer.innerHTML = `
        <p>${comment.text}</p>
        <div class="flex reply-actions">
            <button onclick="toggleCommentLike(${postIndex}, ${commentIndex})">${comment.liked ? 'Unlike' : 'Like'}</button>
            <button onclick="deleteComment(${postIndex}, ${commentIndex})">Delete</button>
        </div>`;
    return commentContainer;
}
function renderPost(post, postIndex) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post");
    postContainer.innerHTML = `
        <p>${post.text}</p>
        <div class="flex reply-actions">
            <button onclick="openCommentBox(${postIndex})">Comment</button>
            <button onclick="toggleLike(${postIndex})">${post.liked ? 'Unlike' : 'Like'}</button>
            <button onclick="openEditBox(${postIndex})">Edit</button>
            <button onclick="deletePost(${postIndex})">Delete</button>
        </div>`;
    
    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");
    post.comments.forEach((comment, commentIndex) => {
        const commentElement = renderComment(comment, postIndex, commentIndex);
        commentsContainer.appendChild(commentElement);
    });
    
    postContainer.appendChild(commentsContainer);
    return postContainer;
}
function renderFeed() {
    feedContainer.innerHTML = "";
    posts.forEach((post, index) => {
        const postElement = renderPost(post, index);
        feedContainer.appendChild(postElement);
    });
    savePostsToLocalStorage();
}
newPostButton.addEventListener("click", () => {
    const postText = newPostInput.value.trim();
    if (postText !== "") {
        addPost(postText);
        newPostInput.value = "";
    }
});
window.addEventListener("load", () => {
    loadPostsFromLocalStorage();
    renderFeed();
});

function openCommentBox(postIndex) {
    const commentText = prompt("Enter your comment:");
    if (commentText !== null && commentText.trim() !== "") {
        const newComment = {
            text: commentText,
            liked: false
        };
        posts[postIndex].comments.push(newComment);
        renderFeed();
    }
}

function openEditBox(postIndex) {
    const editText = prompt("Edit your post:", posts[postIndex].text);
    if (editText !== null && editText.trim() !== "") {
        posts[postIndex].text = editText;
        renderFeed();
    }
}
