import axios from "axios";
import {BoardCdo} from "../../aggregate/sdo/BoardCdo";
import {Board} from "../../aggregate/Board";
import {DetailPageRdo} from "../../aggregate/sdo/DetailPageRdo";
import {CommentCdo} from "../../aggregate/sdo/CommentCdo";

class BoardApi {
    private static _instance: BoardApi;
    static get instance() {
        if (!BoardApi._instance) {
            BoardApi._instance = new BoardApi();
        }
        return this._instance;
    }
    async createBoard(createCommand: BoardCdo): Promise<string> {
        const res = await axios.post('/api/board', createCommand);
        return res.data;
    }
    async getBoardList(): Promise<Board[]> {
        const res = await axios.get("/api/board");
        return res.data;
    }

    async getDetailPageData(boardId: string): Promise<DetailPageRdo> {
        const res = await axios.get(`/api/board/${boardId}`);
        return res.data;
    }

    async createComment(createCommand: CommentCdo): Promise<string> {
        const res = await axios.post(`/api/board/comment/create`, createCommand);
        return res.data;
    }
}
export default BoardApi