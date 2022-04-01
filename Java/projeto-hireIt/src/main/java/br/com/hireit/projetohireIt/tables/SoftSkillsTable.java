package br.com.hireit.projetohireIt.tables;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Softskills")
public class SoftSkillsTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_softskill")
    private Integer idSoftSkills;

    @Column(name = "softskills")
    private String softSkill;

    @OneToMany(mappedBy = "softskill", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<SoftSkillDemandaTable> softSkillDemanda = new HashSet<SoftSkillDemandaTable>();

    @OneToMany(mappedBy = "softskill", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<SoftSkillUsuarioTable> softSkillOferta = new HashSet<SoftSkillUsuarioTable>();

    public SoftSkillsTable(Integer idSoftSkills, String softSkill) {
        this.idSoftSkills = idSoftSkills;
        this.softSkill = softSkill;
    }

    public SoftSkillsTable() {
    }

    public Integer getIdSoftSkills() {
        return idSoftSkills;
    }

    public void setIdSoftSkills(Integer idSoftSkills) {
        this.idSoftSkills = idSoftSkills;
    }

    public String getSoftSkill() {
        return softSkill;
    }

    public void setSoftSkill(String softSkill) {
        this.softSkill = softSkill;
    }

    public Set<SoftSkillDemandaTable> getSoftSkillDemanda() {
        return softSkillDemanda;
    }

    public void setSoftSkillDemanda(Set<SoftSkillDemandaTable> softSkillDemanda) {
        this.softSkillDemanda = softSkillDemanda;
    }

    public Set<SoftSkillUsuarioTable> getSoftSkillOferta() {
        return softSkillOferta;
    }

    public void setSoftSkillOferta(Set<SoftSkillUsuarioTable> softSkillOferta) {
        this.softSkillOferta = softSkillOferta;
    }

    @Override
    public String toString() {
        return "SoftSkillsTable{" +
                "idSoftSkills=" + idSoftSkills +
                ", softSkill='" + softSkill + '\'' +
                ", softSkillDemanda=" + softSkillDemanda +
                ", softSkillOferta=" + softSkillOferta +
                '}';
    }
}
