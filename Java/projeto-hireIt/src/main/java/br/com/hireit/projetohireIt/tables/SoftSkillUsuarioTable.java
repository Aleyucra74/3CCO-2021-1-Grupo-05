package br.com.hireit.projetohireIt.tables;


import javax.persistence.*;
import javax.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "softskill_usuario")
public class SoftSkillUsuarioTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_softskill_usuario")
    private Integer idSoftSkillOferta;

    @Column(name = "nota_softskill")
    @PositiveOrZero(message = "A nota deve ser positiva")
    private int notaSoftskill;

    @ManyToOne
    @JoinColumn(name = "fk_softskill")
    private SoftSkillsTable softskill;

    @ManyToOne
    @JoinColumn(name = "fk_usuario")
    private UsuariosTable usuario;

    public SoftSkillUsuarioTable() {
    }

    public SoftSkillUsuarioTable(Integer idSoftSkillOferta, int notaSoftskill, SoftSkillsTable softskill, UsuariosTable usuario) {
        this.idSoftSkillOferta = idSoftSkillOferta;
        this.notaSoftskill = notaSoftskill;
        this.softskill = softskill;
        this.usuario = usuario;
    }

    public int getNotaSoftskill() {
        return notaSoftskill;
    }

    public void setNotaSoftskill(int notaSoftskill) {
        this.notaSoftskill = notaSoftskill;
    }

    public Integer getIdSoftSkillOferta() {
        return idSoftSkillOferta;
    }

    public void setIdSoftSkillOferta(Integer idSoftSkillOferta) {
        this.idSoftSkillOferta = idSoftSkillOferta;
    }

    public SoftSkillsTable getSoftskill() {
        return softskill;
    }

    public void setSoftskill(SoftSkillsTable softskill) {
        this.softskill = softskill;
    }

    public UsuariosTable getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuariosTable usuario) {
        this.usuario = usuario;
    }
}
