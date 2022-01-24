package com.messageapi.entities;


import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection="messages")
public class Message {

    private User sender;
    private User receiver;
    private String message;
    private long timeMessage; //UNIX time

    public Message(){}

    public Message(User sender, User receiver, String message, long timeMessage) {
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.timeMessage = timeMessage;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getTimeMessage() {
        return timeMessage;
    }

    public void setTimeMessage(long timeMessage) {
        this.timeMessage = timeMessage;
    }

    @Override
    public String toString() {
        return "Message{" +
                "sender=" + sender +
                ", receiver=" + receiver +
                ", message='" + message + '\'' +
                ", timeMessage=" + timeMessage +
                '}';
    }
}
