package com.umk.tz.bookstore.service.impl;

import com.umk.tz.bookstore.domain.Book;
import com.umk.tz.bookstore.service.BookService;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Service
public class BookServiceImpl implements BookService {

    private Long bookId = 100L;
    private Map<Long, Book> bookMap = new HashMap<Long, Book>();

    {
        Book book = new Book();
        book.setId(bookId);
        book.setTitle("Test");
        book.setAuthor("Test testowy");
        book.setCoverPhotoURL("https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Book_stub_img.svg/300px-Book_stub_img.svg.png");
        book.setIsbnNumber(0744600634L);
        book.setPrice(276.00);
        book.setLanguage("polski");
        bookMap.put(book.getId(), book);
    }

    @Override
    public Collection<Book> findAll(){
        return bookMap.values();
    }

    @Override
    public Book findById(Long id){
        return bookMap.get(id);
    }

    @Override
    public Book save(Book book){
        Long newBookId = ++bookId;
        book.setId(newBookId);
        bookMap.put(book.getId(), book);
        return bookMap.get(newBookId);
    }

    @Override
    public Book update(Book book){
        bookId = book.getId();
        if (bookMap.get(bookId) != null){
            bookMap.put(bookId, book);
            return bookMap.get(bookId);
        }
        return null;
    }

    @Override
    public Book deleteById(Long id){
        if (bookMap.get(id) != null){
            return bookMap.remove(id);
        }
        return null;
    }

}
