import axios from "axios";

function fetchUsers(query, page) {
  if (!query) {
    return Promise.reject("query needed");
  }

  return axios.get("https://api.github.com/search/users", {
    params: {
      q: query,
      _page: 1,
      _limit: 5
    }
  });
}

export default fetchUsers;
