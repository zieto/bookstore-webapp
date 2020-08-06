package com.umk.tz.bookstore.service;

import com.umk.tz.bookstore.domain.Book;

import java.util.Collection;

public interface IService<T> {
    Collection<T> findAll();

    T findById(Long id);

    T saveOrUpdate(T t);

    String deleteById(Long id);
}
