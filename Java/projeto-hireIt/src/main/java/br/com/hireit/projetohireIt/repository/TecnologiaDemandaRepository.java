package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.TecnologiaDemandaTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TecnologiaDemandaRepository extends JpaRepository<TecnologiaDemandaTable, Integer> {

    @Query(value = "SELECT * FROM tecnologia_demanda WHERE fk_demanda = ?1", nativeQuery = true)
    List<TecnologiaDemandaTable> findByFkdemanda(int fkDemanda);

    @Modifying
    @Query(value = "DELETE FROM tecnologia_demanda WHERE fk_demanda = ?1", nativeQuery = true)
    void deleteTecnologiasDemanda(int fkDemanda);
}
