const feedbacksList = document.querySelector('.appeals-list');
const feedbackFormElement = document.querySelector('.add-feedback-form');
const feedbackTextareaElement = feedbackFormElement.querySelector('textarea');

function submitFeedback(feedback, { success, error }) {
  success();
}

function createFeedbackElement(feedback) {
  return `
    <li>
      <p class="appeal-text">${feedback.text}</p>
      <footer>
        <time class="appeal-date" datetime="${feedback.date}">${feedback.date}</time>
        <strong class="appeal-author">Uknown user</strong>
      </footer>
    </li>
  `;
}

feedbackFormElement.addEventListener('submit', e => {
  e.preventDefault();
  
  const feedbackData = {
    text: feedbackTextareaElement.value,
    date: formatDateAndTime(new Date(), true)
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