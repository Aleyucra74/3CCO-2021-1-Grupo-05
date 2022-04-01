package br.com.hireit.projetohireIt.controller;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

@SpringBootTest
class DownloadControllerTest {

    @Autowired
    DownloadController controller = new DownloadController();

    @Test
    @DisplayName("GET /downloads - Should return 200 when csv is successful")
    void getCargaProjetosCsvSuccess()throws Exception {
        MockHttpServletResponse response = new MockHttpServletResponse();
        ResponseEntity responseEntity = controller.getCargaProjetos(response, true);

        assertThat(response.getContentType()).isEqualTo("text/csv");
        assertEquals(200, responseEntity.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /downloads - Should return 200 when txt is successful")
    void getCargaProjetosTxtSuccess()throws Exception {
        MockHttpServletResponse response = new MockHttpServletResponse();
        ResponseEntity responseEntity = controller.getCargaProjetos(response, false);

        assertThat(response.getContentType()).isEqualTo("text/plain");
        assertEquals(200, responseEntity.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /downloads - Should return I/O Exception when failed")
    void getCargaProjetosCsvFailed() throws IOException {
        HttpServletResponse response = mock(HttpServletResponse.class);
        Mockito.when(response.getOutputStream()).thenThrow(new IOException());

        assertThrows(IOException.class, () -> controller.getCargaProjetos(response, true));
    }
}