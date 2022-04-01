package br.com.hireit.projetohireIt.view;

public class DemandasView {

    private String nome;
    private String titulo;
    private String tecnologia;
    private String softskills;

    public DemandasView(String nome, String titulo, String tecnologia, String softskills) {
        this.nome = nome;
        this.titulo = titulo;
        this.tecnologia = tecnologia;
        this.softskills = softskills;
    }

    @Override
    public String toString() {
        return "DemandasView{" +
                "nome='" + nome + '\'' +
                ", titulo='" + titulo + '\'' +
                ", tecnologia='" + tecnologia + '\'' +
                ", softskills='" + softskills + '\'' +
                '}';
    }

    public String getNome() {
        return nome;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getTecnologia() {
        return tecnologia;
    }

    public String getSoftskills() {
        return softskills;
    }
}
