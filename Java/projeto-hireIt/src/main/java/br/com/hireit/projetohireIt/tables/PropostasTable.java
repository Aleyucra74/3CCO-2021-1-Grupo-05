package br.com.hireit.projetohireIt.tables;

import javax.persistence.*;

@Entity
@Table(name = "Propostas")
public class PropostasTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proposta")
    private int idProposta;

    @ManyToOne
    @JoinColumn(name = "fk_oferta")
    private OfertasTable oferta;

    @ManyToOne
    @JoinColumn(name = "fk_demanda")
    private DemandasTable demanda;

    public PropostasTable(int idProposta, OfertasTable oferta, DemandasTable demanda) {
        this.idProposta = idProposta;
        this.oferta = oferta;
        this.demanda = demanda;
    }

    public PropostasTable() {
    }

    public int getIdProposta() {
        return idProposta;
    }

    public void setIdProposta(int idProposta) {
        this.idProposta = idProposta;
    }

    public OfertasTable getOferta() {
        return oferta;
    }

    public void setOferta(OfertasTable oferta) {
        this.oferta = oferta;
    }

    public DemandasTable getDemanda() {
        return demanda;
    }

    public void setDemanda(DemandasTable demanda) {
        this.demanda = demanda;
    }

    @Override
    public String toString() {
        return "PropostasTable{" +
                "idProposta=" + idProposta +
                ", oferta=" + oferta +
                ", demanda=" + demanda +
                '}';
    }
}
