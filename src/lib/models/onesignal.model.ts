import { IUser } from "./user.model";

export interface IOneSignal {
  id?: number;
  idOneSignal?: string;
  registerDate?: string;
  sourceConnectedDevice?: string;
  user?: IUser;
}
export const defaultValue: Readonly<IOneSignal> = {};
