package io.nextree.board.store.document;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BoardRepository extends MongoRepository<BoardDoc, String> {
    //
}
