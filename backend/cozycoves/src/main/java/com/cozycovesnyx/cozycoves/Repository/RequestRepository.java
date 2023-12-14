package com.cozycovesnyx.cozycoves.Repository;

import com.cozycovesnyx.cozycoves.Model.House;
import com.cozycovesnyx.cozycoves.Model.Request;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestRepository extends MongoRepository<Request, ObjectId> {
    Optional<Request> findARequestByRequestNo(String requestNo);

    List<Request> findRequestsByHouseAndStatusNot(House house, String accepted);
}
