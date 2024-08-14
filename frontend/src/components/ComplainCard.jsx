import React from "react";

function truncateHtml(html, maxLength) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  let textContent = tempElement.textContent || tempElement.innerText || "";
  let truncatedText = textContent.substring(0, maxLength);
  if (textContent.length > maxLength) {
    truncatedText += "...";
  }

  return truncatedText;
}

export const ComplainCard = ({
  title,
  desc,
  status,
  allowed,
  created,
  topics,
  clickHandler,
}) => {
  const createdDateIST = new Date(created).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const truncatedDesc = truncateHtml(desc, 100);

  return (
    <div className="flex justify-center">
      <div
        className="w-2/3 p-2 m-2 rounded-md shadow-md bg-gray-100 cursor-pointer"
        onClick={clickHandler}
      >
        <div>
          <div className="text-3xl font-medium">{title}</div>
          <div className="border border-black my-1"></div>
          <div className="flex flex-wrap">
            <div className="text-sm mr-2">Related Topics:</div>
            {topics.map((element, index) => (
              <div
                key={index}
                className="text-sm bg-gray-300 rounded-xl px-2 mx-1 mb-1"
              >
                {element}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap">
            <div className="text-sm mr-2">Allowed to answer:</div>
            {allowed.map((element, index) => (
              <div
                key={index}
                className="text-sm bg-gray-300 rounded-xl px-2 mx-1 mb-1"
              >
                {element}
              </div>
            ))}
          </div>
          <div className="text-lg">{truncatedDesc}</div>
        </div>
        <div className="flex">
          <div className="text-sm mr-2">Complain Status:</div>
          <div className="border-2 text-sm bg-gray-300 rounded-xl px-2 mx-1">
            {status}
          </div>
          <div className="text-sm mr-2">Created at:</div>
          <div className="border-2 text-sm bg-gray-300 rounded-xl px-2 mx-1">
            {createdDateIST}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplainCard;
