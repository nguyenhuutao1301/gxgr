type Order = {
  _id: string;
  addressFrom: string;
  addressTo: string;
  serviceType: string;
  userId?: UserId;
  status: string;
  price: number;
  createAt: string;
};
type UserId = {
  _id: string;
  username: string;
};
export type { Order };
