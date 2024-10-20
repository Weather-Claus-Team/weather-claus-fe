import { atom } from "recoil";

// 날씨 검색
export const searchState = atom({
  key: "searchState",
  default: "",
});

// 아이디
export const usernameState = atom({
  key: "usernameState",
  default: "",
});

// 아이디 중복 여부
export const usernameDuplicateState = atom({
  key: "usernameDuplicateState",
  default: null, // true: 중복, false: 사용 가능
});

// 아이디 중복 검사를 했는지 안 했는지
export const usernameCheckState = atom({
  key: "usernameCheckState",
  default: false, // true : 확인 완료, false : 미확인
});

// 이메일
export const emailState = atom({
  key: "emailState",
  default: "",
});

// 이메일 중복 여부
export const emailDuplicateState = atom({
  key: "emailDuplicateState",
  default: null, // true: 중복, false: 사용 가능
});

// 이메일 인증번호
export const emailCodeState = atom({
  key: "emailCodeState",
  default: 0, // 인증번호는 숫자 6자리
});

// 이메일 인증번호 확인
export const emailCodeCheckState = atom({
  key: "emailCodeCheckState",
  default: null, // true: 인증번호 일치, false: 인증번호 불일치
});

// 이메일 인증번호 확인을 했는지 안 했는지
export const emailCheckState = atom({
  key: "emailCheckState",
  default: false, // true : 확인 완료, false : 미확인
});

// 리캡챠 토큰
export const recaptchaTokenState = atom({
  key: "recaptchaTokenState",
  default: "",
});

// 로그인 성공
export const loginSuccessState = atom({
  key: "loginSuccessState",
  default: false, // true : 로그인 성공
});

// 위치 동의 시 위도 경도
export const locationState = atom({
  key: "locationState",
  default: {
    lat: 0,
    lon: 0,
  },
});
