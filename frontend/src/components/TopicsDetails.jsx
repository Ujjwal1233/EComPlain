import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

export const TopicsDetails = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  async function fetchTopics() {
    try {
      const response = await axios.get(`${BACKEND_URL}/extra/alltopics`);
      setTopics(response.data.topics);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  }

  const topicClickHandler = () => {
    navigate("/topics");
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const getNumberOfTopics = () => {
    return topics.length;
  };

  return (
    <div className="container mx-auto mt-10 p-4 border rounded-md shadow-md">
      <div className="text-xl font-bold mb-4">Topics Details:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-md">
          <div className="font-semibold">Number of Topics:</div>
          <div>{getNumberOfTopics()}</div>
        </div>
        <div className="border p-4 rounded-md">
          <div className="font-semibold">Topics:</div>
          <div>{topics.map((topic) => topic.topic).join(", ")}</div>
        </div>
        <div
          className="border p-4 rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={topicClickHandler}
        >
          <div className="font-semibold flex text-2xl font-medium">
            Add New Topics
            <div className="text-xl p-2">
              <GoArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
