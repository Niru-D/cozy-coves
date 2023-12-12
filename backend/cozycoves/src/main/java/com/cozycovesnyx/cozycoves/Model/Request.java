package com.cozycovesnyx.cozycoves.Model;

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

    @DBRef
    private House house;

    @DBRef
    private User requestedRenter;

    private String status;

    public Request(House house, User requestedRenter, String status) {
        this.house = house;
        this.requestedRenter = requestedRenter;
        this.status = status;
    }
}
