package br.com.hireit.projetohireIt.exportacao;

import br.com.hireit.projetohireIt.interfaces.DemandasInterface;

import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

public class Exportacao {

    public void gravaLista(ListaObj<DemandasInterface> projetos, boolean isCSV, String nomeArquivo) {
        FileWriter arq = null;
        Formatter saida = null;
        boolean deuRuim = false;

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
                for (int i=0; i< projetos.getTamanho(); i++) {
                    DemandasInterface projeto = projetos.getElemento(i);
                    if (isCSV) {
                        saida.format("%s;%s;%s;%s%n",projeto.getNome(),
                                projeto.getTitulo(),projeto.getTecnologia(),projeto.getSoftskills());
                    }
//                    else {
//                        saida.format("%s %s %s %s%n",projeto.getNome(),
//                                projeto.getTitulo(),projeto.getTecnologia(),projeto.getSoftskills());
//                    }
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
            String detail = "";
            String trailer = "";
            int contRegister = 0;

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
                int semester = (Integer.parseInt(formatterMonth.format(todayData)) > 6)? 02 : 01 ;

                header += "00PROJETO"+formatterYear.format(todayData)+semester;
                header += formatter.format(todayData)+"01\n";

                saida.format(header);

                for (int i = 0; i < projetos.getTamanho(); i++ ) {
                    DemandasInterface projeto = projetos.getElemento(i);
                    if(detail.isEmpty()) {
                        detail = "10" + String.format("%02d", contRegister) + String.format("%-50s", projeto.getNome())+"\n";
                        saida.format(detail);
                    }
                    else{
                        detail="";
                        break;
                    }
                }

                for (int i = 0;i< projetos.getTamanho();i++) {
                    DemandasInterface projeto = projetos.getElemento(i);
                    detail = contRegister>0 ? "  11" : detail+"  11";

                    contRegister++;
                    detail += String.format("%-50s", projeto.getTitulo())+"\n";
                    detail += "  12"+String.format("%-20s", projeto.getTecnologia())+"\n";
                    detail += "  13"+String.format("%-25s", projeto.getSoftskills())+"\n";

                    saida.format(detail);
                }

                trailer += "02";
                trailer += String.format("%010d",contRegister);
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
