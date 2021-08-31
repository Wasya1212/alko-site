const newsFormElement = document.querySelector('.add-news-form');
const newsImageInputElement = document.querySelector('#news-image-input');
const newsImagePreviewElement = document.querySelector('.uploaded-image-container');
const newsTitleInputElement = document.querySelector('#news-title-input');
const newsTextTextareaElement = document.querySelector('#news-text-input');

function submitNews(news, { success, error }) {
  success();
}

function createNews(news) {
  return ;
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
  
  const newsData = {
    title: newsTitleInputElement.value,
    text: newsTextTextareaElement.value,
    image: newsImageInputElement.files[0],
    date: formatDateAndTime(new Date(), false),
    views: Math.floor(Math.random() * 1000)
  };

  for (const newsField in newsData) {
    if (!newsData[newsField]) {
      alert(`Please enter news ${newsField}!`);
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