package com.userapi.entities;



import javax.persistence.*;
import java.sql.Blob;

@Entity(name="user")
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String surnames;

    @Column(nullable = false, unique = true)
    private String mail;

    @Column(nullable = false)
    private String password;

    @Lob
    @Column
    private String pfp;


    public User(){}

    public User(String name, String surnames, String mail, String password) {
        this.name = name;
        this.surnames = surnames;
        this.mail = mail;
        this.password = password;
    }

    public User(String name, String surnames, String mail, String password, String pfp) {
        this.name = name;
        this.surnames = surnames;
        this.mail = mail;
        this.password = password;
        this.pfp=pfp;
    }

    public User(String mail, String password){
        this.mail=mail;
        this.password=password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPfp(String pfp){
        this.pfp = pfp;
    }
    public String getPfp(){
        return this.pfp;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surnames='" + surnames + '\'' +
                ", mail='" + mail + '\'' +
                ", password='" + password + '\'' +
                ", pfp='" + pfp + '\'' +
                '}';
    }
}
