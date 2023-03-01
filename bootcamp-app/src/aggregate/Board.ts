import {IdName, newIdName} from "./vo/IdName";

export interface Board {
    boardId: string;
    title: string;

    user: IdName;
    regDate: number;
    modDate: number;
    views: number;
    content: string;
}
export const newBoard = (boardId='', title='', user=newIdName(), regDate=0, modDate=0, views=0, content=''):Board => {
    return {boardId, title, user, regDate, modDate, views, content}
};
