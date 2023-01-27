package io.nextree.board.store.document;

import io.nextree.Util.IdName;
import io.nextree.board.aggregate.Board;
import io.nextree.board.aggregate.vo.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("BOARD")
public class BoardDoc {
    //
    @Id
    private String boardId; // DB와 연결되는 곳에는 @Id
    private String title;
    private IdName user;
    private long regDate;
    private long modDate;
    private int views;
    private String content;
    private List<Comment> comment;

    public BoardDoc(Board board) {
        this.boardId = board.getBoardId();
        this.title = board.getTitle();
        this.user = board.getUser();
        this.regDate = board.getRegDate();
        this.modDate = board.getModDate();
        this.views = board.getViews();
        this.content = board.getContent();
        this.comment = board.getComment();
    }

    public Board toBoard() {
        return new Board(
                this.boardId,
                this.title,
                this.user,
                this.regDate,
                this.modDate,
                this.views,
                this.content,
                this.comment
        );
    }
}
