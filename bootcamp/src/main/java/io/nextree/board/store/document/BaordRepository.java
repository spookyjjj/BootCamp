package io.nextree.board.store.document;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BaordRepository extends MongoRepository<BoardDoc, String> {
    //
}
