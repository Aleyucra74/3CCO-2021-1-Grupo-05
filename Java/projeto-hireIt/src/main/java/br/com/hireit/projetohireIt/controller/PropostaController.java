package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.entity.MelhorOferta;
import br.com.hireit.projetohireIt.repository.*;
import br.com.hireit.projetohireIt.service.PropostaService;
import br.com.hireit.projetohireIt.tables.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/propostas")
public class PropostaController {

    PropostaService propostaService = new PropostaService();

    @Autowired
    private PropostaRepository propostaRepository;

    @Autowired
    private DemandaRepository demandaRepository;

    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TecnologiaDemandaRepository tecnologiaDemandaRepository;

    @Autowired
    private TecnologiaOfertaRepository tecnologiaOfertaRepository;

    @Autowired
    private SoftskillDemandaRepository softskillDemandaRepository;

    @Autowired
    private SoftskillUsuarioRepository softskillUsuarioRepository;

    @PostMapping
    public ResponseEntity postProposta(@RequestBody PropostasTable proposta){
        if(demandaRepository.existsById(proposta.getDemanda().getIdDemanda()) && ofertaRepository.existsById(proposta.getOferta().getIdOferta())){
            List<PropostasTable> listPropostas = propostaRepository.findPropostaByOfertaAndDemanda(
                    proposta.getOferta().getIdOferta(),
                    proposta.getDemanda().getIdDemanda()
            );

            if(listPropostas.isEmpty()){
                propostaRepository.save(proposta);
                return ResponseEntity.status(201).body("Proposta enviada");
            }else{
                return ResponseEntity.status(400).body("Proposta já criada");
            }
        }else{
            return ResponseEntity.status(404).body("Para realizar proposta deve existir demanda e oferta");
        }
    }

    @GetMapping("/demanda/{idDemanda}")
    public ResponseEntity getPropostasProjeto(@PathVariable int idDemanda){

        if(demandaRepository.existsById(idDemanda)){
            List<MelhorOferta> melhoresOfertas = new ArrayList<>();
            List<PropostasTable> propostas = propostaRepository.findByDemanda(demandaRepository.findById(idDemanda).get());

            if(propostas.isEmpty()){
                return ResponseEntity.status(204).build();
            }

            for(PropostasTable proposta: propostas){
                UsuariosTable usuario = usuarioRepository.findUsuario(proposta.getOferta().getUsuario().getIdUsuario());

                List<TecnologiaDemandaTable> tecnologiasDemanda = tecnologiaDemandaRepository.findByFkdemanda(
                        proposta.getDemanda().getIdDemanda()
                );

                List<TecnologiaOfertaTable> tecnologiasOferta = tecnologiaOfertaRepository.findByFkoferta(
                        proposta.getOferta().getIdOferta()
                );

                List<SoftSkillDemandaTable> softskillsDemanda = softskillDemandaRepository.findByFkdemanda(
                        proposta.getDemanda().getIdDemanda()
                );

                List<SoftSkillUsuarioTable> softskillsOferta = softskillUsuarioRepository.findByFkoferta(
                        proposta.getOferta().getIdOferta()
                );

                melhoresOfertas.add(
                        propostaService.calcularMatch(
                                proposta,
                                usuario,
                                tecnologiasDemanda,
                                tecnologiasOferta,
                                softskillsDemanda,
                                softskillsOferta
                        )
                );
            }

            return ResponseEntity.status(200).body(melhoresOfertas);
        }else{
            return ResponseEntity.status(404).build();
        }

    }

    @GetMapping("/oferta/{idOferta}")
    public ResponseEntity getPropostasFreelancer(@PathVariable int idOferta){ //TODO: POR ALGUM MOTIVO N TA PEGANDO DEMANDA (ERRO NA PROPOSTA DE FREELANCER)

        if(ofertaRepository.existsById(idOferta)){
            List<MelhorOferta> melhoresOfertas = new ArrayList<>();
            List<PropostasTable> propostas = propostaRepository.findByOferta(ofertaRepository.findById(idOferta).get());

            if(propostas.isEmpty()){
                return ResponseEntity.status(204).build();
            }

            for(PropostasTable proposta: propostas){
                UsuariosTable usuario = proposta.getDemanda().getUsuario();

                List<TecnologiaDemandaTable> tecnologiasDemanda = tecnologiaDemandaRepository.findByFkdemanda(
                        proposta.getDemanda().getIdDemanda()
                );

                List<TecnologiaOfertaTable> tecnologiasOferta = tecnologiaOfertaRepository.findByFkoferta(
                        proposta.getOferta().getIdOferta()
                );

                List<SoftSkillDemandaTable> softskillsDemanda = softskillDemandaRepository.findByFkdemanda(
                        proposta.getDemanda().getIdDemanda()
                );

                List<SoftSkillUsuarioTable> softskillsOferta = softskillUsuarioRepository.findByFkoferta(
                        proposta.getOferta().getIdOferta()
                );

                melhoresOfertas.add(
                        propostaService.calcularMatch(
                                proposta,
                                usuario,
                                tecnologiasDemanda,
                                tecnologiasOferta,
                                softskillsDemanda,
                                softskillsOferta
                        )
                );
            }

            return ResponseEntity.status(200).body(melhoresOfertas);
        }else{
            return ResponseEntity.status(404).build();
        }

    }

}
