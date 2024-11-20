<h1 align="center">
  <br>
  <img src="https://github.com/user-attachments/assets/d971e139-2f93-463b-8eba-e7fc7c5a71da" alt="WC logo" width="200">
  <p>
  <p>
  Weather Claus
  </p>
</h1>

<h4 align="center">날씨가 어려운 이들을 위한 사이트, 웨더 클로스입니다</h4>

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

#### `은숙 Eunsuk` 

&emsp;배운 점들이 많아 일일이 나열하기에는 페르마의 마지막 정리가 될 것 같지만 몇 가지 적어보자면, <br>
&emsp;가장 크게는 협업에서의 깃헙 사용 방식을 배웠습니다. <br> 
&emsp;평소 혼자 공부할 때는 항상 main 브랜치에 커밋만을 진행했기 때문에 <br> 
&emsp;처음 팀 프로젝트가 시작되고 브랜치 분리, PR, 커밋 컨벤션 등 수많은 깃헙 작업들에 많이 당황했던 기억이 납니다. <br> 
&emsp;하지만 계속해서 작업을 반복하다보니 스스로도 꽤나 익숙한 상태가 되었고 <br> 
&emsp;실무에 뛰어들기에 앞서 팀프로젝트에 참여하는 것이 얼마나 큰 도움과 경험이 되었는지 여실히 느낄 수 있었습니다. <br> 
&emsp;다음으로 자신이 하고 싶은 바가 좀 더 명확해진 점입니다. <br> 
&emsp;개발 직무를 결심했을 때, 그 안에서도 정말 다양한 분야가 있다는 것을 알았고 <br> 
&emsp;평소에 무언가를 꾸미는 것을 좋아했기 때문에, 외관을 담당하고 싶다는 생각을 하여 프론트엔드 개발자를 목표로 하게 되었습니다. <br> 
&emsp;이번 프로젝트를 진행하면서 UI를 다룸에 있어서 줄곧 즐겁다는 생각이 들었습니다. <br> 
&emsp;프로젝트 진행 와중에도 더 더 아름다운 것들을 만들고 싶고, 만들어 내고 싶은 것들이 생겨나는 자신을 발견할 수 있었습니다. <br> 
&emsp;어딘가에서 흘러 들어와 웨더클로스 프로젝트를 봐주시고, readme에 방문해주시는 모든 분들의 하루가 항상 건강하고 안전하고 행복하기를 바라며 ! <br>


#### `영훈 Younghun` <br>

프로젝트를 시작하기에 앞서 당장의 소통은 어떻게 하고 의견은 어떤 방식으로 맞춰 나가야 하는지 고민하고 걱정하던 자신이 무색할 정도로 재밌게 프로젝트가 끝났습니다. <br>

모두가 처음이였기에 서투르지만 한편으론 새로운 경험과 재미를 느꼈던 프로젝트였습니다.<br>

무엇보다도 혼자서 개발할 때와 달리 스케줄링을 통해 팀원들과 매주 회의하고, 소통하며 꾸준히 나아갈 수 있는 원동력, 팀워크를 잘느꼈습니다. <br>

이 프로젝트를 진행하면서 특히나 신경썼던 부분은 api 로직을 관리하는데 있어 토큰을 통해 인가를 받고, 토큰 만료 시 재발급 받는 중복된 로직을 재 사용 가능한 모듈로 관리하는 것입니다. <br>

아쉬웠던 점은 너무 중복된 부분을 줄이려다 보니 코드가 복잡해졌던 것 같고, 때론 중복된 로직이라도 분리하는 것이 오히려 클린한 코드가 될 수있음을 느꼈습니다. <br>

그럼에도 기획 당시 계획한 기능들을 팀원들과 함께 잘 마무리한 것 같아 뿌듯하고, 부족한 부분을 잘 보완하여 더욱 성장할 수 있는 계기가 되길 바랍니다.<br>

팀원 모두 고생하셨습니다!
