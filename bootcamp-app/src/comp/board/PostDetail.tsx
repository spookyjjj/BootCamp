import BoardApi from "../../api/board/BoardApi";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Board, newBoard} from "../../vo/board/Board";

const PostDetail = () => {
    const {state} = useLocation();
    const boardApi = BoardApi.instance;
    const [detail, setDetail] = useState<Board>(newBoard);

    useEffect(() => {
        boardApi.getBoard(state).then(res => setDetail(res));
    },[])

    return (
        <>
            <table className="table">
                <tbody>
                        <tr>
                            <th colSpan={2} style={{textAlign: "center"}}> {detail.title} </th>
                        </tr>
                    <tr>
                        <td> 작성자 </td>
                        <td style={{textAlign: "left"}}> {detail.user.name} </td>
                    </tr>
                    <tr>
                        <td> 등록일 </td>
                        <td style={{textAlign: "left"}}> {new Date(detail.regDate).toISOString().replace('T', ' ').replace(/\..*/, '')} </td>
                    </tr>
                    <tr>
                        <td> 조회수 </td>
                        <td style={{textAlign: "left"}}> {detail.views} </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{height: "400px"}}> {detail.content} </td>
                    </tr>
                </tbody>
            </table>
            <div className="float-end">
                <Link to="/board" className="btn btn-outline-primary me-2" role="button">목록</Link>
                {/*todo*/}
                <Link to="/" className="btn btn-primary me-2" role="button">수정</Link>
                <Link to="/" className="btn btn-primary me-2" role="button">삭제</Link>
            </div>
        </>
    )
}
export default PostDetail;
