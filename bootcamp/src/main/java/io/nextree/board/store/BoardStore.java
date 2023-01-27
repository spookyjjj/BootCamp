package io.nextree.board.store;

import io.nextree.board.aggregate.Board;
import io.nextree.board.store.document.BoardDoc;
import io.nextree.board.store.document.BoardRepository;
import org.springframework.stereotype.Repository;

import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class BoardStore {
    //
    private final BoardRepository boardRepository;

    public BoardStore(BoardRepository boardRepository) {
        //
        this.boardRepository = boardRepository;
    }

    public void create(Board board) {
        //
        this.boardRepository.save(new BoardDoc(board)); //save라도, id가 db에 없으면 create
    }

    public Board query(String id) {
        //
        Optional<BoardDoc> doc = this.boardRepository.findById(id);
        if (doc.isEmpty()) {
            throw new NoSuchElementException(); // runtime error, 500 error, server error
        }
        return doc.get().toBoard();
    }

    public List<Board> queryAll() {
        //
        List<BoardDoc> docs = this.boardRepository.findAll();
//        return docs.stream().map(doc -> doc.toBoard()).collect(Collectors.toList());
//        findAllOrderByRegDateDesc 하려 하니, regDate가 long type이라 불가능 -> store에서 수정해주기
        return docs.stream().map(BoardDoc::toBoard).sorted(Comparator.comparing(Board::getRegDate).reversed()).collect(Collectors.toList());
    }

    public void update(Board board) {
        //
        this.boardRepository.save(new BoardDoc(board)); //save라도, id가 db에 있으면 update
    }

    public void delete(String id) {
        this.boardRepository.deleteById(id);
    }

}
