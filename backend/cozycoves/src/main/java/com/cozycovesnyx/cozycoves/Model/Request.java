package com.cozycovesnyx.cozycoves.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "requests")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Request {

    @Id
    private ObjectId id;

    private String requestNo;

//    private String houseId;
//    private String requestedRenterId;

//    @JsonIgnore
    @DBRef
    private House house;

//    @JsonIgnore
    @DBRef
    private User requestedRenter;

    private String status;

    public Request(String requestNo, House house, User requestedRenter, String status) {
        this.requestNo = requestNo;
        this.house = house;
        this.requestedRenter = requestedRenter;
//        this.houseId = houseId;
//        this.requestedRenterId = requestedRenterId;
        this.status = status;
    }

//    public Request(String string, ObjectId id, ObjectId id1, String pending) {
//    }

    public void setStatus(String status) {
        this.status = status;
    }

    public House getHouse() {
        return house;
    }

    public User getRequestedRenter() {
        return requestedRenter;
    }
}
