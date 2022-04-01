package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.entity.MelhorOferta;
import br.com.hireit.projetohireIt.repository.*;
import br.com.hireit.projetohireIt.service.PropostaService;
import br.com.hireit.projetohireIt.tables.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

@SpringBootTest
public class PropostaControllerTest {

    @Autowired
    private PropostaController propostaController;

    @MockBean
    private PropostaService propostaService;

    @MockBean
    private PropostaRepository propostaRepository;

    @MockBean
    private DemandaRepository demandaRepository;

    @MockBean
    private OfertaRepository ofertaRepository;

    @MockBean
    private UsuarioRepository usuarioRepository;

    @MockBean
    private TecnologiaDemandaRepository tecnologiaDemandaRepository;

    @MockBean
    private TecnologiaOfertaRepository tecnologiaOfertaRepository;

    @MockBean
    private SoftskillDemandaRepository softskillDemandaRepository;

    @MockBean
    private SoftskillUsuarioRepository softskillUsuarioRepository;

//    @Test
//    @DisplayName("GET /propostas/{idDemanda} - Should return 200 when list is not empty")
//    void getPropostaSuccess(){
//        Optional<DemandasTable> demandasTable = Optional.of(new DemandasTable());
//        demandasTable.get().setIdDemanda(1);
//        UsuariosTable usuariosTable = new UsuariosTable();
//        usuariosTable.setIdUsuario(1);
//        usuariosTable.setClassificacao(new BigDecimal(5.0));
//        OfertasTable ofertasTable = new OfertasTable();
//        ofertasTable.setIdOferta(1);
//        ofertasTable.setUsuario(usuariosTable);
//        DemandasTable demandasPropostaTable = new DemandasTable();
//        demandasPropostaTable.setIdDemanda(1);
//        demandasPropostaTable.setUsuario(usuariosTable);
//        PropostasTable propostasTable = new PropostasTable();
//        propostasTable.setOferta(ofertasTable);
//        propostasTable.setDemanda(demandasPropostaTable);
//        List<PropostasTable> listPropostas = Arrays.asList(propostasTable, propostasTable);
//        List<TecnologiaDemandaTable> tecnologiaDemandaTable = Arrays.asList(new TecnologiaDemandaTable(), new TecnologiaDemandaTable());
//        List<TecnologiaOfertaTable> tecnologiaOfertaTable = Arrays.asList(new TecnologiaOfertaTable(), new TecnologiaOfertaTable());
//        List<SoftSkillDemandaTable> softSkillDemandaTable = Arrays.asList(new SoftSkillDemandaTable(), new SoftSkillDemandaTable());
//        List<SoftSkillUsuarioTable> softSkillUsuarioTable = Arrays.asList(new SoftSkillUsuarioTable(), new SoftSkillUsuarioTable());
//
//        Mockito.when(demandaRepository.existsById(demandasTable.get().getIdDemanda())).thenReturn(true);
//        Mockito.when(demandaRepository.findById(demandasTable.get().getIdDemanda())).thenReturn(demandasTable);
//        Mockito.when(propostaRepository.findByDemanda(demandasTable.get())).thenReturn(listPropostas);
//        Mockito.when(usuarioRepository.findUsuario(listPropostas.get(0).getOferta().getUsuario().getIdUsuario())).thenReturn(usuariosTable);
//
//        ResponseEntity response = propostaController.getPropostas(demandasTable.get().getIdDemanda());
//
//        assertEquals(200, response.getStatusCodeValue());
//    }

//    @Test
//    @DisplayName("GET /propostas/{idDemanda} - Should return 404 when demanda does not exists")
//    void getPropostaNotFound(){
//        int idDemanda = 1;
//
//        Mockito.when(demandaRepository.existsById(idDemanda)).thenReturn(false);
//
//        ResponseEntity response = propostaController.getPropostas(idDemanda);
//
//        assertEquals(404, response.getStatusCodeValue());
//    }

//    @Test
//    @DisplayName("GET /propostas/{idDemanda} - Should return 204 when demanda does not have propostas")
//    void getPropostaNoContent(){
//        Optional<DemandasTable> demandasTable = Optional.of(new DemandasTable());
//        demandasTable.get().setIdDemanda(1);
//
//        Mockito.when(demandaRepository.existsById(demandasTable.get().getIdDemanda())).thenReturn(true);
//        Mockito.when(demandaRepository.findById(demandasTable.get().getIdDemanda())).thenReturn(demandasTable);
//        Mockito.when(propostaRepository.findByDemanda(demandasTable.get())).thenReturn(new ArrayList<>());
//
//        ResponseEntity response = propostaController.getPropostas(demandasTable.get().getIdDemanda());
//
//        assertEquals(204, response.getStatusCodeValue());
//    }
    
    @Test
    @DisplayName("POST /propostas - Should return 201 when create a new proposta")
    void postPropostaCreated(){
        PropostasTable propostasTable = new PropostasTable();
        DemandasTable demandasTable = new DemandasTable();
        OfertasTable ofertasTable = new OfertasTable();
        ofertasTable.setIdOferta(1);
        demandasTable.setIdDemanda(1);
        propostasTable.setDemanda(demandasTable);
        propostasTable.setOferta(ofertasTable);

        Mockito.when(demandaRepository.existsById(propostasTable.getDemanda().getIdDemanda())).thenReturn(true);
        Mockito.when(ofertaRepository.existsById(propostasTable.getOferta().getIdOferta())).thenReturn(true);
        Mockito.when(propostaRepository.findPropostaByOfertaAndDemanda(
                propostasTable.getOferta().getIdOferta(),
                propostasTable.getDemanda().getIdDemanda()
        )).thenReturn(new ArrayList<>());

        ResponseEntity response = propostaController.postProposta(propostasTable);

        assertEquals(201, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /propostas - Should return 400 proposta has already been created")
    void postPropostaAlreadyCreated(){
        PropostasTable propostasTable = new PropostasTable();
        DemandasTable demandasTable = new DemandasTable();
        OfertasTable ofertasTable = new OfertasTable();
        ofertasTable.setIdOferta(1);
        demandasTable.setIdDemanda(1);
        propostasTable.setDemanda(demandasTable);
        propostasTable.setOferta(ofertasTable);

        Mockito.when(demandaRepository.existsById(propostasTable.getDemanda().getIdDemanda())).thenReturn(true);
        Mockito.when(ofertaRepository.existsById(propostasTable.getOferta().getIdOferta())).thenReturn(true);
        Mockito.when(propostaRepository.findPropostaByOfertaAndDemanda(
                propostasTable.getOferta().getIdOferta(),
                propostasTable.getDemanda().getIdDemanda()
        )).thenReturn(Arrays.asList(new PropostasTable(), new PropostasTable()));

        ResponseEntity response = propostaController.postProposta(propostasTable);

        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /propostas - Should return 404 when Demanda or Oferta was not found")
    void postPropostaNotFound(){
        PropostasTable propostasTable = new PropostasTable();
        DemandasTable demandasTable = new DemandasTable();
        demandasTable.setIdDemanda(1);
        propostasTable.setDemanda(demandasTable);

        Mockito.when(demandaRepository.existsById(propostasTable.getDemanda().getIdDemanda())).thenReturn(false);

        ResponseEntity response = propostaController.postProposta(propostasTable);

        assertEquals(404, response.getStatusCodeValue());
    }
}
