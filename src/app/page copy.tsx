import "./styles.css";
import axios from "axios";
import React from "react";

const userURL = "https://jsonplaceholder.typicode.com/users";
const postUrl = "https://jsonplaceholder.typicode.com/posts?userId=";

export default function App() {
  const [user, setUser] = React.useState([]);
  const [userPost, setUserPost] = React.useState([]);
  const [userInput, setUserInput] = React.useState("");

  const fetchUserData = () => {
    axios.get(`${userURL}`).then((response) => {
      setUser(response.data);
    });
  };

  const clearUserData = () => {
    setUser([]);
  };

  const getPostData = () => {
    axios.get(`${postUrl}${userInput}`).then((res) => {
      setUserPost(res.data);
    });
  };

  const handleOnChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPostData();
  };

  React.useEffect(() => {}, []);

  if (!user) return null;
  return (
    <div>
      <button onClick={fetchUserData}>Get Users</button>
      <button onClick={clearUserData}>Clear Users</button>
      {user.length > 0 ? (
        <>
          <h2>User Data</h2>
          {user?.map((list) => (
            <div key={list.id}>
              <p>
                User {list.id} = Name: {list.name} | Email: {list.email}
              </p>
            </div>
          ))}
          <h2>Total Users = {user.length}</h2>
        </>
      ) : (
        <h1>No Users</h1>
      )}
      <form className="m-5" onSubmit={handleSubmit}>
        <label htmlFor="userId">User Id: </label>
        <input
          value={userInput}
          onChange={handleOnChange}
          className="border border-black"
          type="text"
          id="userId"
        />
        <button type="submit">Get post Users</button>
        {userInput ? (
          <>
            {userPost?.map((list, id) => (
              <div key={id}>
                <h2>User Id: {list.userId}</h2>
                <h3>
                  {list.id}.{list.title}
                </h3>
                <h3>{list.body}</h3>
              </div>
            ))}
            <h2>Total User Post = {userPost.length}</h2>
          </>
        ) : (
          <p>Pls enter user input</p>
        )}
      </form>
    </div>
  );
}
