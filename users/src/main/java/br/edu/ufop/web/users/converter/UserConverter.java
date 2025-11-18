package br.edu.ufop.web.users.converter;

import br.edu.ufop.web.users.domain.CCNetworkDomain;
import br.edu.ufop.web.users.domain.UserDomain;
import br.edu.ufop.web.users.dto.CreateUserDTO;
import br.edu.ufop.web.users.dto.UserDTO;
import br.edu.ufop.web.users.entity.UserEntity;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.catalina.User;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserConverter {
    // Do DTO de criação para o domínio
    public static UserDomain toUserDomain(CreateUserDTO createUserDTO) {

        CCNetworkDomain ccNetworkDomain = CCNetworkDomain.builder()
                .id(createUserDTO.creditCardNetworkId())
                .build();

        return UserDomain.builder()
                .id(null)
                .name(createUserDTO.name())
                .email(createUserDTO.email())
                .password(createUserDTO.password())
                .creditCardNumber(createUserDTO.creditCardNumber())
                .city(createUserDTO.city())
                .ccNetwork(ccNetworkDomain)
                .build();

    }
    // Demais DTOs para o domínio...

    // Do domínio para a entidade JPA
    public static UserEntity toUserEntity(UserDomain userDomain) {
        return UserEntity.builder()
                .id(userDomain.getId())
                .name(userDomain.getName())
                .email(userDomain.getEmail())
                .password(userDomain.getPassword())
                .city(userDomain.getCity())
                .creditCardNumber(userDomain.getCreditCardNumber())
                .type(userDomain.getType())
                .ccNetwork(CCNetworkConverter.toEntity((userDomain.getCcNetwork())))
                .build();

    }
    // Da entidade JPA para o domínio
    public static UserDomain toDomain(UserEntity userEntity) {
        return UserDomain.builder()
                .id(userEntity.getId())
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .password(userEntity.getPassword())
                .city(userEntity.getCity())
                .creditCardNumber(userEntity.getCreditCardNumber())
                .type(userEntity.getType())
                .ccNetwork(CCNetworkConverter.toDomain((userEntity.getCcNetwork())))
                .build();
    }
    // Do entidade JPA para o DTO de saída
    public static UserDTO toUserDTO(UserEntity userEntity) {
        UserDomain userDomain = toDomain(userEntity);
        return toUserDTO(userDomain);
    }

    // Do domínio para o DTO de saída
    public static UserDTO toUserDTO(UserDomain userDomain) {
        return new UserDTO(userDomain.getId(), userDomain.getName(), userDomain.getEmail());
    }
}
