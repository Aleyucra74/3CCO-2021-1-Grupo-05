package br.com.hireit.projetohireIt.tables;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Ofertas")
public class OfertasTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_oferta")
    private Integer idOferta;

    @Column(name = "descricao")
    @Size(min = 1, max = 300, message = "Descricao deve possuir entre 1 e 300 caracteres")
    private String descricao;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "fk_usuario")
    private UsuariosTable usuario;

    @OneToMany(mappedBy = "oferta")
    @JsonIgnore
    private List<PropostasTable> listaPropostas = new ArrayList<>();

    @OneToMany(mappedBy = "ofertas", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<TecnologiaOfertaTable> tecnologiasOferta = new ArrayList<>();

    public OfertasTable() {}

    public OfertasTable(Integer idOferta,
                        String descricao,
                        LocalDateTime createdAt, UsuariosTable usuario) {
        this.idOferta = idOferta;
        this.descricao = descricao;
        this.createdAt = createdAt;
        this.usuario = usuario;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getIdOferta() {
        return idOferta;
    }

    public void setIdOferta(Integer idOferta) {
        this.idOferta = idOferta;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public UsuariosTable getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuariosTable usuario) {
        this.usuario = usuario;
    }

    public List<PropostasTable> getListaPropostas() {
        return listaPropostas;
    }

    public void setListaPropostas(List<PropostasTable> listaPropostas) {
        this.listaPropostas = listaPropostas;
    }

    public List<TecnologiaOfertaTable> getTecnologiasOferta() {
        return tecnologiasOferta;
    }

    public void setTecnologiasOferta(List<TecnologiaOfertaTable> tecnologiasOferta) {
        this.tecnologiasOferta = tecnologiasOferta;
    }

    @Override
    public String toString() {
        return "OfertasTable{" +
                "idOferta=" + idOferta +
                ", descricao='" + descricao + '\'' +
                ", usuario=" + usuario +
                '}';
    }
}
