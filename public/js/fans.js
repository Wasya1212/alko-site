const feedbacksList = document.querySelector('.appeals-list');
const feedbackFormElement = document.querySelector('.add-feedback-form');
const feedbackTextareaElement = feedbackFormElement.querySelector('textarea');

async function submitFeedback(feedback, { success, error }) {
  await postData('/fans/feedback/create', feedback);
  success();
}

function createFeedbackElement(feedback) {
  return `
    <li>
      <p class="appeal-text">${feedback.text}</p>
      <footer>
        <time class="appeal-date" datetime="${formatDateAndTime(feedback.date, true)}">${formatDateAndTime(feedback.date, true)}</time>
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

  submitFeedback(feedbackData, {
    success: () => {
      feedbacksList.innerHTML += createFeedbackElement(feedbackData);
      feedbackTextareaElement.value = "";
    },
    error: () => alert("Cannot create feedback! Please try again...")
  });  
});