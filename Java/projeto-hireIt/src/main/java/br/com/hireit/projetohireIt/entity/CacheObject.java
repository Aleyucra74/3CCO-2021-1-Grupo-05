package br.com.hireit.projetohireIt.entity;

import java.util.List;

public class CacheObject {

    private int idProjeto;
    private String titulo;
    private String descricao;
    private String dataPostagem;
    private List<String> listTecnologias;

    public CacheObject() {
    }

    public CacheObject(int idProjeto, String titulo, String descricao, String dataPostagem, List<String> listTecnologias) {
        this.idProjeto = idProjeto;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataPostagem = dataPostagem;
        this.listTecnologias = listTecnologias;
    }

    public int getIdProjeto() {
        return idProjeto;
    }

    public void setIdProjeto(int idProjeto) {
        this.idProjeto = idProjeto;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getDataPostagem() {
        return dataPostagem;
    }

    public void setDataPostagem(String dataPostagem) {
        this.dataPostagem = dataPostagem;
    }

    public List<String> getListTecnologias() {
        return listTecnologias;
    }

    public void setListTecnologias(List<String> listTecnologias) {
        this.listTecnologias = listTecnologias;
    }
}
