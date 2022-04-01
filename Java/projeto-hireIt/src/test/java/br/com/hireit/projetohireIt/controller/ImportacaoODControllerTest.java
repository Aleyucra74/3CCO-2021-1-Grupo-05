package br.com.hireit.projetohireIt.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ImportacaoODControllerTest {

    @Autowired
    ImportacaoODController controller = new ImportacaoODController();

    @Test
    @DisplayName("POST /import - Should return 201 when is successful")
    void postAnexoSuccess() throws IOException {
        MockMultipartFile file
                = new MockMultipartFile(
                "file",
                "hello.txt",
                MediaType.TEXT_PLAIN_VALUE,
                ("00PROJETO2021108-06-2021 02:31:4401\n" +
                        "02super ofertinha                                                                                                                                                                                                                                                                                             08/06/2021 02:31:33thiaguinho@gmail.com                         \n" +
                        "02ultra ofertinha                                                                                                                                                                                                                                                                                             08/06/2021 02:31:34thiaguinho@gmail.com                         \n" +
                        "02mega ofertinha                                                                                                                                                                                                                                                                                              08/06/2021 02:31:37thiaguinho@gmail.com                         \n" +
                        "03mega demanda                                 projetaço em java                                                                                                                                                                                                                                                                                           08/06/2021 02:31:3911200,00 thiaguinho@gmail.com                         \n" +
                        "03demandinha bacana                            front web react                                                                                                                                                                                                                                                                                             08/06/2021 02:31:409200,00  thiaguinho@gmail.com                         \n" +
                        "03demanda super urgente                        c# na deloitte, d.tracker                                                                                                                                                                                                                                                                                   08/06/2021 02:31:4215200,00 thiaguinho@gmail.com                         \n" +
                        "0100000000030000000003\n").getBytes()
        );

        ResponseEntity responseEntity = controller.postAnexo(file);
        assertEquals("Importação feita com sucesso!", responseEntity.getBody());
        assertEquals(201, responseEntity.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /import - Should return 400 when there is a problem in counting 'ofertas'")
    void postAnexoOfertasCountingFailed() throws IOException {
        MockMultipartFile file
                = new MockMultipartFile(
                "file",
                "hello.txt",
                MediaType.TEXT_PLAIN_VALUE,
                ("00PROJETO2021108-06-2021 02:31:4401\n" +
                        "02super ofertinha                                                                                                                                                                                                                                                                                             08/06/2021 02:31:33thiaguinho@gmail.com                         \n" +
                        "02ultra ofertinha                                                                                                                                                                                                                                                                                             08/06/2021 02:31:34thiaguinho@gmail.com                         \n" +
                        "02mega ofertinha                                                                                                                                                                                                                                                                                              08/06/2021 02:31:37thiaguinho@gmail.com                         \n" +
                        "03mega demanda                                 projetaço em java                                                                                                                                                                                                                                                                                           08/06/2021 02:31:3911200,00 thiaguinho@gmail.com                         \n" +
                        "03demandinha bacana                            front web react                                                                                                                                                                                                                                                                                             08/06/2021 02:31:409200,00  thiaguinho@gmail.com                         \n" +
                        "03demanda super urgente                        c# na deloitte, d.tracker                                                                                                                                                                                                                                                                                   08/06/2021 02:31:4215200,00 thiaguinho@gmail.com                         \n" +
                        "0100000000010000000003\n").getBytes()
        );

        ResponseEntity responseEntity = controller.postAnexo(file);
        assertEquals("Quantidade de ofertas OU demandas gravadas não compatível com quantidade lida", responseEntity.getBody());
        assertEquals(400, responseEntity.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /import - Should return 400 when there is a problem in counting 'demandas'")
    void postAnexoDemandasCountingFailed() throws IOException {
        MockMultipartFile file
                = new MockMultipartFile(
                "file",
                "hello.txt",
                MediaType.TEXT_PLAIN_VALUE,
                ("00PROJETO2021108-06-2021 02:31:4401\n" +
                        "02super ofertinha                                                                                                                                                                                                                                                                                             08/06/2021 02:31:33thiaguinho@gmail.com                         \n" +
                        "02ultra ofertinha                                                                                                                                                                                                                                                                                             08/06/2021 02:31:34thiaguinho@gmail.com                         \n" +
                        "02mega ofertinha                                                                                                                                                                                                                                                                                              08/06/2021 02:31:37thiaguinho@gmail.com                         \n" +
                        "03mega demanda                                 projetaço em java                                                                                                                                                                                                                                                                                           08/06/2021 02:31:3911200,00 thiaguinho@gmail.com                         \n" +
                        "03demandinha bacana                            front web react                                                                                                                                                                                                                                                                                             08/06/2021 02:31:409200,00  thiaguinho@gmail.com                         \n" +
                        "03demanda super urgente                        c# na deloitte, d.tracker                                                                                                                                                                                                                                                                                   08/06/2021 02:31:4215200,00 thiaguinho@gmail.com                         \n" +
                        "0100000000030000000001\n").getBytes()
        );

        ResponseEntity responseEntity = controller.postAnexo(file);
        assertEquals("Quantidade de ofertas OU demandas gravadas não compatível com quantidade lida", responseEntity.getBody());
        assertEquals(400, responseEntity.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /import - Should return 400 when there is a problem to read the 'tipo de registro'")
    void postAnexoReadTipoRegistroFailed() throws IOException {
        MockMultipartFile file
                = new MockMultipartFile(
                "file",
                "hello.txt",
                MediaType.TEXT_PLAIN_VALUE,
                ("ABPROJETO2021108-06-2021 02:31:4401\n" +
                        "02super ofertinha                                                                                                                                                                                                                                                                                             08/06/2021 02:31:33thiaguinho@gmail.com                         \n" +
                        "02ultra ofertinha                                                                                                                                                                                                                                                                                             08/06/2021 02:31:34thiaguinho@gmail.com                         \n" +
                        "02mega ofertinha                                                                                                                                                                                                                                                                                              08/06/2021 02:31:37thiaguinho@gmail.com                         \n" +
                        "03mega demanda                                 projetaço em java                                                                                                                                                                                                                                                                                           08/06/2021 02:31:3911200,00 thiaguinho@gmail.com                         \n" +
                        "03demandinha bacana                            front web react                                                                                                                                                                                                                                                                                             08/06/2021 02:31:409200,00  thiaguinho@gmail.com                         \n" +
                        "03demanda super urgente                        c# na deloitte, d.tracker                                                                                                                                                                                                                                                                                   08/06/2021 02:31:4215200,00 thiaguinho@gmail.com                         \n" +
                        "0100000000030000000001\n").getBytes()
        );

        ResponseEntity responseEntity = controller.postAnexo(file);
        assertEquals("Tipo de registro inválido", responseEntity.getBody());
        assertEquals(400, responseEntity.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /import - Should return 400 when there is a problem to found 'header', 'corpo' or 'trailer'")
    void postAnexoLayoutMissingFailed() throws IOException {
        MockMultipartFile file
                = new MockMultipartFile(
                "file",
                "hello.txt",
                MediaType.TEXT_PLAIN_VALUE,
                ("00PROJETO2021108-06-2021 02:31:4401\n" +
                        "02super ofertinha                                                                                                                                                                                                                                                                                             08/06/2021 02:31:33thiaguinho@gmail.com                         \n" +
                        "02ultra ofertinha                                                                                                                                                                                                                                                                                             08/06/2021 02:31:34thiaguinho@gmail.com                         \n" +
                        "02mega ofertinha                                                                                                                                                                                                                                                                                              08/06/2021 02:31:37thiaguinho@gmail.com                         \n" +
                        "03mega demanda                                 projetaço em java                                                                                                                                                                                                                                                                                           08/06/2021 02:31:3911200,00 thiaguinho@gmail.com                         \n" +
                        "03demandinha bacana                            front web react                                                                                                                                                                                                                                                                                             08/06/2021 02:31:409200,00  thiaguinho@gmail.com                         \n" +
                        "03demanda super urgente                        c# na deloitte, d.tracker                                                                                                                                                                                                                                                                                   08/06/2021 02:31:4215200,00 thiaguinho@gmail.com                         \n").getBytes()
        );

        ResponseEntity responseEntity = controller.postAnexo(file);
        assertEquals("Não foi encontrado um header ou trailer no documento", responseEntity.getBody());
        assertEquals(400, responseEntity.getStatusCodeValue());
    }
}