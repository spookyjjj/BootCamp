#### 리액트?
- 리액트 라이브러리를 이용하면 html, css, java script를 묶어서 하나의 컴포넌트 형태로 구성可  
- 컴포넌트 단위로 임포트함으로써 재사용可 

#### 리액트 라이브러리들
- react.js : 핵심코어. 컴포넌트 구성에 사용됨
- react-native.js : 랜더링(모바일 디바이스)
- react-dom.js : 랜더링(데스크탑 디바이스)
- mobX.js : state 관리를 위한 store를 관리하는 라이브러리 <- redux라는것도 있음
- axios.js : 서버와 통신하기 위해
- router.js : 라우팅을 정의하기 위해
- auto-bind 관련 라이브러리
- mataerial ui 관련 라이브러리

#### node.js
- 네트워크 애플리케이션 개발에 사용되는 스프트웨어 플랫폼
- v8엔진 기반으로 자바스크립트가 실행할 수 있는 환경제공
- npm(node package module)이 자동으로 포함되어있음
  - 다양한 모듈들을 작업환경에 인스톨하고 실행할 수 있게하는 CLI도구
  - 메이븐이나 그래들 같은 개념
- yarn은 npm의 업그레이드버젼
  - 얘는 설치해줘야 함(npm으로도 설치가능)  
    `npm install -g yarn`

#### CRA(Create React App)
- jsx같은 문법을 사용하게 될 경우, 리액트의 ES6(ECMA Script 6)를 ES5로 트렌스 컴파일 해야함
- 이런 설정들을 웹 팩을 통해서 하게 되는데 매우 까다로움
- 그래서 CRA를 사용! <- 페이스북에서 리액트 프로젝트를 구성할 수 있는 CLI도구를 제공한 것
- 예전에는 npm이나 yarn을 통해 따로 설치를 하고서 CRA의 CLI도구를 사용했는데,  
  요즘은 npm/yarn모두 CRA를 포함하고 있다 -> 바로 쓰면됨!  
  > npm일 경우 : npm init react app 만들고자하는 어플리케이션 이름  
  > yarn일 경우 : yarn create react-app 만들고자하는 어플리케이션 이름  
  > -> 프로젝트를 구성하기 시작함. 기본적인 라이브러리(react.js, reactdom.js..)도 다운받기 시작하고 등등

#### React Element
- 화면을 구성하는 최소단위
- React라이브러리에 있는 createElement라는 함수 통해 만들어짐
- 전달받는 파라미터는 세가지  
  `React.createElements('h1', null, 'Hello~');`  
  - type : html요소 or react fragment
  - props : 정보 보내고 받기
  - children : 태그안에 들어갈 또다른 elements들 -> ★중첩되어 복잡해지는것을 막기위해 JSX를 씀!! 

#### React-Dom
- React라이브러리가 element생성 역할이라면, ReactDom은 렌더링 역할  
  `ReactDom.render(요소, document.getElemnetById('root'));`  
  해당 요소를 root라는 이름의 엘리먼츠에다가 뿌려주겠다~  
  
#### Virtual DOM & Real DOM
- Virtual DOM : 리액트 메모리 상에 존재하는 화면에 보여지는 모습
  - ★여기의 구성요소가 리액트 엘리먼트!!
  - ReactDom.render메소드를 통해 엘리먼트들에 대한값을 변경하거나 추가
  - 리액트는 버츄얼돔의 바뀐 데이터를 실제돔과 비교하고 수정해서 반영한다
- real DOM : 실제 화면에 보여지는 모습

#### JSX문법
- Java Script XML : 자바스크립트 문법 확장
- 마치 html태그 사용하는것 처럼 쓰면됨
- JSX문법으로 작성한 코드는 Transcompile과정을 거침
  - javaScript(with JSX) -> (Babel라이브러리) -> javaScript(createElements()꼴)
  - javaScript(with ES6) -> (Babel라이브러리) -> javaScript(with ES5)
  - -> 이와 관련된 웹팩 설정들을 손쉽게 하도록 CRA를 사용
- ★주의할 점
  - 대소문자 구분 : html태그는 소문자, component는 파스칼케이스
  - JSX내에서 자바스크립트 코드 작성 : { } 이용
  - class(X), className(O), for(X)
  
#### SPA(single page application)
- 서버에서는 빈페이지와 데이터(json)만 받아오고, 그 데이터를 기반으로 client측에서 js로 페이지 만듬
- 이 js로 페이지 만드는 주체가 바로 client의 리액트 라이브러리! -> 이게 클라이언트 사이드 랜더링(CSR)임!!
- React, Vue, Angluar 등등 다양한 자바스크립트 기반의 ui기법들이 spa를 기준으로 함

#### React Component
- class기반
  - props : 컴포넌트 입장에서 불변의 데이터
  - state : 컴포넌트에서 변경이 가능한 데이터
  - lifeCycle
  - ★★React.Component를 상속하는 클래스는 반드시 render메소드를 재정의 하여야 하고,  
    render메소드는 반드시 React element를 리턴하여야 한다  
    여기서의 render메소드는 ReactDom의 render가 아님!!! React의(Component) render~!  
- function기반
  - hook : 컴포넌트에서 변경이 가능한 데이터

#### export / import
- export default를 가져오기 
- export를 가져오기 -> 중괄호