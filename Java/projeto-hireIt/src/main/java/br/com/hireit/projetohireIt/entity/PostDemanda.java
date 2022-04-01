package br.com.hireit.projetohireIt.entity;

import br.com.hireit.projetohireIt.tables.DemandasTable;
import br.com.hireit.projetohireIt.tables.SoftSkillDemandaTable;
import br.com.hireit.projetohireIt.tables.TecnologiaDemandaTable;

import javax.validation.Valid;
import java.util.List;

public class PostDemanda {

    private DemandasTable demandas;

    private List<TecnologiaDemandaTable> tecnologias;

    private List<SoftSkillDemandaTable> softskills;

    public PostDemanda(DemandasTable demandas, List<TecnologiaDemandaTable> tecnologias, List<SoftSkillDemandaTable> softskills) {
        this.demandas = demandas;
        this.tecnologias = tecnologias;
        this.softskills = softskills;
    }

    public PostDemanda() {
    }

    public DemandasTable getDemandas() {
        return demandas;
    }

    public void setDemandas(DemandasTable demandas) {
        this.demandas = demandas;
    }

    public List<TecnologiaDemandaTable> getTecnologias() {
        return tecnologias;
    }

    public void setTecnologias(List<TecnologiaDemandaTable> tecnologias) {
        this.tecnologias = tecnologias;
    }

    public List<SoftSkillDemandaTable> getSoftskills() {
        return softskills;
    }

    public void setSoftskills(List<SoftSkillDemandaTable> softskills) {
        this.softskills = softskills;
    }
}
