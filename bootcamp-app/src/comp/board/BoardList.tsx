import {useEffect, useState} from 'react'
import axios from "axios";
import {Board} from '../../aggregate/Board';
import {Link, useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import BoardApi from "../../api/board/BoardApi";

const BoardList = (props: any) => {
    const [boardList, setBoardList] = useState<Board[]>([]);
    const navigate = useNavigate();
    const boardApi = BoardApi.instance;

    useEffect(() => {
        boardApi.getBoardList().then(res => setBoardList(res));
    }, [])

    const onClickRow = (boardId:string) => {
        navigate(`/board/${boardId}`, {state: boardId});
        // props.history.push(`/board/${post.boardId}`)
    }

    return (
        // (forEach, find, map filter : js array 내부 function)
        <>
            <div className="float-end">
                <Link to="/board/newpost" className="btn btn-outline-primary text-end" role="button">글쓰기</Link>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Writer</th>
                    <th scope="col">RegDate</th>
                    <th scope="col">views</th>
                </tr>
                </thead>
                <tbody className="table-group-divider">
                <tr>
                    <th scope="row">#</th>
                    <td>최신공지글</td>
                    <td>운영자</td>
                    <td>2023-01-01 07:00:00</td>
                    <td>3</td>
                </tr>
                {
                    boardList.map((post, index) =>
                        <tr key={post.boardId} onClick={() => onClickRow(post.boardId)}>
                            <th scope="row">{boardList.length - index}</th>
                            <td>{post.title}</td>
                            <td>{post.user?.name}</td>
                            <td>{new Date(post.regDate).toISOString().replace('T', ' ').replace(/\..*/, '')}</td>
                            <td>{post.views}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </>
        // <Container className='p=3'>
        // <div>
        //
        //     <span>board page</span>
        //     {/*map을 써야한다~! -> https://ko.reactjs.org/docs/lists-and-keys.html */}
        //     {
        //         boardList.map((board: Board)=>
        //             <Row>
        //                 <Col xs={8} sm={8}>{board.title}</Col>
        //                 <Col xs={4} sm={4}>{board.regDate}</Col>
        //             </Row>)
        //     }
        // </div>
        // </Container>
    )
}

export default BoardList
