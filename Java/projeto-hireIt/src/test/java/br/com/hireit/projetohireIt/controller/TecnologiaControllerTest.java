package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.repository.TecnologiaOfertaRepository;
import br.com.hireit.projetohireIt.repository.TecnologiaRepository;
import br.com.hireit.projetohireIt.tables.OfertasTable;
import br.com.hireit.projetohireIt.tables.TecnologiaOfertaTable;
import br.com.hireit.projetohireIt.tables.TecnologiasTable;
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

@SpringBootTest
public class TecnologiaControllerTest {

    @Autowired
    private TecnologiaController tecnologiaController;

    @MockBean
    private TecnologiaRepository tecnologiaRepository;

    @MockBean
    private TecnologiaOfertaRepository tecnologiaOfertaRepository;

    @MockBean
    private BindingResult bindingResult;

    @Test
    @DisplayName("GET /tecnologias - Should return 200 when list is not empty")
    void getTecnologiasSuccess(){
        List<TecnologiasTable> listTecnologias = Arrays.asList(new TecnologiasTable(), new TecnologiasTable());

        Mockito.when(tecnologiaRepository.findAll()).thenReturn(listTecnologias);

        ResponseEntity response = tecnologiaController.getTecnologias();

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /tecnologias - Should return 204 when list is empty")
    void getTecnologiasNoContent(){
        Mockito.when(tecnologiaRepository.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity response = tecnologiaController.getTecnologias();

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /tecnologias - Should return 200 when list is not empty")
    void getTecnologiasOfertaSuccess(){
        int idOferta = 1;
        List<TecnologiaOfertaTable> listTecnologias = Arrays.asList(new TecnologiaOfertaTable(), new TecnologiaOfertaTable());

        Mockito.when(tecnologiaOfertaRepository.findByFkoferta(idOferta)).thenReturn(listTecnologias);

        ResponseEntity response = tecnologiaController.getTecnologiasOferta(idOferta);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /tecnologias/oferta/{idOferta} - Should return 204 when list is empty")
    void getTecnologiasOfertaNoContent(){
        int idOferta = 1;

        Mockito.when(tecnologiaOfertaRepository.findByFkoferta(idOferta)).thenReturn(new ArrayList<>());

        ResponseEntity response = tecnologiaController.getTecnologiasOferta(idOferta);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /tecnologias/oferta - Should return 201 when create a new TecnologiaOferta")
    void postTecnologiasOfertaSuccess(){
        TecnologiaOfertaTable tecnologiaOfertaTable = new TecnologiaOfertaTable();
        OfertasTable ofertasTable = new OfertasTable();
        ofertasTable.setIdOferta(1);
        tecnologiaOfertaTable.setOfertas(ofertasTable);

        Mockito.when(tecnologiaRepository.existsById(tecnologiaOfertaTable.getOfertas().getIdOferta())).thenReturn(true);

        ResponseEntity response = tecnologiaController.postTecnologiasOferta(tecnologiaOfertaTable, bindingResult);

        assertEquals(201, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /tecnologias/oferta - Should return 404 when Oferta does not exists")
    void postTecnologiasOfertaNotFound(){
        TecnologiaOfertaTable tecnologiaOfertaTable = new TecnologiaOfertaTable();
        OfertasTable ofertasTable = new OfertasTable();
        ofertasTable.setIdOferta(1);
        tecnologiaOfertaTable.setOfertas(ofertasTable);

        ResponseEntity response = tecnologiaController.postTecnologiasOferta(tecnologiaOfertaTable, bindingResult);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /tecnologias/oferta - Should return 422 when Validation is wrong")
    void postTecnologiasOfertaValidationError(){
        TecnologiaOfertaTable tecnologiaOfertaTable = new TecnologiaOfertaTable();

        Mockito.when(bindingResult.hasErrors()).thenReturn(true);

        ResponseEntity response = tecnologiaController.postTecnologiasOferta(tecnologiaOfertaTable, bindingResult);

        assertEquals(422, response.getStatusCodeValue());
    }
}
