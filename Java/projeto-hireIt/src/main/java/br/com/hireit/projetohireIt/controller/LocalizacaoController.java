package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.auxiliar.ErrorHandler;
import br.com.hireit.projetohireIt.repository.LocalizacoesRepository;
import br.com.hireit.projetohireIt.tables.LocalizacoesTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/localizacoes")
public class LocalizacaoController {

    private ErrorHandler error = new ErrorHandler();

    @Autowired
    private LocalizacoesRepository localizacoesRepository;

    @GetMapping
    public ResponseEntity getLocalizacao(){
        List<LocalizacoesTable> listaLocalizacoes = localizacoesRepository.findAll();
        if(listaLocalizacoes.isEmpty()){
            return ResponseEntity.status(204).build();
        }else{
            return ResponseEntity.status(200).body(listaLocalizacoes);
        }
    }

    @PostMapping
    public ResponseEntity postLocalizacao(
            @Valid @RequestBody LocalizacoesTable localizacao,
            BindingResult bindingResult
    ) {
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(422).body(error.getErrors(bindingResult));
        }

        localizacoesRepository.save(localizacao);

        return ResponseEntity.status(201).body("Localização salva com sucesso");
    }

    @PutMapping("/{id}")
    public ResponseEntity putLocalizacao(
            @PathVariable int id,
            @Valid @RequestBody LocalizacoesTable localizacao,
            BindingResult bindingResult
    ){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(422).body(error.getErrors(bindingResult));
        }

        Optional<LocalizacoesTable> localizacoesTable = localizacoesRepository.findById(id);

        if(localizacoesTable.isPresent()){
            return ResponseEntity.status(204).body(localizacoesTable
                    .map(record -> {
                        record.setUf(localizacao.getUf());
                        record.setCidade(localizacao.getCidade());
                        record.setCep(localizacao.getCep());
                        LocalizacoesTable updated = localizacoesRepository.save(record);
                        return "Dados do localização alterados com sucesso!";
                    }));
        }else{
            return ResponseEntity.status(404).body("Localizacao não encontrada");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteLocalizacao(@PathVariable int id){
        Optional<LocalizacoesTable> localizacoesTable = localizacoesRepository.findById(id);

        if(localizacoesTable.isPresent()){
            localizacoesRepository.deleteById(id);
            return ResponseEntity.status(204).body("Localização deletada com sucesso!");
        }else{
            return ResponseEntity.status(404).body("Localização não encontrada");
        }
    }

    @GetMapping("/cep/{cep}")
    public ResponseEntity getLocalizacaoByCep(@PathVariable String cep){
        Optional<LocalizacoesTable> localizacoesTable = localizacoesRepository.findByCep(cep);

        if (localizacoesTable.isPresent()){
            return ResponseEntity.status(200).body(localizacoesTable);
        }else {
            return ResponseEntity.status(204).build();
        }
    }

}
