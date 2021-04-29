package game.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
/**
 Joueur qui va être associé à un score
 **/
public class Player {

    private String name;

    public Player() {
    }

    public Player(final String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

}
