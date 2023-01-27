package io.nextree.board.endpoint;

import io.nextree.board.aggregate.Board;
import io.nextree.board.command.BoardCreate;
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
    public String created(@RequestBody BoardCreate command) {
        //
        return this.boardService.create(command);
    };

    @GetMapping
    public List<Board> findAll() {
        return this.boardService.findAll();
    }

    @GetMapping(value = "/{id}")
    public Board findBoardById(@PathVariable String id) {
        return this.boardService.findBoardById(id);
    }
}
