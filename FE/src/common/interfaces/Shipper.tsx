export interface Shipper {
    _id: string;
    name: string;
    vehicle: string;
    phone: string;
    store: string;
    status: 'On delivery' | 'Available' | 'Offline';
  }