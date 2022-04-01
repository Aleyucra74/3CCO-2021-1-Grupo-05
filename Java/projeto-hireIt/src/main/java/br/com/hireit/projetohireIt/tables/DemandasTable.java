package br.com.hireit.projetohireIt.tables;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Demandas")
public class DemandasTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_demanda")
    private Integer idDemanda;

    @Column(name = "titulo")
    @NotNull(message = "Titulo não deve ser nulo")
    @Size(min = 1, max = 45, message = "Titulo deve possuir entre 1 e 45 caracteres")
    private String titulo;

    @Column(name = "descricao")
    @NotNull(message = "Descrição não deve ser nula")
    @Size(min = 1, max = 300,  message = "Descrição deve possuir entre 1 e 300 caracteres")
    private String descricao;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "salario")
    @PositiveOrZero(message = "Salário deve ser um número positivo")
    @NotNull(message = "O valor da hora não deve ser nulo")
    private double salario;

    @ManyToOne
    @JoinColumn(name = "fk_usuario")
    private UsuariosTable usuario;

    @OneToMany(mappedBy = "demanda")
    @JsonIgnore
    private List<PropostasTable> listaPropostas = new ArrayList<>();

    @OneToMany(mappedBy = "demandas")
    @JsonIgnore
    private List<TecnologiaDemandaTable> tecnologiaDemanda = new ArrayList<>();

    public DemandasTable() {}

    public DemandasTable(Integer idDemanda, String titulo, String descricao, LocalDateTime createdAt, double salario, UsuariosTable usuario) {
        this.idDemanda = idDemanda;
        this.titulo = titulo;
        this.descricao = descricao;
        this.createdAt = createdAt;
        this.salario = salario;
        this.usuario = usuario;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getIdDemanda() {
        return idDemanda;
    }

    public void setIdDemanda(Integer idDemanda) {
        this.idDemanda = idDemanda;
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

    public UsuariosTable getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuariosTable usuario) {
        this.usuario = usuario;
    }

    public double getSalario() {
        return salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }

    public List<TecnologiaDemandaTable> getTecnologiaDemanda() {
        return tecnologiaDemanda;
    }

    public void setTecnologiaDemanda(List<TecnologiaDemandaTable> tecnologiaDemanda) {
        this.tecnologiaDemanda = tecnologiaDemanda;
    }

    @Override
    public String toString() {
        return "DemandasTable{" +
                "idDemanda=" + idDemanda +
                ", titulo='" + titulo + '\'' +
                ", descricao='" + descricao + '\'' +
                ", usuario=" + usuario +
                '}';
    }
}
