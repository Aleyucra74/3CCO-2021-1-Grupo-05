package br.com.hireit.projetohireIt;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private List<Usuario> usuarioLogado = new ArrayList<Usuario>();

    @PostMapping("/login/empresa")
    public String login(@RequestBody Empresa empresa){
        return empresa.logar(empresa,usuarioLogado);
    }

    @PostMapping("/login/freelancer")
    public String login(@RequestBody Freelancer freelancer){
        return freelancer.logar(freelancer,usuarioLogado);
    }
    
    @PostMapping("/logout/{email}")
    public String logout(@PathVariable String email){

        try{
            List<Usuario> listUsuarios = usuarioLogado.stream()
                    .filter(usuario -> usuario.getEmail().contains(email))
                    .collect(Collectors.toList());

            for(int i = 0;i <= usuarioLogado.size();i++){
                if(usuarioLogado.get(i).getEmail().equals(listUsuarios.get(0).getEmail())){
                    usuarioLogado.remove(i);
                    return "Logout realizado com sucesso!";
                }
            }

        }catch (Exception e){
            return "Usuário não logado";
        }

        return "Falha no logout";

    }

}
