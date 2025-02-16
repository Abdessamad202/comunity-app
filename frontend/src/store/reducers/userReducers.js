import { setLocalStorageItem } from "../../utils/localStorageUtils";

// Reusable function to update state and localStorage
const updateStateAndLocalStorage = (state, payload, keys) => {
  keys.forEach((key) => {
    state[key] = payload[key] || null;
    setLocalStorageItem(key, payload[key] || null);
  });
};

// Authentication Reducers
export const loginFunction = (state, action) => {
  updateStateAndLocalStorage(state, action.payload, ["token", "user_id", "profile_id", "step"]);
};

export const registerStep1Function = (state, action) => {
  updateStateAndLocalStorage(state, action.payload, ["token", "user_id", "step"]);
};

export const registerStep2Function = (state, action) => {
  updateStateAndLocalStorage(state, action.payload, ["step"]);
};

export const registerStep3Function = (state, action) => {
  updateStateAndLocalStorage(state, action.payload, ["profile_id"]);
  state.step = null;
  setLocalStorageItem("step", null);
};

export const logoutFunction = (state) => {
  updateStateAndLocalStorage(state, {}, ["token", "user_id", "profile_id", "step"]);
  localStorage.clear();
};
