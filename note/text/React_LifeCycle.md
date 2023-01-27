### LifeCycle
- 생명주기 메서드는 클래스 기반 컴포넌트에 존재하는 메서드로 특정 시점에 호출됨
- 종류? (총 8가지)
  - constructor ☆
  - getDrivedStateFromPorps
  - shouldComponentUpdate
  - render ☆
  - getSnapShotBeforeUpdate
  - componentDidMount ☆  
  - componentDidUpdate ☆
  - componentWillUnmount ☆
- 언제호출?
  - Mounting : 해당 컴포넌트가 생성되고, render를 통해 실제DOM에 반영되는 것
    constructor -> getDrivedStateFromProps -> render -> componentDidMount
  - Updateing : 새로운 prop 값이 생기거나 state가 변경되는 경우 / ~~foreceUpdate~~  
    getDrivedStateFromProps -> shouldComponentUpdate -> render -> getSnapShotBeforeUpdate -> componentDidUpdate
  - Unmounting : 컴포넌트가 사라져야 하는 상황에서 리소스/리스너 정리용   
  - componentWillUnmount

#### Mounting과정
- constructor -> getDrivedStateFromProps -> render -> componentDidMount
- constructor  
  - state에 관한 초기화  
  - 이벤트 메소드에 대한 바인딩(수기 or auto-bind라이브러리)  
  - 참조사항  
    > super()생성자 호출 이전에는 this가 할당되지 않음  
    > `constructor(props) { super(props); }`와 같이 props을 전달하는 목적은?  
    > -> 생성자 내부에서 this.props접근이 가능하도록 하기 위해서!!!    
- componentDidMount
  - render메소드를 통해 리얼돔에 마운트까지 된 후(화면에 보이는 요소), 데이터를 붙이는 작업 담당!
  - 즉, 렌더링 이후 마지막으로 서버에서 데이터를 읽어오고(만약 state데이터면 set하는 과정까지) 화면에 입히는 거
  - 예제  
  ```javaScript
  class UesrList extend Component {
    //1.생성자
    constructor(props) {
      super(props);
      this.state = {
        user : [{
          id : '',
          name : ''
        }]
      }
    }
    //state값 바꾸는 메서드
    loadUsers(){
      //axios는 서버와 http프로토콜로 통신하기 위해 사용하는 자바스크립트 라이브러리
      axios.get('http://json데이터 받아올 수 있는 주소').then( response => {
        this.setState( {users : response.data} );
      });
    } 
    //3.componentDidMount
    conponentDidMount(){ //conponentDidMount()메소드에 loadUsers()넣어놓으면 첫페이지에서부터 목록나옴!!
      this.loadUSers();  //즉, 1.생성자 -> 2.랜더링 거쳐서 -> 3.componentDidMount실행~~
    }
    //2.랜더링
    render() {
      const userList = this.state.users.map( user => return <ListItem primary={user.name} />)
      return (
        //<Button onClick={this.loadUsers.bind(this)}></Button> 
        //여기에 onClick이벤트로 loadUsers()넣어놔서 -> 첫페이지에서 버튼 눌러야 목록나옴!!!
        <List> {userList} </List>
      )
    }
  }
  ```
#### Updating 과정
- getDrivedStateFromProps -> shouldComponentUpdate -> render -> getSnapShotBeforeUpdate -> componentDidUpdate
- getDrivedStateFromProps
  - props로 받은 어떤 특정 값으로 state값을 세팅하고 싶을때 (동기화) 재정의하는 메소드
  - 예제
  ```javaScript
  //상위컴포넌트에서 호출시, props넣어줬음
  <ABC title='hello~' />
  
  class ABC extend Component {
    constructor(props) {
      super(props);
      this.state = {
        title : '',
      }
    }
    //getDrivedStateFromProps재정의 -> 파라미터로 nextProps, prevStat 받음!
    static getDrivedStateFromProps(nextProps, prevState) {
      if(nextProps.title(props값) !== prevState.title(state값)) {
        return {title : nextProps.title} //state값을 props값에서 따와서 변경
      }
      return null;
    }
  }
  ```
- shouldComponentUpdate(nextProps, nextState)
  - 성능을 최적화 하는데 사용하는 메소드
  - render메소드로 갈지 말지 정함
  - 리턴값이 T/F  
    : T <- 이전의 props, state가 파라미터로 받은 nextProps, nextState와 다르면 렌더링해야하니깐 true  
    : F <- 이전의 props, state가 파라미터로 받은 nextProps, nextState와 같으면 렌더링안해도 되니깐 false
- getSnapShotBeforeUpdate
  - 돔에서 변화가 일어나기 직전 바로 그 직전의 상태를 가져올 때 사용하는것
#### this에 대한 바인딩
1. 생성자에서, 모든 이벤트 메소드에 대하여 this binding을 다 걸어놓기
2. 개별 이벤트마다 바인드를 지정하는 방법
3. 2번에서 애로우펑션을 이용한다면 별도로 this binding을 할 필요가 없다 (렉시칼스코프라)
4. auto-bind라는 라이브러리 존재
