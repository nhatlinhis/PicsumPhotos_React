import React, { useEffect, useState } from "react";
import axios from "axios";
import { stringify } from "uuid";

const getRandomPhotos = async (page) => {
  try {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${page}&limit=8`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Photos = () => {
  const [randomPhotos, setRandomPhotos] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  const handleLoadMorePhotos = async () => {
    const images = await getRandomPhotos(nextPage);
    const newPhotos = randomPhotos.concat(images); // Nối 2 mảng hiện có lại với nhau
    setRandomPhotos(newPhotos);
    setNextPage(nextPage + 1);
  };

  // console.log("outside");
  useEffect(() => {
    handleLoadMorePhotos();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-5 p-5 ">
        {randomPhotos.length > 0 &&
          randomPhotos.map((item, index) => (
            <div
              key={item.download_url}
              className="p-3 bg-white shadow-md rounded-lg h-[200px]"
            >
              <img
                src={item.download_url}
                alt={item.author}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
      </div>
      <div className="text-center">
        <button
          onClick={handleLoadMorePhotos}
          className="inline-block px-8 py-4 bg-purple-600 text-white rounded-lg"
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default Photos;
