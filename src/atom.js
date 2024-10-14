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
  default: null, // true: 중복, false: 중복 아님
});

// 유저 이메일
export const emailState = atom({
  key: "emailState",
  default: "",
});

// 이메일 인증번호
export const emailCodeState = atom({
  key: "emailCodeState",
  default: 0, // 인증번호는 숫자
});

// 이메일 인증번호 확인
export const emailCodeCheckState = atom({
  key: "emailCodeCheckState",
  default: null, // true: 인증번호 일치, false: 인증번호 불일치
});
