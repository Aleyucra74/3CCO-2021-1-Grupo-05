package br.com.hireit.projetohireIt.auxiliar;

import br.com.hireit.projetohireIt.entity.CacheObject;
import br.com.hireit.projetohireIt.tables.DemandasTable;

import java.util.ArrayList;
import java.util.List;

public class ListaLigada {

    private Node head;

    public ListaLigada() {
        head = new Node(null);
    }

    public void insereNode(CacheObject valor){
        Node node = new Node(valor);
        node.setNext(head.getNext());
        head.setNext(node);
    }

    public void inserirTecnologia(String tecnologia, int idProjeto){
        Node atual = head.getNext();

        while(atual != null){
            if(atual.getInfo().getIdProjeto() == idProjeto){
                if(atual.getInfo().getListTecnologias().size() < 3){
                    atual.getInfo().getListTecnologias().add(tecnologia);
                }
            }
            atual = atual.getNext();
        }
    }

    public List<CacheObject> converteLista(){
        List<CacheObject> listDemandas = new ArrayList<>();
        Node atual = head.getNext();

        while(atual != null){
            listDemandas.add(atual.getInfo());
            atual = atual.getNext();
        }

        return listDemandas;
    }
}
