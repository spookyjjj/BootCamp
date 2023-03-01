import {IdName, newIdName} from "../vo/IdName";

export interface CommentCdo {
    user: IdName;
    content: string;
    upperBoardId: string;
    upperCommentId: string;
}

export const newCommentCdo = (user = newIdName(), content='', upperBoardId='', upperCommentId=''): CommentCdo => {
    return {
        user, content, upperBoardId, upperCommentId
    }
}