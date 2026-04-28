import { TrafficItem } from "../../traffic";
type getTrafficDataByIdResult = {
  success: boolean;
  message: string;
  result?: TrafficItem;
};
export type { getTrafficDataByIdResult };
