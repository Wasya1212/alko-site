const newsFormElement = document.querySelector('.add-news-form');
const newsImageInputElement = document.querySelector('#news-image-input');
const newsImagePreviewElement = document.querySelector('.uploaded-image-container');
const newsTitleInputElement = document.querySelector('#news-title-input');
const newsTextTextareaElement = document.querySelector('#news-text-input');

async function submitNews(news, { success, error }) {
  await postData('/news/create', news);
  success();
}

function showUploadedPicture(imagePath) {
  newsImagePreviewElement.style.backgroundImage = `url(${imagePath})`;
}

newsImageInputElement.addEventListener('change', () => {
  readPhotoURL(newsImageInputElement, imagePath => {
    showUploadedPicture(imagePath);
  });
});

newsFormElement.addEventListener('submit', e => {
  e.preventDefault();

  const newsData = new FormData();

  newsData.append('image', newsImageInputElement.files[0]);
  newsData.append('title', newsTitleInputElement.value);
  newsData.append('text', newsTextTextareaElement.value);
  newsData.append('date', new Date());
  newsData.append('views', Math.floor(Math.random() * 1000));

  for (const newsFieldPair of newsData.entries()) {
    if (!newsFieldPair[1] || newsFieldPair[1] === "undefined") {
      alert(`Please enter news ${newsFieldPair[0]}!`);
      return;
    }
  }  

  submitNews(newsData, {
    success: () => {
      newsImagePreviewElement.style.backgroundImage = 'url(../../assets/img/no-image.jpg)';
      newsImageInputElement.value = "";
      newsTitleInputElement.value = "";
      newsTextTextareaElement.value = "";
    },
    error: () => alert("Cannot create news! Please try again...")
  });  
});