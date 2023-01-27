package io.nextree.board.command;

import io.nextree.Util.IdName;
import io.nextree.board.aggregate.vo.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardCreate {
    //
    transient private String id; // front에서 BoardCreate객체를 넘겨줄때 id는 비워져서 올거라는 알림
    private String title;
    private IdName user;
    private String content;
}
