package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.exportacao.Exportacao;
import br.com.hireit.projetohireIt.exportacao.ListaObj;
import br.com.hireit.projetohireIt.interfaces.DemandasInterface;
import br.com.hireit.projetohireIt.repository.DownloadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/downloads")
public class DownloadController {

    Exportacao exportacao = new Exportacao();

    @Autowired
    private DownloadRepository downloadRepository;

    @GetMapping(value = "/{isCsv}/CargaProjetos")
    public ResponseEntity getCargaProjetos(
            HttpServletResponse response,
            @PathVariable("isCsv") boolean isCsv
    ) throws IOException {

        List<DemandasInterface> demandasViews = downloadRepository.findByProjetos(1);
        ListaObj<DemandasInterface> demandas = new ListaObj<>(demandasViews.size());
        for (int i=0;i<demandasViews.size();i++){
            DemandasInterface demanda = demandasViews.get(i);
            demandas.adiciona(demanda);
        }

        exportacao.gravaLista(demandas,isCsv,"CargaProjetos");

        String downloadFolder = "src/main/resources/static/";

        if (isCsv) {
            Path file = Paths.get(downloadFolder, "CargaProjetos.csv");
            response.setContentType("text/csv");
            response.addHeader("Content-Disposition","attachment; filename=CargaProjetos.csv");
            Files.copy(file, response.getOutputStream());
            response.getOutputStream().flush();
        }else {
            Path file = Paths.get(downloadFolder, "CargaProjetos.txt");
            response.setContentType("text/plain");
            response.addHeader("Content-Disposition","attachment; filename=CargaProjetos.txt");
            Files.copy(file,response.getOutputStream());
            response.getOutputStream().flush();
        }
        return ResponseEntity.status(200).build();

    }

}
