package br.com.hireit.projetohireIt;

public class Empresa extends Usuario {

    private String profissionaisPublicados;
    // profissionais contratados

    //construtor

    public Empresa(Integer id, String nome, String email, String senha, String localizacao,
                   Double classificacao, String profissionaisPublicados) {
        super(id, nome, email, senha, localizacao, classificacao);
        this.profissionaisPublicados = profissionaisPublicados;
    }


    //metodo

    @Override
    public Double avaliar() {
        return null;
    }
}
