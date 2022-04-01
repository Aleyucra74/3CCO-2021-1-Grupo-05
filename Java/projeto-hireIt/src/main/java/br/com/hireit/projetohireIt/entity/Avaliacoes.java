package br.com.hireit.projetohireIt.entity;

import br.com.hireit.projetohireIt.tables.AvaliacaoDemanda;
import br.com.hireit.projetohireIt.tables.AvaliacaoOferta;

import java.util.List;

public class Avaliacoes {

    private List<AvaliacaoDemanda> avaliacaoDemandaList;

    private List<AvaliacaoOferta> avaliacaoOfertaList;

    public Avaliacoes(List<AvaliacaoDemanda> avaliacaoDemandaList, List<AvaliacaoOferta> avaliacaoOfertaList) {
        this.avaliacaoDemandaList = avaliacaoDemandaList;
        this.avaliacaoOfertaList = avaliacaoOfertaList;
    }

    public List<AvaliacaoDemanda> getAvaliacaoDemandaList() {
        return avaliacaoDemandaList;
    }

    public void setAvaliacaoDemandaList(List<AvaliacaoDemanda> avaliacaoDemandaList) {
        this.avaliacaoDemandaList = avaliacaoDemandaList;
    }

    public List<AvaliacaoOferta> getAvaliacaoOfertaList() {
        return avaliacaoOfertaList;
    }

    public void setAvaliacaoOfertaList(List<AvaliacaoOferta> avaliacaoOfertaList) {
        this.avaliacaoOfertaList = avaliacaoOfertaList;
    }
}
