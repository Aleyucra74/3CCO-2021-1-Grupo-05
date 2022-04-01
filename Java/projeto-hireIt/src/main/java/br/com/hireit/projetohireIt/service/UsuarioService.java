package br.com.hireit.projetohireIt.service;

import br.com.hireit.projetohireIt.tables.LocalizacoesTable;
import br.com.hireit.projetohireIt.tables.UsuariosTable;

import java.math.BigDecimal;
import java.util.List;

public abstract class UsuarioService extends UsuariosTable{

    public UsuarioService() {
    }

    public UsuarioService(
            int idUsuario,
            String nome,
            String email,
            String senha,
            String descricao,
            BigDecimal classificacao,
            String telefone,
            LocalizacoesTable localizacao
    ) {
        super(idUsuario, nome, email, senha, descricao, classificacao, telefone, localizacao);
    }

    public abstract Double avaliar();

    public String logar(UsuariosTable usuario, List<UsuariosTable> usuariosLogado){
        if(usuario == null){
            return "Usuário e/ou senha incorretos";
        }else{
            usuariosLogado.add(usuario);
            return "Usuário logado com sucesso!";
        }
    }
}
