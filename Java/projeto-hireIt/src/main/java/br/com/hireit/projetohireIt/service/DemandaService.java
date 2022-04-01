package br.com.hireit.projetohireIt.service;

import br.com.hireit.projetohireIt.entity.Filtro;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DemandaService {

    public Filtro filtrarDemanda(Filtro filtro){

        if(filtro.getUF() == null){
            filtro.setUF("%%");
        }else{
            filtro.setUF("%"+ filtro.getUF() +"%");
        }

        if(filtro.getTitulo() == null){
            filtro.setTitulo("%%");
        }else{
            filtro.setTitulo("%"+filtro.getTitulo()+"%");
        }

        if(filtro.getData() == null){
            filtro.setData("01/01/1900");
        }

        if(filtro.getSalarioMin() == null){
            filtro.setSalarioMin(0.0);
        }

        if(filtro.getSalarioMax() == null){
            filtro.setSalarioMax(1000000.0);
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

    public String transformarData(LocalDateTime data){
        return data.getMonthValue() + "/" + data.getDayOfMonth() +"/"+ data.getYear();
    }
}
