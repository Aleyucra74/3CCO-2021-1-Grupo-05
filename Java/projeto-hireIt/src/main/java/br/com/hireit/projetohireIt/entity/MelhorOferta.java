package br.com.hireit.projetohireIt.entity;

import br.com.hireit.projetohireIt.tables.DemandasTable;
import br.com.hireit.projetohireIt.tables.OfertasTable;

public class MelhorOferta {

    private OfertasTable ofertas;

    private DemandasTable demandas;

    private Double match;

    public MelhorOferta() {
    }

    public MelhorOferta(OfertasTable ofertas, DemandasTable demandas, Double match) {
        this.ofertas = ofertas;
        this.demandas = demandas;
        this.match = match;
    }

    public OfertasTable getOfertas() {
        return ofertas;
    }

    public void setOfertas(OfertasTable ofertas) {
        this.ofertas = ofertas;
    }

    public DemandasTable getDemandas() {
        return demandas;
    }

    public void setDemandas(DemandasTable demandas) {
        this.demandas = demandas;
    }

    public Double getMatch() {
        return match;
    }

    public void setMatch(Double match) {
        this.match = match;
    }
}
