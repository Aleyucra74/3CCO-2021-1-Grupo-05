package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.BuscasTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuscaRepository extends JpaRepository<BuscasTable, Integer> {

    BuscasTable findByTecnologiaAndTipo(String tecnologia, String tipo);
}
