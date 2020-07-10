import { createButton } from '../button/button.js';

export function createFormModal(formFields, onSubmit, row, index) {
  const modal = document.createElement('div');
  modal.className = 'modal-mask';
  modal.id = 'add-modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';

  const close = document.createElement('span');
  close.className = 'close';
  close.textContent = 'x';
  close.addEventListener('click', closeFormModal);

  const title = document.createElement('h2');
  title.textContent = row ? 'Edit account' : 'Add new account';

  headerContainer.appendChild(title);
  headerContainer.appendChild(close);
  modalHeader.appendChild(headerContainer);

  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';

  formFields.forEach((formField, index) => {
    const formFieldWrapper = document.createElement('div');
    formFieldWrapper.className = 'form-field';

    const label = document.createElement('div');
    label.textContent = formField.header;
    label.className = 'form-field-label';

    const inputText = document.createElement('input');
    inputText.setAttribute('type', 'text');
    inputText.setAttribute(
      'placeholder',
      'Type ' + formField.header.toString().toLowerCase() + '...'
    );
    inputText.className = 'input';
    inputText.id = formField.field + 'save';
    if (index === 0) {
      inputText.focus();
    }

    if (row) {
      inputText.value = row[formField.field];
    }

    formFieldWrapper.appendChild(label);
    formFieldWrapper.appendChild(inputText);

    modalBody.appendChild(formFieldWrapper);
  });

  const modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';

  const cancelButton = createButton('Cancel', closeFormModal);
  cancelButton.className = 'cancel-button';

  const buttonLabel = row ? 'Edit account' : 'Add account';
  const submitButton = createButton(buttonLabel, onSubmit(index));

  modalFooter.appendChild(cancelButton);
  modalFooter.appendChild(submitButton);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  modal.appendChild(modalContent);

  return modal;
}

const closeFormModal = () => {
  document.getElementById('add-modal').remove();
};
