package br.com.hireit.projetohireIt;

public class Empresa extends Usuario {

    private Integer projetosPublicados;
    private String profissionaisContratados;

    //construtor

    public Empresa(
            Integer id,
            String nome,
            String email,
            String senha,
            String localizacao,
            Double classificacao,
            String descricao,
            Integer projetosPublicados,
            String profissionaisContratados
    ) {
        super(id, nome, email, senha, localizacao, classificacao, descricao);
        this.projetosPublicados = projetosPublicados;
        this.profissionaisContratados = profissionaisContratados;
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
