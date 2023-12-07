import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slice/userSlicer";
import changeProfileReducer from "../redux/slice/MyDetails/Profile/changeProfileSlice";
import addressListReducer from "../redux/slice/AddressList/addressListSlice";
import { user2Reducer } from "./slice/User/user";
import provinceReducer from "./slice/MasterData/ProvinceSlice";
import citiesReducer from "./slice/MasterData/CitiesSlice";
import loginReducer from "./slice/User/login";
import animationReducer from "./slice/Animation/animationSlice";
import userManagementReducer from "./slice/User/adminManagement";
import createAdminReducer from "./slice/User/createAdmin";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    user: userReducer,
    changeProfile: changeProfileReducer,
    addressList: addressListReducer,
    user2: user2Reducer,
    province: provinceReducer,
    cities: citiesReducer,
    login: loginReducer,
    animation: animationReducer,
    userManagement: userManagementReducer,
    createAdmin: createAdminReducer,
  },
});