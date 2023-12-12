package com.cozycovesnyx.cozycoves.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "houses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class House {

    @Id
    private ObjectId id;

    private String houseNo;

    private Long price;

    private String state;

    private int no_of_rooms;

    private int no_of_bathrooms;

    private List<String> address;

    @DBRef
    private User owner;

    @DBRef
    private User renter;


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

    public String getIdAsString() {
        return houseNo;
    }

    public String getState() {
        return state;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
    }
}
