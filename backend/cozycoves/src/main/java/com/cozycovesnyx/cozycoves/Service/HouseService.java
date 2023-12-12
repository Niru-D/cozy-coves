package com.cozycovesnyx.cozycoves.Service;

import com.cozycovesnyx.cozycoves.Model.House;
import com.cozycovesnyx.cozycoves.Model.User;
import com.cozycovesnyx.cozycoves.Repository.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HouseService {

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<House> allHouses(){
        return houseRepository.findAll();
    }

    public Optional<House> singleHouse(String house_no){
        return houseRepository.findAHouseByHouseNo(house_no);
    }

    public Optional<List<House>> housesByState(String state){
        return houseRepository.findHousesByState(state);
    }

    public Optional<List<House>> findHousesByOwnerUsername(String username) {
        Query userQuery = new Query(Criteria.where("username").is(username));
        User user = mongoTemplate.findOne(userQuery, User.class);

        if (user != null) {
            Query houseQuery = new Query(Criteria.where("owner").is(user.getId()));
            List<House> houses = mongoTemplate.find(houseQuery, House.class);
            return Optional.ofNullable(houses.isEmpty() ? null : houses);
        }

        return Optional.empty();
    }


    public House createHouse(House house) {
        house.setHouseNo(UUID.randomUUID().toString());
        return houseRepository.save(house);
    }

    public Optional<House> updateHouse(String houseNo, House updatedHouse) {
        Optional<House> existingHouse = houseRepository.findAHouseByHouseNo(houseNo);
        if (existingHouse.isPresent()) {
            House currentHouse = existingHouse.get();

            currentHouse.setPrice(updatedHouse.getPrice());
            currentHouse.setState(updatedHouse.getState());
            currentHouse.setNo_of_rooms(updatedHouse.getNo_of_rooms());
            currentHouse.setNo_of_bathrooms(updatedHouse.getNo_of_bathrooms());
            currentHouse.setAddress(updatedHouse.getAddress());

            return Optional.of(houseRepository.save(currentHouse));
        }
        return Optional.empty();
    }

    public boolean deleteHouse(String houseNo) {
        Optional<House> existingHouse = houseRepository.findAHouseByHouseNo(houseNo);
        if (existingHouse.isPresent()) {
            houseRepository.delete(existingHouse.get());
            return true;
        }
        return false;
    }


}
