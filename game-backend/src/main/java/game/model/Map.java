package game.model;


import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

/**
 * Class représentant les cartes avec la liste des scores et la liste des tiles
 */
@XmlRootElement
public class Map {
    /**
     * Nom de la carte
     */
    private String name;
    /**
     * Liste des scores
     */
    private List<Score> scoreList;
    /**
     * Liste des tiles
     */
    private List<Tile> tileList;

    public Map() {
    }

    public Map(final String name) {
        this.name = name;
        this.scoreList = new ArrayList<>();
        this.tileList = new ArrayList<>(100);
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public void addScore(final Score s) {
        scoreList.add(s);
    }

    public void addTile(final Tile s) {
        tileList.add(s);
    }

    public List<Score> getScoreList() {
        return scoreList;
    }

    public void setScoreList(final List<Score> scoreList) {
        this.scoreList = scoreList;
    }

    public List<Tile> getTileList() {
        return tileList;
    }

    public void setTileList(final List<Tile> tileList) {
        this.tileList = tileList;
    }
}
