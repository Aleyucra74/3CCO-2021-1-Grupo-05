package br.com.hireit.projetohireIt.service;

import br.com.hireit.projetohireIt.entity.MelhorOferta;
import br.com.hireit.projetohireIt.tables.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropostaService {

    public MelhorOferta calcularMatch(
            PropostasTable proposta,
            UsuariosTable usuario,
            List<TecnologiaDemandaTable> tecnologiasDemanda,
            List<TecnologiaOfertaTable> tecnologiasOferta,
            List<SoftSkillDemandaTable> softskillsDemanda,
            List<SoftSkillUsuarioTable> softskillsOferta
    ){
        double match = 0.0;
        double avaliacao = 0.0;
        double hardskill = 0.0;
        double softskill = 0.0;

        double notaUsuario = usuario.getClassificacao().doubleValue();

        if(notaUsuario >= 0 && notaUsuario < 1){
            avaliacao = 10.0;
        }else if (notaUsuario >= 2 && notaUsuario < 3){
            avaliacao = 25.0;
        }else if (notaUsuario >= 3 && notaUsuario < 4){
            avaliacao = 60.0;
        }else if (notaUsuario >= 4 && notaUsuario < 5){
            avaliacao = 90.0;
        }else if (notaUsuario == 5){
            avaliacao = 100.0;
        }

        if(tecnologiasDemanda.isEmpty()){
            hardskill = 100;
        }else{
            double valorTecnologia = (100/tecnologiasDemanda.size());

            for(TecnologiaDemandaTable tecnologiaDemanda: tecnologiasDemanda){
                for(TecnologiaOfertaTable tecnologiaOferta: tecnologiasOferta){
                    if(tecnologiaDemanda.getTecnologias() == tecnologiaOferta.getTecnologias()){
                        double notaTecnologia = 30.0;
                        if(tecnologiaDemanda.getTempoExperiencia() <= tecnologiaOferta.getTempoExperiencia()){
                            notaTecnologia += 70.0;
                        }
                        hardskill += (notaTecnologia * valorTecnologia/100);
                    }
                }
            }
        }

        if(softskillsDemanda.isEmpty()){
            softskill = 100;
        }else{
            double valorSoftskill = (100/softskillsDemanda.size());

            for(SoftSkillDemandaTable softskillDemanda: softskillsDemanda){
                for(SoftSkillUsuarioTable softskillOferta: softskillsOferta){
                    if(softskillDemanda.getSoftskill() == softskillOferta.getSoftskill()){
                        double skillEsperada =softskillDemanda.getNotaSoftskill();
                        double skillUsuario = softskillOferta.getNotaSoftskill();
                        double notaSkill = 0.0;

                        if(
                                skillUsuario <= skillEsperada - skillEsperada*0.9 ||
                                        skillUsuario > skillEsperada + skillEsperada*0.9
                        ) {
                            notaSkill = 0.0;
                        }else if(
                                skillUsuario <= skillEsperada - skillEsperada*0.7 ||
                                        skillUsuario > skillEsperada + skillEsperada*0.7
                        ){
                            notaSkill = 10.0;
                        }else if(
                                skillUsuario <= skillEsperada - skillEsperada*0.5 ||
                                        skillUsuario > skillEsperada + skillEsperada*0.5
                        ){
                            notaSkill = 30.0;
                        }else if(
                                skillUsuario <= skillEsperada - skillEsperada*0.3 ||
                                        skillUsuario > skillEsperada + skillEsperada*0.3
                        ) {
                            notaSkill = 70.0;
                        }else if(
                                skillUsuario <= skillEsperada - skillEsperada*0.1 ||
                                        skillUsuario >= skillEsperada + skillEsperada*0.1
                        ) {
                            notaSkill = 90.0;
                        }else{
                            notaSkill = 100.0;
                        }

                        softskill += (notaSkill * Math.ceil(valorSoftskill/100));
                    }
                }
            }
        }

        if(softskill > 100){
            softskill = 100;
        }

        match = (avaliacao * 0.1) + (hardskill * 0.45) + (softskill * 0.45);
        return new MelhorOferta(proposta.getOferta(), proposta.getDemanda(), Math.round(match*100.0)/100.0);
    }
}
