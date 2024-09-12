export interface Shipper {
  _id: string;
  avatar: string;
  fullName: string;
  vehicle: string;
  phone: string;
  store: string;
  status: "On delivery" | "Available" | "Offline";
}
