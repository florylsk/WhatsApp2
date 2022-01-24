package com.userapi.controllers;


import com.userapi.entities.User;
import com.userapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        Optional<List<User>> usersData = Optional.of(userRepository.findAll());
        if (usersData.isPresent()){
            return new ResponseEntity<>(usersData.get(), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
        }

    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user){
        try{
            userRepository.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/users/by-id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id){
        Optional<User> userData = userRepository.findById(id);
        if (userData.isPresent()){
            return new ResponseEntity<>(userData.get(),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("users/by-mail/{mail}")
    public ResponseEntity<User> getuserByMail(@PathVariable("mail") String mail){
        Optional<User> userData = Optional.ofNullable(userRepository.findUserByMail(mail));
        if(userData.isPresent()){
            return new ResponseEntity<>(userData.get(),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/users/by-id/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable("id") long id, @RequestBody User newUser){
        Optional<User> userData = userRepository.findById(id);
        if(userData.isPresent()){
            User oldUser = userData.get();
            oldUser.setMail(newUser.getMail());
            oldUser.setName(newUser.getName());
            oldUser.setSurnames(newUser.getSurnames());
            oldUser.setPassword(newUser.getPassword());
            return new ResponseEntity<>(oldUser,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/users/by-id/{id}")
    public ResponseEntity<User> deleteUserById(@PathVariable("id") long id){
        Optional<User> userData = userRepository.findById(id);
        if(userData.isPresent()){
            try{
                userRepository.deleteById(id);
                return new ResponseEntity<>(null,HttpStatus.OK);
            }
            catch(Exception e){
                System.out.println(e);
                return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<User> checkLogin(@RequestBody User tryUser){
        Optional<User> correctUser = Optional.ofNullable(userRepository.findUserByMail(tryUser.getMail()));
        if (correctUser.isPresent()){
            if (correctUser.get().getPassword().equals(tryUser.getPassword())){
                return new ResponseEntity<>(correctUser.get(),HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
    }

}
