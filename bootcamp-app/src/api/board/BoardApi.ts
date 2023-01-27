import axios from "axios";
import {CreateBoard} from "../../vo/board/CreateBoard";
import Board from "../../vo/board/Board";

class BoardApi {
    private static _instance: BoardApi;
    static get instance() {
        if (!BoardApi._instance) {
            BoardApi._instance = new BoardApi();
        }
        return this._instance;
    }
    async createBoard(createCommand: CreateBoard): Promise<string> {
        const res = await axios.post('/api/board', createCommand);
        return res.data;
    }
    async getBoardList(): Promise<Board[]> {
        const res = await axios.get("/api/board");
        return res.data;
    }

    async getBoard(boardId: string): Promise<Board> {
        const res = await axios.get(`/api/board/${boardId}`);
        return res.data;
    }
}
export default BoardApi