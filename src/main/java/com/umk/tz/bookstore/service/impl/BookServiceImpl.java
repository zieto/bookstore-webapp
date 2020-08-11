package com.umk.tz.bookstore.service.impl;

import com.umk.tz.bookstore.domain.Book;
import com.umk.tz.bookstore.repository.BookRepository;
import com.umk.tz.bookstore.service.IService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;


@Service
public class BookServiceImpl implements IService<Book> {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Collection<Book> findAll(String searchText){
        return bookRepository.findAll(searchText);
    }

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
