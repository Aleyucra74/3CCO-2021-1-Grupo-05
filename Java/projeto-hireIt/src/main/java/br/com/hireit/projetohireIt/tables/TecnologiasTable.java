package br.com.hireit.projetohireIt.tables;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Tecnologias")
public class TecnologiasTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tecnologia")
    private Integer idTecnologia;

    @Column(name = "tecnologia")
    @Size(min = 1, max = 45, message = "A tecnologia deve possuir entre 1 e 45 caracteres")
    private String tecnologia;

    @OneToMany(mappedBy = "tecnologias", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<TecnologiaOfertaTable> tecnologiaOferta = new ArrayList<>();

    @OneToMany(mappedBy = "tecnologias", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<TecnologiaDemandaTable> tecnologiaDemanda = new HashSet<TecnologiaDemandaTable>();

    public TecnologiasTable() {}

    public TecnologiasTable(Integer idTecnologia, String tecnologia) {
        this.idTecnologia = idTecnologia;
        this.tecnologia = tecnologia;
    }

    public Integer getIdTecnologia() {
        return idTecnologia;
    }

    public void setIdTecnologia(Integer idTecnologia) {
        this.idTecnologia = idTecnologia;
    }

    public String getTecnologia() {
        return tecnologia;
    }

    public void setTecnologia(String tecnologia) {
        this.tecnologia = tecnologia;
    }

    public List<TecnologiaOfertaTable> getTecnologiaOferta() {
        return tecnologiaOferta;
    }

    public void setTecnologiaOferta(List<TecnologiaOfertaTable> tecnologiaOferta) {
        this.tecnologiaOferta = tecnologiaOferta;
    }

    public Set<TecnologiaDemandaTable> getTecnologiaDemanda() {
        return tecnologiaDemanda;
    }

    public void setTecnologiaDemanda(Set<TecnologiaDemandaTable> tecnologiaDemanda) {
        this.tecnologiaDemanda = tecnologiaDemanda;
    }

    @Override
    public String toString() {
        return "TecnologiasTable{" +
                "idTecnologia=" + idTecnologia +
                ", tecnologia='" + tecnologia + '\'' +
                ", tecnologiaOferta=" + tecnologiaOferta +
                '}';
    }
}
