package br.com.hireit.projetohireIt.tables;

import javax.persistence.*;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Contratos")
public class ContratosTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contrato")
    private Integer idContrato;

    @Column(name = "data_inicio")
    private LocalDateTime dataInicio;

    @Column(name = "data_fim")
    @NotNull(message = "Contrato deve possuir uma data de termino")
    @Future(message = "A data de termino deve ser uma data futura")
    private LocalDateTime dataFim;

    @Column(name = "valor_hora")
    @PositiveOrZero(message = "O valor da hora deve ser maior ou igual a zero")
    @NotNull(message = "O valor da hora não deve ser nulo")
    private BigDecimal valorHora;

    @ManyToOne
    @JoinColumn(name = "fk_oferta")
    @NotNull(message = "Contrato deve possuir uma oferta ligada a ele")
    private OfertasTable ofertas;

    @ManyToOne
    @JoinColumn(name = "fk_demanda")
    @NotNull(message = "Contrato deve possuir uma demanda ligada a ele")
    private DemandasTable demandas;

    public ContratosTable(
            Integer idContrato,
            LocalDateTime dataInicio,
            LocalDateTime dataFim,
            BigDecimal valorHora,
            OfertasTable ofertas,
            DemandasTable demandas
    ) {
        this.idContrato = idContrato;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.valorHora = valorHora;
        this.ofertas = ofertas;
        this.demandas = demandas;
    }

    public ContratosTable() {
    }

    public Integer getIdContrato() {
        return idContrato;
    }

    public void setIdContrato(Integer idContrato) {
        this.idContrato = idContrato;
    }

    public LocalDateTime getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDateTime dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDateTime getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDateTime dataFim) {
        this.dataFim = dataFim;
    }

    public BigDecimal getValorHora() {
        return valorHora;
    }

    public void setValorHora(BigDecimal valorHora) {
        this.valorHora = valorHora;
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

    @Override
    public String toString() {
        return "ContratosTable{" +
                "idContrato=" + idContrato +
                ", dataInicio=" + dataInicio +
                ", dataFim=" + dataFim +
                ", valorHora=" + valorHora +
                ", ofertas=" + ofertas +
                ", demandas=" + demandas +
                '}';
    }
}
