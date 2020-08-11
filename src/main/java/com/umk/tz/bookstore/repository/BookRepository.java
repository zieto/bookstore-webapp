package com.umk.tz.bookstore.repository;

import com.umk.tz.bookstore.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("From Book b WHERE b.title=:searchText OR b.author=:searchText OR b.language=:searchText OR b.isbnNumber=:searchText ORDER BY b.price")
    Collection<Book> findAll(@Param("searchText") String searchText);
}
