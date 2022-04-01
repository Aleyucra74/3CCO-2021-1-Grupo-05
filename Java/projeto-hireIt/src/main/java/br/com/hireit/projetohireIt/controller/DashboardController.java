package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.entity.DadosAvaliacoes;
import br.com.hireit.projetohireIt.entity.DadosCidade;
import br.com.hireit.projetohireIt.entity.DadosQuantidade;
import br.com.hireit.projetohireIt.entity.NotaSoftskill;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/dashboard", produces = "application/json; charset=utf-8")
public class DashboardController {

    @GetMapping("/softskills/{tecnologia}")
    public ResponseEntity getSoftskills(@PathVariable String tecnologia){

        List<NotaSoftskill> listaNotas = new ArrayList<>();

        String file = "softskills.csv";
        BufferedReader reader = null;
        String line = "";

        try{
            reader = new BufferedReader(new FileReader(file));
            while((line = reader.readLine()) != null){
                String[] row = line.split(",");

                if(row[0].equals(tecnologia)){
                    listaNotas.add(new NotaSoftskill(row[1], Integer.parseInt(row[2])));
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }

        if(listaNotas.isEmpty()){
            return ResponseEntity.status(204).build();
        }else{
            return ResponseEntity.status(200).body(listaNotas);
        }
    }

    @GetMapping("/projetos/{tecnologia}")
    public ResponseEntity getProjetos(@PathVariable String tecnologia){
        List<DadosQuantidade> listaProjetos = new ArrayList<>();

        String file = "projetos.csv";
        BufferedReader reader = null;
        String line = "";

        try{
            reader = new BufferedReader(new FileReader(file));
            while((line = reader.readLine()) != null){
                String[] row = line.split(",");

                if(row[0].equals(tecnologia)){
                    listaProjetos.add(new DadosQuantidade(row[1], row[2], Integer.parseInt(row[3])));
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }

        if(listaProjetos.isEmpty()){
            return ResponseEntity.status(204).build();
        }else{
            return ResponseEntity.status(200).body(listaProjetos);
        }
    }

    @GetMapping("/freelancers/{tecnologia}")
    public ResponseEntity getFreelancers(@PathVariable String tecnologia){
        List<DadosQuantidade> listaFreelancers = new ArrayList<>();

        String file = "freelancers.csv";
        BufferedReader reader = null;
        String line = "";

        try{
            reader = new BufferedReader(new FileReader(file));
            while((line = reader.readLine()) != null){
                String[] row = line.split(",");

                if(row[0].equals(tecnologia)){
                    listaFreelancers.add(new DadosQuantidade(row[1], row[2], Integer.parseInt(row[3])));
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }

        if(listaFreelancers.isEmpty()){
            return ResponseEntity.status(204).build();
        }else{
            return ResponseEntity.status(200).body(listaFreelancers);
        }
    }

    @GetMapping("/ofertas/{tecnologia}")
    public ResponseEntity getOfertas(@PathVariable String tecnologia){
        List<DadosQuantidade> listaOfertas = new ArrayList<>();

        String file = "ofertas.csv";
        BufferedReader reader = null;
        String line = "";

        try{
            reader = new BufferedReader(new FileReader(file));
            while((line = reader.readLine()) != null){
                String[] row = line.split(",");

                if(row[0].equals(tecnologia)){
                    listaOfertas.add(new DadosQuantidade(row[1], row[2], Integer.parseInt(row[3])));
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }

        if(listaOfertas.isEmpty()){
            return ResponseEntity.status(204).build();
        }else{
            return ResponseEntity.status(200).body(listaOfertas);
        }
    }

    @GetMapping("/avaliacoes/{tecnologia}")
    public ResponseEntity getAvaliacoes(@PathVariable String tecnologia){
        List<DadosAvaliacoes> listaAvaliacoes = new ArrayList<>();

        String file = "avaliacoes.csv";
        BufferedReader reader = null;
        String line = "";

        try{
            reader = new BufferedReader(new FileReader(file));
            while((line = reader.readLine()) != null){
                String[] row = line.split(",");

                if(row[0].equals(tecnologia)){
                    listaAvaliacoes.add(new DadosAvaliacoes(row[0], row[1], Double.parseDouble(row[2])));
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }

        final DadosAvaliacoes[] maiorNota = {new DadosAvaliacoes("", "", 0.0)};

        listaAvaliacoes.forEach(avaliacao ->{
            if(avaliacao.getNotaAvaliacao() > maiorNota[0].getNotaAvaliacao()){
                maiorNota[0] = avaliacao;
            }
        });

        if(listaAvaliacoes.isEmpty()){
            return ResponseEntity.status(204).build();
        }else{
            return ResponseEntity.status(200).body(maiorNota);
        }
    }

    @GetMapping("/cidades/{tecnologia}")
    public ResponseEntity getCidades(@PathVariable String tecnologia){
        String tecnologiaConvertida = tecnologia.replaceAll("%20", "");

        List<DadosCidade> listaQuantidade = new ArrayList<>();

        String file = "cidades.csv";
        BufferedReader reader = null;
        String line = "";

        try{
            reader = new BufferedReader(new FileReader(file));
            while((line = reader.readLine()) != null){
                String[] row = line.split(",");

                if(row[0].equals(tecnologiaConvertida)){
                    listaQuantidade.add(new DadosCidade(row[1], Integer.parseInt(row[2])));
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }

        if(listaQuantidade.isEmpty()){
            return ResponseEntity.status(204).build();
        }else{
            return ResponseEntity.status(200).body(listaQuantidade);
        }
    }
}
