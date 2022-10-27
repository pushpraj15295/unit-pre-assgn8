import { useEffect, useReducer, useState } from "react";

const initValue = {
  isLoading: false,
  isError: false,
  data: [],
  token: ""
};
////////////////////////////////
export const githubReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_GITHUB_USER_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: false
      };

    case "FETCH_GITHUB_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };

    case "FETCH_GITHUB_USER_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };

    default:
      return state;
  }
};
//////////////////////////////////////

export const githubLoadingAction = { type: "FETCH_GITHUB_USER_LOADING" };
export const githubSuccessAction = { type: "FETCH_GITHUB_USER_SUCCESS" };
export const githubFailureAction = { type: "FETCH_GITHUB_USER_FAILURE" };

/////////////////////////////////////////
const getUserData = (dispatch, text) => {
  dispatch(githubLoadingAction);

  fetch(`https://api.github.com/search/users?q=${text}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch({ ...githubSuccessAction, payload: res.items });
    })
    .catch((err) => {
      dispatch(githubFailureAction);
    });
};

///////////////////////////////////////////
export default function User() {
  const [state, dispatch] = useReducer(githubReducer, initValue);
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="search something..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => getUserData(dispatch, text)}>Search</button>
      <br />
      <br />
      <div style={{ border: "1px solid" }}>
        {state.data.map((item) => (
          <div
            style={{
              border: "1px solid",
              marginBottom: "2px",
              background: "grey"
            }}
            key={item.id}
          >
            {item.login}:{item.id}
          </div>
        ))}
      </div>
    </div>
  );
}
