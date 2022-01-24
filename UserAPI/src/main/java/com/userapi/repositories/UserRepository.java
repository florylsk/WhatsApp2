package com.userapi.repositories;


import com.userapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User,Long> {

    @Query("SELECT u from user u WHERE u.mail =:mail")
    public User findUserByMail(@Param("mail") String mail);
}
