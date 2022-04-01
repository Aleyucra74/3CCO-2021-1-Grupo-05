package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.TecnologiaOfertaTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TecnologiaOfertaRepository extends JpaRepository<TecnologiaOfertaTable, Integer> {

    @Query(value = "SELECT * FROM tecnologia_oferta WHERE fk_oferta = ?1", nativeQuery = true)
    List<TecnologiaOfertaTable> findByFkoferta(int fkOferta);
}
