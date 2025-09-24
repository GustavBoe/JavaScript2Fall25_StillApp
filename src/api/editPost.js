import { SINGLE_URL, editForm, NOROFF_API_KEY } from "../utils/const.js";
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
    const response = await fetch(SINGLE_URL, fetchOptions);
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
}

editForm.addEventListener("submit", onEditFormSubmit);
