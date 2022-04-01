package br.com.hireit.projetohireIt.entity;

public class NotaSoftskill {

    private String nomeSoftskill;

    private int notaSoftskill;

    public NotaSoftskill(String nomeSoftskill, int notaSoftskill) {
        this.nomeSoftskill = nomeSoftskill;
        this.notaSoftskill = notaSoftskill;
    }

    public String getNomeSoftskill() {
        return nomeSoftskill;
    }

    public void setNomeSoftskill(String nomeSoftskill) {
        this.nomeSoftskill = nomeSoftskill;
    }

    public int getNotaSoftskill() {
        return notaSoftskill;
    }

    public void setNotaSoftskill(int notaSoftskill) {
        this.notaSoftskill = notaSoftskill;
    }
}
