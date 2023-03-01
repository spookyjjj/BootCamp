package io.nextree.board.store.document;

import io.nextree.board.aggregate.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<CommentDoc, String> {
    //
    List<Comment> findByUpperBoardId(String upperBoardId);
}
