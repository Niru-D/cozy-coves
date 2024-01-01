package com.cozycovesnyx.cozycoves.Controller;

import com.cozycovesnyx.cozycoves.Model.House;
import com.cozycovesnyx.cozycoves.Model.Request;
import com.cozycovesnyx.cozycoves.Repository.HouseRepository;
import com.cozycovesnyx.cozycoves.Repository.UserRepository;
import com.cozycovesnyx.cozycoves.Service.HouseService;
import com.cozycovesnyx.cozycoves.Service.RequestService;
import com.cozycovesnyx.cozycoves.Model.User;
import com.cozycovesnyx.cozycoves.Service.UserService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private HouseService houseService;

    @Autowired
    private UserService userService;

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createRequest(@RequestBody Map<String, String> payload) {
        String houseNo = payload.get("houseNo");
        String requestedRenterUsername = payload.get("requestedRenter");

        House house = houseService.findHouseByHouseNo(houseNo);
        if (house == null) {
            return ResponseEntity.notFound().build();
        }

        // Fetch User object using requestedRenterUsername
        User requestedRenter = userService.findByUsername(requestedRenterUsername);
        if (requestedRenter == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            ResponseEntity<?> response = requestService.createRequest(house, requestedRenter);
            return response;
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchRequests(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String houseNo
    ) {
        Optional<List<Request>> filteredRequests = requestService.searchRequests(username, houseNo);

        return ResponseEntity.ok(filteredRequests);
    }

    @DeleteMapping("/delete/{requestNo}")
    public ResponseEntity<?> deleteRequest(@PathVariable String requestNo) {
        boolean deleted = requestService.deleteRequest(requestNo);
        return deleted
                ? new ResponseEntity<>("Request with requestNo: " + requestNo + " deleted", HttpStatus.OK)
                : new ResponseEntity<>("Request with requestNo: " + requestNo + " not found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/{requestNo}")
    public ResponseEntity<?> updateRequest(@PathVariable String requestNo, @RequestParam(required = true) String status) {
        boolean updated = requestService.updateRequest(requestNo, status);
        return updated
                ? new ResponseEntity<>("Request with requestNo: " + requestNo + " updated", HttpStatus.OK)
                : new ResponseEntity<>("Request with requestNo: " + requestNo + " not found", HttpStatus.NOT_FOUND);
    }



}
