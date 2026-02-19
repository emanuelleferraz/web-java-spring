package br.edu.ufop.web.users.domain.usecase;

import br.edu.ufop.web.users.domain.UserDomain;
import br.edu.ufop.web.users.domain.port.CCNRepositoryPort;
import br.edu.ufop.web.users.exception.UseCaseException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class CreateUserUseCaseTest {

    private UserDomain userDomain;
    @Mock
    private CCNRepositoryPort repositoryPort;

    @BeforeEach
    void setUp() {
        this.userDomain = new UserDomain();
        this.userDomain.setId(UUID.randomUUID());
    }

    @AfterEach
    void tearDown() {
        this.userDomain = null;
    }

    @Test
    void userNameIsNull_deve_disparar_exception() {
        this.userDomain.setName(null);

        CreateUserUseCase useCase = new CreateUserUseCase(null);
        useCase.setUserDomain(this.userDomain);

        Assertions.assertThrows(UseCaseException.class, () -> {
           useCase.validate();
        });
    }

    @Test
    void userNameNotNull_deve_passar() {
        this.userDomain.setName(UUID.randomUUID().toString());
        Assertions.assertNotNull(this.userDomain);
        Assertions.assertNotNull(this.userDomain.getName());

        /* CreateUserUseCase useCase = new CreateUserUseCase(null);
        useCase.setUserDomain(this.userDomain);
        Assertions.assertDoesNotThrow(() -> {
            useCase.validate();
        }); */
    }

    @Test
    void setUserDomain() {
    }
}