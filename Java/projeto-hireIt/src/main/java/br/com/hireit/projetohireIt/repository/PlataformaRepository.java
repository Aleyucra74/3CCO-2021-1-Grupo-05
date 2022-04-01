package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.PlataformaTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlataformaRepository extends JpaRepository<PlataformaTable, Integer> {
}
