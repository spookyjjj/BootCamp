package io.nextree.board.service;

import io.nextree.board.aggregate.Board;
import io.nextree.board.aggregate.Comment;
import io.nextree.board.aggregate.sdo.BoardCdo;
import io.nextree.board.aggregate.sdo.CommentCdo;
import io.nextree.board.store.BoardStore;
import io.nextree.board.store.CommentStore;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {
    //
    private final BoardStore boardStore;
    private final CommentStore commentStore;

    public BoardService(BoardStore boardStore, CommentStore commentStore) {
        //
        this.boardStore = boardStore;
        this.commentStore = commentStore;
    }

    public String createBoard(BoardCdo command) {
        //
        Board board = new Board(command);
        boardStore.create(board);
        return board.getBoardId();
    }

//    public String updateBoard(BoardUpdateCommand command) {
//        //
//        Board origin = boardStore.query(command.getId()); //기존 자료
//        origin.updateData(command);
//
//        boardStore.update(origin);
//        return origin.getBoardId();
//    }

    public String updateBoard(Board upateBoard) {
        //
        Board origin = boardStore.query(upateBoard.getBoardId()); //기존 자료
        origin.updateData(upateBoard);

        boardStore.update(origin);
        return origin.getBoardId();
    }

    public List<Board> findAllBoard() {
        //
        return boardStore.queryAll();
    }

    public Board findBoardById(String id) {
        //
        return boardStore.query(id);
    }

    //
    //
    //

    public String createComment(CommentCdo commandCdo) {
        //
        Comment comment = new Comment(commandCdo);
        commentStore.create(comment);
        return comment.getCommentId();
    }

    public List<Comment> findCommentByBoardId(String id) {
        //
        return commentStore.findByUpperBoardId(id);
    }

}
