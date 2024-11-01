export interface IVoucher {
  _id: string;
  name_voucher: string;
  code_voucher: string;
  description_voucher: string;
  quantity_voucher: number;
  discountType: string;
  discountValue: number;
  applyType: string;
  appliedProducts: string[];
  minimumSpend: number;
  maxDiscount: number;
  allowedUsers: string[];
  startDate: Date;
  expirationDate: Date;
  limitType: string;
}
