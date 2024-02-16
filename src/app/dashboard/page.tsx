// @refresh reset

"use client";
import Pagination from "@/components/pagination/Pagination";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface User {
  email: string;
  id: number;
  userId: number;
  title: string;
  body: string;
}
const postUrl = "https://jsonplaceholder.typicode.com/posts?userId=";
const albumsUrl = "https://jsonplaceholder.typicode.com/albums?userId=";
const todosUrl = "https://jsonplaceholder.typicode.com/todos?userId=";

export default function Dashboard() {
  const [user, setUser] = useState<User[]>([]);
  const [userPost, setUserPost] = useState<User[]>([]);
  const [userAlbums, setUserAlbums] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [showPostData, setShowPostData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const router = useRouter();
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : [];
    setUser(parsedUserData);
    console.log("parsedUserData", parsedUserData);
    const fetchData = async () => {
      try {
        if (parsedUserData.length > 0) {
          console.log("In parsedUserData");
          const userPost = await axios.get(
            `${postUrl}${parsedUserData[0]?.id}`
          );
          setUserPost(userPost.data);
          console.log("userPost", userPost.data);

          const userAlbums = await axios.get(
            `${albumsUrl}${parsedUserData[0]?.id}`
          );
          setUserAlbums(userAlbums.data);
          console.log("userAlbums", userAlbums.data);

          const userTodos = await axios.get(
            `${todosUrl}${parsedUserData[0]?.id}`
          );
          setUserTodos(userTodos.data);
          console.log(userTodos.data);
          setLoading(false);
        } else {
          console.log("No parsedUserData");
        }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.status);
        } else {
          console.error("error during feching data", error.response);
        }
      }
    };
    fetchData();
  }, []);

  const getUserPost = () => {
    setShowPostData(true);
  };

  const itemsPerPage = 5;

  const handleChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  const handleLogout = () => {
    router.push("/");
    localStorage.removeItem("userData");
    setUser([]);
  };

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen max-w-[1200px] m-auto">
          <div className="flex flex-wrap gap-4 justify-center pt-32">
            <div className="font-semibold text-xl tracking-tight text-white w-full text-center">
              Loading...
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen max-w-[1200px] m-auto">
          <div className="flex flex-wrap gap-4 justify-center pt-32">
            <div className="font-semibold text-xl tracking-tight text-white w-full text-center">
              Email: {user.length > 0 ? user[0]?.email : "nouser"}
            </div>
            <div className="font-semibold text-xl tracking-tight text-white w-full text-center">
              <button onClick={handleLogout}> Logout</button>
            </div>
            <div
              onClick={getUserPost}
              className={`${
                showPostData ? "!bg-red-500" : "bg-gray-600"
              } flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 w-[240px] bg-gray-600 backdrop-filter backdrop-blur-lg`}
            >
              <div className="font-semibold text-5xl tracking-tight">
                {userPost.length}
              </div>
              <div className="font-normal">Total Posts</div>
            </div>

            <div className="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 w-[240px] bg-gray-600 backdrop-filter backdrop-blur-lg">
              <div className="font-semibold text-5xl tracking-tight">
                {userAlbums.length}
              </div>
              <div className="font-normal">Albums</div>
            </div>
            <div className="flex flex-col gap-2 h-40 text-white rounded-xl shadow-md p-6 w-[240px] bg-gray-600 backdrop-filter backdrop-blur-lg">
              <div className="font-semibold text-5xl tracking-tight">
                {userTodos.length}
              </div>
              <div className="font-normal">Todo List</div>
            </div>
          </div>

          {showPostData && (
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-white border-b">
                        <tr>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            User&nbsp;Id
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            No.
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Body
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {userPost
                          .slice(
                            currentPage * itemsPerPage,
                            (currentPage + 1) * itemsPerPage
                          )
                          .map((list, id) => (
                            <tr key={id} className="bg-gray-100 border-b">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {list.userId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {list.id}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {list.title}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {list.body}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Pagination
                pageCount={Math.ceil(userPost.length / itemsPerPage)}
                onPageChange={handleChange}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
