package br.edu.ufop.web.sales.business.services.clients;

import br.edu.ufop.web.sales.business.services.clients.dto.UserServiceDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name="users-service", url = "http://localhost:3000")
public interface UserServiceClient {
    @GetMapping("/users")
    public List<UserServiceDTO> getAllUsers();
}