export interface IVoucher {
  _id: string;
  name_voucher: string;
  code_voucher: string;
  description_voucher: string;
  quantity_voucher?: number; // optional, defaults to 1
  usedCount: number; // defaults to 0
  discountType: "percentage" | "fixed";
  discountValue: number; // required
  minimumSpend?: number; // optional
  allowedUsers?: string[]; // array of user IDs (ObjectId)
  startDate?: Date; // optional, defaults to now
  expirationDate: Date; // required
  isActive?: boolean; // optional, defaults to true
  createdAt?: Date; // for timestamps
  updatedAt?: Date; // for timestamps
}
