package io.nextree.board.aggregate.sdo;

import io.nextree.board.aggregate.Board;
import io.nextree.board.aggregate.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DetailPageRdo {
    //
    private Board board;
    private List<Comment> comments;

}
