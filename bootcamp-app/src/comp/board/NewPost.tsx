import {Link, useNavigate} from "react-router-dom";
import {CreateBoard, newCreateBoard} from "../../vo/board/CreateBoard";
import {useState} from "react";
import BoardApi from "../../api/board/BoardApi";

const NewPost = () => {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState<CreateBoard>(newCreateBoard);
    const boardApi = BoardApi.instance;
    const onclickSave = () => {
        console.log('쏴줄 createBoard값', formValue);
        boardApi.createBoard(formValue)
            .then(res => navigate(`/board/${res}`, {state: res}));
    }
    const onChangeValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const changeVal: CreateBoard = {...formValue, [event.target.id]: event.target.value}
        setFormValue(changeVal);
    }

    return (
        <>
            <h3>new post page</h3>
            <hr/>
            <div className="newpost">
                <input type="text" className="form-control my-1" id="title" placeholder="제목을 입력하세요"
                       value={formValue?.title}
                       onChange={(event)=> onChangeValue(event)}
                />
                <textarea className="form-control my-1" id="content" placeholder="내용을 입력하세요" style={{height: "400px"}}
                    value={formValue?.content}
                    onChange={(event) => onChangeValue(event)}
                ></textarea>
                <div className="float-end my-3">
                    <Link to="/board" role="button" className="btn btn-secondary mx-1">취소</Link>
                    <button type="button" className="btn btn-primary mx-1" onClick={onclickSave}>등록</button>
                </div>
            </div>
        </>
    )
}
export default NewPost;
