export function createButton(textContent, onButtonClick) {
  const button = document.createElement('button');
  button.textContent = textContent;
  button.className = 'custom-button';

  button.addEventListener('click', onButtonClick);
  return button;
}
