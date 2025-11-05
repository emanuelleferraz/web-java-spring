package br.edu.ufop.web.users.service;

import br.edu.ufop.web.users.converter.CCNetworkConverter;
import br.edu.ufop.web.users.domain.CCNetworkDomain;
import br.edu.ufop.web.users.dto.CreateCreditCardNetworkDTO;
import br.edu.ufop.web.users.dto.CreditCardNetworkDTO;
import br.edu.ufop.web.users.entity.CCNetworkEntity;
import br.edu.ufop.web.users.repository.ICreditCardNetworkRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CCNetworkService {

    private final ICreditCardNetworkRepository repository;

    // Get all
    public List<CreditCardNetworkDTO> getAll() {

        List<CCNetworkEntity> lista = repository.findAll();

        return lista.stream()
                .map(CCNetworkConverter::toDTO)
                .toList();
    }

    // Get by id

    // Get by name

    // Create
    public CreditCardNetworkDTO create (CreateCreditCardNetworkDTO createDto) {
        // DTO -> entrada
        // DTO -> converter para o domínio: domain
        // Domain -> aplicar as regras de negócio, conforme o use case: create.

        // Use case: correto: ok; inválida: false/exception

        // Regra de negócio -> name não pode ser nulo e tem que ter valor.
        CCNetworkDomain domain = CCNetworkConverter.toDomain(createDto);
        if (domain.getName() == null || domain.getName().isBlank()){
            // Não permite a persistência
            return null;
        }
        // domain: válid
        // Domain -> converter para entity
        CCNetworkEntity entity = CCNetworkConverter.toEntity(domain);

        // Invocar o repository para a persistência
        return CCNetworkConverter.toDTO(repository.save(entity));
    }

    // Update

    // Delete


}
