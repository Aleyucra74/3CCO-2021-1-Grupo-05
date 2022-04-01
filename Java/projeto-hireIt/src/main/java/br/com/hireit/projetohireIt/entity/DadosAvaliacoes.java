package br.com.hireit.projetohireIt.entity;

public class DadosAvaliacoes {

    private String tecnologia;
    private String softskill;
    private Double notaAvaliacao;

    public DadosAvaliacoes(String tecnologia, String softskill, Double notaAvaliacao) {
        this.tecnologia = tecnologia;
        this.softskill = softskill;
        this.notaAvaliacao = notaAvaliacao;
    }

    public String getTecnologia() {
        return tecnologia;
    }

    public void setTecnologia(String tecnologia) {
        this.tecnologia = tecnologia;
    }

    public String getSoftskill() {
        return softskill;
    }

    public void setSoftskill(String softskill) {
        this.softskill = softskill;
    }

    public Double getNotaAvaliacao() {
        return notaAvaliacao;
    }

    public void setNotaAvaliacao(Double notaAvaliacao) {
        this.notaAvaliacao = notaAvaliacao;
    }
}
