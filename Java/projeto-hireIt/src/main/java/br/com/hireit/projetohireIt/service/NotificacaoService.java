package br.com.hireit.projetohireIt.service;

import br.com.hireit.projetohireIt.tables.UsuariosTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class NotificacaoService {

    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String email;

    @Autowired
    public NotificacaoService(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    public void sendNotification(UsuariosTable usuario, String assunto, String body) throws MailException, MessagingException, UnsupportedEncodingException {
        MimeMessage mail = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mail, true);

        body += "<hr><img src='cid:logoImage'/>";

        helper.setTo(usuario.getEmail());
        helper.setFrom(email, "Hire IT");
        helper.setSubject(assunto);
        helper.setText(body, true);

        ClassPathResource resource = new ClassPathResource("/static/logo-centro.png");
        helper.addInline("logoImage", resource);

        javaMailSender.send(mail);
    }
}
