package br.com.hireit.projetohireIt.tables;


import javax.persistence.*;
import javax.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "tecnologia_oferta")
public class TecnologiaOfertaTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tecnologia_oferta")
    private Integer idTecnologiaOferta;

    @Column(name = "tempo_experiencia")
    @PositiveOrZero(message = "O tempo de experiência deve ser positiva")
    private Integer tempoExperiencia;

    @ManyToOne
    @JoinColumn(name = "fk_tecnologia")
    private TecnologiasTable tecnologias;

    @ManyToOne
    @JoinColumn(name = "fk_oferta")
    private OfertasTable ofertas;

    public TecnologiaOfertaTable() {}

    public TecnologiaOfertaTable(Integer idTecnologiaOferta, Integer tempoExperiencia, TecnologiasTable tecnologias, OfertasTable ofertas) {
        this.idTecnologiaOferta = idTecnologiaOferta;
        this.tempoExperiencia = tempoExperiencia;
        this.tecnologias = tecnologias;
        this.ofertas = ofertas;
    }

    public Integer getIdTecnologiaOferta() {
        return idTecnologiaOferta;
    }

    public void setIdTecnologiaOferta(Integer idTecnologiaOferta) {
        this.idTecnologiaOferta = idTecnologiaOferta;
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

    public OfertasTable getOfertas() {
        return ofertas;
    }

    public void setOfertas(OfertasTable ofertas) {
        this.ofertas = ofertas;
    }

    @Override
    public String toString() {
        return "TecnologiaOfertaTable{" +
                "idTecnologiaOferta=" + idTecnologiaOferta +
                ", tempoExperiencia=" + tempoExperiencia +
                ", tecnologias=" + tecnologias +
                ", ofertas=" + ofertas +
                '}';
    }
}
