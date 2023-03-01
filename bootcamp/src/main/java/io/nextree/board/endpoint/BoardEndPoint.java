package io.nextree.board.endpoint;

import io.nextree.board.aggregate.Board;
import io.nextree.board.aggregate.Comment;
import io.nextree.board.aggregate.sdo.CommentCdo;
import io.nextree.board.aggregate.sdo.DetailPageRdo;
import io.nextree.board.aggregate.sdo.BoardCdo;
import io.nextree.board.service.BoardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardEndPoint {
    //
    private final BoardService boardService;

    public BoardEndPoint(BoardService boardService) {
        //
        this.boardService = boardService;
    }

    //조회는 get, 수정은 put, 삭제는 delete로 mapping

    //@RequestBody: 호출 당시 body에 넣어온 값을 가져옴
    //@PathVariable: /{id} 일 때 이 id 값을 가져옴
    //@RequestParam: ?boardId={boardId}와 같은 url이 들어올 경우 boardId 값을 가져옴
    //@RequestHeader: api호출 당시 header에 넣어온 값을 가져옴

    @PostMapping
    public String createBoard(@RequestBody BoardCdo command) {
        //
        return this.boardService.createBoard(command);
    };

    @PostMapping(value = "/{id}")
    public String updated(@RequestBody Board updateBoard) {
        //
        return this.boardService.updateBoard(updateBoard);
    };

    @GetMapping
    public List<Board> findAll() {
        //
        return this.boardService.findAllBoard();
    }

    @GetMapping(value = "/{id}")
    public DetailPageRdo findDatailPageByBoardId(@PathVariable String id) {
        //
        Board board = this.boardService.findBoardById(id);
        List<Comment> comments = this.boardService.findCommentByBoardId(id);
        return new DetailPageRdo(board, comments);
    }

    @PostMapping(value="/comment/create")
    public String createComment(@RequestBody CommentCdo command) {
        //
        return this.boardService.createComment(command);
    };
}
