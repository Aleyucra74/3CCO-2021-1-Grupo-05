package br.com.hireit.projetohireIt.tables;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Avaliacao_Oferta")
public class AvaliacaoOferta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avaliacao")
    private int idAvaliacao;

    @Column(name = "descricao")
    @Size(min = 1, max = 300, message = "Descrição deve possuir entre 1 e 300 caracteres")
    private String descricao;

    @Column(name = "nota_softskill")
    @PositiveOrZero(message = "A nota de softskill deve ser maior ou igual a zero")
    @NotNull(message = "A nota de softskill não deve ser nulo")
    private BigDecimal notaSoftskill;

    @Column(name = "nota_tecnica")
    @PositiveOrZero(message = "A nota tecnica deve ser maior ou igual a zero")
    @NotNull(message = "A nota tecnica não deve ser nulo")
    private BigDecimal notaTecnica;

    @Column(name = "data")
    private LocalDateTime data;

    @ManyToOne
    @JoinColumn(name = "fk_oferta")
    @NotNull(message = "AvaliacaoOferta deve possuir uma oferta ligada a ele")
    private OfertasTable ofertas;

    public AvaliacaoOferta(
            int idAvaliacao,
            String descricao,
            BigDecimal notaSoftskill,
            BigDecimal notaTecnica,
            LocalDateTime data,
            OfertasTable ofertas
    ) {
        this.idAvaliacao = idAvaliacao;
        this.descricao = descricao;
        this.notaSoftskill = notaSoftskill;
        this.notaTecnica = notaTecnica;
        this.data = data;
        this.ofertas = ofertas;
    }

    public AvaliacaoOferta() {
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

    public BigDecimal getNotaSoftskill() {
        return notaSoftskill;
    }

    public void setNotaSoftskill(BigDecimal notaSoftskill) {
        this.notaSoftskill = notaSoftskill;
    }

    public BigDecimal getNotaTecnica() {
        return notaTecnica;
    }

    public void setNotaTecnica(BigDecimal notaTecnica) {
        this.notaTecnica = notaTecnica;
    }

    public LocalDateTime getData() {
        return data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public OfertasTable getOfertas() {
        return ofertas;
    }

    public void setOfertas(OfertasTable ofertas) {
        this.ofertas = ofertas;
    }

    @Override
    public String toString() {
        return "AvaliacaoOferta{" +
                "idAvaliacao=" + idAvaliacao +
                ", descricao='" + descricao + '\'' +
                ", notaSoftskill=" + notaSoftskill +
                ", notaTecnica=" + notaTecnica +
                ", data=" + data +
                ", ofertas=" + ofertas +
                '}';
    }
}
