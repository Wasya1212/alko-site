const feedbacksList = document.querySelector('.appeals-list');
const feedbackFormElement = document.querySelector('.add-feedback-form');
const feedbackTextareaElement = feedbackFormElement.querySelector('textarea');

async function submitFeedback(feedback, { success, error }) {
  await postData('/fans/feedback/create', feedback);
  success();
}

function storeFeedback(feedbackData) {
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
  localStorage.setItem("feedbacks", JSON.stringify([...feedbacks, feedbackData]));
}

function getFeedbacksFromStorage() {
  return JSON.parse(localStorage.getItem("feedbacks") || "[]");
}

function clearFeedbacksStorage() {
  localStorage.setItem("feedbacks", JSON.stringify([]));
}

function createFeedbackElement(feedback) {
  return `
    <li>
      <p class="appeal-text">${feedback.text}</p>
      <footer>
        <time class="appeal-date" datetime="${formatDateAndTime(new Date(feedback.date), true)}">${formatDateAndTime(new Date(feedback.date), true)}</time>
        <strong class="appeal-author">${feedback.author}</strong>
      </footer>
    </li>
  `;
}

feedbackFormElement.addEventListener('submit', e => {
  e.preventDefault();
  
  const feedbackData = {
    text: feedbackTextareaElement.value,
    date: new Date(),
    author: 'Uknown user'
  };

  if (!feedbackData.text) {
    alert("Please enter feedback text!");
    return;
  }  

  if (isOnline()) {
    submitFeedback(feedbackData, {
      success: () => {
        feedbacksList.innerHTML += createFeedbackElement(feedbackData);
        feedbackTextareaElement.value = "";
      },
      error: () => alert("Cannot create feedback! Please try again...")
    });
  } else {
    storeFeedback(feedbackData);
    feedbackTextareaElement.value = "";
  }
});

const feedbacksFromStorage = getFeedbacksFromStorage();

document.addEventListener("DOMContentLoaded", e => {
  if (!feedbacksFromStorage || isOnline()) return;

  feedbacksFromStorage.forEach(feedback => {
    feedbacksList.innerHTML += createFeedbackElement(feedback);
    feedbackTextareaElement.value = "";
  });
});

window.addEventListener('online', () => {
  getFeedbacksFromStorage().forEach(feedback => {
    postData('/fans/feedback/create', feedback)
      .then(() => {
        feedbacksList.innerHTML += createFeedbackElement(feedback)
      });
  });
  setTimeout(() => {
    clearFeedbacksStorage();
  }, 2000);
});