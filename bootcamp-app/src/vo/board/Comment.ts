import {IdName} from "../IdName";

interface Comment {
    commentId: string;
    user: IdName;
    regDate: number;
    modDate: number;
    content: string;
}
export default Comment;