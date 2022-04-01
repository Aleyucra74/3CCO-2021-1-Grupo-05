package br.com.hireit.projetohireIt.entity;

public class DadosCidade {

    private String cidade;
    private int quantidade;

    public DadosCidade(String cidade, int quantidade) {
        this.cidade = cidade;
        this.quantidade = quantidade;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}
