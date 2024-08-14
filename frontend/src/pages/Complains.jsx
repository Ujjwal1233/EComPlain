import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { ComplainCard } from "../components/ComplainCard";
import { AppBar } from "../components/AppBar";

export const Complains = () => {
  const navigate = useNavigate();
  const [complains, setComplains] = useState([]);
  const [topicsFilter, setTopicsFilter] = useState({});
  const [uniqueTopics, setUniqueTopics] = useState([]);
  const [sortComplainsByTopic, setSortComplainsByTopic] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/getprofile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const isAdminUser = response.data.user.role === "admin";
        setIsAdmin(isAdminUser);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchComplains = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/complain/allcomplains`
        );
        const sortedComplains = response.data.complains.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setComplains(sortedComplains);

        const topics = new Set();
        sortedComplains.forEach((complain) => {
          complain.topics.forEach((topic) => topics.add(topic));
        });
        const topicsFilterObj = {};
        Array.from(topics).forEach((topic) => {
          topicsFilterObj[topic] = false;
        });
        setUniqueTopics(Array.from(topics));
        setTopicsFilter(topicsFilterObj);
      } catch (error) {
        console.error("Error fetching complains:", error);
      }
    };

    fetchComplains();
  }, []);

  const handleNewComplainClick = () => {
    navigate("/createComplain");
  };

  const navigateToIndivisualComplain = (id) => {
    navigate(`/fullcomplain/${id}`);
  };

  const filterComplainsByTopic = () => {
    const selectedTopics = Object.keys(topicsFilter).filter(
      (topic) => topicsFilter[topic]
    );
    return complains.filter((complain) =>
      selectedTopics.every((topic) => complain.topics.includes(topic))
    );
  };

  const handleToggleSortByTopic = () => {
    setSortComplainsByTopic((prevSort) => !prevSort);
  };

  const handleTopicCheckboxChange = (topic) => {
    setTopicsFilter((prevFilter) => ({
      ...prevFilter,
      [topic]: !prevFilter[topic],
    }));
  };

  const handleDashboardNavigation = () => {
    navigate("/admin");
  };

  return (
    <div>
      <AppBar
        label={"All Complains"}
        clickHandler1={handleNewComplainClick}
        clickHandler2={handleDashboardNavigation}
        showDashboard={isAdmin}
      />
      <div className="mt-4 flex items-center ml-64">
        <button
          onClick={handleToggleSortByTopic}
          className="bg-gray-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          {sortComplainsByTopic ? "Hide Topics" : "Sort by Topics"}
        </button>
        {sortComplainsByTopic &&
          uniqueTopics.map((topic, index) => (
            <label key={index} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={topicsFilter[topic]}
                onChange={() => handleTopicCheckboxChange(topic)}
                className="mr-2 border-gray-500 rounded text-blue-500 focus:ring-blue-400"
              />
              <span className="text-gray-700">{topic}</span>
            </label>
          ))}
      </div>
      <div className="mt-4">
        {sortComplainsByTopic
          ? filterComplainsByTopic().map((complain) => (
              <ComplainCard
                key={complain._id}
                title={complain.title}
                desc={complain.description}
                allowed={complain.canBeAnsweredBy}
                status={complain.complainStatus}
                topics={complain.topics}
                created={complain.createdAt}
                updated={complain.updatedAt}
                clickHandler={() => navigateToIndivisualComplain(complain._id)}
              />
            ))
          : complains.map((complain) => (
              <ComplainCard
                key={complain._id}
                title={complain.title}
                desc={complain.description}
                allowed={complain.canBeAnsweredBy}
                status={complain.complainStatus}
                topics={complain.topics}
                created={complain.createdAt}
                updated={complain.updatedAt}
                clickHandler={() => navigateToIndivisualComplain(complain._id)}
              />
            ))}
      </div>
    </div>
  );
};
