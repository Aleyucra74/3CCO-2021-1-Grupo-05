package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.UsuariosTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuariosTable, Integer> {

    @Query(value = "SELECT * FROM Usuarios u WHERE u.email = ?1 AND u.senha = ?2", nativeQuery = true)
    UsuariosTable findByEmailAndSenha(String email, String senha);

    Optional<UsuariosTable> findUsuarioByEmail(String email);

    @Query(value =
            "SELECT DISTINCT u.* FROM [dbo].[Usuarios] u \n" +
                    "INNER JOIN [dbo].[Ofertas] o ON  u.id_usuario = o.fk_usuario WHERE fk_usuario = ?1",
            nativeQuery = true)
    UsuariosTable findUsuario(int fkUsuario);
}
