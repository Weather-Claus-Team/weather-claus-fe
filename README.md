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
 ┃ ┃ ┗ ...  // 회원가입, 로그인 api
 ┃ ┣ 📂chatApis
 ┃ ┃ ┗ ...  // 채팅 api
 ┃ ┣ 📂contentApis
 ┃ ┃ ┗ ...  // 콘텐츠 api
 ┃ ┗ 📂myPageApis
 ┃ ┃ ┗ ...  // 마이페이지 api
 ┣ 📂components
 ┃ ┣ 📂chat
 ┃ ┃ ┗ ...  // 채팅 컴포넌트
 ┃ ┣ 📂content
 ┃ ┃ ┗ ...  // 메인 콘텐츠 컴포넌트
 ┃ ┣ 📂Join
 ┃ ┃ ┗ ...  // 회원가입 컴포넌트
 ┃ ┗ 📂layout
 ┃ ┃ ┗ ...  // 레이아웃 컴포넌트
 ┣ 📂hooks
 ┃ ┗ ...  // 리액트 쿼리, api 로직 관리
 ┣ 📂images
 ┃ ┗ ...  // 프로젝트 내 이미지 파일 관리
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
프로젝트를 시작하기에 앞서 당장의 소통은 어떻게 하고 의견은 어떤 방식으로 맞춰 나가야 하는지 고민하고 걱정하던 자신이 무색할 정도로 재밌게 프로젝트가 끝났습니다. <br>

모두가 처음이였기에 서투르지만 한편으론 새로운 경험과 재미를 느꼈던 프로젝트였습니다.<br>

무엇보다도 혼자서 개발할 때와 달리 스케줄링을 통해 팀원들과 매주 회의하고, 소통하며 꾸준히 나아갈 수 있는 원동력, 팀워크를 잘느꼈습니다. <br>

이 프로젝트를 진행하면서 특히나 신경썼던 부분은 api 로직을 관리하는데 있어 토큰을 통해 인가를 받고, 토큰 만료 시 재발급 받는 중복된 로직을 재 사용 가능한 모듈로 관리하는 것입니다. <br>

아쉬웠던 점은 너무 중복된 부분을 줄이려다 보니 코드가 복잡해졌던 것 같고, 때론 중복된 로직이라도 분리하는 것이 오히려 클린한 코드가 될 수있음을 느꼈습니다. <br>

그럼에도 기획 당시 계획한 기능들을 팀원들과 함께 잘 마무리한 것 같아 뿌듯하고, 부족한 부분을 잘 보완하여 더욱 성장할 수 있는 계기가 되길 바랍니다.<br>

팀원 모두 고생하셨습니다!
