package com.umk.tz.bookstore.service.impl;

import com.umk.tz.bookstore.domain.Book;
import com.umk.tz.bookstore.repository.BookRepository;
import com.umk.tz.bookstore.service.IService;
import net.minidev.json.JSONObject;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Service
public class BookServiceImpl implements IService<Book> {

    @Autowired
    private BookRepository bookRepository;

//    private Long bookId = 100L;
//    private Map<Long, Book> bookMap = new HashMap<Long, Book>();
//
//    {
//        Book book = new Book();
//        book.setId(bookId);
//        book.setTitle("Test");
//        book.setAuthor("Test testowy");
//        book.setCoverPhotoURL("https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Book_stub_img.svg/300px-Book_stub_img.svg.png");
//        book.setIsbnNumber(0744600634L);
//        book.setPrice(276.00);
//        book.setLanguage("polski");
//        bookMap.put(book.getId(), book);
//    }

    @Override
    public Collection<Book> findAll(){
        return bookRepository.findAll();
    }

    @Override
    public Book findById(Long id){
        return bookRepository.findById(id).get();
    }

    @Override
    public Book saveOrUpdate(Book book){
        return bookRepository.saveAndFlush(book);
    }

    @Override
    public String deleteById(Long id){
        JSONObject jsonObject = new JSONObject();
        bookRepository.deleteById(id);
        jsonObject.put("message","Usunięto książkę");
        return jsonObject.toString();
    }

}
