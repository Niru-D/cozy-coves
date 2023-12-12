package com.cozycovesnyx.cozycoves.Repository;

import com.cozycovesnyx.cozycoves.Model.Request;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends MongoRepository<Request, ObjectId> {

}
