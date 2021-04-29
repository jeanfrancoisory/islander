package game.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Tile {
    private String type;

    public Tile(final String type) {
        this.type = type;
    }

    public Tile() {
    }

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }
}
