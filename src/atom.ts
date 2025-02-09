import { atom } from "recoil";

// 검색 지역
export const cityState = atom({
  key: "cityState",
  default: "",
});

// 아이디
export const usernameState = atom({
  key: "usernameState",
  default: "",
});

// 아이디 중복 여부
export const usernameDuplicateState = atom<boolean | null>({
  key: "usernameDuplicateState",
  default: null, 
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
export const emailDuplicateState = atom<boolean | null>({
  key: "emailDuplicateState",  
  default: null, 
});

// 이메일 인증번호
export const emailCodeState = atom({
  key: "emailCodeState",
  default: 0, // 인증번호는 숫자 6자리
});

// 이메일 인증번호 확인
export const emailCodeCheckState = atom<boolean | null>({
  key: "emailCodeCheckState",
  default: null,  
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

// 위치 동의 시 - 사용자의 위치와 경도
export const locationState = atom<{
  lat: number;
  lon: number;
} | null>({
  key: "locationState",
  default: null,
});

// 닉네임
export const nicknameState = atom({
  key: "nicknameState",
  default: "",
});

// 목차 스크롤
export const scrollTargetState = atom<string | null>({
  key: "scrollTargetState",
  default: null,
});