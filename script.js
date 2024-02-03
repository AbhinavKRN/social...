let post_btn = document.querySelector("#button")
post_btn.addEventListener('click',(e)=>{
    let posts_box = document.querySelector(".posts")
    let main_post = document.createElement('div');
    main_post.innerHTML = 
    `<div class="main-post">
    <div class="post-main">
        <div class="prof-img">
        </div>
        <div class="post-right">    
            <div class="post-det">
                <div class="post-right-btns">
                    <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/031/original/profile_image.png?1706888739" alt="#">
                    <h4>Naga Chaitanya @chay</h4>
                </div>
            </div>
            
            <div class="post-txt-area">
                <textarea name="post" id="post-area-text" cols="30" rows="10" disabled = "disabled"></textarea>
            </div>
            
            <div class="like-cmnt-btns">
                <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/026/original/comment.png?1706888619" alt="#">
                <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/029/original/heart.png?1706888679" alt="#">
            </div>
        </div>
    </div>
    </div>`

    posts_box.appendChild(main_post);

})


let post_area = document.querySelector("#post-area");
console.log(post_area.getAttribute['value'])
