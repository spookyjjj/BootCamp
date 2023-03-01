import BoardApi from "../../api/board/BoardApi";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Board, newBoard} from "../../aggregate/Board";
import Comment from "../../aggregate/Comment";
import {CommentCdo, newCommentCdo} from "../../aggregate/sdo/CommentCdo";

const PostDetail = () => {
    const {state} = useLocation(); // 게시글 id
    const navigate = useNavigate();
    const boardApi = BoardApi.instance;
    const [boardData, setBoardData] = useState<Board>(newBoard);
    const [commentData, setCommentData] = useState<Comment[]>([]);
    const [formValue, setFormValue] = useState<CommentCdo>(newCommentCdo);


    const onChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormValue((old) => { return {...old, [event.target.id]: event.target.value} })
    }

    const onClickSave = () => {
        console.log('쏴줄 createComment값', formValue);
        // todo "Internal Server Error"
        boardApi.createComment(formValue).then(res => console.log(res));
    }

    useEffect(() => {
        console.log('이게 자꾸 일어나나?')
        boardApi.getDetailPageData(state).then(res => {
            setBoardData(res.board);
            setCommentData(res.comments);
            setFormValue((old) => { return {...old, upperBoardId: state} });
        });
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
                    {boardData.title}
                </div>
            </div>
                <div className="row">
                    <div className="col">
                        writer
                    </div>
                    <div className="col-6">
                        {boardData.user.name}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        view
                    </div>
                    <div className="col-6">
                        {boardData.views}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        regDate
                    </div>
                    <div className="col-6">
                        {new Date(boardData.regDate).toISOString().replace('T', ' ').replace(/\..*/, '')}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        content
                    </div>
                    <div className="col-6">
                        {boardData.content}
                    </div>
                </div>
                <div className="commentContainer">
                <form>
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="name">이름</label>*/}
                    {/*    <input type="text" className="form-control" id="name" placeholder="이름을 입력하세요" />*/}
                    {/*</div>*/}
                    <div className="form-group">
                        <label htmlFor="comment">댓글 내용</label>
                        <textarea className="form-control" id="content" rows={3} placeholder="댓글을 입력하세요"
                                  value={formValue?.content}
                                  onChange={(event)=> onChangeValue(event)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={onClickSave}>작성</button>
                </form>
                <hr />
                    <div className="card mb-3">
                        {
                            commentData.length !== 0 ? commentData.map(comment =>
                                <>
                                <div className="card-body">
                                    <p className="card-title">{comment.user.name}</p>
                                    <p className="card-text">{comment.content}</p>
                                </div>
                                </>
                            ) : <></>
                        }
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