package com.cozycovesnyx.cozycoves.Repository;

import com.cozycovesnyx.cozycoves.Model.House;
import com.cozycovesnyx.cozycoves.Model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HouseRepository extends MongoRepository<House, ObjectId> {

    Optional<List<House>> findHousesByState(String state);
    Optional<House> findAHouseByHouseNo(String houseNo);

    Optional<House> findById(String houseId);
}
