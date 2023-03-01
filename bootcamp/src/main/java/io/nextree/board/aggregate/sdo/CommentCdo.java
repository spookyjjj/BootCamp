package io.nextree.board.aggregate.sdo;

import io.nextree.Util.IdName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentCdo {
    //
    transient private String id; // front에서 BoardCreate객체를 넘겨줄때 id는 비워져서 올거라는 알림
    private IdName user;
    private String content;
    private String upperBoardId;
    private String upperCommentId;
}
