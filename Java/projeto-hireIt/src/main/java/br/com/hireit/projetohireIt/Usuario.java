package br.com.hireit.projetohireIt;

public abstract class Usuario {

    private Integer id;
    private String nome;
    private String email;
    private String senha;
    private String localizacao;
    private Double classificacao;
    private String descricao;

    //metodo

    public abstract Double avaliar();

    //construtor

    public Usuario(Integer id, String nome, String email, String senha, String localizacao, Double classificacao, String descricao) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.localizacao = localizacao;
        this.classificacao = classificacao;
        this.descricao = descricao;
    }

    //Getter

    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public Double getClassificacao() {
        return classificacao;
    }

    public String getDescricao() { return descricao; }
}