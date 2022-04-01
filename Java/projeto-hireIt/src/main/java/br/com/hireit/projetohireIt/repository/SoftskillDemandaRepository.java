package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.SoftSkillDemandaTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SoftskillDemandaRepository extends JpaRepository<SoftSkillDemandaTable, Integer> {

    @Query(value = "SELECT * FROM softskill_demanda WHERE fk_demanda = ?1", nativeQuery = true)
    List<SoftSkillDemandaTable> findByFkdemanda(int fkDemanda);

    @Modifying
    @Query(value = "DELETE FROM softskill_demanda WHERE fk_demanda = ?1", nativeQuery = true)
    void deleteSkillsDemanda(int fkDemanda);
}
