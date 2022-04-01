package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.auxiliar.ErrorHandler;
import br.com.hireit.projetohireIt.auxiliar.ListaLigada;
import br.com.hireit.projetohireIt.entity.CacheObject;
import br.com.hireit.projetohireIt.entity.Filtro;
import br.com.hireit.projetohireIt.entity.PostDemanda;
import br.com.hireit.projetohireIt.repository.*;
import br.com.hireit.projetohireIt.service.CacheService;
import br.com.hireit.projetohireIt.service.DemandaService;
import br.com.hireit.projetohireIt.service.NotificacaoService;
import br.com.hireit.projetohireIt.tables.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/demandas")
public class DemandaController {

    private Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    private DemandaService demandaService = new DemandaService();
    private ErrorHandler error = new ErrorHandler();

    @Autowired
    private DemandaRepository demandaRepository;

    @Autowired
    private BuscaRepository buscaRepository;

    @Autowired
    private TecnologiaDemandaRepository tecnologiaDemandaRepository;

    @Autowired
    private SoftskillDemandaRepository softskillDemandaRepository;

    @Autowired
    private CacheService cacheService;

    @Autowired
    private NotificacaoService notificacaoService;

    @GetMapping
    public ResponseEntity getDemandas(){
        List<DemandasTable> listaDemandas = demandaRepository.findAll();
        if(listaDemandas.isEmpty()){
            return ResponseEntity.status(204).build();
        }else{
            return ResponseEntity.status(200).body(listaDemandas);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getDemanda(@PathVariable int id){
        if(demandaRepository.existsById(id)){
            return ResponseEntity.status(200).body(demandaRepository.findById(id));
        }else{
            return ResponseEntity.status(204).build();
        }

    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity getDemandasUsuario(@PathVariable int idUsuario){
        List<DemandasTable> listaDemandas = demandaRepository.findAllByUsuario(idUsuario);
        if(listaDemandas.isEmpty()){
            return ResponseEntity.status(204).build();
        }else{
            return ResponseEntity.status(200).body(listaDemandas);
        }

    }

    @GetMapping("/filtro")
    public ResponseEntity getDemandaFiltrado(@RequestBody Filtro filtro){
        BuscasTable busca = buscaRepository.findByTecnologiaAndTipo(filtro.getTecnologia(), "Demanda");
        if (busca != null) {
            busca.setQuantidade(busca.getQuantidade()+1);
            buscaRepository.save(busca);
        }

        Filtro filtrado = demandaService.filtrarDemanda(filtro);

        LocalDateTime data = java.time.LocalDateTime.now();
        String hoje = data.getMonthValue() + "/" + (data.getDayOfMonth()+1) +"/"+ data.getYear();

        List<DemandasTable> listaDemandas = demandaRepository.findWhere(
                filtrado.getUF(),
                filtrado.getTitulo(),
                filtrado.getData(),
                hoje,
                filtrado.getSalarioMin(),
                filtrado.getSalarioMax(),
                filtrado.getUsuario(),
                filtrado.getTecnologia(),
                filtrado.getExperiencia()
        );

        if(listaDemandas.isEmpty()){
            return ResponseEntity.status(204).build();
        }else{
            return ResponseEntity.status(200).body(listaDemandas);
        }

    }

    @PostMapping
    public ResponseEntity postDemandas(@Valid @RequestBody DemandasTable demandasTable, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(422).body(error.getErrors(bindingResult));
        }

        demandasTable.setCreatedAt(java.time.LocalDateTime.now());
        DemandasTable demanda = demandaRepository.save(demandasTable);
        List<String> tecnologias = new ArrayList<>();

        String uf = demandaRepository.findUfByUsuario(demandasTable.getUsuario().getIdUsuario());

        cacheService.addProjeto(new CacheObject(
                demanda.getIdDemanda(),
                demanda.getTitulo(),
                demanda.getDescricao(),
                demanda.getCreatedAt().toString(),
                tecnologias
        ), uf);

        return ResponseEntity.status(201).body("Projeto criado com sucesso!");
    }

    @GetMapping("/softskill/{fkDemanda}")
    public ResponseEntity getSoftskill(@PathVariable int fkDemanda){
        List<SoftSkillDemandaTable> listaSoftskillsDemanda = softskillDemandaRepository.findByFkdemanda(fkDemanda);
        if(listaSoftskillsDemanda.isEmpty()){
            return ResponseEntity.status(204).build();
        }else{
            return ResponseEntity.status(200).body(listaSoftskillsDemanda);
        }
    }

    @GetMapping("/uf/{uf}")
    public ResponseEntity getByUf(@PathVariable String uf){
        List<CacheObject> listaDemandas = cacheService.retornaLista(uf);

        if(listaDemandas.isEmpty()){
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(200).body(listaDemandas);
    }

}
