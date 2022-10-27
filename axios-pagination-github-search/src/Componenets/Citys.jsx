import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

export default function City() {
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(5);

  const getData = (params = {}) => {
    return axios.get("https://api.github.com/search/users?", {
      params: {
        q: params.query,
        page: params.page,
        per_page: params.limit
      }
    });
  };

  useEffect(() => {
    getData({ query, limit, page })
      .then((res) => setdata(res.data.items))
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  // console.log(data);
  console.log(query);
  return (
    <div>
      <h1>git user</h1>
      <br />
      <input
        type="text"
        placeholder="search something..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button onClick={getData}>SEARCH</button>
      <br />
      <br />
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        PREV
      </button>
      <button>{page}</button>
      <button onClick={() => setPage(page + 1)}>NEXT</button>
      <br />
      <br />
      {data.map((i) => (
        <Card key={i.id} {...i} />
      ))}
    </div>
  );
}
