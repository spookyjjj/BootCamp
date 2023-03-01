import {IdName} from "./vo/IdName";

interface Comment {
    commentId: string;
    user: IdName;
    regDate: number;
    modDate: number;
    content: string;
    upperBoardId: string;
    upperCommentId: string;
}
export default Comment;