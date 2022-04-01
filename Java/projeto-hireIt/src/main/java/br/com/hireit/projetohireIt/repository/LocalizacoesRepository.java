package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.LocalizacoesTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocalizacoesRepository extends JpaRepository<LocalizacoesTable, Integer>{

    Optional<LocalizacoesTable> findByCep(String cep);

}
