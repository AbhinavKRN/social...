document.addEventListener('DOMContentLoaded', function () {
    const postButton = document.getElementById('button');
    const postArea = document.getElementById('post-area');
    const postContainer = document.getElementById('post-container');

    postButton.addEventListener('click', function () {
        const postContent = postArea.value.trim();
        if (postContent !== '') {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.textContent = postContent;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                postElement.remove();
            });
            postElement.appendChild(deleteButton);

            postContainer.appendChild(postElement);
            postArea.value = '';
            const charCount = document.querySelector('.count_of_char');
            charCount.textContent = '0';
        }
    });

    postArea.addEventListener('input', function () {
        const charCount = document.querySelector('.count_of_char');
        charCount.textContent = postArea.value.length;
    });
});
