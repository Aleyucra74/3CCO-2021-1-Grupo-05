package br.com.hireit.projetohireIt.tables;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Contatos")
public class ContatosTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_contato")
    private int idContato;

    @Column(name = "link")
    @Size(min = 1, max = 255, message = "Link deve possuir entre 1 e 255 caracteres")
    private String link;

    @Column(name = "path_variable")
    @Size(min = 1, max = 255, message = "Link deve possuir entre 1 e 255 caracteres")
    private String pathVariable;

    @ManyToOne
    @JoinColumn(name = "fk_usuario")
    @NotNull(message = "Contato deve possuir um usuario ligada a ele")
    private UsuariosTable usuariosTable;

    @ManyToOne
    @JoinColumn(name = "fk_plataforma")
    @NotNull(message = "Contato deve possuir uma plataforma ligada a ele")
    private PlataformaTable plataformaTable;

    public ContatosTable(
            int idContato,
            String link,
            String pathVariable,
            UsuariosTable usuariosTable,
            PlataformaTable plataformaTable
    ) {
        this.idContato = idContato;
        this.link = link;
        this.pathVariable = pathVariable;
        this.usuariosTable = usuariosTable;
        this.plataformaTable = plataformaTable;
    }

    public ContatosTable() {
    }

    public int getIdContato() {
        return idContato;
    }

    public void setIdContato(int idContato) {
        this.idContato = idContato;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getPathVariable() {
        return pathVariable;
    }

    public void setPathVariable(String pathVariable) {
        this.pathVariable = pathVariable;
    }

    public UsuariosTable getUsuariosTable() {
        return usuariosTable;
    }

    public void setUsuariosTable(UsuariosTable usuariosTable) {
        this.usuariosTable = usuariosTable;
    }

    public PlataformaTable getPlataformaTable() {
        return plataformaTable;
    }

    public void setPlataformaTable(PlataformaTable plataformaTable) {
        this.plataformaTable = plataformaTable;
    }
}
