package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.TecnologiaOfertaTable;
import br.com.hireit.projetohireIt.tables.TecnologiasTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TecnologiaRepository extends JpaRepository<TecnologiasTable, Integer> {
    @Query(value = "SELECT * FROM tecnologias t inner join tecnologia_oferta teo on teo.fk_tecnologia = t.id_tecnologia WHERE teo.fk_oferta = ?1", nativeQuery = true)
    List<TecnologiasTable> findByFkOferta(int fkOferta);

    @Query(value = "SELECT * FROM tecnologias t inner join tecnologia_demanda ted on ted.fk_tecnologia = t.id_tecnologia WHERE ted.fk_demanda = ?1", nativeQuery = true)
    List<TecnologiasTable> findByFkDemanda(int fkDemanda);
}
