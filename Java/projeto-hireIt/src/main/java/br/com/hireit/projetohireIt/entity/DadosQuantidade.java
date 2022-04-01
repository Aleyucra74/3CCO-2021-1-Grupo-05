package br.com.hireit.projetohireIt.entity;

public class DadosQuantidade {

    private String ano;
    private String mes;
    private int quantidade;

    public DadosQuantidade(String ano, String mes, int quantidade) {
        this.ano = ano;
        this.mes = mes;
        this.quantidade = quantidade;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public String getMes() {
        return mes;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}
