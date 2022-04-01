package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.auxiliar.FilaObj;
import br.com.hireit.projetohireIt.auxiliar.PilhaObj;
import br.com.hireit.projetohireIt.repository.DemandaRepository;
import br.com.hireit.projetohireIt.repository.OfertaRepository;
import br.com.hireit.projetohireIt.repository.UsuarioRepository;
import br.com.hireit.projetohireIt.tables.DemandasTable;
import br.com.hireit.projetohireIt.tables.OfertasTable;
import br.com.hireit.projetohireIt.tables.UsuariosTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/import")
public class ImportacaoODController {

    PilhaObj<OfertasTable> ofertasPilha = new PilhaObj<>(100);
    PilhaObj<DemandasTable> demandasPilha = new PilhaObj<>(100);

    @Autowired
    private OfertaRepository ofertaRepository;

    @Autowired
    private DemandaRepository demandaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping()
    public ResponseEntity postAnexo(@RequestParam MultipartFile arquivo) throws IOException {
        String registro;
        String tipoRegistro;

        int contOfertas = 0;
        int contDemandas = 0;

        boolean header = false;
        boolean trailer = false;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

        BufferedReader entrada = new BufferedReader(
                new InputStreamReader(arquivo.getInputStream(), "UTF-8"));

        try {
            registro = entrada.readLine();

            while (registro != null) {
                tipoRegistro = registro.substring(0, 2);
                if (tipoRegistro.equals("00")) {
                    header = true;
                    System.out.println("Header encontrado!");
                    System.out.println(LocalDateTime.now());

                } else if (tipoRegistro.equals("01")) {
                    trailer = true;
                    boolean deuRuim = false;
                    int qtdOfertas = Integer.parseInt(registro.substring(2, 12));
                    int qtdDemandas = Integer.parseInt(registro.substring(12, 22));

                    if (qtdOfertas == contOfertas) {
                        System.out.println("Quantidade de ofertas gravadas compatível com quantidade lida");
                    } else {
                        System.out.println("Quantidade de ofertas gravadas não confere com quantidade lida");

                        while(!ofertasPilha.isEmpty()){
                            ofertaRepository.delete(ofertasPilha.pop());
                        }

                        deuRuim = true;
                    }

                    if (qtdDemandas == contDemandas) {
                        System.out.println("Quantidade de demandas gravadas compatível com quantidade lida");
                    } else {
                        System.out.println("Quantidade de demandas gravadas não confere com quantidade lida");

                        while(!demandasPilha.isEmpty()){
                            demandaRepository.delete(demandasPilha.pop());
                        }

                        deuRuim = true;
                    }
                    if(deuRuim){
                        return ResponseEntity.status(400).body("Quantidade de ofertas OU demandas gravadas não compatível com quantidade lida");
                    }

                } else if (tipoRegistro.equals("02")) {
                    OfertasTable novaOferta = new OfertasTable();

                    novaOferta.setDescricao(registro.substring(2, 302).trim());
                    novaOferta.setCreatedAt(LocalDateTime.parse(registro.substring(302, 321).replace('/', '-'), formatter));
                    novaOferta.setUsuario(usuarioRepository.findUsuarioByEmail(registro.substring(321, 366).trim()).get());

                    ofertaRepository.save(novaOferta);
                    ofertasPilha.push(novaOferta);

                    contOfertas++;

                } else if (tipoRegistro.equals("03")) {
                    DemandasTable novaDemanda = new DemandasTable();

                    novaDemanda.setTitulo(registro.substring(2, 47).trim());
                    novaDemanda.setDescricao(registro.substring(47, 347).trim());
                    novaDemanda.setCreatedAt(LocalDateTime.parse(registro.substring(347, 366).replace('/', '-'), formatter));
                    novaDemanda.setSalario(Double.parseDouble(registro.substring(366, 375).replace(',', '.')));
                    novaDemanda.setUsuario(usuarioRepository.findUsuarioByEmail(registro.substring(375, 420).trim()).get());

                    demandaRepository.save(novaDemanda);
                    demandasPilha.push(novaDemanda);

                    contDemandas++;

                } else {
                    return ResponseEntity.status(400).body("Tipo de registro inválido");
                }

                registro = entrada.readLine();
            }

            if(!header || !trailer){
                return ResponseEntity.status(400).body("Não foi encontrado um header ou trailer no documento");
            }

            entrada.close();
        } catch (IOException e) {
            return ResponseEntity.status(400).body("Erro ao ler arquivo");
        }

        return ResponseEntity.status(201).body("Importação feita com sucesso!");
    }

}
