package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.OfertasTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OfertaRepository extends JpaRepository<OfertasTable, Integer> {

    @Query(value = "SELECT * FROM ofertas WHERE fk_usuario = ?1", nativeQuery = true)
    List<OfertasTable> findAllByUsuario(int idUsuario);

    @Query(value =
            "SELECT DISTINCT o.* FROM [dbo].[Ofertas] o \n" +
            "INNER JOIN [dbo].[Usuarios] u ON o.fk_usuario = u.id_usuario \n" +
            "INNER JOIN Localizacoes l ON u.fk_localizacao = l.id_localizacao \n" +
            "INNER JOIN tecnologia_oferta tof ON tof.fk_oferta = o.id_oferta \n" +
            "INNER JOIN [dbo].[Tecnologias] t ON tof.fk_tecnologia = t.id_tecnologia \n" +
            "where l.uf LIKE ?1 \n" +
            "AND o.created_at BETWEEN ?2 AND ?3 \n" +
            "AND u.nome LIKE ?4 \n" +
            "AND t.tecnologia LIKE ?5 \n" +
            "AND tof.tempo_experiencia >= ?6",
            nativeQuery = true)
    List<OfertasTable> findWhere(
            String uf,
            String dataCriacao,
            String dataHoje,
            String nome,
            String tecnologia,
            int tempo
    );

}
