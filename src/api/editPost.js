import {
  SINGLE_URL,
  EDIT_URL,
  editForm,
  NOROFF_API_KEY,
  editFormTitle,
  editFormUrl,
  editFormBody,
} from "../utils/const.js";
import { fetchSinglePost } from "../components/singlePost.js";
import { getFromLocalStorage } from "..//utils/storage.js";

try {
  const post = await fetchSinglePost();
  renderEditedPost(post);
} catch (error) {
  alert(error);
  console.log(error);
}

async function renderEditedPost(post) {
  editFormTitle.value = post.title;
  editFormUrl.value = post.media.url;
  editFormBody.value = post.body;
}
async function editPost(postDetails) {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      method: "PUT",
      body: JSON.stringify(postDetails),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(EDIT_URL, fetchOptions);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
function onEditFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const postFields = Object.fromEntries(formData);

  const media = {
    url: postFields.url,
    alt: postFields.alt,
  };
  postFields.media = media;
  editPost(postFields);
  window.location.href = "./index.html";
}
editForm.addEventListener("submit", onEditFormSubmit);
try {
  const post = await fetchSinglePost();
  renderEditedPost(post);
} catch (error) {
  alert(error);
  console.log(error);
}
