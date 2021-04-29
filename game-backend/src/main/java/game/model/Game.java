package game.model;

import java.util.List;

/**
 * Class principale contenant la liste des cartes
 **/
public class Game {
    /**
     * Liste des cartes
     **/
    private List<Map> mapList;

    public Game() {
    }

    public List<Map> getMapList() {
        return mapList;
    }

    /**
     * Cherche dans la liste des cartes celle correspondant au nom donné en paramètre
     *
     * @param name
     * @return Map
     */
    public Map getMapFromName(final String name) {
        final Map res = mapList
                .stream()
                .filter(m -> m.getName().equals(name))
                .findFirst()
                .get();
        return res;
    }

    public void setMapList(final List<Map> mapList) {
        this.mapList = mapList;
    }

    /**
     * Ajoute un score correspondant à une carte dont le nom est passé en paramètre.
     *
     * @param name
     * @param score
     */
    public void addScoreForMap(final String name, final Score score) {
        //Si la carte n'existe pas, on la rajoute à la liste.
        if (!mapList.stream().map(Map::getName).anyMatch(name::equals)) {
            mapList.add(new Map(name));
        }
        mapList
                .stream()
                .filter(m -> m.getName().equals(name))
                .findFirst()
                .get()
                .addScore(score);
    }

}
