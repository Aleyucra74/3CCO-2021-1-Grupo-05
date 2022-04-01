package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.AvaliacaoDemanda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AvaliacaoDemandaRepository extends JpaRepository<AvaliacaoDemanda, Integer> {

    @Query(value = "SELECT * FROM Avaliacao_Demanda WHERE fk_demanda = ?1", nativeQuery = true)
    List<AvaliacaoDemanda> findByDemanda(int fkDemanda);

    @Query(value = "SELECT a.* FROM Avaliacao_Demanda a, Demandas WHERE fk_usuario = ?1 and fk_demanda = id_demanda", nativeQuery = true)
    List<AvaliacaoDemanda> findByUsuario(int fkUsuario);

    @Query(value = "SELECT count(*) FROM Avaliacao_Demanda, Demandas o WHERE fk_usuario = ?1 and fk_demanda = id_demanda", nativeQuery = true)
    int countByUsuario(int fkUsuario);
}
