package com.messageapi.entities;



public class User {

    private long id;

    private String name;

    private String surnames;

    private String mail;




    public User(){}

    public User(long id, String name, String surnames, String mail) {
        this.id = id;
        this.name = name;
        this.surnames = surnames;
        this.mail = mail;
    }


    public User(String name, String surnames, String mail) {
        this.name = name;
        this.surnames = surnames;
        this.mail = mail;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurnames() {
        return surnames;
    }

    public void setSurnames(String surnames) {
        this.surnames = surnames;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surnames='" + surnames + '\'' +
                ", mail='" + mail + '\'' +
                '}';
    }
}
