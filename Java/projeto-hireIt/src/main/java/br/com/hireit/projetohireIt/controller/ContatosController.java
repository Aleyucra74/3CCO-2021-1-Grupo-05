package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.auxiliar.ErrorHandler;
import br.com.hireit.projetohireIt.repository.ContatosRepository;
import br.com.hireit.projetohireIt.repository.PlataformaRepository;
import br.com.hireit.projetohireIt.repository.UsuarioRepository;
import br.com.hireit.projetohireIt.tables.ContatosTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contatos")
public class ContatosController {

    private ErrorHandler error = new ErrorHandler();

    @Autowired
    private ContatosRepository contatosRepository;

    @Autowired
    private PlataformaRepository plataformaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/{idUsuario}")
    public ResponseEntity getContatos(@PathVariable int idUsuario){
        if(usuarioRepository.existsById(idUsuario)){
            List<ContatosTable> contatosTableList = contatosRepository.findByUsuario(idUsuario);

            if(contatosTableList.isEmpty()){
                return ResponseEntity.status(404).body("Usuário não possui contatos salvos");
            }

            return ResponseEntity.status(200).body(contatosTableList);
        }

        return ResponseEntity.status(404).body("Usuário não existe");
    }

    @PostMapping
    public ResponseEntity postContatos(
            @Valid @RequestBody ContatosTable contatosTable,
            BindingResult bindingResult
    ){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(422).body(error.getErrors(bindingResult));
        }

        if(usuarioRepository.existsById(contatosTable.getUsuariosTable().getIdUsuario()) &&
                plataformaRepository.existsById(contatosTable.getPlataformaTable().getIdPlataforma())
        ){
            contatosRepository.save(contatosTable);
            return ResponseEntity.status(201).build();
        }

        return ResponseEntity.status(404).body("Usuário e/ou Plataforma não existem");
    }

    @PutMapping
    public ResponseEntity putContatos(
            @Valid @RequestBody ContatosTable contatosTable,
            BindingResult bindingResult
    ){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(422).body(error.getErrors(bindingResult));
        }

        Optional<ContatosTable> contato = contatosRepository.findByUsuarioAndPlataforma(
                contatosTable.getUsuariosTable().getIdUsuario(),
                contatosTable.getPlataformaTable().getIdPlataforma()
        );

        if(contato.isPresent())
        {
            contatosTable.setIdContato(contato.get().getIdContato());
            contatosRepository.save(contatosTable);
            return ResponseEntity.status(204).build();
        }

        return ResponseEntity.status(404).body("Usuário não possui contato salvo na plataforma");
    }

}
