package io.nextree.board.aggregate;

import io.nextree.Util.IdName;
import io.nextree.board.aggregate.sdo.BoardCdo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Board {
    //
    private String boardId;
    private String title;
    private IdName user;
    private long regDate;
    private long modDate;
    private int views;
    private String content;

    public Board(BoardCdo command) {
        //
        this.title = command.getTitle();
        this.content = command.getContent();
        this.user = command.getUser();

        this.boardId = UUID.randomUUID().toString();
        this.regDate = System.currentTimeMillis();
        this.modDate = 0;
        this.views = 0;
    }

    public void updateData(Board updateBoard) {
        this.title = updateBoard.getTitle();
        this.content = updateBoard.getContent();
        this.modDate = System.currentTimeMillis();
    }
}
