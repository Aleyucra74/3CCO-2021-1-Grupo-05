package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.SoftSkillUsuarioTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SoftskillUsuarioRepository extends JpaRepository<SoftSkillUsuarioTable, Integer> {

    @Query(value = "SELECT s.* FROM [dbo].[Ofertas] o\n" +
            "INNER JOIN [dbo].[Usuarios] u  ON u.id_usuario = o.fk_usuario\n" +
            "INNER JOIN softskill_usuario s ON s.fk_usuario = u.id_usuario\n" +
            "WHERE id_oferta = ?1", nativeQuery = true)
    List<SoftSkillUsuarioTable> findByFkoferta(int fkOferta);

    @Query(value = "SELECT * FROM softskill_usuario WHERE fk_usuario = ?1", nativeQuery = true)
    List<SoftSkillUsuarioTable> findByUsuario(int fkUsuario);
}
