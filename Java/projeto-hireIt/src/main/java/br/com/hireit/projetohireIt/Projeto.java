package br.com.hireit.projetohireIt;

import java.time.DateTimeException;
import java.util.Date;

public class Projeto {

    private Integer id;
    private String nome;
    private String descricao;
    private String categoria;
    private Date prazo;
    private Integer numeroPropostas;
    //falta habilidade

    //construtor

    public Projeto(Integer id, String nome, String descricao, String categoria,
                   Date prazo, Integer numeroPropostas) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
        this.prazo = prazo;
        this.numeroPropostas = numeroPropostas;
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
}
