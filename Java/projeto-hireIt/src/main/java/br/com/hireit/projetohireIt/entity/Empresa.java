package br.com.hireit.projetohireIt.entity;

import br.com.hireit.projetohireIt.service.UsuarioService;
import br.com.hireit.projetohireIt.tables.LocalizacoesTable;

import java.math.BigDecimal;

public class Empresa extends UsuarioService {

    private Integer projetosPublicados;
    private String profissionaisContratados;

    //construtor

    public Empresa(
            int idUsuario,
            String nome,
            String email,
            String senha,
            String descricao,
            BigDecimal classificacao,
            String telefone,
            LocalizacoesTable localizacao,
            Integer projetosPublicados,
            String profissionaisContratados
    ) {
        super(idUsuario, nome, email, senha, descricao, classificacao, telefone, localizacao);
        this.projetosPublicados = projetosPublicados;
        this.profissionaisContratados = profissionaisContratados;
    }

    public Empresa() {
    }

    //metodo

    @Override
    public Double avaliar() {
        return null;
    }

    //getters

    public Integer getProjetosPublicados() {
        return projetosPublicados;
    }

    public String getProfissionaisContratados() {
        return profissionaisContratados;
    }
}
