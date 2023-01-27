#### State
- MobX 상태관리컨테이너와 밀접한 관계가 있음!
- 컴포넌트에서 변경 가능한 데이터를 관리하기 위해 사용하는 객체
  - 클래스 기반일 때는 state
  - 함수 기반일 때는 hook
- 초기화 : 해당 컴포넌트의 생성자 or 필드 선언부
  - 생성자정의 시, `super();`필수!!  
    -> 상위 컴퍼넌트의 생성자로 호출이 되어야 this객체가 할당 됨
- 값 변경 : `setState()` 메서드 호출
- ★예제
```javaScript
class Counter extends Component {

  constructor() {
    super(); //이게 있어야함!
    this.state = { //state값은 일반적으로 객체로.. {}이용
      count : 5,
    }
//  constructor(props) { //보통은 props도 파라미터를 받아옴
//    super(props); 
//    this.state = { 
//      count : 5,
//    }
//  }

  increment() { 
    this.setState( {count : this.state.count + 1,} ) //파라미터로 state값을 덮어쓰기함
  }
  decrement() {
    this.setState( {count : this.state.count - 1,} )
  }
  
  render() {
    return {
      <div>
        <Button onClick={this.increment.bind(this)}> + </Button> //.bind(this) 꼭!!
        <Box> {this.state.count} </Box>
        <Button onClick={this.decrement.bind(this)}> - </Button> //.bind(this) 꼭!!
      </div>
    }
  }
}
```

----------

### state실습
- http://github.com.namoosori/reactwithmobx
- SearchIcon을 쓰기위해 @material-ui/icons 라이브러리 설치
#### component구성하기
- SearchBar
```
import {TextField, InputAdorment} from @material-ui/core;
import SerchIcon from @material-ui/icons/serch
//그리고 render함수의 return 안에 JSX로,
<TextField InputProps={ {startAdorment : (
	<InputAdorment position='start'><SerchIcon /></InputAdorment>
	)} }/>
```
- BookDetail
```
import {Card, CardHeader, CardMedia, CardContent, Typography} from @material-ui/core;
//그리고 render함수의 return 안에 JSX로,
<Card>
  <CardHeader title='' subheader=''/>
  <CardMedia component='img' image='url경로' />
  <CardContent> <Typography>내용</Typography> </CardContent>
</Card>
```
- BookList : 이전강의 참조
- BookListItem : 이전강의 참조
- => 위의 component들 app.js에 올리기
#### 이벤트붙이기
- 일단 state값 할당부터
  - 어디서? -> App.js에서 자료값 다 보관할거임~
  - 어떤값?
  ```javaScript
  import Books from './state_date';  
  
  //App.js의 생성자 안  
  this.state = { books : Books, selectedBook : Books[0] }  
  
  //props로 넘겨주는 값도 state에서 가져감!!!  
  <BookList books={this.state.books} />  
  <BookDetail book={this.state.selectedBook} />  
  ```
- ★★이벤트가 어디서 일어나서 어디가 바뀌는지 확인하기
  1. BookList의 BookListItem에서 onClick이벤트 발생시 BookDetail이 변화
    - BookDetail이 변화하기 위한 state는 selectedBook이고, App.js에 있는 값
    - App.js에서 생성한 state변경 메소드를 props로 BookListItem까지 전달!
    - => BookListItem에서 onClick이벤트 발생시 state변경 메소드 호출가능
  2. SearchBar에서 onChange이벤트 발생시 BookList가 변화
    - BookList가 변화하기 위한 state는 books이고, App.js에 있는 값
    - App.js에서 생성한 state변경 메소드를 props로 SearchBar까지 전달!
    - => SearchBar에서 onChange이벤트 발생시 state변경 메소드 호출가능
- state변경 메소드생성
  - selectedBook값 변경
  ```javaScript
  //새로운 메소드 정의 (at App.js)  
  onSelectedBook(book) {  
    this.setState( {selectedBook : book,} );  
  }  
  
  //BookList에 porps로 해당 메소드 넘겨주기 (at App.js에서 BookList컴포넌트 부를때)   
  <BookList onSelectedBook={this.onSelectedBook.bind(this)}/> //.bind(this)유의  
  
  //BookListItem에 porps로 해당 메소드 넘겨주기 (at BookList.js에서 BookListItem컴포넌트 부를때)  
  <BookListItem onSelectedBook={this.props.onSelectedBook}/>  
  
  //BookListItem클래스로 가서 이벤트발생시 메소드 호출되게 처리  
  const {onSelectedBook} = this.props;  
  <ListItem onClick={ () => onSelectedBook(book) } />  
  ```
  - books값 변경
  ```javaScript
  //새로운 메소드 정의 (at App.js)  
  onSearchTitle(title) {  
    let updateList = Books;  
    updateList = updateList.filter(book => {  
      return book.title.toLowerCase().search(title.toLowerCase()) !== -1;  
    })  
    this.setState( {books : updateList,} );  
  }  
  
  //SearchBar에 porps로 해당 메소드 넘겨주기 (at App.js에서 SearchBar컴포넌트 부를때)  
  <SearchBar onSearchTitle={this.onSearchTitle.bind(this)}/> //.bind(this)유의  
  
  //SearchBar클래스로 가서 이벤트발생시 메소드 호출되게 처리  
  const {onSearchTitle} = this.props;  
  <TextField onChange={ event => onSearchTitle(event.target.value) } />  
  ```
