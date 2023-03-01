package io.nextree.board.store;

import io.nextree.board.aggregate.Board;
import io.nextree.board.aggregate.Comment;
import io.nextree.board.store.document.BoardDoc;
import io.nextree.board.store.document.CommentDoc;
import io.nextree.board.store.document.CommentRepository;
import org.springframework.stereotype.Repository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class CommentStore {
    //
    private final CommentRepository commentRepository;

    public CommentStore(CommentRepository commentRepository) {
        //
        this.commentRepository = commentRepository;
    }

    public void create(Comment comment) {
        //
        this.commentRepository.save(new CommentDoc(comment)); //save라도, id가 db에 없으면 create
    }

    public List<Comment> queryAll() {
        //
        List<CommentDoc> docs = this.commentRepository.findAll();
//        return docs.stream().map(doc -> doc.toBoard()).collect(Collectors.toList());
//        findAllOrderByRegDateDesc 하려 하니, regDate가 long type이라 불가능 -> store에서 수정해주기
        return docs.stream().map(CommentDoc::toComment).sorted(Comparator.comparing(Comment::getRegDate).reversed()).collect(Collectors.toList());
    }

    public void update(Comment comment) {
        //
        this.commentRepository.save(new CommentDoc(comment)); //save라도, id가 db에 있으면 update
    }

    public void delete(String id) {
        //
        this.commentRepository.deleteById(id);
    }

    public List<Comment> findByUpperBoardId(String upperBoardId) {
        //
        return this.commentRepository.findByUpperBoardId(upperBoardId);
    }

}
