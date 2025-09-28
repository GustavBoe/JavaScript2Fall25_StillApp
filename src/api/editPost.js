import {
  userName,
  EDIT_URL,
  editForm,
  NOROFF_API_KEY,
  editFormTitle,
  editFormUrl,
  editFormBody,
  deleteButton,
} from "../utils/const.js";
import { fetchSinglePost } from "../api/apiClient.js";
import { getFromLocalStorage } from "..//utils/storage.js";
import { createHeader } from "../components/headerFooterLoader.js";
createHeader();
try {
  const post = await fetchSinglePost();
  renderEditedPost(post);
} catch (error) {
  alert(error);
  console.log(error);
}

async function renderEditedPost(post) {
  editFormTitle.value = post.title;
  editFormBody.value = post.body;
  if (post.media) {
    editFormUrl.value = post.media.url;
  } else {
    editFormUrl.value = "https://i.imghippo.com/files/AVMh8683c.png";
  }
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
    if (response.ok) {
      alert(`${userName} edited a post`);
      window.location.href = "./index.html";
    }
  } catch (error) {
    console.log(error);
  }
}
async function deletePost() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(EDIT_URL, fetchOptions);
    if (response.ok) {
      alert("Deleted post, returning to homepage");
    } else {
      alert("Post could not be deleted");
      console.log(error[0].message);
    }
  } catch (error) {
    alert(error);
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
}

editForm.addEventListener("submit", onEditFormSubmit);

deleteButton.addEventListener("click", () => {
  confirm("Are you sure you want to delete your post?");
  if (confirm) {
    try {
      deletePost();
      window.location.href = "./index.html";
    } catch (error) {
      alert("Could not delete post, redirecting to homepage");
      window.location.href = "./index.html";
    }
  } else {
    location.reload();
  }
});
