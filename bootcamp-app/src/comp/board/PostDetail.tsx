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
            <span>deatail page</span>
            <div className='container text-center'>
            <div className="row">
                <div className="col">
                    title
                </div>
                <div className="col-6">
                    {detail.title}
                </div>
            </div>
                <div className="row">
                    <div className="col">
                        writer
                    </div>
                    <div className="col-6">
                        {detail.user.name}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        view
                    </div>
                    <div className="col-6">
                        {detail.views}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        regDate
                    </div>
                    <div className="col-6">
                        {new Date(detail.regDate).toISOString().replace('T', ' ').replace(/\..*/, '')}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        content
                    </div>
                    <div className="col-6">
                        {detail.content}
                    </div>
                </div>
            </div>
            <div className="col-md-3 my-5 float-end">
                <Link to="/board" className="btn btn-outline-primary me-2" role="button">목록</Link>
                {/*todo*/}
                <Link to="/" className="btn btn-primary me-2" role="button">수정</Link>
                <Link to="/" className="btn btn-primary me-2" role="button">삭제</Link>
            </div>
        </>
    )
}
export default PostDetail;