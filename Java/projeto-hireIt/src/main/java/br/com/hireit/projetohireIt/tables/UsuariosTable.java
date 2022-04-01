package br.com.hireit.projetohireIt.tables;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Collection;

@Entity
@Table(name = "Usuarios")
public class UsuariosTable implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    protected int idUsuario;

    @Column(name = "nome")
    @Size(min = 1, max = 45, message = "Nome deve possuir entre 1 e 45 caracteres")
    protected String nome;

    @Column(name = "email")
    @Size(min = 1, max = 45, message = "Email deve possuir entre 1 e 45 caracteres")
    protected String email;

    @Column(name = "senha")
    @Size(min = 1, max = 45, message = "Senha deve possuir entre 1 e 45 caracteres")
    protected String senha;

    @Column(name = "descricao")
    @Size(min = 1, max = 300, message = "Descricao deve possuir entre 1 e 300 caracteres")
    protected String descricao;

    @Column(name = "classificacao")
    @PositiveOrZero
    protected BigDecimal classificacao;

    @Column(name = "telefone")
    @Size(min = 1, max = 9, message = "Telefone deve possuir 9 caracteres")
    protected String telefone;

    @ManyToOne
    @JoinColumn(name = "fk_localizacao")
    protected LocalizacoesTable localizacao;

    public UsuariosTable() {
    }

    public UsuariosTable(
            int idUsuario,
            String nome,
            String email,
            String senha,
            String descricao,
            BigDecimal classificacao,
            String telefone,
            LocalizacoesTable localizacao
    ) {
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.descricao = descricao;
        this.classificacao = classificacao;
        this.telefone = telefone;
        this.localizacao = localizacao;
    }

    @Override
    public String toString() {
        return "UsuariosTable{" +
                "idUsuario=" + idUsuario +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", senha='" + senha + '\'' +
                ", descricao='" + descricao + '\'' +
                ", classificacao=" + classificacao +
                ", telefone='" + telefone + '\'' +
                ", localizacao=" + localizacao +
                '}';
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getClassificacao() {
        return classificacao;
    }

    public void setClassificacao(BigDecimal classificacao) {
        this.classificacao = classificacao;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public LocalizacoesTable getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(LocalizacoesTable localizacao) {
        this.localizacao = localizacao;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
