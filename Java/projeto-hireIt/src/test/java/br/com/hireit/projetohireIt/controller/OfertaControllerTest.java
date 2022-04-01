package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.entity.Filtro;
import br.com.hireit.projetohireIt.entity.PostOferta;
import br.com.hireit.projetohireIt.repository.BuscaRepository;
import br.com.hireit.projetohireIt.repository.OfertaRepository;
import br.com.hireit.projetohireIt.repository.TecnologiaOfertaRepository;
import br.com.hireit.projetohireIt.tables.BuscasTable;
import br.com.hireit.projetohireIt.tables.OfertasTable;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class OfertaControllerTest {

    @Autowired
    private OfertaController ofertaController;

    @MockBean
    private OfertaRepository ofertaRepository;

    @MockBean
    private BuscaRepository buscaRepository;

    @MockBean
    private TecnologiaOfertaRepository tecnologiaOfertaRepository;

    @MockBean
    private BindingResult bindingResult;

    @Test
    @DisplayName("GET /ofertas - Should return 200 when list is not empty")
    void getOfertasSuccess(){
        List<OfertasTable> listOfertas = Arrays.asList(new OfertasTable(), new OfertasTable());

        Mockito.when(ofertaRepository.findAll()).thenReturn(listOfertas);

        ResponseEntity response = ofertaController.getOfertas();

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /ofertas - Should return 204 when list is empty")
    void getOfertasNoContent(){
        Mockito.when(ofertaRepository.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity response = ofertaController.getOfertas();

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /ofertas/{idOferta} - Should return 200 when Oferta exists")
    void getOfertaSuccess(){
        int id = 1;

        Mockito.when(ofertaRepository.existsById(id)).thenReturn(true);

        ResponseEntity response = ofertaController.getOferta(id);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /ofertas/{idOferta} - Should return 204 when Oferta does not exists")
    void getOfertaNoContent(){
        int id = 1;

        Mockito.when(ofertaRepository.existsById(id)).thenReturn(false);

        ResponseEntity response = ofertaController.getOferta(id);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /ofertas/usuario/{idUsuario} - Should return 200 when Usuario have Oferta")
    void getOfertasUsuarioSuccess(){
        int id = 1;

        Mockito.when(ofertaRepository.findAllByUsuario(id)).thenReturn(Arrays.asList(new OfertasTable(), new OfertasTable()));

        ResponseEntity response = ofertaController.getOfertasUsuario(id);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /ofertas/usuario/{idUsuario} - Should return 204 when Usuario does not have Oferta")
    void getOfertasUsuarioNoContent(){
        int id = 1;

        Mockito.when(ofertaRepository.findAllByUsuario(id)).thenReturn(new ArrayList<>());

        ResponseEntity response = ofertaController.getOfertasUsuario(id);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /oferta/filtro - Should return 200 when exists register using this filter")
    void getOfertaFiltradoSuccess(){
        Filtro filtro = new Filtro();
        filtro.setTecnologia("Java");
        filtro.setTitulo("Primeira demanda");
        BuscasTable buscasTable = new BuscasTable();
        List<OfertasTable> list = Arrays.asList(new OfertasTable(), new OfertasTable());
        Filtro filtrado = new Filtro();
        filtrado.setTecnologia("%Java%");
        filtrado.setData("01/01/1900");
        filtrado.setUsuario("%%");
        filtrado.setUF("%%");

        LocalDateTime data = java.time.LocalDateTime.now();
        String hoje = data.getMonthValue() + "/" + (data.getDayOfMonth()+1) +"/"+ data.getYear();

        Mockito.when(buscaRepository.findByTecnologiaAndTipo(filtro.getTecnologia(), "Demanda")).thenReturn(buscasTable);
        Mockito.when(ofertaRepository.findWhere(
                filtrado.getUF(),
                filtrado.getData(),
                hoje,
                filtrado.getUsuario(),
                filtrado.getTecnologia(),
                filtrado.getExperiencia()
        )).thenReturn(list);

        ResponseEntity response = ofertaController.getOfertaFiltrado(filtro);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /oferta/filtro - Should return 204 when exists register using this filter")
    void getOfertaFiltradoNoContent(){
        Filtro filtro = new Filtro();
        filtro.setTecnologia("Java");
        filtro.setTitulo("Primeira demanda");
        BuscasTable buscasTable = new BuscasTable();
        Filtro filtrado = new Filtro();
        filtrado.setTecnologia("%Java%");
        filtrado.setData("01/01/1900");
        filtrado.setUsuario("%%");
        filtrado.setUF("%%");

        LocalDateTime data = java.time.LocalDateTime.now();
        String hoje = data.getMonthValue() + "/" + (data.getDayOfMonth()+1) +"/"+ data.getYear();

        Mockito.when(buscaRepository.findByTecnologiaAndTipo(filtro.getTecnologia(), "Demanda")).thenReturn(buscasTable);
        Mockito.when(ofertaRepository.findWhere(
                filtrado.getUF(),
                filtrado.getData(),
                hoje,
                filtrado.getUsuario(),
                filtrado.getTecnologia(),
                filtrado.getExperiencia()
        )).thenReturn(new ArrayList<>());

        ResponseEntity response = ofertaController.getOfertaFiltrado(filtro);

        assertEquals(204, response.getStatusCodeValue());
    }

    /*@Test
    @DisplayName("POST /oferta - Should return 202 when Validation is wrong")
    void postOfertasAccepted(){
        PostOferta postOferta = new PostOferta();
        postOferta.setOferta(new OfertasTable());

        ResponseEntity response = ofertaController.postOfertas(postOferta, bindingResult);

        assertEquals(202, response.getStatusCodeValue());
    }*/

    @Test
    @DisplayName("POST /oferta - Should return 422 when Validation is wrong")
    void postOfertasValidationError(){
        Mockito.when(bindingResult.hasErrors()).thenReturn(true);

        ResponseEntity response = ofertaController.postOfertas(new PostOferta(), bindingResult);

        assertEquals(422, response.getStatusCodeValue());
    }
}
