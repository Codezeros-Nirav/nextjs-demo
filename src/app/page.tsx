"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const userURL = "https://jsonplaceholder.typicode.com/users?email=";
const postUrl = "https://jsonplaceholder.typicode.com/posts?userId=";
function Login() {
  const [user, setUser] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [userInput, setUserInput] = useState("");

  const router = useRouter();
  const fetchUserData = () => {
    axios.get(`${userURL}${userInput}`).then((response) => {
      setUser(response.data);
      console.log("Login Page", response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
    });
  };

  const clearUserData = () => {
    setUser([]);
  };

  const handleOnChange = (e: any) => {
    const value = e.target.value;
    setUserInput(value);
    localStorage.setItem("userData", value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchUserData();
  };

  if (!user) return null;
  return (
    <>
      <div className="container mx-auto px-4 h-screen">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4 ">
            <div className="relative bg-blue-50 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign In
                  </h6>
                </div>
                <div className="btn-wrapper text-center"></div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>Or sign in with credentials</small>
              </div> */}
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      value={userInput}
                      onChange={handleOnChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={fetchUserData}>Get Users</button>
        <button onClick={clearUserData}>Clear Users</button>
        {user.length > 0 ? (
          <>
            <h2>User Data</h2>
            {user?.map((list: any) => (
              <div key={list.id}>
                <p>
                  User {list.id} = Name: {list.name} | Email: {list.email}
                </p>
              </div>
            ))}
          </>
        ) : (
          <h1>No Users</h1>
        )}
        <form className="m-5" onSubmit={handleSubmit}>
          {userInput ? (
            <>
              {userPost?.map((list: any, id) => (
                <div key={id}>
                  <h2>User Id: {list.userId}</h2>
                  <h3>
                    ({list.id}) {list.title}
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
    </>
  );
}

export default Login;
