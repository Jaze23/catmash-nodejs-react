import { GlobalHelperActionType } from "../enums/action-type.enum";

export interface Action<T> {
  type: GlobalHelperActionType;
  payload: T;
}
