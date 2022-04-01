package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.ContatosTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ContatosRepository extends JpaRepository<ContatosTable, Integer> {

    @Query(value = "SELECT * FROM Contatos WHERE fk_usuario = ?1", nativeQuery = true)
    List<ContatosTable> findByUsuario(int idUsuario);

    @Query(value = "SELECT * FROM Contatos WHERE fk_usuario = ?1 AND fk_plataforma = ?2", nativeQuery = true)
    Optional<ContatosTable> findByUsuarioAndPlataforma(int idUsuario, int idPlataforma);
}
