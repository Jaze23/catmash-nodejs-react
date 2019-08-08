import React, { useReducer, createContext, useContext } from "react";
import { IStore, Action } from "../../interfaces";
import { State } from "../../models";
import { globalHelperReducer } from "./reducers/globalHelperReducer";

export const Store = createContext({} as IStore);

const newState = new State();

const mainReducer = ({ globalHelper }: State, action: Action<any>) => ({
  globalHelper: globalHelperReducer(globalHelper, action)
});

export function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(mainReducer, newState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export const useStore = () => useContext(Store);
