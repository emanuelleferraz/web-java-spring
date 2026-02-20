package br.edu.ufop.web.users.repository;

import br.edu.ufop.web.users.entity.UserEntity;
import org.apache.catalina.User;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IUserRepository extends JpaRepository<UserEntity, UUID> {

    // Buscar usuário pelo nome exato
    Optional<UserEntity> findByName(String name);

    // Buscar usuários cujo nome contém uma string (ignore case)
    List<UserEntity> findAllByNameContainingIgnoreCase(String name);

    // Buscar usuário pelo email exato
    Optional<UserEntity> findByEmail(String email);

}


