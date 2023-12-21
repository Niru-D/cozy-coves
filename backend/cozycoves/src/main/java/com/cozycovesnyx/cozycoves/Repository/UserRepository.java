package com.cozycovesnyx.cozycoves.Repository;

import com.cozycovesnyx.cozycoves.Model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {

    Optional<User> findAUserByUsername(String username);

    Optional<User> findById(String requestedRenterId);
}


