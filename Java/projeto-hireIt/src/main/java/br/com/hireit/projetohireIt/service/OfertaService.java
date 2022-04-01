package br.com.hireit.projetohireIt.service;

import br.com.hireit.projetohireIt.entity.Filtro;
import br.com.hireit.projetohireIt.tables.OfertasTable;
import br.com.hireit.projetohireIt.tables.TecnologiaOfertaTable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfertaService {

    public Filtro filtrarDemanda(Filtro filtro){

        if(filtro.getUF() == null){
            filtro.setUF("%%");
        }else{
            filtro.setUF("%"+ filtro.getUF() +"%");
        }

        if(filtro.getData() == null){
            filtro.setData("01/01/1900");
        }

        if(filtro.getUsuario() == null){
            filtro.setUsuario("%%");
        }else{
            filtro.setUsuario("%"+ filtro.getUsuario() +"%");
        }

        if(filtro.getTecnologia() == null){
            filtro.setTecnologia("%%");
        }else{
            filtro.setTecnologia("%"+ filtro.getTecnologia() +"%");
        }

        return filtro;
    }

}
