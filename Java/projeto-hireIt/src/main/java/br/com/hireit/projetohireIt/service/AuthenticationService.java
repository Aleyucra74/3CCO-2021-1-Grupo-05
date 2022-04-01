package br.com.hireit.projetohireIt.service;

import br.com.hireit.projetohireIt.repository.UsuarioRepository;
import br.com.hireit.projetohireIt.tables.UsuariosTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UsuariosTable> optional = repository.findUsuarioByEmail(email);

        if(optional.isPresent()) {
            BCryptPasswordEncoder passwordEnconder = new BCryptPasswordEncoder();
            optional.get().setSenha(passwordEnconder.encode(optional.get().getPassword()));
            return optional.get();
        }

        throw new UsernameNotFoundException("User not found");
    }

}