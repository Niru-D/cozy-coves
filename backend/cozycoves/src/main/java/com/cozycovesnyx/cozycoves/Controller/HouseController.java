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

@RestController
@RequestMapping("/houses")
public class HouseController {

    @Autowired
    private HouseService houseService;

    @GetMapping
    public ResponseEntity<List<House>> getAllHouses() {
        List<House> houses = houseService.allHouses();
        if (houses != null && !houses.isEmpty()) {
            return new ResponseEntity<>(houses, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{house_no}")
    public ResponseEntity<?> getAHouse(@PathVariable String house_no) {
        Optional<House> house = houseService.singleHouse(house_no);
        return house.map(ResponseEntity::ok).orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping("/byState/{state}")
    public ResponseEntity<?> getHousesByState(@PathVariable String state) {
        Optional<List<House>> houses = houseService.housesByState(state);
        return houses.map(list -> list.isEmpty() ? ResponseEntity.badRequest().build() : ResponseEntity.ok(list))
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping("/byOwner/{username}")
    public ResponseEntity<?> getHousesByOwner(@PathVariable String username) {
        Optional<List<House>> houses = houseService.findHousesByOwnerUsername(username);
        return houses.map(list -> list.isEmpty() ? ResponseEntity.badRequest().build() : ResponseEntity.ok(list))
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping("/byRenter/{username}")
    public ResponseEntity<?> getHousesByRenter(@PathVariable String username) {
        Optional<List<House>> houses = houseService.findHousesByRenterUsername(username);
        return houses.map(list -> list.isEmpty() ? ResponseEntity.badRequest().build() : ResponseEntity.ok(list))
                .orElse(ResponseEntity.badRequest().build());
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchHouses(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Long maxPrice,
            @RequestParam(required = false) Integer rooms,
            @RequestParam(required = false) Integer bathrooms
    ) {
        Optional<List<House>> filteredHouses = houseService.searchHouses(location, maxPrice, rooms, bathrooms);

        return ResponseEntity.ok(filteredHouses);
    }
//    curl -X GET 'http://your-api-url/search?maxPrice=5000&rooms=2&bathrooms=1'


    @PostMapping("/create")
    public ResponseEntity<House> createHouse(@RequestBody House house) {
        House createdHouse = houseService.createHouse(house);
        if (createdHouse != null) {
            return new ResponseEntity<>(createdHouse, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

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
