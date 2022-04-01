package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.DemandasTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DemandaRepository extends JpaRepository<DemandasTable, Integer> {

    @Query(value = "SELECT * FROM demandas WHERE fk_usuario = ?1", nativeQuery = true)
    List<DemandasTable> findAllByUsuario(int idUsuario);

    @Query(value =
            "SELECT DISTINCT d.* FROM [dbo].[Demandas] d \n" +
            "INNER JOIN [dbo].[Usuarios] u ON d.fk_usuario = u.id_usuario \n" +
            "INNER JOIN Localizacoes l ON u.fk_localizacao = l.id_localizacao \n" +
            "INNER JOIN tecnologia_demanda td ON td.fk_demanda = d.id_demanda \n" +
            "INNER JOIN [dbo].[Tecnologias] t ON td.fk_tecnologia = t.id_tecnologia \n" +
            "where l.uf LIKE ?1 \n" +
            "AND d.titulo LIKE ?2 \n" +
            "AND d.created_at BETWEEN ?3 AND ?4 \n" +
            "AND d.salario BETWEEN ?5 AND ?6 \n" +
            "AND u.nome LIKE ?7 \n" +
            "AND t.tecnologia LIKE ?8 \n" +
            "AND td.tempo_experiencia >= ?9",
            nativeQuery = true)
    List<DemandasTable> findWhere(
            String uf,
            String titulo,
            String dataCriacao,
            String dataHoje,
            Double salarioMin,
            Double salarioMax,
            String nome,
            String tecnologia,
            int tempo
    );

    @Query(value = "SELECT DISTINCT d.* FROM [dbo].[Demandas] d\n" +
                        "INNER JOIN [dbo].[Usuarios] u ON d.fk_usuario = u.id_usuario \n" +
                        "INNER JOIN Localizacoes l ON u.fk_localizacao = l.id_localizacao \n" +
                        "INNER JOIN tecnologia_demanda td ON td.fk_demanda = d.id_demanda\n" +
                        "INNER JOIN [dbo].[Tecnologias] t ON td.fk_tecnologia = t.id_tecnologia\n" +
                        "where d.titulo LIKE ?1",
            nativeQuery = true)
    List<DemandasTable> findWhereSimple(String titulo);

    @Query(value = "Select DISTINCT l.uf from [dbo].[Demandas] d, [dbo].[Usuarios], [dbo].[Localizacoes] l " +
            "WHERE id_usuario = ?1 and l.id_localizacao = fk_localizacao;",
            nativeQuery = true)
    String findUfByUsuario(int idUsuario);
}
