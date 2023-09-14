import { createContext, useContext, useReducer } from "react";
import StoreReducer, { InitialState } from "./StoreReducer";

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StoreReducer, InitialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

const useStore = () => useContext(StoreContext)[0];
const useDispatch = () => useContext(StoreContext)[1];

export { StoreContext, useStore, useDispatch };
export default StoreProvider;
