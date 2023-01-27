#### State관리
- 클래스 기반의 컴포넌트는 state객체를 이용해 변경가능한 데이터를 관리
- 각 컴포넌트마다 상태를 관리할 경우 데이터 관리 및 제어가 어려움
- 공통의 데이터 관리 영역(store)을 두고 이를 통해 state를 관리하면 컴포넌트간 데이터 공유가 가능
- redux, mobx, flux 등등 상태관리 라이브러리들은 많다~ <- 전부 base는 Flux아키텍쳐!

#### Flux 아키텍쳐
- React를 이용한 ui구성에서 데이터 흐름을 관리하는 어플리케이션 아키텍처
- React는 단방향 데이터 흐름만 가능하기 때문에 MVC 아키텍쳐 사용(X), Flux 아키텍쳐 사용(O)
  - MVC구조는 model과 view사이의 양방향 데이터 이동
  - React는 only `model(store) -> view(component)`  
    : 애초에 component가 view전용으로 만들어진거임~  
- Action, Dispatcher, Store, View로 구성됨
  - 시스템에서든, view에서든 action이 발생하면 Dispatcher가 받음
  - Dispatcher가 Store값(state값)과 매핑된 View를 찾아 갱신

#### MobX
- 알아야 할 것
  - store에서 state를 만드는 방법
  - state를 변경하는 action을 정의하는 방법
  - state를 변경하는 action을 정의하는 방법
- mobx.js와 mobx-react.js 라이브러리 필요
  - 실제로 store를 관리하게 해주는게 mobx라이브러리
    - (store에 사용하는 api) observable, action, computed
  - 위의 MobX로 리액트를 적용하기 위해서필요한게 mobx-react라이브러리
    - (react component에 사용하는 api) observer, inject
- MobX가 제공하는 대표적 API <- 어느 라이브러리 소속인지 알기!!!
  - observable : state들은 observable한 데이터
  - observer : observable을 바라보는 컴포넌트는 observer컴포넌트
  - action : observable 데이터를 변경하는 함수는 action -> 몹액스에서의 트렌젝션!
  - runInAction : 비동기 형태의 작업이 진행될때는 action대신 애를 씀
  - computed : 옵저버블 데이터로 연산작업을 하는경우, 캐싱을해서 성능↑하는 api
  - autoRun : 특정 옵저버블 데이터가 변경되었을 때 수행되는 작업 지정  
    -> 몹액스 단독에서나 자주 쓰지 리액트랑 붙일 때는 잘 안씀. 랜더링을 다시해야하니 observer로 렌더메소드 

------

### 실습(Counter만들었던거 mobx로 옮기기)
- 자바에서 어노테이션을 썼던것과 같이 JS에서는 데코레이터 사용!
- 하지만 아직 JS표준으로 채택 안되서 몇가지 설정을 해줘야 함
- 테코레이터를 바벨이 읽어내 transCompile함
#### state를 store에 넣고 필요 컴포넌트에 주입받게하는 과정
- /src/store/CounterStore.js생성
  ```javaScript
  import {observable} from 'mobx';
  
  class CounterStore {
    @observable  //★state를 store에 넣기
    _count = 5 //디폴트값
  }
  export default new CounterStore(); //export할때 new해서 보내줘라~~
  ```
- /src/index.js로 가서 Provider를 통해 store를 props로 inject할 수 있게 세팅
  ```javaScript
  import {Provider} from 'mobx-react'; //몹엑스와 리액트를 연결해주는 역할하는 컴포넌트 
  import CounterStore from './store/CounterStore'; //import하면 new로 생성됨~~
  
  ReactDOM.render(
    <Provider counterStore={CounterStore}> //★Provider는 props형태로 제공해줌!!!
      <App /> //Provider로 감싸진 App! App하위의 모든 컴포넌트들은 이 counterStore를 사용할 수 있음
    </Provider>,
    document.getElementById('root')
  );
  ```
- /src/component/CounterComponent.js로 가서 inject받아 counterStore사용 (App.js하위라 사용가능)
  ```javaScript
  import {inject} from 'mobx-react'; //provide된 store주입받음!
  
  @inject('counterStore') //★주입되는것도 props형태로 주입이 된다~!!!
  class CounterComponent extends Component {
    render() {
      const {countStore} = this.props; //props형태로 주입되었으니, 이렇게 가져온다
      return (
        <Button>+</Button>
        <Box> {countStore._count} </Box>
        <Button>-</Button>
      )
    }
  }
  ```
#### state가 변화했을때 새로 랜더링 되게 하는 과정
- state변화시키는 함수(@action)도 Store클래스에서 정의
- /src/store/CounterStore.js에서 
  ```javaScript
  import {observable, action} from 'mobx';
  
  class CounterStore {
    //몹액스 버전6에서는 데코레이터 지원이 안되어서
    //이부분이 있어야 Component에서 @observer가 먹힘~! (버전5에서는 안해도됨)
    constructor() {
      makeObservable(this);
    }
  
    @observable
    _count = 5
    
    @action //obervable을 변화시키는 함수에는 @action해줘야함!
    increment() {
      this._count++;
    }
    @action //obervable을 변화시키는 함수에는 @action해줘야함!
    decrement() {
      this._count--;
    }
    
    //get메소드를 정의하면, 메소드 호출이 아니라 변수에 접근하는것처럼 사용할 수 있다
    //즉, CounterStore.count()가 아닌 CounterStore.count 형태로 사용하면 됨~~
    get count() { 
      return this._count;
    }
  }
  ```
- /src/component/CounterComponent.js가서 @action를 이벤트와 연결하고 observer설정
  ```javaScript
  import {inject, observer} from 'mobx-react'; //observable데이터를 관찰중인 컴포넌트라고 observer설정 해줘야함!
  
  @inject('counterStore')
  @observer //이렇게!
  class CounterComponent extends Component {
    render() {
      const {counterStore} = this.props;
      return (
        <Button onClick={ ()=>counterStore.increment() }> + </Button> //에로우펑션이라 바인딩 안해도됨
        <Box> {counterStore.count} </Box> //get메소드 이용 형태!
        <Button onClick={ ()=>counterStore.decrement() }> - </Button> //에로우펑션이라 바인딩 안해도됨
      )
    }
  }
  ```
