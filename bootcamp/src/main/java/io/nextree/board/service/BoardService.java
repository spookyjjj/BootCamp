package io.nextree.board.service;

import io.nextree.board.aggregate.Board;
import io.nextree.board.command.BoardCreate;
import io.nextree.board.store.BoardStore;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {
    //
    private final BoardStore boardStore;

    public BoardService(BoardStore boardStore) {
        //
        this.boardStore = boardStore;
    }

    public String create(BoardCreate command) {
        Board board = new Board(command);
        boardStore.create(board);
        return board.getBoardId();
    }

    public List<Board> findAll() {
        return boardStore.queryAll();
    }

    public Board findBoardById(String id) {
        return boardStore.query(id);
    }
}
