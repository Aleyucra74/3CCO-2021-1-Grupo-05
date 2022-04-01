package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.repository.*;
import br.com.hireit.projetohireIt.tables.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class AvaliacaoControllerTest {

    @Autowired
    private AvaliacaoController avaliacaoController;

    @MockBean
    private AvaliacaoOfertaRepository avaliacaoOfertaRepository;

    @MockBean
    private AvaliacaoDemandaRepository avaliacaoDemandaRepository;

    @MockBean
    private UsuarioRepository usuarioRepository;

    @MockBean
    private OfertaRepository ofertaRepository;

    @MockBean
    private DemandaRepository demandaRepository;

    @MockBean
    private BindingResult bindingResult;

    @Test
    @DisplayName("GET /avaliacoes/usuario/{idUsuario} - Should return 200 when is successful")
    void getAvaliacoesSuccess(){
        int idUsuario = 1;
        List<AvaliacaoDemanda> avaliacaoDemandaList = Arrays.asList(new AvaliacaoDemanda(), new AvaliacaoDemanda());
        List<AvaliacaoOferta> avaliacaoOfertaList = Arrays.asList(new AvaliacaoOferta(), new AvaliacaoOferta());

        Mockito.when(usuarioRepository.existsById(1)).thenReturn(true);
        Mockito.when(avaliacaoDemandaRepository.findByUsuario(idUsuario)).thenReturn(avaliacaoDemandaList);
        Mockito.when(avaliacaoOfertaRepository.findByUsuario(idUsuario)).thenReturn(avaliacaoOfertaList);

        ResponseEntity response = avaliacaoController.getAvaliacoes(idUsuario);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /avaliacoes/usuario/{idUsuario} - Should return 200 when there is just one list empty is successful")
    void getAvaliacoesSuccessOneList(){
        int idUsuario = 1;
        List<AvaliacaoDemanda> avaliacaoDemandaList = Arrays.asList(new AvaliacaoDemanda(), new AvaliacaoDemanda());

        Mockito.when(usuarioRepository.existsById(1)).thenReturn(true);
        Mockito.when(avaliacaoDemandaRepository.findByUsuario(idUsuario)).thenReturn(avaliacaoDemandaList);
        Mockito.when(avaliacaoOfertaRepository.findByUsuario(idUsuario)).thenReturn(new ArrayList<>());

        ResponseEntity response = avaliacaoController.getAvaliacoes(idUsuario);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /avaliacoes/usuario/{idUsuario} - Should return 204 when both lists are empty")
    void getAvaliacoesNoContent(){
        int idUsuario = 1;

        Mockito.when(usuarioRepository.existsById(1)).thenReturn(true);
        Mockito.when(avaliacaoDemandaRepository.findByUsuario(idUsuario)).thenReturn(new ArrayList<>());
        Mockito.when(avaliacaoOfertaRepository.findByUsuario(idUsuario)).thenReturn(new ArrayList<>());

        ResponseEntity response = avaliacaoController.getAvaliacoes(idUsuario);

        assertEquals(204, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /avaliacoes/usuario/{idUsuario} - Should return 404 when usuario does not exists")
    void getAvaliacoesNotFound(){
        int idUsuario = 1;

        Mockito.when(usuarioRepository.existsById(1)).thenReturn(false);

        ResponseEntity response = avaliacaoController.getAvaliacoes(idUsuario);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /avaliacoes/oferta - Should return 201 when a new AvaliacaoOferta is created")
    void postAvaliacaoOfertaCreated(){
        AvaliacaoOferta avaliacaoOferta = new AvaliacaoOferta();
        OfertasTable ofertasTable = new OfertasTable();
        UsuariosTable usuariosTable = new UsuariosTable();
        usuariosTable.setIdUsuario(1);
        usuariosTable.setClassificacao(new BigDecimal(5.0));
        ofertasTable.setUsuario(usuariosTable);
        ofertasTable.setIdOferta(1);
        avaliacaoOferta.setOfertas(ofertasTable);
        avaliacaoOferta.setNotaTecnica(new BigDecimal(5.0));
        avaliacaoOferta.setNotaSoftskill(new BigDecimal(5.0));

        Mockito.when(bindingResult.hasErrors()).thenReturn(false);
        Mockito.when(ofertaRepository.existsById(ofertasTable.getIdOferta())).thenReturn(true);
        Mockito.when(ofertaRepository.findById(ofertasTable.getIdOferta())).thenReturn(Optional.of(ofertasTable));
        Mockito.when(usuarioRepository.findById(usuariosTable.getIdUsuario())).thenReturn(Optional.of(usuariosTable));

        ResponseEntity response = avaliacaoController.postAvaliacaoOferta(avaliacaoOferta, bindingResult);

        assertEquals(201, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /avaliacoes/oferta - Should return 404 when Oferta was not found")
    void postAvaliacaoOfertaNotFound(){
        AvaliacaoOferta avaliacaoOferta = new AvaliacaoOferta();
        OfertasTable ofertasTable = new OfertasTable();
        ofertasTable.setIdOferta(1);
        avaliacaoOferta.setOfertas(ofertasTable);

        Mockito.when(bindingResult.hasErrors()).thenReturn(false);
        Mockito.when(ofertaRepository.existsById(ofertasTable.getIdOferta())).thenReturn(false);

        ResponseEntity response = avaliacaoController.postAvaliacaoOferta(avaliacaoOferta, bindingResult);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /avaliacoes/oferta - Should return 422 when AvaliacaoOferta validation is wrong")
    void postAvaliacaoOfertaValidationError(){
        AvaliacaoOferta avaliacaoOferta = new AvaliacaoOferta();

        Mockito.when(bindingResult.hasErrors()).thenReturn(true);

        ResponseEntity response = avaliacaoController.postAvaliacaoOferta(avaliacaoOferta, bindingResult);

        assertEquals(422, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /avaliacoes/demanda - Should return 201 when a new AvaliacaoDemanda is created")
    void postAvaliacaoDemandaCreated(){
        AvaliacaoDemanda avaliacaoDemanda = new AvaliacaoDemanda();
        DemandasTable demandasTable = new DemandasTable();
        UsuariosTable usuariosTable = new UsuariosTable();
        usuariosTable.setIdUsuario(1);
        usuariosTable.setClassificacao(new BigDecimal(5.0));
        demandasTable.setUsuario(usuariosTable);
        demandasTable.setIdDemanda(1);
        avaliacaoDemanda.setDemandas(demandasTable);
        avaliacaoDemanda.setNota(new BigDecimal(5.0));

        Mockito.when(bindingResult.hasErrors()).thenReturn(false);
        Mockito.when(demandaRepository.existsById(demandasTable.getIdDemanda())).thenReturn(true);
        Mockito.when(avaliacaoDemandaRepository.findByDemanda(demandasTable.getIdDemanda())).thenReturn(new ArrayList<>());
        Mockito.when(demandaRepository.findById(demandasTable.getIdDemanda())).thenReturn(Optional.of(demandasTable));
        Mockito.when(usuarioRepository.findById(usuariosTable.getIdUsuario())).thenReturn(Optional.of(usuariosTable));

        ResponseEntity response = avaliacaoController.postAvaliacaoDemanda(avaliacaoDemanda, bindingResult);

        assertEquals(201, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /avaliacoes/demanda - Should return 400 when a new AvaliacaoDemanda list is not empty")
    void postAvaliacaoDemandaListNotEmpty(){
        AvaliacaoDemanda avaliacaoDemanda = new AvaliacaoDemanda();
        DemandasTable demandasTable = new DemandasTable();
        demandasTable.setIdDemanda(1);
        avaliacaoDemanda.setDemandas(demandasTable);

        Mockito.when(bindingResult.hasErrors()).thenReturn(false);
        Mockito.when(demandaRepository.existsById(demandasTable.getIdDemanda())).thenReturn(true);
        Mockito.when(avaliacaoDemandaRepository.findByDemanda(demandasTable.getIdDemanda())).thenReturn(Arrays.asList(new AvaliacaoDemanda()));

        ResponseEntity response = avaliacaoController.postAvaliacaoDemanda(avaliacaoDemanda, bindingResult);

        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /avaliacoes/demanda - Should return 404 when Demanda was not found")
    void postAvaliacaoDemandaNotFound(){
        AvaliacaoDemanda avaliacaoDemanda = new AvaliacaoDemanda();
        DemandasTable demandasTable = new DemandasTable();
        demandasTable.setIdDemanda(1);
        avaliacaoDemanda.setDemandas(demandasTable);

        Mockito.when(bindingResult.hasErrors()).thenReturn(false);
        Mockito.when(ofertaRepository.existsById(demandasTable.getIdDemanda())).thenReturn(false);

        ResponseEntity response = avaliacaoController.postAvaliacaoDemanda(avaliacaoDemanda, bindingResult);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /avaliacoes/demanda - Should return 422 when AvaliacaoDemanda validation is wrong")
    void postAvaliacaoDemandaValidationError(){
        AvaliacaoDemanda avaliacaoDemanda = new AvaliacaoDemanda();

        Mockito.when(bindingResult.hasErrors()).thenReturn(true);

        ResponseEntity response = avaliacaoController.postAvaliacaoDemanda(avaliacaoDemanda, bindingResult);

        assertEquals(422, response.getStatusCodeValue());
    }
}
