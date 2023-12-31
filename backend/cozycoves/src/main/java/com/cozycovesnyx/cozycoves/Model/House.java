package com.cozycovesnyx.cozycoves.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "houses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class House {

    @Id
    private ObjectId id;

    private String houseNo;

    private String description;

    private Long price;

    private String state;

    private int no_of_rooms;

    private int no_of_bathrooms;

    private List<String> address;

//    @JsonIgnore
    @DBRef
    private User owner;

    @JsonIgnore
    @DBRef
    private User renter;

//    @JsonIgnore
    @DBRef
    private List<Request> requests;


    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getPrice() {
        return price;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setNo_of_rooms(int no_of_rooms) {
        this.no_of_rooms = no_of_rooms;
    }

    public int getNo_of_rooms() {
        return no_of_rooms;
    }

    public void setNo_of_bathrooms(int no_of_bathrooms) {
        this.no_of_bathrooms = no_of_bathrooms;
    }

    public int getNo_of_bathrooms() {
        return no_of_bathrooms;
    }

    public void setAddress(List<String> address) {
        this.address = address;
    }

    public List<String> getAddress() {
        return address;
    }

    public ObjectId getIdAsString() {
        return id;
    }


    public String getState() {
        return state;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
    }

    public ObjectId getId() {
        return id;
    }

    public void setRenter(User renter) {
        this.renter = renter;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHouseNo() {
        return houseNo;
    }

    public User getOwner() {
        return owner;
    }
}
