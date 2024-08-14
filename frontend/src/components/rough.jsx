import { useState, useEffect } from "react";

export const Topics = () => {
  const [topics, setTopics] = useState([]);
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

  const handleCheckboxChange = (topic) => {
    setTopics((prevTopics) => [...prevTopics, topic]);
  };

  return (
    <div>
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
      ;
    </div>
  );
};
