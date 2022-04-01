package br.com.hireit.projetohireIt.entity;

import br.com.hireit.projetohireIt.Projeto;
import br.com.hireit.projetohireIt.TechEnum;
import br.com.hireit.projetohireIt.service.UsuarioService;
import br.com.hireit.projetohireIt.tables.LocalizacoesTable;

import java.math.BigDecimal;
import java.util.List;

public class Freelancer extends UsuarioService {

    private String funcao;
    private String precoHora;
    private Double experiencia;
    private List<Projeto> projetos;
    private List<TechEnum> tecnologia;
    private List<Projeto> projetosRealizados;

    //construtor

    public Freelancer(
            int idUsuario,
            String nome,
            String email,
            String senha,
            String descricao,
            BigDecimal classificacao,
            String telefone,
            LocalizacoesTable localizacao,
            String funcao,
            String precoHora,
            Double experiencia,
            List<Projeto> projetos,
            List<TechEnum> tecnologia,
            List<Projeto> projetosRealizados
    ) {
        super(idUsuario, nome, email, senha, descricao, classificacao, telefone, localizacao);
        this.funcao = funcao;
        this.precoHora = precoHora;
        this.experiencia = experiencia;
        this.projetos = projetos;
        this.tecnologia = tecnologia;
        this.projetosRealizados = projetosRealizados;
    }


    // metodo

    @Override
    public Double avaliar() {
        return null;
    }

    //Getter

    public String getFuncao() {
        return funcao;
    }

    public String getPrecoHora() {
        return precoHora;
    }

    public Double getExperiencia() {
        return experiencia;
    }

    public List<Projeto> getProjetos() {
        return projetos;
    }

    public List<TechEnum> getTecnologia() {
        return tecnologia;
    }

    public List<Projeto> getProjetosRealizados() {
        return projetosRealizados;
    }
}
