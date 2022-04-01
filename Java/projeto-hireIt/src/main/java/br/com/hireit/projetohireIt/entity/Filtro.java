package br.com.hireit.projetohireIt.entity;

public class Filtro {

    private String titulo;

    private String data;

    private String UF;

    private Double salarioMin;

    private Double salarioMax;

    private String usuario;

    private String tecnologia;

    private int experiencia;

    public Filtro(String titulo, String data, String UF, Double salarioMin, Double salarioMax, String usuario, String tecnologia, int experiencia) {
        this.titulo = titulo;
        this.data = data;
        this.UF = UF;
        this.salarioMin = salarioMin;
        this.salarioMax = salarioMax;
        this.usuario = usuario;
        this.tecnologia = tecnologia;
        this.experiencia = experiencia;
    }

    public Filtro() {
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getUF() {
        return UF;
    }

    public void setUF(String UF) {
        this.UF = UF;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getTecnologia() {
        return tecnologia;
    }

    public void setTecnologia(String tecnologia) {
        this.tecnologia = tecnologia;
    }

    public int getExperiencia() {
        return experiencia;
    }

    public void setExperiencia(int experiencia) {
        this.experiencia = experiencia;
    }

    public Double getSalarioMin() {
        return salarioMin;
    }

    public void setSalarioMin(Double salarioMin) {
        this.salarioMin = salarioMin;
    }

    public Double getSalarioMax() {
        return salarioMax;
    }

    public void setSalarioMax(Double salarioMax) {
        this.salarioMax = salarioMax;
    }

    @Override
    public String toString() {
        return "Filtro{" +
                "titulo='" + titulo + '\'' +
                ", data='" + data + '\'' +
                ", UF='" + UF + '\'' +
                ", salarioMin=" + salarioMin +
                ", salarioMax=" + salarioMax +
                ", usuario='" + usuario + '\'' +
                ", tecnologia='" + tecnologia + '\'' +
                ", experiencia=" + experiencia +
                '}';
    }
}
