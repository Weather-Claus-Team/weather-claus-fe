import { atom } from "recoil";

// 날씨 검색
export const searchState = atom({
  key: "searchState",
  default: "",
});

// 유저 아이디
export const usernameState = atom({
  key: "usernameState",
  default: "",
});

// 유저 아이디 중복 여부
export const usernameDuplicateState = atom({
  key: "usernameDuplicateState",
  default: null, // null, true: 중복, false: 중복 아님
});
