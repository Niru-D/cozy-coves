package com.cozycovesnyx.cozycoves.Controller;

import com.cozycovesnyx.cozycoves.Model.House;
import com.cozycovesnyx.cozycoves.Model.Request;
import com.cozycovesnyx.cozycoves.Service.RequestService;
import com.cozycovesnyx.cozycoves.Model.User;
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

    @PostMapping("/create")
    public ResponseEntity<?> createRequest(@RequestBody Map<String, Object> payload) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        House house = objectMapper.convertValue(payload.get("house"), House.class);
        User requestedRenter = objectMapper.convertValue(payload.get("requestedRenter"), User.class);

        ResponseEntity<?> response = requestService.createRequest(house, requestedRenter);

        return response;
    }

//    @PostMapping("/create")
//    public ResponseEntity<?> createRequest(
//            @RequestParam(required = false) String houseNo,
//            @RequestParam(required = false) String username
//    ) throws Exception {
//        ObjectMapper objectMapper = new ObjectMapper();
//        House house = objectMapper.convertValue(payload.get("house"), House.class);
//        User requestedRenter = objectMapper.convertValue(payload.get("requestedRenter"), User.class);
//
//        ResponseEntity<?> response = requestService.createRequest(house, requestedRenter);
//
//        return response;
//    }

    @GetMapping("/byRenter/{username}")
    public ResponseEntity<?> getRequestsByRenter(@PathVariable String username) {
        Optional<List<Request>> requests = requestService.findRequestsByRenterUsername(username);
        return requests.map(list -> list.isEmpty() ? ResponseEntity.badRequest().build() : ResponseEntity.ok(list))
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping("/byHouse/{houseNo}")
    public ResponseEntity<?> getRequestsByHouse(@PathVariable String houseNo) {
        Optional<List<Request>> requests = requestService.findRequestsByHouseNo(houseNo);
        return requests.map(list -> list.isEmpty() ? ResponseEntity.badRequest().build() : ResponseEntity.ok(list))
                .orElse(ResponseEntity.badRequest().build());
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
