declare namespace Express {
  interface Request {
    user: IUser;
  }
}

/**
 * 用户
 */
interface IUser {
  id: string;
  role: string;
  username: string;
}

interface IQueryBase<T = number> {
  cursor: T;
  limit: number;
}

interface IEvent<T = any, U = IUser> {
  name: string;
  payload: T;
  user: U;
}

interface IMessageQuery {
  askId: string;
  cursor?: number | undefined;
  limit?: number | undefined;
  desc?: boolean;
}
