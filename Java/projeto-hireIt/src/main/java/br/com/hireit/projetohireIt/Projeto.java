package br.com.hireit.projetohireIt;

import java.util.Date;
import java.util.List;

public class Projeto {

    private Integer id;
    private String nome;
    private String descricao;
    private String categoria;
    private Date prazo;
    private Integer numeroPropostas;
    private List<TechEnum> habilidade;

    // {[projeto1:"id","nome",],[projeto2: "id","name"]}

    //construtor
    public Projeto(
            Integer id,
            String nome,
            String descricao,
            String categoria,
            Date prazo,
            Integer numeroPropostas,
            List<TechEnum> habilidade
    ) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
        this.prazo = prazo;
        this.numeroPropostas = numeroPropostas;
        this.habilidade = habilidade;
    }

    //Getter

    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public Date getPrazo() {
        return prazo;
    }

    public Integer getNumeroPropostas() {
        return numeroPropostas;
    }

    public List<TechEnum> getHabilidade() {
        return habilidade;
    }
}
