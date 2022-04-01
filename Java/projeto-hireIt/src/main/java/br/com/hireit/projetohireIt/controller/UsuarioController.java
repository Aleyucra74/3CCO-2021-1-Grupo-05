package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.auxiliar.ErrorHandler;
import br.com.hireit.projetohireIt.entity.Empresa;
import br.com.hireit.projetohireIt.entity.UsuarioLogin;
import br.com.hireit.projetohireIt.repository.LocalizacoesRepository;
import br.com.hireit.projetohireIt.repository.UsuarioRepository;
import br.com.hireit.projetohireIt.service.NotificacaoService;
import br.com.hireit.projetohireIt.service.TokenService;
import br.com.hireit.projetohireIt.tables.UsuariosTable;
import com.microsoft.sqlserver.jdbc.SQLServerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.sql.SQLDataException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    public List<UsuariosTable> usuariosLogados = new ArrayList<>();
    private Empresa empresa = new Empresa();

    private ErrorHandler error = new ErrorHandler();

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private LocalizacoesRepository localizacoesRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private NotificacaoService notificacaoService;

    @PostMapping
    public ResponseEntity postUsuario(@Valid @RequestBody UsuariosTable usuario, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(422).body(error.getErrors(bindingResult));
        }

        if(usuarioRepository.findUsuarioByEmail(usuario.getEmail()).isPresent()){
            return ResponseEntity.status(400).body("Email já cadastrado");
        }

        try{
            String assunto = "Obrigado por se cadastrar! - Hire IT";
            String body = String.format("<p><b>%s</b>, seu cadastro foi realizado com sucesso, aproveite de nossos serviços.</p>", usuario.getNome());
            notificacaoService.sendNotification(usuario, assunto, body);
        }catch (MailException | MessagingException | UnsupportedEncodingException e){
            logger.info("Erro ao tentar enviar email: " + e.getMessage());
        }

        if (localizacoesRepository.existsById(usuario.getLocalizacao().getIdLocalizacao())) {
            usuario.setClassificacao(new BigDecimal(0.0));
            usuarioRepository.save(usuario);
            return ResponseEntity.status(201).body("Usuário cadastrado com sucesso!");
        } else {
            return ResponseEntity.status(404).body("Localização não encontrada!");
        }

    }

    @GetMapping
    public ResponseEntity getUsuarios() {
        List<UsuariosTable> listaUsuarios = usuarioRepository.findAll();

        if (listaUsuarios.isEmpty()) {
            return ResponseEntity.status(204).build();
        } else {
            return ResponseEntity.status(200).body(listaUsuarios);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity getUsuario(@PathVariable int id) {
        if (usuarioRepository.existsById(id)) {
            return ResponseEntity.status(200).body(usuarioRepository.findById(id));
        } else {
            return ResponseEntity.status(204).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity putUsuario(
            @PathVariable int id,
            @Valid @RequestBody UsuariosTable usuario,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(422).body(error.getErrors(bindingResult));
        }

        Optional<UsuariosTable> usuariosTable = usuarioRepository.findById(id);

        if (usuariosTable.isPresent()) {
            return ResponseEntity.status(204).body(usuariosTable
                    .map(record -> {
                        record.setNome(usuario.getNome());
                        record.setEmail(usuario.getEmail());
                        record.setDescricao(usuario.getDescricao());
                        record.setClassificacao(usuario.getClassificacao());
                        record.setTelefone(usuario.getTelefone());
                        record.setLocalizacao(usuario.getLocalizacao());
                        UsuariosTable updated = usuarioRepository.save(record);
                        return "Dados do usuário alterados com sucesso!";
                    }));
        } else {
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUsuario(@PathVariable int id) {
        Optional<UsuariosTable> usuariosTable = usuarioRepository.findById(id);

        if (usuariosTable.isPresent()) {
            usuarioRepository.deleteById(id);

            try{
                String assunto = "Obrigado por usar nossos serviços! - Hire IT";
                String body = String.format("<p><b>%s</b>, sua conta foi encerrada com sucesso.</p>", usuariosTable.get().getNome());
                notificacaoService.sendNotification(usuariosTable.get(), assunto, body);
            }catch (MailException | MessagingException | UnsupportedEncodingException e){
                logger.info("Erro ao tentar enviar email: " + e.getMessage());
            }

            return ResponseEntity.status(204).build();
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UsuarioLogin usuarioLogin) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                usuarioLogin.getEmail(), usuarioLogin.getSenha()
        );

        try {
            Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
            String token = tokenService.generateToken(authentication);

            return ResponseEntity.status(200).body(token);
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Usuário e/ou senha não estão corretos");
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity getDadosUsuarios(@PathVariable String email) {
        Optional<UsuariosTable> usuariosTable = usuarioRepository.findUsuarioByEmail(email);

        if (usuariosTable.isPresent()) {
            return ResponseEntity.status(200).body(usuariosTable);
        } else {
            return ResponseEntity.status(204).build();
        }

    }

}
