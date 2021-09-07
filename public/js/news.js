function getNewsFromStorage() {
  return JSON.parse(localStorage.getItem("news") || "[]");
}

function clearNewsStorage() {
  localStorage.setItem("news", JSON.stringify([]));
}

function createNewsElement(news) {
  return `
    <section class="news-preview news-preview-small">
      <picture>
        <a href="#">
          <img src="" alt="${news.title} image">
        </a>
      </picture>
      <div class="content">
        <header>
          <a href="#"><h4>${news.title}</h4></a>
        </header>
        <footer>
          <p><span class="news-views">${news.views}</span></p>
          <p><time class="news-date" datetime="${formatDateAndTime(new Date(news.date))}">${formatDateAndTime(new Date(news.date))}</time></p>
        </footer>
      </div>
    </section>
  `;
}

const newsContainerElement = document.querySelector('.news-list');

const newsFromStorage = getNewsFromStorage();

document.addEventListener('DOMContentLoaded', e => {
  if (!newsFromStorage || isOnline()) return;

  newsFromStorage.forEach(news => {
    newsContainerElement.innerHTML += createNewsElement(news);
    const createdNews = newsContainerElement.querySelectorAll('.news-preview');

    readPhotoURL({files: [new File([news.imageBlob], news.imageName)]}, imagePath => {
      createdNews[createdNews.length - 1].querySelector('img').setAttribute('src', imagePath);
    });
  });
});

window.addEventListener('online', () => {
  newsFromStorage.forEach(news => {
    postData('/news/create', news);
  });
  clearNewsStorage();
});