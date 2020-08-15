package com.umk.tz.bookstore.resource.impl;

import com.umk.tz.bookstore.domain.Book;
import com.umk.tz.bookstore.resource.Resource;
import com.umk.tz.bookstore.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins="http://localhost:3000")
public class BookResourceImpl implements Resource<Book> {

    @Autowired
    private IService<Book> bookService;

    @Override
    public ResponseEntity<Collection<Book>> findAll(String searchText){
        return new ResponseEntity<>(bookService.findAll(searchText), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Collection<Book>> findAll() {
        return new ResponseEntity<>(bookService.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Book> findById(Long id) {
        Optional<Book> book = bookService.findById(id);
        return new ResponseEntity<>(book.get(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Book> save(Book book) {
        return new ResponseEntity<>(bookService.saveOrUpdate(book), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Book> update(Book book) {
        return new ResponseEntity<>(bookService.saveOrUpdate(book), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        return new ResponseEntity<>(bookService.deleteById(id), HttpStatus.OK);
    }
}