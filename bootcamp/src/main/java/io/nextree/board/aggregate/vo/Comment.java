package io.nextree.board.aggregate.vo;

import io.nextree.Util.IdName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
