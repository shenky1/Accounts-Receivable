export const companies = ['Infobip China', 'Infobip Hrvatska', 'Infobip USA'];

export const customers = ['Tokio Marine', 'King Power', 'DigitalReo', 'CambioReal', 'Unilever'];

export const documentTypes = ['Proforma Invoice', 'Invoice'];

export const banks = ['Raiffeisen', 'Hypo', 'Barclays'];

export const currencies = ['EUR', 'GBP', 'HRK'];

export const dueInPeriods = ['today', '15 – 30', '30 – 60', '60 – 90', '90 – 120', 'over 120'];

export const services = ['SMS', 'Voice', 'Viber', 'WhatsApp', 'Other'];

export const documentStatuses = ['Open', 'Finalized'];

export const rowsPerPageOptions = [25, 50, 100];

export const columns = [
  {
    field: 'companyName',
    header: 'Company name',
  },
  {
    field: 'customer',
    header: 'Customer',
  },
  {
    field: 'fiscalYear',
    header: 'Fiscal Year',
  },
  {
    field: 'documentNumber',
    header: 'Document number',
  },
  {
    field: 'documentType',
    header: 'Document type',
  },
  {
    field: 'documentStatus',
    header: 'Document status',
  },
  {
    field: 'bankName',
    header: 'Bank name',
  },
  {
    field: 'documentPeriod',
    header: 'Document period',
  },
  {
    field: 'amount',
    header: 'Amount',
  },
  {
    field: 'currency',
    header: 'Currency',
  },
  {
    field: 'dueIn',
    header: 'Due in',
  },
  {
    field: 'service',
    header: 'Service',
  },
  {
    field: 'isPaid',
    header: 'Is paid',
  },
];
