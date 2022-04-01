package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.DemandasTable;
import br.com.hireit.projetohireIt.tables.OfertasTable;
import br.com.hireit.projetohireIt.tables.PropostasTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PropostaRepository extends JpaRepository<PropostasTable, Integer> {

    List<PropostasTable> findByDemanda(DemandasTable demanda);

    List<PropostasTable> findByOferta(OfertasTable oferta);

    @Query(value = "SELECT * FROM propostas WHERE fk_demanda = ?1", nativeQuery = true)
    List<PropostasTable> findProposta(int fkDemanda);

    @Query(value = "SELECT * FROM propostas WHERE fk_oferta = ?1 and fk_demanda = ?2", nativeQuery = true)
    List<PropostasTable> findPropostaByOfertaAndDemanda(int fkOferta, int fkDemanda);
}
