package com.cozycovesnyx.cozycoves.Controller;

import com.cozycovesnyx.cozycoves.Model.House;
import com.cozycovesnyx.cozycoves.Model.User;
import com.cozycovesnyx.cozycoves.Service.HouseService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/houses")
public class HouseController {

    @Autowired
    private HouseService houseService;

    @GetMapping
    public ResponseEntity<Optional<List<House>>> getAllHouses() {
        Optional<List<House>> houses = houseService.allHouses();
        if (houses != null && !houses.isEmpty()) {
            return new ResponseEntity<>(houses, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchHouses(
            @RequestParam(required = false) String houseNo,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Long maxPrice,
            @RequestParam(required = false) Integer rooms,
            @RequestParam(required = false) Integer bathrooms,
            @RequestParam(required = false) String ownerUsername,
            @RequestParam(required = false) String renterUsername
    ) {
        Optional<List<House>> filteredHouses = houseService.searchHouses(houseNo, state, location, maxPrice, rooms, bathrooms, ownerUsername, renterUsername);

        return ResponseEntity.ok(filteredHouses);
    }


    @PostMapping("/create")
    public ResponseEntity<House> createHouse(@RequestBody House house) {
        House createdHouse = houseService.createHouse(house);
        if (createdHouse != null) {
            return new ResponseEntity<>(createdHouse, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

//    @PostMapping("/create")
//    public ResponseEntity<HouseDTO> createHouse(@RequestBody House house) {
//        House createdHouse = houseService.createHouse(house);
//        if (createdHouse != null) {
//            HouseDTO houseDTO = houseService.convertToDTO(createdHouse);
//            return new ResponseEntity<>(houseDTO, HttpStatus.CREATED);
//        } else {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }

    @DeleteMapping("/delete/{houseNo}")
    public ResponseEntity<?> deleteHouse(@PathVariable String houseNo) {
        boolean deleted = houseService.deleteHouse(houseNo);
        return deleted
                ? new ResponseEntity<>("House with houseNo: " + houseNo + " deleted", HttpStatus.OK)
                : new ResponseEntity<>("House with houseNo: " + houseNo + " not found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/{houseNo}")
    public ResponseEntity<?> updateHouse(@PathVariable String houseNo, @RequestBody House updatedHouse) {
        boolean updated = houseService.updateHouse(houseNo, updatedHouse);
        return updated
                ? new ResponseEntity<>("House with houseNo: " + houseNo + " updated", HttpStatus.OK)
                : new ResponseEntity<>("House with houseNo: " + houseNo + " not found", HttpStatus.NOT_FOUND);
    }




}
