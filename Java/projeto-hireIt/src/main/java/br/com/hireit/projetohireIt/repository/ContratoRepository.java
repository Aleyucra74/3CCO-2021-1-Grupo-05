package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.ContratosTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContratoRepository extends JpaRepository<ContratosTable, Integer> {

    @Query(value = "SELECT * FROM contratos WHERE fk_demanda = ?1 and fk_oferta = ?2", nativeQuery = true)
    List<ContratosTable> findContratoByDemandaAndOferta(int fkDemanda, int fkOferta);

    @Query(
            value = "SELECT DISTINCT c.* from contratos c, ofertas o WHERE o.fk_usuario = ?1 AND fk_oferta = id_oferta;",
            nativeQuery = true
    )
    List<ContratosTable> findByOferta(int fkUsuario);

    @Query(
            value = "SELECT DISTINCT c.* FROM contratos c, demandas d WHERE d.fk_usuario = ?1 AND fk_demanda = id_demanda;",
            nativeQuery = true
    )
    List<ContratosTable> findByDemanda(int fkUsuario);
}
