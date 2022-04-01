package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.auxiliar.ErrorHandler;
import br.com.hireit.projetohireIt.repository.*;
import br.com.hireit.projetohireIt.repository.SoftskillUsuarioRepository;
import br.com.hireit.projetohireIt.tables.SoftSkillDemandaTable;
import br.com.hireit.projetohireIt.tables.SoftSkillUsuarioTable;
import br.com.hireit.projetohireIt.tables.SoftSkillsTable;
import br.com.hireit.projetohireIt.tables.TecnologiaDemandaTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/softskills")
public class SoftskillController {

    private ErrorHandler error = new ErrorHandler();

    @Autowired
    private SoftskillRepository softskillRepository;

    @Autowired
    private SoftskillDemandaRepository softskillDemandaRepository;

    @Autowired
    private SoftskillUsuarioRepository softskillUsuarioRepository;

    @Autowired
    private DemandaRepository demandaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity getSoftskills(){
        List<SoftSkillsTable> listaSoftskills = softskillRepository.findAll();

        if(listaSoftskills.isEmpty()){
            return ResponseEntity.status(204).build();
        }else{
            return ResponseEntity.status(200).body(listaSoftskills);
        }

    }

    @PostMapping("/demanda")
    public ResponseEntity postDemandas(
            @Valid @RequestBody SoftSkillDemandaTable softSkillDemandaTable,
            BindingResult bindingResult
    ){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(422).body(error.getErrors(bindingResult));
        }

        if(softskillRepository.existsById(softSkillDemandaTable.getSoftskill().getIdSoftSkills())){
            if(demandaRepository.existsById(softSkillDemandaTable.getDemanda().getIdDemanda())){
                softskillDemandaRepository.save(softSkillDemandaTable);
                return ResponseEntity.status(201).build();
            }else{
                return ResponseEntity.status(404).body("Demanda não existe!");
            }
        }else{
            return ResponseEntity.status(404).body("Softskill não existe!");
        }
    }

    @PostMapping("/usuario")
    public ResponseEntity postSoftskillUsuario(
            @Valid @RequestBody SoftSkillUsuarioTable softSkillUsuarioTable,
            BindingResult bindingResult
    ){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(422).body(error.getErrors(bindingResult));
        }

        if(softskillRepository.existsById(softSkillUsuarioTable.getSoftskill().getIdSoftSkills())){
            if(usuarioRepository.existsById(softSkillUsuarioTable.getUsuario().getIdUsuario())){
                softskillUsuarioRepository.save(softSkillUsuarioTable);
                return ResponseEntity.status(201).build();
            }else{
                return ResponseEntity.status(404).body("Usuário não existe!");
            }
        }else{
            return ResponseEntity.status(404).body("Softskill não existe!");
        }
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity getSoftskillUsuario(@PathVariable int idUsuario){
        if(usuarioRepository.existsById(idUsuario)){
            List<SoftSkillUsuarioTable> listSoftskills = softskillUsuarioRepository.findByUsuario(idUsuario);

            if(listSoftskills.isEmpty()){
                return ResponseEntity.status(204).body("Usuário não possui softskills cadastradas");
            }else{
                return ResponseEntity.status(200).body(listSoftskills);
            }
        }

        return ResponseEntity.status(404).body("Usuário não existe");
    }
}
