package br.com.hireit.projetohireIt.tables;


import javax.persistence.*;
import javax.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "softskill_demanda")
public class SoftSkillDemandaTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_softskill_demanda")
    private Integer idSoftSkillDemanda;

    @Column(name = "nota_softskill")
    @PositiveOrZero(message = "A nota deve ser positiva")
    private int notaSoftskill;

    @ManyToOne
    @JoinColumn(name = "fk_softskill")
    private SoftSkillsTable softskill;

    @ManyToOne
    @JoinColumn(name = "fk_demanda")
    private DemandasTable demanda;

    public SoftSkillDemandaTable(Integer idSoftSkillDemanda, int notaSoftskill, SoftSkillsTable softskill, DemandasTable demanda) {
        this.idSoftSkillDemanda = idSoftSkillDemanda;
        this.notaSoftskill = notaSoftskill;
        this.softskill = softskill;
        this.demanda = demanda;
    }

    public SoftSkillDemandaTable() {
    }

    public int getNotaSoftskill() {
        return notaSoftskill;
    }

    public void setNotaSoftskill(int notaSoftskill) {
        this.notaSoftskill = notaSoftskill;
    }

    public SoftSkillDemandaTable(Integer idSoftSkillDemanda) {
        this.idSoftSkillDemanda = idSoftSkillDemanda;
    }

    public Integer getIdSoftSkillDemanda() {
        return idSoftSkillDemanda;
    }

    public void setIdSoftSkillDemanda(Integer idSoftSkillDemanda) {
        this.idSoftSkillDemanda = idSoftSkillDemanda;
    }

    public SoftSkillsTable getSoftskill() {
        return softskill;
    }

    public void setSoftskill(SoftSkillsTable softskill) {
        this.softskill = softskill;
    }

    public DemandasTable getDemanda() {
        return demanda;
    }

    public void setDemanda(DemandasTable demanda) {
        this.demanda = demanda;
    }

    @Override
    public String toString() {
        return "SoftSkillDemandaTable{" +
                "idSoftSkillDemanda=" + idSoftSkillDemanda +
                ", notaSoftskill=" + notaSoftskill +
                ", softskill=" + softskill +
                ", demanda=" + demanda +
                '}';
    }
}


