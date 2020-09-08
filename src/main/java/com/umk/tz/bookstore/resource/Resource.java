package com.umk.tz.bookstore.resource;

import com.umk.tz.bookstore.domain.Book;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

public interface Resource<T> {

    @GetMapping("/search/{searchText}")
    ResponseEntity<Collection<T>> findAll(@PathVariable String searchText);

    @GetMapping
    ResponseEntity<Collection<T>> findAll();

    @GetMapping("{id}")
    ResponseEntity<T> findById(@PathVariable Long id);

    @PostMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    ResponseEntity<T> save(@RequestBody Book book);

    @PutMapping(consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    ResponseEntity<T> update(@RequestBody Book book);

    @DeleteMapping("{id}")
    ResponseEntity<String> deleteById(@PathVariable Long id);

}

