package io.nextree.board.aggregate;

import io.nextree.Util.IdName;
import io.nextree.board.aggregate.sdo.CommentCdo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    //
    private String commentId;
    private IdName user;
    private long regDate;
    private long modDate;
    private String content;
    private String upperBoardId;
    private String upperCommentId;

    public Comment(CommentCdo commentCdo) {
        //
        this.user = commentCdo.getUser();
        this.content = commentCdo.getContent();
        this.upperBoardId = commentCdo.getUpperBoardId();
        this.upperCommentId = commentCdo.getUpperCommentId();

        this.commentId = UUID.randomUUID().toString();
    }

    public void updateData(Comment updateComment) {
        this.content = updateComment.getContent();
        this.modDate = updateComment.getModDate();
    }
}
