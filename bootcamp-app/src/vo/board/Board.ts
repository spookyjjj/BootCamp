import {IdName, newIdName} from "../IdName";

export interface Board {
    boardId: string;
    title: string;

    user: IdName;
    regDate: number;
    modDate: number;
    views: number;
    content: string;
    comment: Comment[];
}
export const newBoard = (boardId='', title='', user=newIdName(), regDate=0, modDate=0, views=0, content='', comment=[]):Board => {
    return {boardId, title, user, regDate, modDate, views, content, comment}
};
