package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.auxiliar.ErrorHandler;
import br.com.hireit.projetohireIt.repository.*;
import br.com.hireit.projetohireIt.tables.ContratosTable;
import br.com.hireit.projetohireIt.tables.PropostasTable;
import br.com.hireit.projetohireIt.tables.TecnologiaDemandaTable;
import br.com.hireit.projetohireIt.tables.TecnologiasTable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/contratos")
public class ContratoController {

    private ErrorHandler error = new ErrorHandler();

    @Autowired
    private ContratoRepository contratoRepository;

    @Autowired
    private PropostaRepository propostaRepository;

    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private DemandaRepository demandaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private TecnologiaDemandaRepository tecnologiaDemandaRepository;

    @PostMapping
    public ResponseEntity postContrato(@Valid @RequestBody ContratosTable contrato, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(422).body(error.getErrors(bindingResult));
        }

        int fkDemanda = contrato.getDemandas().getIdDemanda();
        int fkOferta = contrato.getOfertas().getIdOferta();

        if(demandaRepository.existsById(fkDemanda) && ofertaRepository.existsById(fkOferta)){
            if(contratoRepository.findContratoByDemandaAndOferta(fkDemanda, fkOferta).isEmpty()){
                contrato.setDataInicio(java.time.LocalDateTime.now());
                contratoRepository.save(contrato);
            }else{
                return ResponseEntity.status(400).body("Esse contrato ja foi criado");
            }
        }else{
            return ResponseEntity.status(404).body("Demanda e oferta devem existir para criar um contrato");
        }

        List<PropostasTable> proposta = propostaRepository.findProposta(
                fkDemanda
        );

        propostaRepository.deleteAll(proposta);

        return ResponseEntity.status(201).build();
    }

    @GetMapping("/usuario-oferta/{idUsuario}")
    public ResponseEntity getContratosOferta(@PathVariable int idUsuario){
        if(usuarioRepository.existsById(idUsuario)){
            List<ContratosTable> listContrato = contratoRepository.findByOferta(idUsuario);

            if(listContrato.isEmpty()){
                return ResponseEntity.status(204).body("Usuário não possui contratos");
            }

            return ResponseEntity.status(200).body(listContrato);
        }

        return ResponseEntity.status(404).body("Usuário não existe");
    }

    @GetMapping("/usuario-demanda/{idUsuario}")
    public ResponseEntity getContratosDemanda(@PathVariable int idUsuario){
        if(usuarioRepository.existsById(idUsuario)){
            List<ContratosTable> listContrato = contratoRepository.findByDemanda(idUsuario);

            if(listContrato.isEmpty()){
                return ResponseEntity.status(204).body("Usuário não possui contratos");
            }

            return ResponseEntity.status(200).body(listContrato);
        }

        return ResponseEntity.status(404).body("Usuário não existe");
    }
    
    @GetMapping("/{idContrato}")
    public ResponseEntity getContratosById(@PathVariable int idContrato){
        if(contratoRepository.existsById(idContrato)){
            ContratosTable contrato = contratoRepository.findById(idContrato).get();

            if(contrato == null){
                return ResponseEntity.status(204).body("Esse contrato não existe");
            }

            return ResponseEntity.status(200).body(contrato);
        }

        return ResponseEntity.status(404).body("Usuário não existe");
    }

    @GetMapping("/tecnologias/demanda/{idContrato}")
    public ResponseEntity getTecnologiasDemandaByContratosId(@PathVariable int idContrato){
        ContratosTable contrato = contratoRepository.findById(idContrato).get();
        if(contrato != null){
            List<TecnologiaDemandaTable> listaTecnologias = tecnologiaDemandaRepository.findByFkdemanda(contrato.getDemandas().getIdDemanda());
            return ResponseEntity.status(200).body(listaTecnologias);
        }
        return ResponseEntity.status(204).body("Esse contrato não existe");
    }
}
