import { useEffect, useState } from "react";

export default function GetImage() {
  const [image, setImage] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      // Using 2 image collections (8498187 && 8320764)
      let randomImg = getRandomImage();

      // Limited number of requests per hour- comment out fetch and use url when developing
      setImage(
        `https://source.unsplash.com/collection/${randomImg.collection}`
      );
      // const response = await fetch(
      //   `https://api.unsplash.com/collections/${randomImg.collection}/photos/?page=${randomImg.page}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
      // );
      // const data = await response.json();
      // console.log("data", data);
      // setImage(data[randomImg.img - 1]);
      // console.log(data);
    };

    fetchImage();
  }, []);

  const getRandomImage = () => {
    let collection = Math.floor(Math.random() * 2) === 0 ? 8498187 : 8320764,
      imgNum = Math.floor(Math.random() * 76), // both collections have 76 images
      page = Math.floor(imgNum / 10);

    return { page: page, img: imgNum % 10, collection: collection };
  };

  return image;
}
