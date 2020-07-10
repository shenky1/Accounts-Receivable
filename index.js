import {
  createTable,
  createTableFooter,
  editRowDelegate,
  saveEditAccountDelegate,
} from './components/table/table.js';
import { createButton } from './components/button/button.js';
import { createFormModal } from './components/modal/modal.js';
import { createToolbar } from './components/toolbar/toolbar.js';

import { columns } from './models/data.js';

import { generateAccountsOfLength } from './services/helper.service.js';

const accounts = generateAccountsOfLength(111);
const title = 'Accounts Receivable';
const actions = [
  {
    icon: 'mode_edit',
    onClick: editRowDelegate,
    tooltipText: 'Edit',
  },
];

window.onload = () => {
  const body = document.getElementsByTagName('body')[0];

  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'card';

  const addButton = createButton('Add account', onAddButtonClick);

  const toolbarElements = [addButton];
  const toolbar = createToolbar(title, toolbarElements);
  const table = createTable(accounts, columns, actions);
  const tableFooter = createTableFooter();

  tableWrapper.appendChild(toolbar);
  tableWrapper.appendChild(table);
  tableWrapper.appendChild(tableFooter);

  body.appendChild(tableWrapper);
};

const onAddButtonClick = () => {
  const formModal = createFormModal(columns, saveEditAccountDelegate);
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(formModal);
};
