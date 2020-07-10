import { rowsPerPageOptions } from '../../models/data.js';
import { createFormModal } from '../modal/modal.js';
import { generateRandomDocumentNumber } from '../../services/helper.service.js';

var ROWS = [];
var FILTERED_ROWS = [];
var DISPLAYED_ROWS = [];
var NUMBER_OF_PAGES = 0;
var ROWS_PER_PAGE = rowsPerPageOptions[0];
var PAGE_NUMBER = 1;
var TABLE_COLUMNS = [];
var TABLE_ACTIONS = [];

export function createTable(accounts, columns, actions) {
  ROWS = accounts;
  FILTERED_ROWS = accounts;
  TABLE_COLUMNS = columns;
  TABLE_ACTIONS = actions;
  NUMBER_OF_PAGES = calculateNumberOfPages(FILTERED_ROWS.length, rowsPerPageOptions[0]);
  DISPLAYED_ROWS = accounts.slice(0, ROWS_PER_PAGE);

  var table = document.createElement('table');
  table.className = 'w-100 table';
  table.id = 'accounts-table';

  var tableHeader = createTableHeader(columns);
  var tableBody = createTableBody();

  table.appendChild(tableHeader);
  table.appendChild(tableBody);

  return table;
}

function createTableHeader(columns) {
  var tableHead = document.createElement('thead');
  var headerRow = document.createElement('tr');

  for (var i = 0; i < columns.length; i++) {
    const filterCell = document.createElement('th');
    filterCell.className = 'filter-cell';
    const inputWrapper = document.createElement('span');
    inputWrapper.className = 'relative tooltip';

    const inputText = document.createElement('input');
    inputText.setAttribute('type', 'text');
    inputText.className = 'input';
    inputText.placeholder = columns[i].header;
    inputText.id = columns[i].field;
    inputText.addEventListener('keyup', onInputTextFilterChange);

    const tooltipText = document.createElement('span');
    tooltipText.className = 'tooltip-text';
    tooltipText.textContent = columns[i].header;

    inputWrapper.appendChild(inputText);
    inputWrapper.appendChild(tooltipText);

    filterCell.appendChild(inputWrapper);
    headerRow.appendChild(filterCell);
  }

  if (TABLE_ACTIONS.length) {
    var headerCell = document.createElement('th');
    var headerText = document.createTextNode('Actions');
    headerCell.appendChild(headerText);
    headerRow.appendChild(headerCell);
  }

  tableHead.appendChild(headerRow);
  return tableHead;
}

function createTableBody() {
  var tableBody = document.createElement('tbody');
  for (var i = 0; i < DISPLAYED_ROWS.length; i++) {
    var row = document.createElement('tr');

    for (var j = 0; j < TABLE_COLUMNS.length; j++) {
      var cell = document.createElement('td');
      cell.className = 'break-word-container';
      var cellContent = document.createTextNode(DISPLAYED_ROWS[i][TABLE_COLUMNS[j].field]);

      cell.appendChild(cellContent);
      row.appendChild(cell);
    }

    if (TABLE_ACTIONS && TABLE_ACTIONS.length) {
      const cell = document.createElement('td');
      cell.className = 'flex center';
      TABLE_ACTIONS.forEach((action) => {
        const iconWrapper = document.createElement('span');
        iconWrapper.className = 'tooltip pointer';
        const icon = document.createElement('i');
        icon.className = 'material-icons';
        icon.textContent = action.icon;
        icon.addEventListener('click', action.onClick(DISPLAYED_ROWS[i]));
        const tooltipText = document.createElement('span');
        tooltipText.className = 'tooltip-text';
        tooltipText.textContent = action.tooltipText;
        iconWrapper.appendChild(tooltipText);
        iconWrapper.appendChild(icon);
        cell.appendChild(iconWrapper);
      });

      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  }

  return tableBody;
}

export function createTableFooter() {
  const footer = document.createElement('div');
  footer.className = 'flex space-between align-center';

  const footerLeft = document.createElement('div');
  footerLeft.id = 'footer-left';
  footerLeft.appendChild(document.createTextNode('Total records: ' + FILTERED_ROWS.length));

  const footerMiddle = document.createElement('div');
  footerMiddle.className = 'footer-middle';

  const endLeftArrow = document.createElement('i');
  endLeftArrow.className = 'arrow material-icons pointer';
  endLeftArrow.textContent = 'double_arrow';
  endLeftArrow.addEventListener('click', onEndLeftArrowClick);
  endLeftArrow.style.transform = 'rotate(180deg)';
  endLeftArrow.style.fontSize = '30px';

  const leftArrow = document.createElement('i');
  leftArrow.className = 'arrow material-icons pointer';
  leftArrow.textContent = 'arrow_left';
  leftArrow.addEventListener('click', onLeftArrowClick);

  const pageNumber = document.createElement('span');
  pageNumber.id = 'pageNumber';
  pageNumber.className = 'page-number';
  pageNumber.appendChild(document.createTextNode(1));

  const rightArrow = document.createElement('i');
  rightArrow.className = 'arrow material-icons pointer';
  rightArrow.textContent = 'arrow_right';
  rightArrow.addEventListener('click', onRightArrowClick);

  const endRightArrow = document.createElement('i');
  endRightArrow.className = 'arrow material-icons pointer';
  endRightArrow.textContent = 'double_arrow';
  endRightArrow.style.fontSize = '30px';
  endRightArrow.addEventListener('click', onEndRightArrowClick);

  footerMiddle.appendChild(endLeftArrow);
  footerMiddle.appendChild(leftArrow);
  footerMiddle.appendChild(pageNumber);
  footerMiddle.appendChild(rightArrow);
  footerMiddle.appendChild(endRightArrow);

  const footerRight = document.createElement('div');
  const selectNode = document.createElement('select');
  selectNode.className = 'dropdown';
  for (var i = 0; i < rowsPerPageOptions.length; i++) {
    const op = new Option();
    op.value = rowsPerPageOptions[i];
    op.text = rowsPerPageOptions[i];
    selectNode.options.add(op);
  }
  selectNode.addEventListener('change', onRowsPerPageChange);
  footerRight.appendChild(selectNode);

  footer.appendChild(footerLeft);
  footer.appendChild(footerMiddle);
  footer.appendChild(footerRight);

  return footer;
}

function calculateNumberOfPages(numOfRows, numberOfRowsPerPage) {
  return Math.ceil(numOfRows / numberOfRowsPerPage);
}

function adaptTable() {
  const startIndex = (PAGE_NUMBER - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  DISPLAYED_ROWS = FILTERED_ROWS.slice(startIndex, endIndex);

  const tableBody = createTableBody();
  document.getElementsByTagName('tbody')[0].replaceWith(tableBody);
}

function nestedFilter(targetArray, filters) {
  var filterKeys = Object.keys(filters);
  return targetArray.filter((elem) => {
    return filterKeys.every((key) => {
      if (!filters[key].length) {
        return true;
      }
      return elem[key].toString().includes(filters[key]);
    });
  });
}

function extractFilters() {
  var filters = {};
  TABLE_COLUMNS.forEach((column) => {
    const field = column.field;
    const element = document.getElementById(field);
    const value = element.value;
    if (value !== '') {
      filters[field] = value;
    }
  });
  return filters;
}

var onInputTextFilterChange = () => {
  const filters = extractFilters();
  FILTERED_ROWS = nestedFilter(ROWS, filters);

  PAGE_NUMBER = 1;
  document.getElementById('pageNumber').innerHTML = PAGE_NUMBER;
  NUMBER_OF_PAGES = calculateNumberOfPages(FILTERED_ROWS.length, ROWS_PER_PAGE);

  DISPLAYED_ROWS = FILTERED_ROWS.slice(0, ROWS_PER_PAGE);
  document.getElementById('footer-left').innerHTML = 'Total records: ' + FILTERED_ROWS.length;

  adaptTable();
};

var onLeftArrowClick = () => {
  if (PAGE_NUMBER === 1) {
    return;
  }

  PAGE_NUMBER--;
  document.getElementById('pageNumber').innerHTML = PAGE_NUMBER;

  adaptTable();
};

var onEndLeftArrowClick = () => {
  if (PAGE_NUMBER === 1) {
    return;
  }

  PAGE_NUMBER = 1;
  document.getElementById('pageNumber').innerHTML = PAGE_NUMBER;

  adaptTable();
};

var onEndRightArrowClick = () => {
  if (PAGE_NUMBER === NUMBER_OF_PAGES) {
    return;
  }

  PAGE_NUMBER = NUMBER_OF_PAGES;
  document.getElementById('pageNumber').innerHTML = PAGE_NUMBER;

  adaptTable();
};

var onRightArrowClick = () => {
  if (PAGE_NUMBER === NUMBER_OF_PAGES) {
    return;
  }

  PAGE_NUMBER++;
  document.getElementById('pageNumber').innerHTML = PAGE_NUMBER;

  adaptTable();
};

var onRowsPerPageChange = () => {
  var selectNode = document.getElementsByTagName('select')[0];
  ROWS_PER_PAGE = Number(selectNode.value);

  PAGE_NUMBER = 1;
  document.getElementById('pageNumber').innerHTML = PAGE_NUMBER;

  NUMBER_OF_PAGES = calculateNumberOfPages(FILTERED_ROWS.length, ROWS_PER_PAGE);

  adaptTable();
};

export const saveEditAccountDelegate = (index) => {
  return function () {
    saveEditAccount(index);
  };
};

const saveEditAccount = (index) => {
  const newAccount = {};
  TABLE_COLUMNS.forEach((column) => {
    const input = document.getElementById(column.field + 'save');
    newAccount[column.field] = input.value;
    newAccount['id'] = generateRandomDocumentNumber();
  });

  if (index !== undefined) {
    ROWS[index] = newAccount;
  } else {
    ROWS.push(newAccount);
  }

  onInputTextFilterChange();
  document.getElementById('add-modal').remove();
};

const editRow = (editRow) => {
  const index = ROWS.findIndex((row) => row.id === editRow.id);
  const formModal = createFormModal(TABLE_COLUMNS, saveEditAccountDelegate, editRow, index);
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(formModal);
};

export const editRowDelegate = (row) => {
  return function () {
    editRow(row);
  };
};
