package com.cozycovesnyx.cozycoves.Service;

import com.cozycovesnyx.cozycoves.Model.House;
import com.cozycovesnyx.cozycoves.Model.Request;
import com.cozycovesnyx.cozycoves.Model.User;
import com.cozycovesnyx.cozycoves.Repository.HouseRepository;
import com.cozycovesnyx.cozycoves.Repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public ResponseEntity<?> createRequest(House house, User requestedRenter) {

        // Check if the house is available
        if (!house.getState().equals("AVAILABLE")) {
            return new ResponseEntity<>("The house is not available.", HttpStatus.BAD_REQUEST);
        }

        Request request = requestRepository.insert(new Request(UUID.randomUUID().toString(),house, requestedRenter, "PENDING"));

        String houseNo = house.getIdAsString();

        mongoTemplate.update(House.class)
                .matching(Criteria.where("houseNo").is(houseNo))
                .apply(new Update().push("requests").value(request))
                .first();

        return new ResponseEntity<>(request, HttpStatus.OK);
    }

    public Optional<List<Request>> findRequestsByRenterUsername(String username) {
        Query userQuery = new Query(Criteria.where("username").is(username));
        User user = mongoTemplate.findOne(userQuery, User.class);

        if (user != null) {
            Query requestQuery = new Query(Criteria.where("requestedRenter").is(user.getId()));
            List<Request> requests = mongoTemplate.find(requestQuery, Request.class);
            return Optional.ofNullable(requests.isEmpty() ? null : requests);
        }

        return Optional.empty();
    }

    public Optional<List<Request>> findRequestsByHouseNo(String houseNo) {
        Query houseQuery = new Query(Criteria.where("houseNo").is(houseNo));
        House house = mongoTemplate.findOne(houseQuery, House.class);

        if (house != null) {
            Query requestQuery = new Query(Criteria.where("house").is(house.getId()));
            List<Request> requests = mongoTemplate.find(requestQuery, Request.class);
            return Optional.ofNullable(requests.isEmpty() ? null : requests);
        }

        return Optional.empty();
    }

    public boolean deleteRequest(String requestNo) {
        Optional<Request> existingRequest = requestRepository.findARequestByRequestNo(requestNo);
        if (existingRequest.isPresent()) {
            requestRepository.delete(existingRequest.get());
            return true;
        }
        return false;
    }

    public boolean updateRequest(String requestNo, String status) {
        Optional<Request> existingRequest = requestRepository.findARequestByRequestNo(requestNo);
        if (existingRequest.isPresent()) {
            Request currentRequest = existingRequest.get();

            currentRequest.setStatus(status);
            requestRepository.save(currentRequest);

            if(Objects.equals(status, "ACCEPTED")){

                House house = currentRequest.getHouse();

                if (house != null) {
                    User requestedRenter = currentRequest.getRequestedRenter();
                    house.setRenter(requestedRenter);
                    house.setState("RENTED");
                    houseRepository.save(house);

                    List<Request> otherRequestsForHouse = requestRepository.findRequestsByHouseAndStatusNot(house, "ACCEPTED");

                    for (Request request : otherRequestsForHouse) {
                        request.setStatus("REJECTED");
                        requestRepository.save(request);
                    }

                    return true;
                }
                return false;
            }
            return true;
        }
        return false;
    }

}
