let images = [];
let currentIndex = 0;
let currentFilter = 'all';
let visibleImages = [];


   // LOAD FROM LOCAL STORAGE

window.addEventListener("load", () => {
  const savedImages = localStorage.getItem("galleryImages");

  if (savedImages) {
    images = JSON.parse(savedImages);
    renderImages();
  }
});


   // SAVE TO LOCAL STORAGE

function saveImages() {
  localStorage.setItem("galleryImages", JSON.stringify(images));
}


   // RESIZE IMAGE (IMPORTANT)

function resizeImage(file, callback) {
  const img = new Image();
  const reader = new FileReader();

  reader.onload = function (e) {
    img.src = e.target.result;
  };

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const MAX_WIDTH = 800;
    const scale = MAX_WIDTH / img.width;

    canvas.width = MAX_WIDTH;
    canvas.height = img.height * scale;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    callback(canvas.toDataURL("image/jpeg", 0.7));
  };

  reader.readAsDataURL(file);
}


   // ADD IMAGE

function addImage() {
  const fileInput = document.getElementById('fileInput');
  const category = document.getElementById('category').value;

  if (!fileInput.files[0]) {
    alert('Select an image');
    return;
  }

  resizeImage(fileInput.files[0], (resizedData) => {
    images.push({
      src: resizedData,
      category: category
    });

    saveImages();
    renderImages(currentFilter);

    fileInput.value = ""; // reset input
  });
}


   // RENDER IMAGES

function renderImages(filter = 'all') {
  currentFilter = filter;
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  visibleImages = images.filter(img =>
    filter === 'all' || img.category === filter
  );

  visibleImages.forEach((img, index) => {

    const card = document.createElement('div');
    card.className = 'card';

    const image = document.createElement('img');
    image.src = img.src;
    image.onclick = () => openLightbox(index);

    const removeBtn = document.createElement('button');
    removeBtn.innerText = '×';
    removeBtn.className = 'remove-btn';

    removeBtn.onclick = () => {
      images.splice(images.indexOf(img), 1);

      saveImages();
      renderImages(filter);
    };

    card.appendChild(image);
    card.appendChild(removeBtn);
    gallery.appendChild(card);
  });
}


   // FILTER

function filterImages(event, category) {
  document.querySelectorAll('.filter-btn')
    .forEach(btn => btn.classList.remove('active'));

  event.target.classList.add('active');
  renderImages(category);
}


   // LIGHTBOX

function openLightbox(index) {
  currentIndex = index;
  document.getElementById('lightbox').style.display = 'flex';
  updateLightbox();
}

function updateLightbox() {
  document.getElementById('lightboxImg').src =
    visibleImages[currentIndex].src;
}

function nextImage(e) {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % visibleImages.length;
  updateLightbox();
}

function prevImage(e) {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  updateLightbox();
}


   // CLOSE LIGHTBOX

document.getElementById('lightbox').onclick = function () {
  this.style.display = 'none';
};
