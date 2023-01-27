import {IdName, newIdName} from "../IdName";

export interface CreateBoard {
    // id : string = ''; // back에서 transmit로 받기때문에 아예 프론트에서 안보내줘도 됨~!
    title : string;
    user : IdName;
    content : string;
}
export const newCreateBoard = (title : string = '', user : IdName = newIdName(), content : string = ''): CreateBoard => {
    return {title, user, content}
}