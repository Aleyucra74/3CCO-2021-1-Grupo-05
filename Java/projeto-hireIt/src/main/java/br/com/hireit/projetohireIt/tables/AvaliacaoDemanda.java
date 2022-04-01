package br.com.hireit.projetohireIt.tables;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Avaliacao_Demanda")
public class AvaliacaoDemanda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avaliacao")
    private int idAvaliacao;

    @Column(name = "descricao")
    @Size(min = 1, max = 300, message = "Descrição deve possuir entre 1 e 300 caracteres")
    private String descricao;

    @Column(name = "nota")
    @PositiveOrZero(message = "A nota deve ser maior ou igual a zero")
    @NotNull(message = "A nota não deve ser nulo")
    private BigDecimal nota;

    @Column(name = "data")
    private LocalDateTime data;

    @ManyToOne
    @JoinColumn(name = "fk_demanda")
    @NotNull(message = "AvaliacaoDemanda deve possuir uma demanda ligada a ele")
    private DemandasTable demandas;

    public AvaliacaoDemanda(int idAvaliacao, String descricao, BigDecimal nota, LocalDateTime data, DemandasTable demandas) {
        this.idAvaliacao = idAvaliacao;
        this.descricao = descricao;
        this.nota = nota;
        this.data = data;
        this.demandas = demandas;
    }

    public AvaliacaoDemanda() {
    }

    public int getIdAvaliacao() {
        return idAvaliacao;
    }

    public void setIdAvaliacao(int idAvaliacao) {
        this.idAvaliacao = idAvaliacao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getNota() {
        return nota;
    }

    public void setNota(BigDecimal nota) {
        this.nota = nota;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public DemandasTable getDemandas() {
        return demandas;
    }

    public void setDemandas(DemandasTable demandas) {
        this.demandas = demandas;
    }

    @Override
    public String toString() {
        return "AvaliacaoDemanda{" +
                "idAvaliacao=" + idAvaliacao +
                ", descricao='" + descricao + '\'' +
                ", nota=" + nota +
                ", data=" + data +
                ", demandas=" + demandas +
                '}';
    }
}
