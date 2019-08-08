import { Dispatch } from "react";
import { State } from "../models";
import { Action } from ".";

export interface IStore {
    state: State;
    dispatch: Dispatch<Action<any>>;
}