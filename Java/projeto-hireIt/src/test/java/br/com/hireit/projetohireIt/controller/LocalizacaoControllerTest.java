package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.repository.LocalizacoesRepository;
import br.com.hireit.projetohireIt.tables.LocalizacoesTable;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class LocalizacaoControllerTest {

    @Autowired
    private LocalizacaoController localizacaoController;

    @MockBean
    private LocalizacoesRepository localizacoesRepository;

    @MockBean
    private BindingResult bindingResult;

    @Test
    @DisplayName("GET /localizacoes - Should return 200 when list is not empty")
    void getLocalizacaoSuccess(){
        List<LocalizacoesTable> listLocalizacoes = Arrays.asList(new LocalizacoesTable(), new LocalizacoesTable());

        Mockito.when(localizacoesRepository.findAll()).thenReturn(listLocalizacoes);

        ResponseEntity response = localizacaoController.getLocalizacao();

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /localizacoes - Should return 204 when list is not empty")
    void getLocalizacaoNoContent(){
        Mockito.when(localizacoesRepository.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity response = localizacaoController.getLocalizacao();

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /localizacoes/cep/{cep} - Should return 200 when Localizacao is found")
    void getLocalizacaoByCepSuccess(){
        String cep = "09535110";
        Optional<LocalizacoesTable> localizacao = Optional.of(new LocalizacoesTable());

        Mockito.when(localizacoesRepository.findByCep(cep)).thenReturn(localizacao);

        ResponseEntity response = localizacaoController.getLocalizacaoByCep(cep);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /localizacoes/cep/{cep} - Should return 204 when list Localizacao is not found")
    void getLocalizacaoByCepoNoContent(){
        String cep = "09535110";
        Mockito.when(localizacoesRepository.findByCep(cep)).thenReturn(Optional.empty());

        ResponseEntity response = localizacaoController.getLocalizacaoByCep(cep);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("DELETE /localizacoes - Should return 204 when delete Localizacao successfully")
    void deleteLocalizacaoNoContent(){
        int id = 1;
        Optional<LocalizacoesTable> localizacao = Optional.of(new LocalizacoesTable());

        Mockito.when(localizacoesRepository.findById(id)).thenReturn(localizacao);

        ResponseEntity response = localizacaoController.deleteLocalizacao(id);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("DELETE /localizacoes - Should return 404 when Localizacao was not found")
    void deleteLocalizacaoNotFound(){
        int id = 1;
        Optional<LocalizacoesTable> localizacao = Optional.empty();

        Mockito.when(localizacoesRepository.findById(id)).thenReturn(localizacao);

        ResponseEntity response = localizacaoController.deleteLocalizacao(id);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /localizacoes - Should return 201 when Localizacao is created")
    void postLocalizacaoCreated(){
        ResponseEntity response = localizacaoController.postLocalizacao(new LocalizacoesTable(), bindingResult);

        assertEquals(201, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /localizacoes - Should return 422 when Localizacao Validation is wrong")
    void postLocalizacaoValidationError(){
        Mockito.when(bindingResult.hasErrors()).thenReturn(true);

        ResponseEntity response = localizacaoController.postLocalizacao(new LocalizacoesTable(), bindingResult);

        assertEquals(422, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("PUT /localizacoes - Should return 204 when Localizacao is created")
    void putLocalizacaoNoContent(){
        int id = 1;
        Optional<LocalizacoesTable> localizacao = Optional.of(new LocalizacoesTable());

        Mockito.when(localizacoesRepository.findById(id)).thenReturn(localizacao);

        ResponseEntity response = localizacaoController.putLocalizacao(id,new LocalizacoesTable(), bindingResult);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("PUT /localizacoes - Should return 404 when Localizacao was not found")
    void putLocalizacaoNotFound(){
        int id = 1;
        Optional<LocalizacoesTable> localizacao = Optional.empty();

        Mockito.when(localizacoesRepository.findById(id)).thenReturn(localizacao);

        ResponseEntity response = localizacaoController.putLocalizacao(id,new LocalizacoesTable(), bindingResult);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("PUT /localizacoes - Should return 422 when Localizacao Validation is wrong")
    void putLocalizacaoValidationError(){
        Mockito.when(bindingResult.hasErrors()).thenReturn(true);

        ResponseEntity response = localizacaoController.putLocalizacao(1,new LocalizacoesTable(), bindingResult);

        assertEquals(422, response.getStatusCodeValue());
    }

}
