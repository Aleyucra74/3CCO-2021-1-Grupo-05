package br.com.hireit.projetohireIt.tables;


import javax.persistence.*;
import javax.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "tecnologia_demanda")
public class TecnologiaDemandaTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tecnologia_demanda")
    private Integer idTecnologiaDemanda;

    @Column(name = "tempo_experiencia")
    @PositiveOrZero(message = "O tempo de experiência deve ser positiva")
    private Integer tempoExperiencia;

    @ManyToOne
    @JoinColumn(name = "fk_tecnologia")
    private TecnologiasTable tecnologias;

    @ManyToOne
    @JoinColumn(name = "fk_demanda")
    private DemandasTable demandas;

    public TecnologiaDemandaTable() {}

    public TecnologiaDemandaTable(
            Integer idTecnologiaDemanda,
            Integer tempoExperiencia,
            TecnologiasTable tecnologias,
            DemandasTable demandas
    ) {
        this.idTecnologiaDemanda = idTecnologiaDemanda;
        this.tempoExperiencia = tempoExperiencia;
        this.tecnologias = tecnologias;
        this.demandas = demandas;
    }

    public Integer getIdTecnologiaDemanda() {
        return idTecnologiaDemanda;
    }

    public void setIdTecnologiaDemanda(Integer idTecnologiaDemanda) {
        this.idTecnologiaDemanda = idTecnologiaDemanda;
    }

    public Integer getTempoExperiencia() {
        return tempoExperiencia;
    }

    public void setTempoExperiencia(Integer tempoExperiencia) {
        this.tempoExperiencia = tempoExperiencia;
    }

    public TecnologiasTable getTecnologias() {
        return tecnologias;
    }

    public void setTecnologias(TecnologiasTable tecnologias) {
        this.tecnologias = tecnologias;
    }

    public DemandasTable getDemandas() {
        return demandas;
    }

    public void setDemandas(DemandasTable demandas) {
        this.demandas = demandas;
    }

    @Override
    public String toString() {
        return "TecnologiaDemandaTable{" +
                "idTecnologiaDemanda=" + idTecnologiaDemanda +
                ", tempoExperiencia=" + tempoExperiencia +
                ", tecnologias=" + tecnologias +
                ", demandas=" + demandas +
                '}';
    }
}
