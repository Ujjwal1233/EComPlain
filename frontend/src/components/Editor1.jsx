import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Editor1 = ({
  label,
  url,
  navigateTo,
  buttonLabel,
  complainId,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState([]);
  const [complainStatus, setComplainStatus] = useState("open");
  const [canBeAnsweredBy, setCanBeAnsweredBy] = useState(["admin"]);
  const [images, setImages] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await axios.get(`${BACKEND_URL}/extra/alltopics`);
        setAllTopics(response.data.topics);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    }
    fetchTopics();
  }, []);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages(files);
  };

  const handleRadioChange = (e) => {
    if (e.target.value === "yes") {
      setCanBeAnsweredBy(["admin", "normal"]);
    } else {
      setCanBeAnsweredBy(["admin"]);
    }
  };

  const handleCheckboxChange = (topic) => {
    setTopics((prevTopics) => [...prevTopics, topic]);
  };

  async function submitComplain() {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      for (let i = 0; i < topics.length; i++) {
        formData.append("topics", topics[i]);
      }
      formData.append("complainStatus", complainStatus);
      for (let i = 0; i < canBeAnsweredBy.length; i++) {
        formData.append("canBeAnsweredBy", canBeAnsweredBy[i]);
      }
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      //to inspect the formdata
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }

      const finalURL = BACKEND_URL + url + "/" + complainId;
      console.log(finalURL);
      const response = await axios.put(
        `${BACKEND_URL}${url}/${complainId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate(navigateTo);
    } catch (error) {
      console.error("Error submitting complain:", error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <div className="text-center md:text-5xl pb-4 font-bold w-full">
        {label}
      </div>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Description"
        className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          allTopics.map((topic) => (
            <label key={topic._id} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={topic.topic}
                onChange={() => handleCheckboxChange(topic.topic)}
                checked={topics.includes(topic.topic)}
                className="mr-2"
              />
              {topic.topic}
            </label>
          ))
        )}
      </div>
      <div className="pb-2">
        <label className="block mb-1 font-medium">Complain Status:</label>
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            name="complainStatus"
            value="open"
            onChange={(e) => setComplainStatus(e.target.value)}
            className="mr-2"
          />
          Open
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="complainStatus"
            value="close"
            onChange={(e) => setComplainStatus(e.target.value)}
            className="mr-2"
          />
          Close
        </label>
      </div>
      <div className="pb-2">
        <p className="font-medium">Are normal users allowed to answer?</p>
        <label className="inline-flex items-center mr-4">
          <input type="radio" value="yes" onChange={handleRadioChange} />
          Yes
        </label>
        <label className="inline-flex items-center mr-4">
          <input type="radio" value="no" onChange={handleRadioChange} />
          No
        </label>
      </div>
      <input
        onChange={handleImageChange}
        type="file"
        placeholder="Images"
        multiple
        className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button
        className="block w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
        onClick={submitComplain}
        type="submit"
      >
        {buttonLabel}
      </button>
    </div>
  );
};
