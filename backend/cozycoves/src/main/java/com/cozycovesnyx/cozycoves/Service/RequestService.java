package com.cozycovesnyx.cozycoves.Service;

import com.cozycovesnyx.cozycoves.Model.House;
import com.cozycovesnyx.cozycoves.Model.Request;
import com.cozycovesnyx.cozycoves.Model.User;
import com.cozycovesnyx.cozycoves.Repository.HouseRepository;
import com.cozycovesnyx.cozycoves.Repository.RequestRepository;
import com.cozycovesnyx.cozycoves.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public ResponseEntity<?> createRequest(House house, User requestedRenter) {
        // Check if the house is available
        if (!house.getState().equals("AVAILABLE")) {
            return new ResponseEntity<>("The house is not available.", HttpStatus.BAD_REQUEST);
        }

        // Create the Request with the fetched House and User objects
        Request request = requestRepository.insert(new Request(UUID.randomUUID().toString(), house, requestedRenter, "PENDING"));

        // Update the house's requests
        mongoTemplate.update(House.class)
                .matching(Criteria.where("houseNo").is(house.getHouseNo()))
                .apply(new Update().push("requests").value(request))
                .first();

        return new ResponseEntity<>(request, HttpStatus.OK);
    }





//    public Optional<List<Request>> findRequestsByRenterUsername(String username) {
//        Query userQuery = new Query(Criteria.where("username").is(username));
//        User user = mongoTemplate.findOne(userQuery, User.class);
//
//        if (user != null) {
//            Query requestQuery = new Query(Criteria.where("requestedRenter").is(user.getId()));
//            List<Request> requests = mongoTemplate.find(requestQuery, Request.class);
//            return Optional.ofNullable(requests.isEmpty() ? null : requests);
//        }
//
//        return Optional.empty();
//    }
//
//    public Optional<List<Request>> findRequestsByHouseNo(String houseNo) {
//        Query houseQuery = new Query(Criteria.where("houseNo").is(houseNo));
//        House house = mongoTemplate.findOne(houseQuery, House.class);
//
//        if (house != null) {
//            Query requestQuery = new Query(Criteria.where("house").is(house.getId()));
//            List<Request> requests = mongoTemplate.find(requestQuery, Request.class);
//            return Optional.ofNullable(requests.isEmpty() ? null : requests);
//        }
//
//        return Optional.empty();
//    }

//    public Optional<List<Request>> searchRequests(String username, String houseNo){
//        List<Request> requests = new ArrayList<>();
//
//        // Search by username
//        Query userQuery = new Query(Criteria.where("username").is(username));
//        User user = mongoTemplate.findOne(userQuery, User.class);
//        if (user != null) {
//            Query requestQuery = new Query(Criteria.where("requestedRenter").is(user.getId()));
//            List<Request> userRequests = mongoTemplate.find(requestQuery, Request.class);
//            if (userRequests != null && !userRequests.isEmpty()) {
//                requests.addAll(userRequests);
//            }
//        }
//
//        // Search by houseNo
//        Query houseQuery = new Query(Criteria.where("houseNo").is(houseNo));
//        House house = mongoTemplate.findOne(houseQuery, House.class);
//        if (house != null) {
//            Query requestQuery = new Query(Criteria.where("house").is(house.getId()));
//            List<Request> houseRequests = mongoTemplate.find(requestQuery, Request.class);
//            if (houseRequests != null && !houseRequests.isEmpty()) {
//                requests.addAll(houseRequests);
//            }
//        }
//
//        return Optional.ofNullable(requests.isEmpty() ? null : requests);
//    }

    public Optional<List<Request>> searchRequests(String username, String houseNo) {
        Query combinedQuery = new Query();

        if (username != null && !username.isEmpty()) {
            User user = mongoTemplate.findOne(new Query(Criteria.where("username").is(username)), User.class);
            if (user != null) {
                combinedQuery.addCriteria(Criteria.where("requestedRenter").is(user.getId()));
            }
        }

        if (houseNo != null && !houseNo.isEmpty()) {
            House house = mongoTemplate.findOne(new Query(Criteria.where("houseNo").is(houseNo)), House.class);
            if (house != null) {
                combinedQuery.addCriteria(Criteria.where("house").is(house.getId()));
            }
        }

        List<Request> requests = mongoTemplate.find(combinedQuery, Request.class);
        return Optional.ofNullable(requests.isEmpty() ? null : requests);
    }


//    public Optional<List<Request>> searchRequests(String username, String houseNo) {
//        List<Request> requests = new ArrayList<>();
//
//        // Search by username
//        if (username != null) {
//            Query userQuery = new Query(Criteria.where("requestedRenter.username").is(username));
//            List<Request> userRequests = mongoTemplate.find(userQuery, Request.class);
//            requests.addAll(userRequests);
//        }
//
//        // Search by houseNo
//        if (houseNo != null) {
//            Query houseQuery = new Query(Criteria.where("house.houseNo").is(houseNo));
//            List<Request> houseRequests = mongoTemplate.find(houseQuery, Request.class);
//            requests.addAll(houseRequests);
//        }
//
//        // Find intersection of requests based on both conditions
//        if (username != null && houseNo != null) {
//            requests.removeIf(request -> {
//                boolean notMatchingUsername = !request.getRequestedRenter().getUsername().equals(username);
//                boolean notMatchingHouseNo = !request.getHouse().getHouseNo().equals(houseNo);
//                return notMatchingUsername || notMatchingHouseNo;
//            });
//        }
//
//        return Optional.ofNullable(requests.isEmpty() ? null : requests);
//    }



//    public boolean deleteRequest(String requestNo) {
//        Optional<Request> existingRequest = requestRepository.findARequestByRequestNo(requestNo);
//        if (existingRequest.isPresent()) {
//            requestRepository.delete(existingRequest.get());
//            return true;
//        }
//        return false;
//    }

    public boolean deleteRequest(String requestNo) {
        Optional<Request> existingRequest = requestRepository.findARequestByRequestNo(requestNo);
        if (existingRequest.isPresent()) {
            // Delete the request from the requests collection
            requestRepository.delete(existingRequest.get());

            // Get the house related to the request
            House house = existingRequest.get().getHouse();

            // Remove the request from the house's requests array
            mongoTemplate.update(House.class)
                    .matching(Criteria.where("houseNo").is(house.getHouseNo()))
                    .apply(new Update().pull("requests", existingRequest.get()))
                    .first();

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
