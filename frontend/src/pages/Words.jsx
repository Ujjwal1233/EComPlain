import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ShowExtra } from "../components/ShowExtra";
import { LabelledInput } from "../components/LabelledInput";
import { CustomButton1 } from "../components/CustomButton1";

export const Words = () => {
  const [allWords, setAllWords] = useState([]);
  const [input, setInput] = useState("");

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  async function fetchWords() {
    try {
      const response = await axios.get(`${BACKEND_URL}/extra/allwords`);
      setAllWords(response.data.words);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  }

  useEffect(() => {
    fetchWords();
  }, []);

  async function createWords() {
    try {
      await axios.post(`${BACKEND_URL}/extra/addwords`, { words: input });
      fetchWords();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto mt-10 px-4 lg:w-3/4 xl:w-2/3">
      <div className="mb-4">
        <label className="block mb-2 text-sm text-black font-semibold pt-4">
          Enter the words saperated by comma:
        </label>
        <input
          onChange={changeHandler}
          type="text"
          placeholder="word1,word2...."
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <div className="flex justify-center">
          <div className="w-1/4">
            <CustomButton1
              label={"Submit"}
              colour={"blue"}
              clickHandler={createWords}
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="font-bold">Words:</div>
        <div className="flex flex-wrap">
          {allWords.map((word) => (
            <ShowExtra key={word._id} label={word.word} />
          ))}
        </div>
      </div>
    </div>
  );
};
