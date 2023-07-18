package com.example.demo.Service;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor

public class UserService {
    private UserRepository userRepository;

    public ResponseEntity<?> readUser(Long id){
        Optional<User> findUser= userRepository.findById(id);
        return ResponseEntity.ok(findUser.get());

    }
    public ResponseEntity<?> readUsers(){
       List<User> userList = userRepository.findAll();
        return ResponseEntity.ok(userList);
    }
    public ResponseEntity<?> createUser(User user){
        User savedUser=userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    public ResponseEntity<?> updateUser(User user, Long id){
        User findUser= userRepository.findById(id).get();
        user.setID(id);
        User savedUser=userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
    public ResponseEntity<?> deleteUser(Long id){
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();

    }
}
