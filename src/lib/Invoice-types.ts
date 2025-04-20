export interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Company {
  name: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
}

export interface Client {
  name: string;
  address: string;
  city: string;
  zip: string;
  email: string;
}

export interface Invoice {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  company: Company;
  client: Client;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes: string;
}
