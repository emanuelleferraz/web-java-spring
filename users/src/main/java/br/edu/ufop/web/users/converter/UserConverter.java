package br.edu.ufop.web.users.converter;

import br.edu.ufop.web.users.domain.CCNetworkDomain;
import br.edu.ufop.web.users.domain.UserDomain;
import br.edu.ufop.web.users.dto.CreateUserDTO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

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
    // Da entidade JPA para o domínio
    // Do domínio para o DTO de saída
}
