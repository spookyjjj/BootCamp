### Spring?
- 엔터프라이즈 개발을 위한 프레임워크 <- 어플리케이션 개발의 모든 계층을 지원

#### Spring Framework
- spring이 제공하는 가장 기본 기능
- loC, AOP, DI
- Testing, Data Access, Web servlet

#### Spring MVC
- mvc패턴 기반의 웹 프레임워크
- Front Controller
- 제공클래스 :   
  DispatcherServlet, HandlerMapping, Controller, ModelAndView, ViewResolver, View

#### Spring Boot
- 단독실행 가능한 스프링 기반 애플리케이션을 쉽고 간단하게 생성가능
- 설정의 최소화
- 내장된 서버를 이용해 war배포 없이 웹애플리케이션 실행가능   
  (spring web같은 경우엔, 서버(톰캣)다운받아 web.xml에서 설정 이것저것 다해줘야함)
- spring boot starters // automatic configuration // spring boot actuator

#### Spring Data 
- 데이터 영속성을 위해 사용할 수 있는 모듈의 집합 <- 데이터 관리할 수 있는 방법 제공
- JDBC, JPA, MongoDB
- JPA(Java Presistence Api)는 ORM(Object-Relation Mapping)기술 표준

----------

#### 개발환경 구성
- JDK 8.0이상
- REST client어플 : postman 혹은 Insomnia
- IDE : 이클립스, 인텔리제이, 비쥬얼스튜디오코드
  - 이클립스에서 spring쓰면 sts가 따로 있음

------------

#### Travel Club UML
- 정보Layer (Entity), 처리Layer (Service), 저장Layer (Store)
- Service, Store는 인터페이스를 이용해 느슨한 결합 유도
- Service : 언제 읽어오고 생성하고, 어떻게 생성하고 등등의 대부분의 처리과정
- Store : Persistance(영속적) 단지 DB에 접근해 저장하는 역할만 수행

#### Travel Club 구현
- 라이브러리: spring framework(beans, core등 기본적인거 포함),  
	 lombok(자주사용되는 코드 작성편의성up by annotation)


#### modify부분
- call by value : 값복사일뿐 -> 원본값 고정
- call by reference : 참조를 가져옴 -> 원본값도 바뀜 -> 요새 안씀!!

-----------

#### 제어의 역전 Ioc
- ★개발자가 new하지 않고 // IoC 컨테이너가 알아서 객체 생성, 관계 구성
- IoC를 구현하는 방식이, DL(dipendency lookup)/DI(dependency injection)  
  - DL은 JNDI리소스를 얻어 쓰는방법 <- 결과적으로 컨테이너 api에 대한 의존성up
  - DI만 쓴다고 보면됨! -> setter주입, (constructor주입: 대부분!), method주입
  - constructor주입의 경우, 파라미터로 주입받을 인터페이스 넣어줘야함!  
  > public 생성자(인터페이스 name) {this.인터페이스 = name}  
  > //여기서 name이라는 인터페이스 인스턴스가 어디서 등장? IoC컨테이너에서 구현클래스 생성해서 인스턴스 주입해준거임

------------

#### bean등록
1. xml파일에서 <bean>태그로 클래스를 일일히 등록  
```xml
 <bean id="" class="">     
 	<constructor-arg ref="" />  //<-constructor
	//<property name="" ref="" /> //<-setter
 </bean> 
```
  - 시작하는 메인메소드에다가 해당xml을 ApplicationContext라고 등록시켜줌

2. xml파일에서 conponent-scan과 어노테이션이용하여 등록  
```xml
 \<context:component-scan base-pakage="" />  
```
  - 빈 등록할 클래스 위에 @Bean어노테이션 붙이기
  - 시작하는 메인메소드에다가 해당xml을 ApplicationContext라고 등록시켜줌
- ★IoC는 인터페이스를 부르면 해당 인터페이스를 구현한 빈등록된 클래스를 찾기 때문에,   
  의존성 주입받은 클래스에서는 인터페이스만 보면 되고, 특정 구현 클래스를 new하지 않아도 된다   
  -> 느슨한 결합(loose coupling)  
- 만약 해당 인터페이스를 구현한 빈등록된 클래스가 많다면, @Qualifier(id명시)를 통해 해결
- 스테레오타입 어노테이션 : @Repository, @Service, @Controller, @component(기타!)
- 스코프 어노테이션 : @Scope("") -> (singleton: 디폴트), prototype, request, session ...
- 이 방법도 boot로 넘어가면 더 간편해짐~~  
	
3. 클래스에 @configuration을 붙여 자바코드로 등록  

-----------------

#### IoC용어
- bean : 스프링이 직접 그 생성과 제어를 담당하는 오브젝트만을 말함
- bean factory : 빈을 등록, 생성, 조회, 반환 등등의 기능을 가짐.   
  보통 이 빈백포리를 바로 사용하지 않고, 이를 확장한 애플리케이션컨섹스트를 이용함.  
- application context : 빈팩토리를 확장한 형태.   
  기본기능은 빈팩토리와 동일한데 각종 부가 서비스(싱글턴 등)를 추가로 제공함.  
- (web application context) : 웹 환경에서 사용할 때 필요한 기능이 추가됨 -> XmlWebApplicationContext
- configuration metadata : 애플리케이션컨텍스트 또는 빈팩토리가 IoC를 적용하기 위해 사용하는 메타정보.
- spring framework : IoC컨테이너, 애플리케이션컨텍스트를 포함해서 스프링이 제공하는 모든 기능을 칭함.

-------------------

#### 메이븐(or gradle..)
- 프로젝트의 생성, 배포 및 리포팅까지 전체 과정을 포함
- lifecycle : 빌드 과정에서의 각 단계들을 라이프사이클로 정의하고 있음 -> 플러그인으로 쉽게 실행가능
- dependency management :   
  local repository(경로: USER_HOME/.m2/repository)   
  remote repository(대형프로젝트시, 개발자들간의 동일환경을 위해)   
  (internet)   
  central repository(맨날 들르던 mvnrepository.com)   
- 메이븐프로젝트 생성하면 오른쪽에 Maven tab이 생김~
- pom.xml파일에다가 여러 설정들 하면 됨!  
  - 플러그인 설정 -> lifecycle
  - 라이브러리 의존성 설정

---------------------

#### spring boot 실습
- spring initializr이용~  
  - spring web 라이브러리 추가해서 생성
  - generate하면 생성된 프로젝트가 zip으로 다운로드됨 <- 파일실행
  - explore하면 생성된 프로젝트를 바로 볼 수 있음 <- 복붙이용  
    : 프로젝트는 ide에서 만들고, explore의 pom.xml 내용들 복사해서 넣음됨
- <parent>부분★★  
  - maven간의 상속(pom.xml간의 상속)이 가능하기 때문에, <parent>부분이 중요!
  ```xml
  <parent>  
    <groupId>org.springframework.boot</groupId>   
    <artifactId>spring-boot-starter-parent</artifactId>  
    <version>2.7.5</version>  
    <relativePath/> <!-- lookup parent from repository -->  
  </parent>  
  ```  
- start가 되는 class에다가 @SpringBootApplication  
  - @ComponentScan, @Configuration, @EnableAutoConfiguration (3in1)
  - main메소드에 SpringApplication.run(클래스이름.class, args); -> 바로 서버에서 실행됨!

-----------------

#### RESTApi
- 웹애플리케이션의 리소스(데이터와 기능)를 외부에 공개하는 방법
- 리소스를 http uri로 표현하고, 해당 리소스에 대한 행위를 http method(get,post..)로 정의
- 즉, 리소스(명사)를 uri로 두고, 행위(동사)를 method로 정의  
  -> 예) `/article`이라는 uri를   
    `post`로 보내면 새로운 article생성,   
    `get`으로 보내면 article목록보기   
    `put`으로 보내면 article update,   
    `delete로 보내면 삭제   

-------------------

#### 웹 프레임워크 아키텍쳐 - MVC패턴
- view : 최근에는 MPA(multi page application)에서 SPA(single)로 넘어갔기 때문에 중요도↓  
  > 예전에는 client의 요청에 대한 응답페이지를 서버측에서 하나하나 쏴 줬음   
  > 즉, jsp여러개 가지고 있다가 상황에 맞는 jsp(view)를 응답에 담아보냈다는 말   
  > 근데 요즘은 서버측은 빈페이지 하나만 응답으로 보내고, 그냥 data만 client로 보내주면   
  > **★client측에서** react, 앵귤러, 뷰.js등을 이용한 자바스크립트 언어로 알맞게 표현함.   
- controller : 사용자의 액션에 대한 모델 업데이트/매핑. ~~응답에 대한 뷰 선택~~
- model : 데이터 주고받는 틀. 요즘은 json형태로 다 그냥 보내버리긴 함..

#### Front Controller 패턴
- 이전에는 req마다 매칭되는 servlet(jsp)이 존재.  
  (jsp는 servlet클래스를 좀더 화면에 가깝게 만들 수 있도록 해줌)
- 하지만 Front Controller(dispatcherServlet)같은 대문이 생기면서,  
  알아서 알맞는 controller로 요청을 분배함.  
  controller에서는 데이터를 model(json)형태로 view에 전달. 여기서 view가 servlet/jsp
- spring mvc/boot사용하면 dispatherServlet 만들고 설정 할 필요 없이 알아서 등록됨!
- 실행 예시
> client -> dispatcher servlet : 요청   
> d.s -> handlerMapping : 이 요청은 어떤 컨트롤러에게 문의하죠?   
> handlerMapping -> d.s : controllerB입니다   
> d.s -> controllerB : 이 요청좀 처리해주세요   
> controllerB -> d.s (with ModelAndView B) : 처리했고, b라는 이름의 뷰에게 모델 전달좀   
> d.s -> view Resolver : b라는 이름의 뷰가 뭐죠?   
> view Resolver -> d.s : ViewB입니다  (여기서 View가 Servlet/JSP임!!!)  
> d.s -> ViewB (with Model B) : 이 모델을 표현해주세요   
> viewB -> d.s : 표현했고, 결과물 보냅니다   
> d.s -> client : 응답   

--------------------------

#### SPA / json / spring mvc 실습  
client -> F.C -> controller(@RestController) -> service(@Service) -> store(@Repository) -> DB  
- application.properties 혹은 application.yml파일은   
  프로젝트 처음 start할 때, spring boot에 의해 읽혀져서   
  이 안의 내용들로 taomcat설정이라던지 db설정을 하게됨~  
- 어노테이션이 속한 곳 구분 잘하기
  - ★Spring IoC (Core) : @Controller, @Service, @Repository, @Component
  - ★Spring MVC : @ResponseBody, @GetMapping...
  - ★Spring Data : @Entity, @Id, @Table
- RequestBody에 json형태로 값이 담겨서 오면, 그걸 모델객체화 시키는 과정이 필요함
  - 해주는건 dispatcherServlet
  - 조건1. get방식이 아닐것
  - 조건2. 메소드 파라미터에 @RequestBody 넣기   
    -> public String register(@RequestBody TravelClubCdo travelClubCdo) { }   
  - 조건3. json의 key값과 객체의 필드명이 같아야 함  
- get방식으로 데이터 전달 : requestBody(X), url(O)
  - ★url을 짤 때, { }안에 변수이름 넣고, 그걸 @PathVariable로 받아옴
  ```java  
  @GetMapping("/club/{clubId}")   
  public TravelClub find(@PathVariable String clubId) {...}
  ```
  - ★@RequestParam으로 받아옴
  ```java  
  @GetMapping("/club") // localhost:8090/club?name=JavaClub
  public List<TravelClub> findByName(@RequestParam String name) {...}
  ```
- ★클래스 위에 @RequestMapping("/path")하면  
  해당 클래스의 모든 메소드들의 기본 url경로가 /path로 시작~
