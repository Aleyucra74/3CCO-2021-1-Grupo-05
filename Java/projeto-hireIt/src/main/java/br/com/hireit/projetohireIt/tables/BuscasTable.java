package br.com.hireit.projetohireIt.tables;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Buscas")
public class BuscasTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "tecnologia")
    @Size(min = 1, max = 45, message = "Tecnologia deve possuir entre 1 e 45 caracteres")
    private String tecnologia;

    @Column(name = "quantidade")
    private int quantidade;

    @Column(name = "tipo")
    private String tipo;

    public BuscasTable() {
    }

    public BuscasTable(int id, String tecnologia, int quantidade, String tipo) {
        this.id = id;
        this.tecnologia = tecnologia;
        this.quantidade = quantidade;
        this.tipo = tipo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTecnologia() {
        return tecnologia;
    }

    public void setTecnologia(String tecnologia) {
        this.tecnologia = tecnologia;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}
