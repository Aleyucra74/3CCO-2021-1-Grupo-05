package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.AvaliacaoOferta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AvaliacaoOfertaRepository extends JpaRepository<AvaliacaoOferta, Integer> {

    @Query(value = "SELECT a.* FROM Avaliacao_Oferta a, Ofertas o WHERE o.fk_usuario = ?1 and fk_oferta = id_oferta", nativeQuery = true)
    List<AvaliacaoOferta> findByUsuario(int fkUsuario);

    @Query(value = "SELECT count(*) FROM Avaliacao_Oferta, Ofertas o WHERE o.fk_usuario = ?1 and fk_oferta = id_oferta", nativeQuery = true)
    int countByUsuario(int fkUsuario);
}