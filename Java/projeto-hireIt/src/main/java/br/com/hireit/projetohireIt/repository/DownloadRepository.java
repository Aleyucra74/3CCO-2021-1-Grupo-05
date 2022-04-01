package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.interfaces.DemandasInterface;
import br.com.hireit.projetohireIt.tables.DemandasTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DownloadRepository extends JpaRepository<DemandasTable, Integer> {

    @Query(value = "select d.titulo from Demandas d where fk_usuario = :idUsuario", nativeQuery = true)
    List<String> findDemandasByUsuario(@Param("idUsuario") Integer idUsuario);

    @Query(value = "select u.nome, d.titulo, t.tecnologia, s.softskills from Softskills s inner join softskill_demanda sd on s.id_softskill = sd.fk_softskill inner join Demandas d on sd.fk_demanda = d.id_demanda inner join tecnologia_demanda td on d.id_demanda = td.fk_demanda inner join Tecnologias t on td.fk_tecnologia = t.id_tecnologia inner join Usuarios u on d.fk_usuario = u.id_usuario where u.id_usuario = :idUsuario", nativeQuery = true)
    List<DemandasInterface> findByProjetos(@Param("idUsuario") Integer idUsuario);


}
