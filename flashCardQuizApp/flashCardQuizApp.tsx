interface FlashCard {
  questionText: string;
  questionAnswer: string;
}

class InvalidUserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUserInputError';
  }
}

let currentCards: FlashCard[] = [
  { questionText: 'What is the capital of France?', questionAnswer: 'Paris' },
  { questionText: 'What is 5 + 3?', questionAnswer: '8' },
  { questionText: 'Who wrote "Hamlet"?', questionAnswer: 'Shakespeare' }
];

let currentIndex: number = 0;

const flashcardEl = document.getElementById('flashcard') as HTMLDivElement;
const frontEl = document.getElementById('card-front') as HTMLDivElement;
const backEl = document.getElementById('card-back') as HTMLDivElement;
const deleteBtn = document.getElementById('delete-btn') as HTMLButtonElement;
const entryForm = document.getElementById('entry-form') as HTMLFormElement;
const frontText = document.getElementById('front-text') as HTMLTextAreaElement;
const backText = document.getElementById('back-text') as HTMLTextAreaElement;
const counterEl = document.getElementById('card-counter') as HTMLSpanElement;
const feedbackEl = document.getElementById('form-feedback') as HTMLDivElement;

function updateCardDisplay(): void {
  if (currentCards.length === 0) {
    frontEl.innerHTML = '<span>✨ empty</span>';
    backEl.innerHTML = '<span>add a card</span>';
    counterEl.textContent = '0 cards';
    flashcardEl.classList.remove('flipped');
    return;
  }

  if (currentIndex >= currentCards.length) {
    currentIndex = currentCards.length - 1;
  }
  if (currentIndex < 0) {
    currentIndex = 0;
  }

  const card = currentCards[currentIndex];
  if (card) {
    frontEl.innerHTML = `<span>${card.questionText}</span>`;
    backEl.innerHTML = `<span>${card.questionAnswer}</span>`;
  }

  counterEl.textContent = `${currentCards.length} card${currentCards.length !== 1 ? 's' : ''}`;
}

function deleteCurrentCard(): void {
  if (currentCards.length === 0) {
    return;
  }

  currentCards.splice(currentIndex, 1);

  if (currentCards.length === 0) {
    currentIndex = 0;
  } else if (currentIndex > 0) {
    // Move back to show the previous card after deletion
    currentIndex = currentIndex - 1;
  } else {
    currentIndex = 0;
  }

  updateCardDisplay();
  flashcardEl.classList.remove('flipped');
}

function handleAddCard(e: Event): void {
  e.preventDefault();

  const question = frontText.value.trim();
  const answer = backText.value.trim();

  feedbackEl.innerHTML = '';

  if (!question || !answer) {
    const err = new InvalidUserInputError('Both question and answer are required.');
    feedbackEl.innerHTML = `<span class="error-message">⚠️ ${err.message}</span>`;
    throw err;
  }

  const newCard: FlashCard = {
    questionText: question,
    questionAnswer: answer
  };

  currentCards.push(newCard);
  currentIndex = currentCards.length - 1;

  updateCardDisplay();
  flashcardEl.classList.remove('flipped');

  frontText.value = '';
  backText.value = '';
  feedbackEl.innerHTML = '<span style="color: #1e7e34;">✓ card added</span>';
}

let isFlipped = false;
flashcardEl.addEventListener('click', function (this: HTMLDivElement) {
  isFlipped = !isFlipped;
  this.classList.toggle('flipped', isFlipped);
});

deleteBtn.addEventListener('click', deleteCurrentCard);

entryForm.addEventListener('submit', handleAddCard);

if (currentCards.length > 0) {
  currentIndex = 0;
}
updateCardDisplay();
flashcardEl.classList.remove('flipped');

export { FlashCard, currentCards, InvalidUserInputError };