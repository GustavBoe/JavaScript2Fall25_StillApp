import { getFromLocalStorage } from "..//utils/storage.js";
import { NOROFF_API_KEY, SINGLE_URL } from "..//utils/const.js";
export async function fetchSinglePost() {
  try {
    const accessToken = getFromLocalStorage("accessToken");
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": NOROFF_API_KEY,
      },
    };
    const response = await fetch(SINGLE_URL, fetchOptions);
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.log(error);
  }
}
