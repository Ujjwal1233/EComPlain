import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const FullComplain = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complain, setComplain] = useState();
  const [zoomedUrl, setZoomedUrl] = useState(null);
  const [replies, setReplies] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [replyAllowed, setReplyAllowed] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  useEffect(() => {
    async function fetchComplain() {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/complain/getcomplainbyid/${id}`
        );
        setComplain(response.data.complain);
      } catch (error) {
        console.log(error);
      }
    }

    fetchComplain();
  }, [id]);

  async function fetchReplies() {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/reply/allrepliesofcomplain/${id}`
      );
      setReplies(response.data.replies);
      if (response.data.replies.length > 0) setShowReplies(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchReplies();
  }, [id]);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/getprofile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserProfile();
  }, []);

  const handleImageClick = (url) => {
    setZoomedUrl(url);
  };

  const handleZoomedClick = () => {
    setZoomedUrl(null);
  };

  async function fetchUserDetail(userId) {
    const response = await axios.get(`${BACKEND_URL}/user/userdetails`, userId);
  }

  function updateComplainHandler() {
    if (user && complain && user._id === complain.userId) {
      navigate(`/updateComplain/${complain._id}`);
    } else {
      setErrorMessage("You are not allowed to update this complain.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  const handleReplyContentChange = (content) => {
    setReplyContent(content);
  };

  const submitReply = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/reply/createreply/${id}`,
        {
          description: replyContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setReplyContent("");
      setShowEditor(false);
      fetchReplies();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    function fun1(complain, user) {
      console.log(complain);
      console.log(user);
      if (complain?.complainStatus === "close") return false;
      if (user?.role === "normal") {
        if (!complain?.canBeAnsweredBy?.includes("normal")) return false;
      }
      return true;
    }

    // const isAllowed = fun1(complain, user);
    setReplyAllowed(fun1(complain, user));
    console.log(replyAllowed);
  }, [complain, user]);

  return (
    <div>
      {errorMessage && (
        <div className="bg-red-500 text-white p-3">{errorMessage}</div>
      )}
      <div className="container mx-auto mt-10 px-4 lg:w-3/4 xl:w-2/3">
        {complain ? (
          <div className="bg-white p-6 shadow-md rounded-md">
            {complain.images?.length > 0 && (
              <div className="flex flex-wrap mb-4">
                {complain.images.map((image) => (
                  <div key={image._id} className="w-3/4 md:w-1/4 p-2">
                    <img
                      src={image.url}
                      alt={image.public_id}
                      className="w-full h-auto cursor-pointer"
                      onClick={() => handleImageClick(image.url)}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="font-bold text-xl mb-4">{complain.title}</div>
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{ __html: complain.description }}
            />
            <div className="text-gray-700 mb-4">
              <strong>Topics:</strong>{" "}
              {complain.topics &&
                complain.topics.map((topic) => (
                  <span key={topic} className="mr-2">
                    {topic}
                  </span>
                ))}
            </div>
            <div className="text-gray-700 mb-4">
              <strong>Created At:</strong>{" "}
              {new Date(complain.createdAt).toLocaleString()}
            </div>
            <div className="text-gray-700 mb-4">
              <strong>Updated At:</strong>{" "}
              {new Date(complain.updatedAt).toLocaleString()}
            </div>
            {
              <div>
                <button
                  className="border-2 bg-red-500 py-2 px-4 text-white rounded-3xl hover:bg-red-400 hover:underline"
                  onClick={updateComplainHandler}
                >
                  update complain
                </button>
              </div>
            }
          </div>
        ) : (
          <div>Loading...</div>
        )}
        {zoomedUrl && (
          <div
            className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-75 flex items-center justify-center"
            onClick={handleZoomedClick}
          >
            <img
              src={zoomedUrl}
              alt="Zoomed Image"
              className="max-w-full max-h-full"
            />
          </div>
        )}
      </div>
      <div className="container mx-auto mt-10 px-4 lg:w-3/4 xl:w-2/3">
        {user && replyAllowed === true && (
          <div className="mt-6">
            {
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowEditor(true)}
              >
                Add Reply
              </button>
            }
            {showEditor && (
              <div className="mt-4">
                <ReactQuill
                  value={replyContent}
                  onChange={handleReplyContentChange}
                />
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={submitReply}
                >
                  Submit Reply
                </button>
              </div>
            )}
          </div>
        )}
        {user && replyAllowed === false && <div>no more reply allowed</div>}
        <div>
          {showReplies === true && (
            <div className="shadow-lg mb-10 rounded-md p-4">
              <h2 className="text-xl font-bold mb-2">Replies</h2>
              <ul className="list-disc">
                {replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="mb-2 border p-2 rounded shadow-md"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: reply.description }}
                    ></div>
                    <div className="flex">
                      <div className="font-medium">created by : </div>
                      <div>{reply.userId}</div>
                    </div>
                    <div className="flex">
                      <div className="font-medium">created at : </div>
                      <div>{new Date(reply.updatedAt).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          )}
          {showReplies === false && replyAllowed === true && (
            <div>no replies, be the first to reply</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullComplain;
