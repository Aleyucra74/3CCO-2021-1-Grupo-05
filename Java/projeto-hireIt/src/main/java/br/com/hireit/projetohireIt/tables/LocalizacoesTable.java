package br.com.hireit.projetohireIt.tables;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Localizacoes")
public class LocalizacoesTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_localizacao")
    private int idLocalizacao;

    @Column(name = "cidade")
    @Size(min=1, max = 45, message = "Cidade deve possuir entre 1 e 45 caracteres")
    @NotNull(message = "Cidade não deve ser nula")
    private String cidade;

    @Column(name = "uf")
    @Size(min = 2, max = 2, message = "UF deve possuir 2 caracteres")
    @NotNull(message = "UF não deve ser nula")
    private String uf;

    @Column(name = "cep")
    @Size(min = 8, max = 8, message = "CEP deve possuir 8 caracteres")
    @NotNull(message = "CEP não deve ser nula")
    private String cep;

    public LocalizacoesTable() {
    }

    public LocalizacoesTable(
            int idLocalizacao,
            String cidade,
            String uf,
            String cep
    ) {
        this.idLocalizacao = idLocalizacao;
        this.cidade = cidade;
        this.uf = uf;
        this.cep = cep;
    }

    @Override
    public String toString() {
        return "LocalizacoesTable{" +
                "idLocalizacao=" + idLocalizacao +
                ", cidade='" + cidade + '\'' +
                ", uf='" + uf + '\'' +
                ", cep='" + cep + '\'' +
               // ", usuariosTableList=" + usuariosTableList +
                '}';
    }

    public int getIdLocalizacao() {
        return idLocalizacao;
    }

    public void setIdLocalizacao(int idLocalizacao) {
        this.idLocalizacao = idLocalizacao;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }
}
