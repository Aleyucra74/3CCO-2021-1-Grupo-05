package br.com.hireit.projetohireIt.exportacao;

import br.com.hireit.projetohireIt.auxiliar.FilaObj;
import br.com.hireit.projetohireIt.tables.DemandasTable;
import br.com.hireit.projetohireIt.tables.OfertasTable;

import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Formatter;
import java.util.FormatterClosedException;

public class ExportacaoOD {

    public void gravaDemanda(FilaObj<DemandasTable> demandas, FilaObj<OfertasTable> ofertas, boolean isCSV, String nomeArquivo) {
        FileWriter arq = null;
        Formatter saida = null;
        boolean deuRuim = false;
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        if (isCSV) {
            nomeArquivo += ".csv";
            try {
                arq = new FileWriter(
                        "src/main/resources/static/"+nomeArquivo,
                        true);
                saida = new Formatter(arq);
            }
            catch (IOException erro) {
                System.err.println("Erro ao abrir arquivo");
                System.exit(1);
            }

            try {
                if (isCSV) {
                    if(ofertas.isEmpty()){
                        System.out.println("Lista de ofertas vazia");
                    }else{
                        for(int i = 0; i <= ofertas.getTamanho() + 1; i++){
                            OfertasTable oferta = ofertas.poll();
                            saida.format("%s;%s;%s%n", oferta.getDescricao(),
                                   oferta.getCreatedAt().format(formatter2), oferta.getUsuario().getEmail());
                        }
                    }

                    if(demandas.isEmpty()){
                        System.out.println("Lista de demandas vazia");
                    }else{
                        for(int i = 0; i <= demandas.getTamanho() + 1; i++){
                            DemandasTable demanda = demandas.poll();
                            saida.format("%s;%s;%s;%06.2f;%s%n", demanda.getTitulo(),
                                    demanda.getDescricao(), demanda.getCreatedAt().format(formatter2),
                                    demanda.getSalario(), demanda.getUsuario().getEmail());
                        }
                    }
                }
            }
            catch (FormatterClosedException erro) {
                System.err.println("Erro ao gravar no arquivo");
                deuRuim= true;
            }
            finally {
                saida.close();
                try {
                    arq.close();
                }
                catch (IOException erro) {
                    System.err.println("Erro ao fechar arquivo.");
                    deuRuim = true;
                }
                if (deuRuim) {
                    System.exit(1);
                }
            }
        }
        else {
            nomeArquivo += ".txt";
            String header = "";
            String corpo = "";
            String trailer = "";
            int contOfertas = 0;
            int contDemandas = 0;

            try {
                arq = new FileWriter(
                        "src/main/resources/static/"+nomeArquivo,
                        true);
                saida = new Formatter(arq);
            }
            catch (IOException erro) {
                System.err.println("Erro ao abrir arquivo");
                System.exit(1);
            }
            try {
                Date todayData = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
                SimpleDateFormat formatterMonth = new SimpleDateFormat("MM");
                SimpleDateFormat formatterYear = new SimpleDateFormat("yyyy");
                int semestre = (Integer.parseInt(formatterMonth.format(todayData)) > 6)? 02 : 01 ;

                header += "00PROJETO"+formatterYear.format(todayData)+semestre;
                header += formatter.format(todayData)+"01\n";

                saida.format(header);

                if(ofertas.isEmpty()){
                    System.out.println("Lista de ofertas vazia");
                }else{
                    for(int i = 0; i <= ofertas.getTamanho() + 1; i++){
                        OfertasTable oferta = ofertas.poll();

                        if(corpo == "") {
                            corpo += "02";
                        }else {
                            corpo = "02";
                        }

                        corpo += String.format("%-300s", oferta.getDescricao());
                        corpo += String.format("%-19s", oferta.getCreatedAt().format(formatter2));
                        corpo += String.format("%-45s\n", oferta.getUsuario().getEmail());

                        contOfertas++;
                        saida.format(corpo);
                    }
                }

                if(demandas.isEmpty()){
                    System.out.println("Lista de demandas vazia");
                }else {
                    for(int i = 0; i <= demandas.getTamanho() + 1; i++){
                        DemandasTable demanda = demandas.poll();

                        if(corpo == "") {
                            corpo += "03";
                        }else {
                            corpo = "03";
                        }

                        corpo += String.format("%-45s", demanda.getTitulo());
                        corpo += String.format("%-300s", demanda.getDescricao());
                        corpo += String.format("%-19s", demanda.getCreatedAt().format(formatter2));
                        corpo += String.format("%09.2f", demanda.getSalario());
                        corpo += String.format("%-45s\n", demanda.getUsuario().getEmail());

                        contDemandas++;
                        saida.format(corpo);

                    }
                }

                trailer += "01";
                trailer += String.format("%010d", contOfertas);
                trailer += String.format("%010d\n", contDemandas);
                saida.format(trailer);

            }
            catch (FormatterClosedException erro) {
                System.err.println("Erro ao gravar no arquivo");
                deuRuim= true;
            }
            finally {
                saida.close();
                try {
                    arq.close();
                }
                catch (IOException erro) {
                    System.err.println("Erro ao fechar arquivo.");
                    deuRuim = true;
                }
                if (deuRuim) {
                    System.exit(1);
                }
            }
        }
    }
}
