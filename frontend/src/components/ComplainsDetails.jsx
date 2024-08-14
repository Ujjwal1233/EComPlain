import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./../config";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export const ComplainsDetail = () => {
  const navigate = useNavigate();
  const [complains, setComplains] = useState([]);

  async function fetchComplains() {
    try {
      const response = await axios.get(`${BACKEND_URL}/complain/allcomplains`);
      setComplains(response.data.complains);
    } catch (error) {
      console.error("Error fetching complains:", error);
    }
  }

  useEffect(() => {
    fetchComplains();
  }, []);

  const getNumberOfComplains = () => {
    return complains.length;
  };

  const getNumberOfOpenComplains = () => {
    return complains.filter((complain) => complain.complainStatus === "open")
      .length;
  };

  const getTop3Topics = () => {
    const topicsCount = {};
    complains.forEach((complain) => {
      complain.topics.forEach((topic) => {
        topicsCount[topic] = (topicsCount[topic] || 0) + 1;
      });
    });
    const sortedTopics = Object.keys(topicsCount).sort(
      (a, b) => topicsCount[b] - topicsCount[a]
    );
    return sortedTopics.slice(0, 3);
  };
  const complainsClickHandler = () => {
    navigate("/complains");
  };

  return (
    <div className="container mx-auto my-10 p-4 border rounded-md shadow-md">
      <div className="text-xl font-bold my-4">Complains details:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 my-2 rounded-md">
          <div className="font-semibold">Number of Complains:</div>
          <div>{getNumberOfComplains()}</div>
        </div>
        <div className="border p-4 my-2 rounded-md">
          <div className="font-semibold">Number of Open Complains:</div>
          <div>{getNumberOfOpenComplains()}</div>
        </div>
        <div className="border p-4 my-2 rounded-md">
          <div className="font-semibold">Most frequent topics:</div>
          <div>{getTop3Topics().join(", ")}</div>
        </div>
        <div
          onClick={complainsClickHandler}
          className="border p-5 my-2 rounded-md cursor-pointer flex hover:bg-gray-100"
        >
          <div className="font-bold text-2xl">Check All complains</div>
          <div className="text-xl p-2">
            <GoArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};
