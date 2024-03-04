const postsContainer = document.getElementById('posts-container');
const latestPostContainer = document.getElementById('latest-post-container');
let count = 0;
const sideBarParent = document.getElementById('side-container');
const markPostCollection = document.getElementById('marked-post-count');
const loadAllPosts = async () => {
  const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
  const json = await response.json();
  displayPosts(json);
}
const displayPosts = (posts) => {
  const postsCollection = posts.posts;
  console.log(postsCollection);
  postsCollection.forEach(post => {
    const div = document.createElement('div');
    div.classList = 'max-w-[822px] h-[270px] bg-[#f3f3f5] rounded-3xl px-4';
    // Check if user online or offline 
    const userStatusClass = post.isActive ? 'user-online' : 'user-offline';
    div.innerHTML = ` <div class="flex items-start">
  <div>
    <div class="p-8 w-32 relative">
      <img src="${post.image}" alt="">
      <div class="${userStatusClass} absolute bottom-[85px] left-[85px]">

      </div>
    </div>

  </div>
  <div class="mt-6">
    <p class="text-[14px] py-2 text-[#12132DCC] font-medium font-inter"># ${post.category}
      Author : ${post.author.name}</p>
    <p class="font-bold text-xl py-2 font-mulish text-[#12132D]">${post.title}
    </p>
    <p
      class="font-normal text-[#12132D99] text-[16px] font-inter border-[#12132D40] border-dashed border-b-2 py-2">
    ${post.description}
    </p>
    <div class="flex justify-between items-center px-5 py-5 font-inter text-[#12132D99]">
      <div class="flex gap-5">
        <div> <i class='bx bx-message-dots'></i>&nbsp;${post.comment_count}</div>
        <div> <i class='bx bx-show'></i>&nbsp;${post.view_count}</div>
        <div> <i class='bx bx-time'></i>&nbsp;${post.
        posted_time}min</div>
      </div>
      <div class="justify-end">
        <img src="./images/massage.png" alt="massage icon" onclick="showInSideBar('${post.title.replace(/'/g, '')}','${post.view_count}')">
      </div>
    </div>
  </div>
</div>`
    postsContainer.appendChild(div);
  });
}
const showInSideBar = (postTitle, postView) => {
  count++;
  console.log(postTitle);
  console.log(postView);
  const createSideSection = document.createElement('div');
  createSideSection.classList = `max-w-80 h-full mx-auto my-2 p-5 bg-white rounded-2xl`;
  createSideSection.innerHTML = `
<div class = "flex gap-6 justify-between items-center border-b-2">
<div>
${postTitle}
</div>
<div>${postView}</div>
</div>
  `
  sideBarParent.appendChild(createSideSection);
  markPostCollection.innerText = count;
}
loadAllPosts();
const loadLatestPosts = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
  const data = await res.json();
  displayLatestsPosts(data);
}
const displayLatestsPosts = (latestPosts) => {
  const latestPostsCollection = latestPosts;
  latestPostsCollection.forEach(latestPost => {
    console.log(latestPost);
    const createLatestPostCard = document.createElement('div');
    createLatestPostCard.classList = `card w-96 bg-base-100  border-2`;
    createLatestPostCard.innerHTML = `
    <figure><img src="${latestPost.cover_image}" alt="Shoes" class="max-w-[326px] px-6 py-4" /></figure>
    <div class="card-body">
      <div class="flex">
        <p class="text-[#12132D99] font-mulish text-[16px]">
          <i class='bx bxs-calendar'></i><span>
            ${latestPost.author.posted_date || 'No Publish Date'}
          </span>
        </p>

      </div>
      <h2 class="card-title text-[#12132D] font-extrabold font-mulish text-xl">${latestPost.title}</h2>
      <p>${latestPost.description}</p>
      <div class="card-actions justify-start flex items-center">
        <div class="avatar">
          <div class="w-16 rounded-full">
            <img src="${latestPost.profile_image}" />
          </div>
        </div>
        <div>
          <p>${latestPost.author.name}</p>
          <p>${latestPost.author.designation || 'unknown'}</p>
        </div>
      </div>
    </div>
    `
    latestPostContainer.appendChild(createLatestPostCard);
  });
}
loadLatestPosts();
// onclick="AddToList(${title.replace(/'/g,'@')})"