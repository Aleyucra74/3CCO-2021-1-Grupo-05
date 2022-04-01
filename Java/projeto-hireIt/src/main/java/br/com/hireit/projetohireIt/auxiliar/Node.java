package br.com.hireit.projetohireIt.auxiliar;

import br.com.hireit.projetohireIt.entity.CacheObject;

public class Node {

    private CacheObject info;
    private Node next;

    public Node(CacheObject info) {
        this.info = info;
        this.next = null;
    }

    public CacheObject getInfo() {
        return info;
    }

    public void setInfo(CacheObject info) {
        this.info = info;
    }

    public Node getNext() {
        return next;
    }

    public void setNext(Node next) {
        this.next = next;
    }

    @Override
    public String toString() {
        return "Node{" +
                "info=" + info +
                ", next=" + next +
                '}';
    }
}
