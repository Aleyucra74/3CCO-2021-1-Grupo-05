package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.auxiliar.FilaObj;
import br.com.hireit.projetohireIt.exportacao.ExportacaoOD;
import br.com.hireit.projetohireIt.repository.UsuarioRepository;
import br.com.hireit.projetohireIt.tables.DemandasTable;
import br.com.hireit.projetohireIt.tables.OfertasTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequestMapping("/export")
public class ExportacaoODController {

    ExportacaoOD exportacao = new ExportacaoOD();
    FilaObj<DemandasTable> demandas = new FilaObj<>(100);
    FilaObj<OfertasTable> ofertas = new FilaObj<>(100);

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping(value = "/demanda")
    public ResponseEntity postDemandas(@RequestBody DemandasTable demanda){
        try {

            demanda.setCreatedAt(java.time.LocalDateTime.now());
            demanda.setUsuario(usuarioRepository.findUsuario(3));

            demandas.insert(demanda);

        }catch (Exception e){
            return ResponseEntity.status(400).body("Erro ao criar a demanda");
        }

        return ResponseEntity.status(200).build();
    }

    @PostMapping(value = "/oferta")
    public ResponseEntity postOfertas(@RequestBody OfertasTable oferta){
        try {

            oferta.setCreatedAt(java.time.LocalDateTime.now());
            oferta.setUsuario(usuarioRepository.findUsuario(3));

            ofertas.insert(oferta);

        }catch (Exception e){
            return ResponseEntity.status(400).body("Erro ao criar a oferta");
        }

        return ResponseEntity.status(200).build();
    }

    @GetMapping(value = "/{isCsv}")
    public ResponseEntity gravarLista(HttpServletResponse response, @PathVariable("isCsv") boolean isCsv) throws IOException {
        exportacao.gravaDemanda(demandas, ofertas, isCsv,"CargaOD");

        String downloadFolder = "src/main/resources/static/";

        if (isCsv) {
            Path file = Paths.get(downloadFolder, "CargaOD.csv");
            response.setContentType("text/csv");
            response.addHeader("Content-Disposition","attachment; filename=CargaOD.csv");
            Files.copy(file, response.getOutputStream());
            response.getOutputStream().flush();
        }else {
            Path file = Paths.get(downloadFolder, "CargaOD.txt");
            response.setContentType("text/plain");
            response.addHeader("Content-Disposition","attachment; filename=CargaOD.txt");
            Files.copy(file,response.getOutputStream());
            response.getOutputStream().flush();
        }

        return ResponseEntity.status(200).build();
    }
}
