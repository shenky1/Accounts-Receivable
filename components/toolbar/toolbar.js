export function createToolbar(title, rightElements) {
  const toolbar = document.createElement('div');
  toolbar.className = 'toolbar';

  const toolbarLeft = document.createElement('div');
  toolbarLeft.className = 'toolbar-group-left';

  const titleElem = document.createElement('span');
  titleElem.className = 'toolbar-title';
  titleElem.textContent = title;

  toolbarLeft.appendChild(titleElem);

  const toolbarRight = document.createElement('div');
  toolbarRight.className = 'toolbar-group-right';

  rightElements.forEach((element) => {
    element.className = element.className + ' inline-block';
    toolbarRight.appendChild(element);
  });

  toolbar.appendChild(toolbarLeft);
  toolbar.appendChild(toolbarRight);

  return toolbar;
}
