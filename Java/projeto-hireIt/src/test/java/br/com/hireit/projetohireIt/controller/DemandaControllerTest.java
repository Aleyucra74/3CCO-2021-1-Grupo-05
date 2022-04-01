package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.entity.Filtro;
import br.com.hireit.projetohireIt.entity.PostDemanda;
import br.com.hireit.projetohireIt.repository.BuscaRepository;
import br.com.hireit.projetohireIt.repository.DemandaRepository;
import br.com.hireit.projetohireIt.repository.SoftskillDemandaRepository;
import br.com.hireit.projetohireIt.repository.TecnologiaDemandaRepository;
import br.com.hireit.projetohireIt.service.DemandaService;
import br.com.hireit.projetohireIt.tables.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class DemandaControllerTest {

    @Autowired
    DemandaController demandaController = new DemandaController();

    @MockBean
    private DemandaService demandaService;

    @MockBean
    private DemandaRepository demandaRepository;

    @MockBean
    private BuscaRepository buscaRepository;

    @MockBean
    private TecnologiaDemandaRepository tecnologiaDemandaRepository;

    @MockBean
    private SoftskillDemandaRepository softskillDemandaRepository;

    @MockBean
    private BindingResult bindingResult;

    @Test
    @DisplayName("GET /demandas - Should return 200 when list is not empty")
    void getDemandasSuccess(){
        List<DemandasTable> listDemanda = Arrays.asList(new DemandasTable(), new DemandasTable(), new DemandasTable());

        Mockito.when(demandaRepository.findAll()).thenReturn(listDemanda);

        ResponseEntity response = demandaController.getDemandas();

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /demandas - Should return 204 when list is empty")
    void getDemandasNoContent(){
        Mockito.when(demandaRepository.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity response = demandaController.getDemandas();

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /demandas/{idDemanda} - Should return 200 when register exists")
    void getDemandaSuccess(){
        int id = 1;

        Mockito.when(demandaRepository.existsById(id)).thenReturn(true);

        ResponseEntity response = demandaController.getDemanda(id);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /demandas/{idDemanda} - Should return 204 when register do not exists")
    void getDemandaNoContent(){
        int id = 1;

        Mockito.when(demandaRepository.existsById(id)).thenReturn(false);

        ResponseEntity response = demandaController.getDemanda(id);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /demandas/usuario/{idUsuario} - Should return 200 when user have Demandas register")
    void getDemandasUsuarioSuccess(){
        int id = 1;
        List<DemandasTable> listDemanda = Arrays.asList(new DemandasTable(), new DemandasTable(), new DemandasTable());

        Mockito.when(demandaRepository.findAllByUsuario(id)).thenReturn(listDemanda);

        ResponseEntity response = demandaController.getDemandasUsuario(id);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /demandas/usuario/{idUsuario} - Should return 204 when user have no Demandas register")
    void getDemandasUsuarioNoContent(){
        int id = 1;

        Mockito.when(demandaRepository.findAllByUsuario(id)).thenReturn(new ArrayList<>());

        ResponseEntity response = demandaController.getDemandasUsuario(id);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /demandas/filtro - Should return 200 when exists register using this filter")
    void getDemandaFiltradoSuccess(){
        Filtro filtro = new Filtro();
        filtro.setTecnologia("Java");
        filtro.setTitulo("Primeira demanda");
        BuscasTable buscasTable = new BuscasTable();
        List<DemandasTable> list = Arrays.asList(new DemandasTable(), new DemandasTable());
        Filtro filtrado = new Filtro();
        filtrado.setTecnologia("%Java%");
        filtrado.setTitulo("%Primeira demanda%");
        filtrado.setData("01/01/1900");
        filtrado.setSalarioMin(0.0);
        filtrado.setSalarioMax(1000000.0);
        filtrado.setUsuario("%%");
        filtrado.setUF("%%");

        LocalDateTime data = java.time.LocalDateTime.now();
        String hoje = data.getMonthValue() + "/" + (data.getDayOfMonth()+1) +"/"+ data.getYear();

        Mockito.when(buscaRepository.findByTecnologiaAndTipo(filtro.getTecnologia(), "Demanda")).thenReturn(buscasTable);
        Mockito.when(demandaRepository.findWhere(
                filtrado.getUF(),
                filtrado.getTitulo(),
                filtrado.getData(),
                hoje,
                filtrado.getSalarioMin(),
                filtrado.getSalarioMax(),
                filtrado.getUsuario(),
                filtrado.getTecnologia(),
                filtrado.getExperiencia()
        )).thenReturn(list);

        ResponseEntity response = demandaController.getDemandaFiltrado(filtro);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /demandas/filtro - Should return 204 when does not exists register using this filter")
    void getDemandaFiltradoNoContent(){
        Filtro filtro = new Filtro();
        filtro.setTecnologia("Java");
        filtro.setTitulo("Primeira demanda");
        BuscasTable buscasTable = new BuscasTable();
        Filtro filtrado = new Filtro();
        filtrado.setTecnologia("%Java%");
        filtrado.setTitulo("%Primeira demanda%");
        filtrado.setData("01/01/1900");
        filtrado.setSalarioMin(0.0);
        filtrado.setSalarioMax(1000000.0);
        filtrado.setUsuario("%%");
        filtrado.setUF("%%");

        LocalDateTime data = java.time.LocalDateTime.now();
        String hoje = data.getMonthValue() + "/" + (data.getDayOfMonth()+1) +"/"+ data.getYear();

        Mockito.when(buscaRepository.findByTecnologiaAndTipo(filtro.getTecnologia(), "Demanda")).thenReturn(buscasTable);
        Mockito.when(demandaRepository.findWhere(
                filtrado.getUF(),
                filtrado.getTitulo(),
                filtrado.getData(),
                hoje,
                filtrado.getSalarioMin(),
                filtrado.getSalarioMax(),
                filtrado.getUsuario(),
                filtrado.getTecnologia(),
                filtrado.getExperiencia()
        )).thenReturn(new ArrayList<>());

        ResponseEntity response = demandaController.getDemandaFiltrado(filtro);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /demandas/softskills/{fkDemanda} - Should return 200 when Demanda has softskills")
    void getSoftskillSuccess(){
        int fkDemanda = 1;
        List<SoftSkillDemandaTable> listSoftskills = Arrays.asList(new SoftSkillDemandaTable(), new SoftSkillDemandaTable());

        Mockito.when(softskillDemandaRepository.findByFkdemanda(fkDemanda)).thenReturn(listSoftskills);

        ResponseEntity response = demandaController.getSoftskill(fkDemanda);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /demandas/softskills/{fkDemanda} - Should return 200 when Demanda does not have softskills")
    void getSoftskillNoContent(){
        int fkDemanda = 1;

        Mockito.when(softskillDemandaRepository.findByFkdemanda(fkDemanda)).thenReturn(new ArrayList<>());

        ResponseEntity response = demandaController.getSoftskill(fkDemanda);

        assertEquals(204, response.getStatusCodeValue());
    }

//    @Test
//    @DisplayName("POST /demandas - Should return 201 when a new Demanda is created")
//    void postDemandasCreated(){
//        PostDemanda postDemanda = new PostDemanda();
//        postDemanda.setDemandas(new DemandasTable());
//        postDemanda.setTecnologias(Arrays.asList(new TecnologiaDemandaTable(), new TecnologiaDemandaTable()));
//        postDemanda.setSoftskills(Arrays.asList(new SoftSkillDemandaTable(), new SoftSkillDemandaTable()));
//
//        ResponseEntity response = demandaController.postDemandas(postDemanda, bindingResult);
//
//        assertEquals(201, response.getStatusCodeValue());
//    }

//    @Test
//    @DisplayName("POST /demandas - Should return 422 when Validation is wrong")
//    void postDemandasValidationError(){
//        Mockito.when(bindingResult.hasErrors()).thenReturn(true);
//
//        ResponseEntity response = demandaController.postDemandas(new PostDemanda(), bindingResult);
//
//        assertEquals(422, response.getStatusCodeValue());
//    }
}
