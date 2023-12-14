package com.cozycovesnyx.cozycoves.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Request {

    @Id
    private ObjectId id;

    private String requestNo;

    @JsonIgnore
    @DBRef
    private House house;

    @JsonIgnore
    @DBRef
    private User requestedRenter;

    private String status;

    public Request(String requestNo, House house, User requestedRenter, String status) {
        this.requestNo = requestNo;
        this.house = house;
        this.requestedRenter = requestedRenter;
        this.status = status;
    }

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
