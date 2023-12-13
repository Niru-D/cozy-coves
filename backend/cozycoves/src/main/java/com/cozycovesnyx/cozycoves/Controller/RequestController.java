package com.cozycovesnyx.cozycoves.Controller;

import com.cozycovesnyx.cozycoves.Model.House;
import com.cozycovesnyx.cozycoves.Service.RequestService;
import com.cozycovesnyx.cozycoves.Model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

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



}
