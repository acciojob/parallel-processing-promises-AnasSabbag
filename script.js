//your JS code here. If required.
const output = document.getElementById("output");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(image) {
	return new Promise((resolve,reject)=>{
		const img= new Image();
		img.src= image;
		img.onload=()=>resolve(image);
		img.onerror=()=>reject(`Failed to load image from ${image}`);
	
	});
}

function downloadImages(){
	//show loading spinner
	let prom =[];
	images.forEach((image)=>{
		prom.push(downloadImage(image.url));
	});
	
	output.innerHTML = ``;

	Promise.all(prom).then((values)=>{
		document.getElementById("loading").style.display="none";
		values.forEach((url)=>{
			const img = document.createElement('img');
	        img.src = url;
			img.alt="not loaded"
	        output.appendChild(img);	
		});
		
		
	}).catch((err)=>{
		document.getElementById("loading").style.display="none";
		let errDiv = document.getElementById("error");
		errDiv.innerHTML =`<p>${err}<p>`;
			
	});

}
downloadImages();
const btn = document.getElementById("download-images-button");
btn.addEventListener("click", downloadImages);