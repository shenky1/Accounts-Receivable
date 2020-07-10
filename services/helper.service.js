import {
  banks,
  companies,
  currencies,
  customers,
  documentTypes,
  documentStatuses,
  dueInPeriods,
  services,
} from '../models/data.js';

function getRandomElementFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomWholeNumberInRange(minYear, maxYear) {
  var min = Math.ceil(minYear);
  var max = Math.floor(maxYear);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomDocumentNumber() {
  return Math.random().toString(36).substring(2);
}

function generateRandomAccount() {
  return {
    id: generateRandomDocumentNumber(),
    companyName: getRandomElementFrom(companies),
    customer: getRandomElementFrom(customers),
    fiscalYear: getRandomWholeNumberInRange(2006, 2020),
    documentNumber: generateRandomDocumentNumber(),
    documentType: getRandomElementFrom(documentTypes),
    documentStatus: getRandomElementFrom(documentStatuses),
    bankName: getRandomElementFrom(banks),
    documentPeriod: getRandomWholeNumberInRange(1, 2000) + ' days',
    amount: getRandomWholeNumberInRange(0, 2000),
    currency: getRandomElementFrom(currencies),
    dueIn: getRandomElementFrom(dueInPeriods),
    service: getRandomElementFrom(services),
    isPaid: Math.random() >= 0.5,
  };
}

export function generateAccountsOfLength(size) {
  var accounts = [];

  for (var i = 0; i < size; i++) {
    var account = generateRandomAccount();
    accounts.push(account);
  }

  return accounts;
}
