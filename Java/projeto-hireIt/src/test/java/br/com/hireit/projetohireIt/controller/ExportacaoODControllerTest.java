package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.exportacao.ExportacaoOD;
import br.com.hireit.projetohireIt.repository.DemandaRepository;
import br.com.hireit.projetohireIt.repository.UsuarioRepository;
import br.com.hireit.projetohireIt.tables.DemandasTable;
import br.com.hireit.projetohireIt.tables.OfertasTable;
import br.com.hireit.projetohireIt.tables.UsuariosTable;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

@SpringBootTest
class ExportacaoODControllerTest {

    @Autowired
    ExportacaoODController controller = new ExportacaoODController();

    @MockBean
    private UsuarioRepository usuarioRepository;

    @Test
    @DisplayName("POST /downloads - Should return 200 when is successful")
    void postDemandaSuccessful() {

        DemandasTable demandas = new DemandasTable();

        ResponseEntity responseEntity = controller.postDemandas(demandas);
        assertEquals(200, responseEntity.getStatusCodeValue());

    }

    @Test
    @DisplayName("POST /downloads - Should return 400 when is failed")
    void postDemandaFailed() {

        DemandasTable demandas = new DemandasTable();
        Mockito.when(usuarioRepository.findUsuario(3)).thenThrow(new IllegalArgumentException());

        ResponseEntity responseEntity = controller.postDemandas(demandas);
        assertEquals(400 , responseEntity.getStatusCodeValue());
        assertEquals("Erro ao criar a demanda", responseEntity.getBody());

    }

    @Test
    @DisplayName("POST /downloads - Should return 200 when is successful")
    void postOfertaSuccessful() {

        OfertasTable oferta = new OfertasTable();

        ResponseEntity responseEntity = controller.postOfertas(oferta);
        assertEquals(200, responseEntity.getStatusCodeValue());

    }

    @Test
    @DisplayName("POST /downloads - Should return 400 when is failed")
    void postOfertaFailed() {

        OfertasTable oferta = new OfertasTable();
        Mockito.when(usuarioRepository.findUsuario(3)).thenThrow(new IllegalArgumentException());

        ResponseEntity responseEntity = controller.postOfertas(oferta);
        assertEquals(400 , responseEntity.getStatusCodeValue());
        assertEquals("Erro ao criar a oferta", responseEntity.getBody());

    }

    /*@Test
    @DisplayName("GET /downloads - Should return 200 when Csv is successful")
    void gravarListaCsvSuccessful() throws IOException {

        MockHttpServletResponse response = new MockHttpServletResponse();
        ResponseEntity responseEntity = controller.gravarLista(response, true);

        assertThat(response.getContentType()).isEqualTo("text/csv");
        assertEquals(200, responseEntity.getStatusCodeValue());

    }

    @Test
    @DisplayName("GET /downloads - Should return 200 when txt is successful")
    void gravarListaTxtSuccessful() throws IOException {

        MockHttpServletResponse response = new MockHttpServletResponse();
        ResponseEntity responseEntity = controller.gravarLista(response, false);

        assertThat(response.getContentType()).isEqualTo("text/plain");
        assertEquals(200, responseEntity.getStatusCodeValue());

    }*/

    @Test
    @DisplayName("GET /downloads - Should return I/O Exception when failed")
    void gravarListaCsvFailed() throws IOException {
        HttpServletResponse response = mock(HttpServletResponse.class);
        Mockito.when(response.getOutputStream()).thenThrow(new IOException());

        assertThrows(IOException.class, () -> controller.gravarLista(response, true));
    }
}