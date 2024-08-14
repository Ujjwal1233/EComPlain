import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

export const WordsDetails = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState([]);

  async function fetchWords() {
    try {
      const response = await axios.get(`${BACKEND_URL}/extra/allwords`);
      setWords(response.data.words);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  }

  useEffect(() => {
    fetchWords();
  }, []);

  const getNumberOfWords = () => {
    return words.length;
  };

  const wordsClickHandler = () => {
    navigate("/words");
  };

  return (
    <div className="container mx-auto mt-10 p-4 border mb-10 rounded-md shadow-md">
      <div className="text-xl font-bold mb-4">Words Details:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-md">
          <div className="font-semibold">Number of Words:</div>
          <div>{getNumberOfWords()}</div>
        </div>
        <div className="border p-4 rounded-md">
          <div className="font-semibold">Words:</div>
          <div>{words.map((word) => word.word).join(", ")}</div>
        </div>
        <div
          onClick={wordsClickHandler}
          className="border p-4 rounded-md hover:bg-gray-100 cursor-pointer"
        >
          <div className="font-semibold flex text-2xl font-medium">
            Add New Words
            <div className="text-xl p-2">
              <GoArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
