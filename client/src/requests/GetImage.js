// Fetch random image from selected collection from unsplash and return json

export default async function GetImage() {
  if (
    localStorage.getItem("image") &&
    localStorage.getItem("image") !== "undefined"
  ) {
    return localStorage.getItem("image");
  }
  let randomImg = getRandomImage();

  // get request to api.unsplash- returns array of 10 images per documentation
  const response = await fetch(
    `https://api.unsplash.com/collections/${randomImg.collection}/photos/?page=${randomImg.page}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
  );
  const data = await response.json();
  console.log(data ? "Fetch image success" : "Fetch image failed");
  localStorage.setItem("image", JSON.stringify(data[randomImg.img - 1]));
  return data[randomImg.img - 1];
}

const getRandomImage = () => {
  // Using 2 image collections (8498187 && 8320764)
  let collection = Math.floor(Math.random() * 2) === 0 ? 8498187 : 8320764,
    imgNum = Math.floor(Math.random() * 76), // both collections have 76 images
    page = Math.floor(imgNum / 10);

  return { page: page, img: imgNum % 10, collection: collection };
};
