package io.nextree.board.store.document;

import io.nextree.Util.IdName;
import io.nextree.board.aggregate.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("COMMENT")
public class CommentDoc {
    //
    @Id
    private String commentId;
    private IdName user;
    private long regDate;
    private long modDate;
    private String content;
    private String upperBoardId;
    private String upperCommentId;

    public CommentDoc(Comment comment) {
        this.commentId = comment.getCommentId();
        this.user = comment.getUser();
        this.regDate = comment.getRegDate();
        this.modDate = comment.getModDate();
        this.content = comment.getContent();
        this.upperBoardId = comment.getUpperBoardId();
        this.upperCommentId = comment.getUpperCommentId();
    }

    public Comment toComment() {
        return new Comment(
                this.commentId,
                this.user,
                this.regDate,
                this.modDate,
                this.content,
                this.upperBoardId,
                this.upperCommentId
        );
    }
}
