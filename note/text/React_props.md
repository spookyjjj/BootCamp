### props실습하기
#### 준비과정
- http://github.com/namoosori/reactwithmobx
  - 템플릿 파일들 다운받기 (이미지와 static데이터)
  - 이미지는 /public안에다가 폴더 만들어서(book_images) 위치시킴
  - static데이터는 /src안에서다 폴더 만들어서(static_data) 위치시킴
- 터미널에서 cra로 프로젝트 구성하기  
  `yarn create react-app 만들고자하는 어플리케이션 이름`  
  `npm init react app 만들고자하는 어플리케이션 이름`  
- /public/index.html <- 이게 SPA에서 받아오는 최초의 빈 페이지! \<div id="root"\>
- /src/app.js, index.js, reportWebVitals.js, setupTests.js만 남겨놓음 됨
- 리액트 컴포넌트들에게 css입힐 수 있는 라이브러리 설치 <- material UI
  - material-ui.com
  - npm등을 이용해서 설치가능한데 중요한건 위치!! 만든 프로젝트로 이동해서 설치ㄱㄱ  
  `npm install @material-ui/core`    
  `yarn add @material-ui/core`  
#### 기본구조
- /src/app.js : 제일 큰 껍데기, 데이터 import하는곳
  - 함수형 컴포넌트 -> class컴포넌트로 변경하기
  ```javaScript
  import React from 'react';  
  class App extends React.Component{
    render() {
      return() 
    } 
  }  
  //혹은  
  import React {Component} from 'react';  
  class App extends React.Component{
    render() {
      return() 
    } 
  } 
  ```
  - ★최종본인 App컴포넌트가 index.js에서 id root인 div안에서 랜더링됨
- /src/components/BookList.js : app안에 들어갈 커스텀 컴포넌트
  - 새로운 클래스 컴포넌트 만듬 -> export하면 BookList를 jsx로 걍 부를 수가 있다!!
  - @material-ui/core를 이용해서 간단히 만들어볼거임  
  `import {List, ListItem} from '@material-ui/core';`  
  -> jsx로 List, ListItem이용하면됨~
- /src/components/BookListItem.js : BookList안에 들어갈 커스텀 컴포넌트
  - BookList.js와 마찬가지  
  `import {Paper, Grid, Typography} from '@material-ui/core';`  
- /src/index.js : ReactDom불러와서 랜더링 작업
#### 데이터넘겨주기
1. /src/app.js
    - `import Books from './static_data/Books';` 로 임포트 해와서
    - return하는 element였던 \<BookList /\>에다가 props를 줌  
    : \<BookList data={ Books }/\>  
2. /src/components/BookList.js
    - 상위에서 넘겨받은 props보따리 풀기  
    ```javaScript
    const booksData = this.props.data;  
    //혹은  
    const { data } = this.props; <- '★구조분해할당' 변수이름 짜낼 필요 없음
    ```
    - 하위에게 props로 데이터 넘겨주기  
    ```javaScript
    <ListItem>  
       <BookListItem book={data[0]} />  
    </ListItem>  
   ```
3. /src/components/BookListItem.js
  ```JavaScript
  import {Paper, Grid, Typography} from '@material-ui/core';
  class BookListItem extends Component {
    render() {
      const { book } = this.props;
      return(
        <Paper>
          <Grid container spacing={2}> // Grid는 container와 item 두 종류
            <Grid item> <img src={book.imgUrl}/> </Grid>
            <Grid item> <Typography component='h5' variant='h5'> {book.title} </Typography> </Grid>
          </Grid>
        </Paper>
      )
    }
  }
  ```
#### props 반복문사용
```JavaScript
class BookList extends Component {
  render() {
    const { data } = this.props; //책들 정보 담긴 전체 데이터
    const bookItems = data.map( book => {
      return (
        <ListItem> <BookListItem book={book} /> </ListItem>
      )
    } )
    return(
      <List>
        {bookItems} //JSX에서 {}는 자바스크립트 코드 -> ★리액트에서는  배열 알아서 푼다~
      </List>
    )
  }
}
```   
#### list child마다 key값 주기
- ★그래야 엘리먼트가 수정된 후 새로 렌더링 시 특정 key부분만 수정하면 됨  
  `<ListItem key='book.ispn'> <BookListItem book={book} /> </ListItem>`  
