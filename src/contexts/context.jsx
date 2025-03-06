import { useContext,createContext } from "react";

const AppContext = createContext();

export function useAppContext () {
  return useContext(AppContext)
}

export default AppContext;