package br.com.hireit.projetohireIt;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

public class Freelancer extends Usuario{

    private String funcao;
    private String precoHora;
    private Double experiencia;
    private List<Projeto> projetos;
//    private List<TechEnum> tecnologia = new ArrayList<>(EnumSet.allOf(TechEnum.class));

    //construtor

    public Freelancer(Integer id, String nome, String email, String senha, String localizacao,
                      Double classificacao, String funcao, String precoHora, Double experiencia,
                      List<Projeto> projetos) {
        super(id, nome, email, senha, localizacao, classificacao);
        this.funcao = funcao;
        this.precoHora = precoHora;
        this.experiencia = experiencia;
        this.projetos = projetos;
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

}
