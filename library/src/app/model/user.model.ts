export interface IUser {
  id: number;
  userName: string;
  password: string;
}
export interface ILogin {
  user: IUser;
  status: boolean;
  message: string;
}