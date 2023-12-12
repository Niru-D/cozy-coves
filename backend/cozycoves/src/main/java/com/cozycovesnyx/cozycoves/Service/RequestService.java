package com.cozycovesnyx.cozycoves.Service;

import com.cozycovesnyx.cozycoves.Model.House;
import com.cozycovesnyx.cozycoves.Model.Request;
import com.cozycovesnyx.cozycoves.Model.User;
import com.cozycovesnyx.cozycoves.Repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public ResponseEntity<?> createRequest(House house, User requestedRenter) {

        // Check if the house is available
        if (!house.getState().equals("AVAILABLE")) {
            return new ResponseEntity<>("The house is not available.", HttpStatus.BAD_REQUEST);
        }

        Request request = requestRepository.insert(new Request(house, requestedRenter, "PENDING"));

        String houseNo = house.getIdAsString();

        mongoTemplate.update(House.class)
                .matching(Criteria.where("houseNo").is(houseNo))
                .apply(new Update().push("requests").value(request))
                .first();

        return new ResponseEntity<>(request, HttpStatus.OK);
    }


}
