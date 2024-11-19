<h1 align="center">
  <br>
  <img src="https://github.com/user-attachments/assets/d971e139-2f93-463b-8eba-e7fc7c5a71da" alt="WC logo" width="200">
  <p>
  <p>
  Weather Claus
  </p>
</h1>

<h4 align="center">날씨가 어려운 이들을 위한 사이트, 웨더 클로스입니다</h4>

<!-- 이미지 추가 예정 (gif 등) -->

<br>

► 해당 readme는 웨더 클로스 프로젝트 ${\textsf{\color{LightSalmon}프론트엔드(FE)}}$ readme 입니다 (팀 readme는 아래 참고 부탁드립니다)

<br>

## 프로젝트 소개

웨더클로스 팀 github : https://github.com/Weather-Claus-Team
<br>
<br>

## 팀 웨더클로스 FE와 역할 분담

|                           `FE`                           |                         `FE`                         |
| :------------------------------------------------------: | :--------------------------------------------------: |
| <img src="https://github.com/eunsuknoh.png" width="150"> | <img src="https://github.com/0Huns.png" width="150"> |
|          [Eunsuk](https://github.com/eunsuknoh)          |         [Younghun](https://github.com/0Huns)         |

<br>

### Eunsuk

- 프로젝트 기획
- 전반적인 UI 작업
- 회원가입
- 아이디 찾기
- 날씨 검색 기능
- 사용자 위치 동의 및 위치 기반 날씨 검색

### Younghun

- 로그인 & 로그아웃
- 비밀번호 변경
- 날씨카드
- 유저 페이지 및 프로필 변경
- 계정 탈퇴
- 방명록(채팅창) 기능

<br>

## 기술 스택

### 🪄&ensp;프론트엔드

<div> 
  <img src="https://img.shields.io/badge/react-20232a.svg?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">
  <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=Recoil&logoColor=white">
  <img src="https://img.shields.io/badge/react--query-FF4154?style=for-the-badge&logo=react-query&logoColor=white"> <br>
  <img src="https://img.shields.io/badge/google--fonts-4285F4?style=for-the-badge&logo=google-fonts&logoColor=white">
  <img src="https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue">
  <img src="https://img.shields.io/badge/fontawesome-538DD7?style=for-the-badge&logo=fontawesome&logoColor=white">
</div>

### 🪄&ensp;배포

<div>
  <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7" />
</div>
    
### 🪄&ensp;기타
<div>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white" />
  <img src="https://img.shields.io/badge/notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white" />
</div>
<br>

## 아키텍쳐

### 📢&ensp;파일 구조 트리

```bash
📦src
 ┣ 📂api
 ┃ ┣ 📂authApis
 ┃ ┣ ...  // 회원가입, 로그인 api
 ┃ ┣ 📂chatApis
 ┃ ┣ ...  // 채팅 api
 ┃ ┣ 📂contentApis
 ┃ ┣ ...  // 콘텐츠 api
 ┃ ┗ 📂myPageApis
 ┃ ┣ ...  // 마이페이지 api
 ┣ 📂components
 ┃ ┣ 📂chat
 ┃ ┣ ...  // 채팅 컴포넌트
 ┃ ┣ 📂content
 ┃ ┣ ...  // 메인 콘텐츠 컴포넌트
 ┃ ┣ 📂Join
 ┃ ┣ ...  // 회원가입 컴포넌트
 ┃ ┗ 📂layout
 ┃ ┣ ...  // 레이아웃 컴포넌트
 ┣ 📂hooks
 ┃ ┣ ...  // 리액트 쿼리, api 로직 관리
 ┣ 📂images
 ┃ ┣ ...  // 프로젝트 내 이미지 파일 관리
 ┣ 📂pages
 ┃ ┣ 📜FindId.js
 ┃ ┣ 📜Home.js
 ┃ ┣ 📜Join.js
 ┃ ┣ 📜Login.js
 ┃ ┣ 📜MyPage.js
 ┃ ┣ 📜NewPw.js
 ┃ ┣ 📜Remove.js
 ┃ ┣ 📜SetProfile.js
 ┃ ┗ 📜SetPw.js
 ┣ 📜App.js
 ┣ 📜atom.js
 ┣ 📜image.js
 ┗ 📜index.js
```

<br>

### 📢&ensp;프론트엔드 아키텍쳐

![architechture](https://github.com/user-attachments/assets/b9eb28e0-3aea-4657-b5b3-b791a9d792fd)

<br>

## UI 구성

![ui](https://github.com/user-attachments/assets/85cb599b-f269-40f4-b1c5-8ddb3efe2805)

<br>

## 주요 기능

- 회원가입 ・ 로그인
- 검색 ・ 날씨 카드
- 마이페이지
- 방명록 겸 채팅창

<br>

## 회고 및 소감

은숙 Eunsuk : <br>

영훈 Younghun : <br>
