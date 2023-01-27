package io.nextree.board.aggregate;

import io.nextree.Util.IdName;
import io.nextree.board.aggregate.vo.Comment;
import io.nextree.board.command.BoardCreate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
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
    private List<Comment> comment;

    public Board(BoardCreate command) {
        //
        this.title = command.getTitle();
        this.content = command.getContent();
        this.user = command.getUser();

        this.boardId = UUID.randomUUID().toString();
        this.comment = new ArrayList<>();
        this.regDate = System.currentTimeMillis();
        this.modDate = 0;
        this.views = 0;
    }
}
