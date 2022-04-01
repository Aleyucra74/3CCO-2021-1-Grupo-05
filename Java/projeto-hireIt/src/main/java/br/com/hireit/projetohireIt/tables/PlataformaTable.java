package br.com.hireit.projetohireIt.tables;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Plataformas")
public class PlataformaTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_plataforma")
    private int idPlataforma;

    @Column(name = "nome")
    @Size(min = 1, max = 55, message = "Nome deve possuir entre 1 e 55 caracteres")
    private String nome;

    public PlataformaTable(int idPlataforma, String nome) {
        this.idPlataforma = idPlataforma;
        this.nome = nome;
    }

    public PlataformaTable() {
    }

    public int getIdPlataforma() {
        return idPlataforma;
    }

    public void setIdPlataforma(int idPlataforma) {
        this.idPlataforma = idPlataforma;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public String toString() {
        return "PlataformaTable{" +
                "idPlataforma=" + idPlataforma +
                ", nome='" + nome + '\'' +
                '}';
    }
}
