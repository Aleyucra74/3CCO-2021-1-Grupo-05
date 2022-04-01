package br.com.hireit.projetohireIt.service;

import br.com.hireit.projetohireIt.auxiliar.ListaLigada;
import br.com.hireit.projetohireIt.entity.CacheObject;
import br.com.hireit.projetohireIt.repository.DemandaRepository;
import br.com.hireit.projetohireIt.repository.TecnologiaDemandaRepository;
import br.com.hireit.projetohireIt.tables.DemandasTable;
import br.com.hireit.projetohireIt.tables.TecnologiaDemandaTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Component
public class CacheService {

    private ListaLigada[] tab;
    private String[] uf = {"AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MG", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RS", "RR", "SC", "SE", "SP", "TO"};

    @Autowired
    private DemandaRepository demandaRepository;

    @Autowired
    private TecnologiaDemandaRepository tecnologiaDemandaRepository;

    @PostConstruct
    public void indexar(){
        tab = new ListaLigada[uf.length];

        List<DemandasTable> listDemandas = demandaRepository.findAll();

        for(int i = 0; i < tab.length; i++){
            int finalI = i;
            tab[finalI] = new ListaLigada();
            List<DemandasTable> listDemandasUf =
                    listDemandas.stream().filter(
                            DemandasTable -> DemandasTable.getUsuario().getLocalizacao().getUf().equals(uf[finalI])
                    ).collect(Collectors.toList());

            listDemandasUf.forEach(demanda ->
                {
                    List<TecnologiaDemandaTable> listTecnologia = tecnologiaDemandaRepository.findByFkdemanda(demanda.getIdDemanda());
                    List<String> tecnologias = new ArrayList<>();

                    listTecnologia.forEach(tecnologiaDemandaTable -> {
                        if(tecnologias.size() < 3){
                            tecnologias.add(tecnologiaDemandaTable.getTecnologias().getTecnologia());
                        }
                    });

                    tab[finalI].insereNode(
                            new CacheObject(
                                demanda.getIdDemanda(),
                                demanda.getTitulo(),
                                demanda.getDescricao(),
                                demanda.getCreatedAt().toString(),
                                tecnologias
                            )
                    );
                }
            );
        }
    }

    public void addProjeto(CacheObject cacheObject, String ufFiltro){
        for (int i = 0; i < uf.length; i++){
            if(uf[i].equals(ufFiltro)){
                tab[i].insereNode(cacheObject);
            }
        }
    }

    public void addTecnologia(String ufFiltro, int fkDemanda, String tecnologia){
        for (int i = 0; i < uf.length; i++){
            if(uf[i].equals(ufFiltro)){
                tab[i].inserirTecnologia(tecnologia, fkDemanda);
            }
        }
    }

    public List<CacheObject> retornaLista(String ufFiltro){
        for (int i = 0; i < uf.length; i++){
            if(uf[i].equals(ufFiltro)){
                return tab[i].converteLista();
            }
        }

        return new ArrayList<>();
    }
}
