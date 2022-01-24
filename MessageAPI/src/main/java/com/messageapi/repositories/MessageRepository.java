package com.messageapi.repositories;


import com.messageapi.entities.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message,Long> {

    @Query("{'sender.mail':?0}")
    public List<Message> findMessagesBySenderMail(String mail);

    @Query("{'receiver.mail':?0}")
    public List<Message> findMessagesByReceiverMail(String mail);

    @Query("{'sender.mail':?0,'receiver.mail':?1}")
    public List<Message> findMessagesBySenderToReceiver(String sender,String receiver);

}
