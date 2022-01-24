package com.messageapi.controllers;


import com.messageapi.entities.Message;
import com.messageapi.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1")
public class MessageController {

    @Autowired
    private MessageRepository messagerepository;


    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getAllMessages(){
        List<Message> messages= messagerepository.findAll();
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @PostMapping("/messages")
    public ResponseEntity<Message> createNewMessage(@RequestBody Message message){
        try{
            messagerepository.save(message);
            return new ResponseEntity<>(message,HttpStatus.OK);
        }
        catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/messages/receiver/{mail}")
    public ResponseEntity<List<Message>> getAllMessagesReceived(@PathVariable("mail") String mail){
        List<Message> messageList= messagerepository.findMessagesByReceiverMail(mail);
        return new ResponseEntity<>(messageList,HttpStatus.OK);
    }

    @GetMapping("/messages/sender/{mail}")
    public ResponseEntity<List<Message>> getAllMessagesSent(@PathVariable("mail") String mail){
        List<Message> messageList= messagerepository.findMessagesBySenderMail(mail);
        return new ResponseEntity<>(messageList,HttpStatus.OK);
    }

    @GetMapping("/messages/by/{sender}/to/{receiver}")
    public ResponseEntity<List<Message>> getMessagesSentToUser(@PathVariable("sender") String sender, @PathVariable("receiver") String receiver){
        List<Message> messageList=messagerepository.findMessagesBySenderToReceiver(sender,receiver);
        return new ResponseEntity<>(messageList,HttpStatus.OK);
    }



}
