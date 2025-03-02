const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image from ${imageUrl}`);
  });
}

function downloadImages() {
  
  loadingDiv.style.display = "block";
  errorDiv.textContent = "";
  output.innerHTML = "";

  const imagePromises = images.map((image) => downloadImage(image.url));

  Promise.all(imagePromises)
    .then((imgElements) => {
      loadingDiv.style.display = "none"; 
      imgElements.forEach((img) => output.appendChild(img)); 
    })
    .catch((err) => {
      loadingDiv.style.display = "none"; 
      errorDiv.textContent = err;
    });
}


btn.addEventListener("click", downloadImages);
