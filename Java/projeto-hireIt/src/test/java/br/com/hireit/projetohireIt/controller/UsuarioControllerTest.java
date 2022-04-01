package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.entity.UsuarioLogin;
import br.com.hireit.projetohireIt.repository.LocalizacoesRepository;
import br.com.hireit.projetohireIt.repository.UsuarioRepository;
import br.com.hireit.projetohireIt.tables.LocalizacoesTable;
import br.com.hireit.projetohireIt.tables.UsuariosTable;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class UsuarioControllerTest {

    @Autowired
    private UsuarioController usuarioController;

    @MockBean
    private UsuarioRepository usuarioRepository;

    @MockBean
    private LocalizacoesRepository localizacoesRepository;

    @MockBean
    private BindingResult bindingResult;

    @MockBean
    private AuthenticationManager authenticationManager;

    @Test
    @DisplayName("GET /usuarios - Should return 200 when list of Usuarios is empty")
    void getUsuariosSuccess(){
        List<UsuariosTable> listUsuarios = Arrays.asList(new UsuariosTable(), new UsuariosTable());

        Mockito.when(usuarioRepository.findAll()).thenReturn(listUsuarios);

        ResponseEntity response = usuarioController.getUsuarios();

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /usuarios - Should return 204 when list of Usuarios is empty")
    void getUsuariosNoContent(){
        Mockito.when(usuarioRepository.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity response = usuarioController.getUsuarios();

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /usuarios/{idUsuario} - Should return 200 when list of Usuarios is empty")
    void getUsuarioSuccess(){
        int id = 1;

        Mockito.when(usuarioRepository.existsById(id)).thenReturn(true);
        Mockito.when(usuarioRepository.findById(id)).thenReturn(Optional.of(new UsuariosTable()));

        ResponseEntity response = usuarioController.getUsuario(id);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /usuarios/{idUsuario} - Should return 204 when list of Usuarios is empty")
    void getUsuarioNoContent(){
        int id = 1;

        Mockito.when(usuarioRepository.existsById(id)).thenReturn(false);

        ResponseEntity response = usuarioController.getUsuario(id);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /usuarios - Should return 201 when all information are valid")
    void postUsuarioCreated(){
        UsuariosTable usuariosTable = new UsuariosTable();
        LocalizacoesTable localizacoesTable = new LocalizacoesTable();
        localizacoesTable.setIdLocalizacao(1);
        usuariosTable.setLocalizacao(localizacoesTable);

        Mockito.when(localizacoesRepository.existsById(usuariosTable.getLocalizacao().getIdLocalizacao())).thenReturn(true);

        ResponseEntity response = usuarioController.postUsuario(usuariosTable, bindingResult);

        assertEquals(201, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /usuarios - Should return 404 when Localizacao does not exists")
    void postUsuarioNotFound(){
        UsuariosTable usuariosTable = new UsuariosTable();
        LocalizacoesTable localizacoesTable = new LocalizacoesTable();
        localizacoesTable.setIdLocalizacao(1);
        usuariosTable.setLocalizacao(localizacoesTable);

        Mockito.when(localizacoesRepository.existsById(usuariosTable.getLocalizacao().getIdLocalizacao())).thenReturn(false);

        ResponseEntity response = usuarioController.postUsuario(usuariosTable, bindingResult);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /usuarios - Should return 422 when some information is not valid")
    void postUsuarioValidationError(){
        Mockito.when(bindingResult.hasErrors()).thenReturn(true);

        ResponseEntity response = usuarioController.postUsuario(new UsuariosTable(), bindingResult);

        assertEquals(422, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("PUT /usuario/{idUsuario} - Should return 204 when Usuario is updated successfully")
    void putUsuarioNoContent(){
        int id = 1;
        Optional<UsuariosTable> usuario = Optional.of(new UsuariosTable());

        Mockito.when(usuarioRepository.findById(id)).thenReturn(usuario);

        ResponseEntity response = usuarioController.putUsuario(1, new UsuariosTable(), bindingResult);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("PUT /usuario/{idUsuario} - Should return 404 when Usuario does not exists")
    void putUsuarioNotFound(){
        int id = 1;
        Optional<UsuariosTable> usuario = Optional.empty();

        Mockito.when(usuarioRepository.findById(id)).thenReturn(usuario);

        ResponseEntity response = usuarioController.putUsuario(1, new UsuariosTable(), bindingResult);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("PUT /usuario/{idUsuario} - Should return 422 when Usuario information is not valid")
    void putUsuarioValidationError(){
        Mockito.when(bindingResult.hasErrors()).thenReturn(true);

        ResponseEntity response = usuarioController.putUsuario(1, new UsuariosTable(), bindingResult);

        assertEquals(422, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("DELETE /usuario/{idUsuario} - Should return 204 when delete Usuario successfully")
    void deleteUsuarioNoContent(){
        int id = 1;
        Optional<UsuariosTable> usuario = Optional.of(new UsuariosTable());

        Mockito.when(usuarioRepository.findById(id)).thenReturn(usuario);

        ResponseEntity response = usuarioController.deleteUsuario(1);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("DELETE /usuario/{idUsuario} - Should return 404 when Usuario was not found")
    void deleteUsuarioNotFound(){
        int id = 1;
        Optional<UsuariosTable> usuario = Optional.empty();

        Mockito.when(usuarioRepository.findById(id)).thenReturn(usuario);

        ResponseEntity response = usuarioController.deleteUsuario(1);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /email/{email} - Should return 200 when Usuario exists by email")
    void getDadosUsuariosSuccess(){
        String email = "thiaguinho@gmail.com";
        Optional<UsuariosTable> usuariosTable = Optional.of(new UsuariosTable());

        Mockito.when(usuarioRepository.findUsuarioByEmail(email)).thenReturn(usuariosTable);

        ResponseEntity response = usuarioController.getDadosUsuarios(email);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /email/{email} - Should return 204 when Usuario does not exists by email")
    void getDadosUsuariosNoContent(){
        String email = "thiaguinho@gmail.com";
        Optional<UsuariosTable> usuariosTable = Optional.empty();

        Mockito.when(usuarioRepository.findUsuarioByEmail(email)).thenReturn(usuariosTable);

        ResponseEntity response = usuarioController.getDadosUsuarios(email);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /login - Should return 400 when usuario and/or senha are wrong")
    void loginBadCredentials(){
        UsuarioLogin usuarioLogin = new UsuarioLogin();
        usuarioLogin.setEmail("mateus@gmail.com");
        usuarioLogin.setSenha("senha123");

        Mockito.when(authenticationManager.authenticate(any())).thenThrow(BadCredentialsException.class);

        ResponseEntity response = usuarioController.login(usuarioLogin);

        assertEquals(400, response.getStatusCodeValue());
    }
}
