package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.repository.ContratoRepository;
import br.com.hireit.projetohireIt.repository.DemandaRepository;
import br.com.hireit.projetohireIt.repository.OfertaRepository;
import br.com.hireit.projetohireIt.repository.PropostaRepository;
import br.com.hireit.projetohireIt.tables.ContratosTable;
import br.com.hireit.projetohireIt.tables.DemandasTable;
import br.com.hireit.projetohireIt.tables.OfertasTable;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class ContratoControllerTest {

    @Autowired
    ContratoController controller = new ContratoController();

    @MockBean
    private ContratoRepository contratoRepository;

    @MockBean
    private PropostaRepository propostaRepository;

    @MockBean
    private OfertaRepository ofertaRepository;

    @MockBean
    private DemandaRepository demandaRepository;

    @MockBean
    private BindingResult bindingResult;

    @Test
    @DisplayName("POST /contratos - Should return 201 when is successful")
    void postContratoSuccess(){
        OfertasTable ofertasTable = new OfertasTable();
        ofertasTable.setIdOferta(1);
        DemandasTable demandasTable = new DemandasTable();
        demandasTable.setIdDemanda(1);
        ContratosTable contratosTable = new ContratosTable(
                1,
                java.time.LocalDateTime.now(),
                java.time.LocalDateTime.now().plusDays(10),
                new BigDecimal(60.0),
                ofertasTable,
                demandasTable
        );

        Mockito.when(demandaRepository.existsById(demandasTable.getIdDemanda())).thenReturn(true);
        Mockito.when(ofertaRepository.existsById(ofertasTable.getIdOferta())).thenReturn(true);

        ResponseEntity response = controller.postContrato(contratosTable, bindingResult);
        assertEquals(201, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /contatos - Should return 422 when Validation is wrong")
    void postContratoValidationError(){
        ContratosTable contratosTable = new ContratosTable();

        Mockito.when(bindingResult.hasErrors()).thenReturn(true);

        ResponseEntity response = controller.postContrato(contratosTable, bindingResult);
        assertEquals(422, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /contratos - Should return 404 when Demanda or Oferta is not found")
    void postContratoNotFound(){
        OfertasTable ofertasTable = new OfertasTable();
        ofertasTable.setIdOferta(1);
        DemandasTable demandasTable = new DemandasTable();
        demandasTable.setIdDemanda(1);
        ContratosTable contratosTable = new ContratosTable(
                1,
                java.time.LocalDateTime.now(),
                java.time.LocalDateTime.now().plusDays(10),
                new BigDecimal(60.0),
                ofertasTable,
                demandasTable
        );

        ResponseEntity response = controller.postContrato(contratosTable, bindingResult);
        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("POST /contratos - Should return 400 when Contrato is already created")
    void postContratoAlreadyCreated(){
        OfertasTable ofertasTable = new OfertasTable();
        ofertasTable.setIdOferta(1);
        DemandasTable demandasTable = new DemandasTable();
        demandasTable.setIdDemanda(1);
        ContratosTable contratosTable = new ContratosTable(
                1,
                java.time.LocalDateTime.now(),
                java.time.LocalDateTime.now().plusDays(10),
                new BigDecimal(60.0),
                ofertasTable,
                demandasTable
        );
        List<ContratosTable> listReturn = Arrays.asList(new ContratosTable(), new ContratosTable());

        Mockito.when(demandaRepository.existsById(demandasTable.getIdDemanda())).thenReturn(true);
        Mockito.when(ofertaRepository.existsById(ofertasTable.getIdOferta())).thenReturn(true);
        Mockito.when(contratoRepository.findContratoByDemandaAndOferta(
                demandasTable.getIdDemanda(),
                ofertasTable.getIdOferta()
        )).thenReturn(listReturn);

        ResponseEntity response = controller.postContrato(contratosTable, bindingResult);
        assertEquals(400, response.getStatusCodeValue());
    }
}
