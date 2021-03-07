package br.com.hireit.projetohireIt;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @PostMapping("/login")
    public String login(){

        return null;
    }

    @GetMapping("/logout")
    public String logout(){
        return null;
    }

}
