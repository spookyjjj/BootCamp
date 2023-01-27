
## Spring Data JPA
- 영속화 : 물리적 저장소에 저장하는 행위
  - 자바에서 sql을 통해 rdbms에 데이터 저장하는 행위   
    : java application - (JDBC 인터페이스 : 이 둘을 연결하기 위한 기능을 정의한 api) - DBMS들(각각 JDBC Driver존재)   
    : 객체세상 - (패러다임의 불일치를 맞추는 persistent framework : OR맵핑/SQL맵핑) - 테이블세상   
- SQL맵핑  
  : 예) myBatis <- 자바코드에서 sql부분을 분리하여 xml로 저장해놓고 씀 (쿼리작성O)  
- OR맵핑  
  : 예) JPA <- sql자체를 얘가 알아서 해줌 (쿼리작성X)  
- Spring Data란?  
  - 영속적인 데이터 관리를 더 편하게 하기 위한 하나의 spring프로젝트
  - 종류가 여러가지...(JPA, NoSql, JDBC 등등)
- JPA란?
  - ORM(object-relational mapping)기술 표준
  - Java Persistence API : 즉, 이 자체는 프레임워크X 라이브러리X 인터페이스모음O 구현X
  - JPA를 정의한 javax.persistence패키지. 그 중 핵심이 EntityManeger라는 인터페이스~
  - 세트처럼 구현체로 Hibernate라이브러리를 사용 (99%라서 JPA와 거의 한 세트임)  
    다른 것들도 있기는 함. EclipseLink, DataNucleus등등..근데 안씀
- Spring Data JPA란?
  - 순수 JPA를 통한(EntityManager) 데이터 관리 대신, Spring Data(Repository)를 통해 좀더 쉽게~   
    : 기존에 JPA를 사용하려면 EntityManager를 주입받아 사용해야하지만,   
    Spring Data JPA는 JPA를 한단계 더 추상화 시킨 Repository인터페이스를 제공함   
    -> 즉, Spring Data JPA의 Repository의 구현에서 JPA를 사용하고 있다~  
  - 순수 jpa에서는 @Repository클래스 만들고, entityManager를 호출해서 필요 쿼리문을 생성해야 했음.   
    -> ★★Spring Data JPA의 Repository인터페이스에는 entityManager가 이미 포함되어있고,   
    @Repository 없이도 Bean등록 된 상태~!! 
  - 기본쿼리 이외의 세부적 sql이 필요할 때, query method가 존재하여 메소드로 대체 할 수 있도록 함  
    : query method 쓰면 ★메소드 이름을 분석해 jpql쿼리를 실행  
  - @Transaction을 통해 트랜잭션 관리도 가능

-----------------------

#### Spring Data JPA 실습
1. 사용할 DB의 드라이버와 Spring Data JPA 라이브러리 주입받기
2. applicstion.yml에서 설정 만기지
```yml
//h2 DB기준 예시..
server:
  port: 8090

spring:
  h2:
    console:
      enabled: true
      path: /h2-console
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:test
    username: sa
    password:
  jpa:
    show_sql: true
    properties:
      hibernate:
        format_sql: true
    database-platform: org.hibernate.dialect.H2Dialect
```
3. DB테이블과 도메인객체를 바로 연결시키지 않고 중간자를 만듬 : Jpo(Java Persistence Object)
  - 이때 Spring Data 어노테이션이 등장
  - 매핑클래스를 관계형 데이터베이스 테이블로 매핑할 때 @Entity어노테이션 사용
  - PK가 될 필드에는 @ID어노테이션 사용
  - 매핑 테이블의 설정도 가능 @Table()에서! (name어트리뷰트 등등..)
  - ★`BeanUtils.copyProperties(파라미터로 받는 도메인, this);` 유용~~
4. ----여기까지는 JPA, Hibernate를 쓴거지 Spring Data JPA는 아님!!----
5. Spring Data JPA의 JpaRepository<Jpo클래스, key의 타입>를 extends하는 개별Repository 인터페이스 생성
```java
// 예시
//@Repository도 안해도 되고, 필드로 entityManager를 가질 필요도 없음! 걍 상속받음됨~
public interface ClubRepository extends JpaRepository<TravelClubJpo, String > { ... }
```
  - 기본 JpaRepository의 메소드로 정의되어있는건 거의 @Id(key)값.. -> 세부 검색등은 새로 정의 필요    
  순수 JPA에서 EntityManager를 통해 필요한 쿼리를 생성해야 하는 부분을 메소드 이름으로 대체 가능   
  Spring Data JPA는 메소드 이름을 분석해 JPQL쿼리를 실행함!!!!   
  ★읽어 낼 수 있는 keyword들? -> 필드명, And, Or, Between, Like, StringWith, Containing, OrderBy..   
6. 위의 인터페이스 구현체를 가지는 store레이어 생성  
```java
//예시
@Repository
public class ClubJpaStore implements ClubStore {
    ClubRepository clubRepository;
    public ClubJpaStore(ClubRepository clubRepository) { // 의존성 주입
        this.clubRepository = clubRepository;
    }
    @Override해야할 메소드들..
}
```
  - JPA 반환값으로 자주보이는 Optional<T>?  
    : Optional객체를 쓰면, 제공되는 메소드 사용해서 예상치 못한 NullPointerException회피하기 쉬움   
    Optional.of() -> 절대 null이 아닌경우! null이면 NullPointerException. 이건 진짜 잘 안씀~~   
    Optional.ofNullable() -> null일수도 있는 경우! isPresent, orElse, orElseGet, orElseThrow등으로 후처리   
    get() -> Optional객체 안에 저장된 값 반환. null이 들어있면 NoSuchElementException    
    orElse() -> 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 값을 반환   
    orElseGet() -> 위와같은데,, 인수로 받는 게 값이 아닌 함수를 받는다   
    orElseThrow() -> 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 예외ㄱㄱ   
    [참조자료] https://mangkyu.tistory.com/70
  - Spring Data JPA의 save메소드는 일단 @Id로 테이블에 값이 있는지 확인 후(select문),   
    없다면 insert문으로 행 삽입, 있다면 update문으로 행 수정!
