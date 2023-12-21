package com.cozycovesnyx.cozycoves.Controller;

import com.cozycovesnyx.cozycoves.Model.User;
import com.cozycovesnyx.cozycoves.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getAUser(@PathVariable String username) {
        Optional<User> user = userService.singleUser(username);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.badRequest().build());
    }

}

