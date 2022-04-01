package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.auxiliar.ErrorHandler;
import br.com.hireit.projetohireIt.entity.Avaliacoes;
import br.com.hireit.projetohireIt.repository.*;
import br.com.hireit.projetohireIt.tables.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {

    private ErrorHandler error = new ErrorHandler();

    @Autowired
    private AvaliacaoOfertaRepository avaliacaoOfertaRepository;

    @Autowired
    private AvaliacaoDemandaRepository avaliacaoDemandaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private DemandaRepository demandaRepository;

    @PostMapping("/oferta")
    public ResponseEntity postAvaliacaoOferta(@Valid @RequestBody AvaliacaoOferta avaliacaoOferta, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(422).body(error.getErrors(bindingResult));
        }

        if(ofertaRepository.existsById(avaliacaoOferta.getOfertas().getIdOferta())){
            OfertasTable ofertasTable = ofertaRepository.findById(avaliacaoOferta.getOfertas().getIdOferta()).get();
            UsuariosTable usuariosTable = ofertasTable.getUsuario();
            BigDecimal classificacao = usuarioRepository.findById(usuariosTable.getIdUsuario()).get().getClassificacao();

            int avaliacoesDemanda = avaliacaoDemandaRepository.countByUsuario(usuariosTable.getIdUsuario());
            int avaliacoesOferta = avaliacaoOfertaRepository.countByUsuario(usuariosTable.getIdUsuario());
            int quantidadeAvaliacoes = avaliacoesDemanda + avaliacoesOferta;

            Double notaTotal = Double.parseDouble(String.valueOf(classificacao)) * quantidadeAvaliacoes;
            Double somaNotas =
                    (
                    Double.parseDouble(String.valueOf(avaliacaoOferta.getNotaSoftskill())) +
                            Double.parseDouble(String.valueOf(avaliacaoOferta.getNotaTecnica()))
                     )/2;
            notaTotal += somaNotas;
            quantidadeAvaliacoes++;
            BigDecimal notaNova = BigDecimal.valueOf(notaTotal/quantidadeAvaliacoes);

            avaliacaoOferta.setData(java.time.LocalDateTime.now());
            usuariosTable.setClassificacao(notaNova);
            usuarioRepository.save(usuariosTable);
            avaliacaoOfertaRepository.save(avaliacaoOferta);
        }else{
            return ResponseEntity.status(404).body("Oferta deve existir para criar uma avaliação");
        }

        return ResponseEntity.status(201).build();
    }

    @PostMapping("/demanda")
    public ResponseEntity postAvaliacaoDemanda(@Valid @RequestBody AvaliacaoDemanda avaliacaoDemanda, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(422).body(error.getErrors(bindingResult));
        }

        int fkDemanda = avaliacaoDemanda.getDemandas().getIdDemanda();

        if(demandaRepository.existsById(fkDemanda)){
            if(avaliacaoDemandaRepository.findByDemanda(fkDemanda).isEmpty()){
                DemandasTable demandasTable = demandaRepository.findById(fkDemanda).get();
                UsuariosTable usuariosTable = demandasTable.getUsuario();
                BigDecimal classificacao = usuarioRepository.findById(usuariosTable.getIdUsuario()).get().getClassificacao();

                int avaliacoesDemanda = avaliacaoDemandaRepository.countByUsuario(usuariosTable.getIdUsuario());
                int avaliacoesOferta = avaliacaoOfertaRepository.countByUsuario(usuariosTable.getIdUsuario());
                int quantidadeAvaliacoes = avaliacoesDemanda + avaliacoesOferta;

                Double notaTotal = Double.parseDouble(String.valueOf(classificacao)) * quantidadeAvaliacoes;
                notaTotal += Double.parseDouble(String.valueOf(avaliacaoDemanda.getNota()));
                quantidadeAvaliacoes++;
                BigDecimal notaNova = BigDecimal.valueOf(notaTotal/quantidadeAvaliacoes);

                avaliacaoDemanda.setData(java.time.LocalDateTime.now());
                usuariosTable.setClassificacao(notaNova);
                usuarioRepository.save(usuariosTable);
                avaliacaoDemandaRepository.save(avaliacaoDemanda);
            }else{
                return ResponseEntity.status(400).body("Avaliação já criada para essa demanda");
            }
        }else {
            return ResponseEntity.status(404).body("Demanda deve existir para criar uma avaliação");
        }

        return ResponseEntity.status(201).build();
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity getAvaliacoes(@PathVariable int idUsuario){
        if(usuarioRepository.existsById(idUsuario)){
            List<AvaliacaoDemanda> avaliacaoDemandaList = avaliacaoDemandaRepository.findByUsuario(idUsuario);
            List<AvaliacaoOferta> avaliacaoOfertaList = avaliacaoOfertaRepository.findByUsuario(idUsuario);

            if(avaliacaoOfertaList.isEmpty() && avaliacaoDemandaList.isEmpty()){
                return ResponseEntity.status(204).body("Nenhuma avaliação disponivel");
            }

            return ResponseEntity.status(200).body(new Avaliacoes(avaliacaoDemandaList, avaliacaoOfertaList));
        }

        return ResponseEntity.status(404).body("Usuário não existe");
    }

}
