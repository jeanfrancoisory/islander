package game.model;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Class représentant les scores. Elle contient un joueur et le score fait par ce joueur.
 */
@XmlRootElement
public class Score {
    private Player player;
    private int score;
    public Score() {
    }

    public Score(final Player player, final int score) {
        this.player = player;
        this.score = score;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(final Player player) {
        this.player = player;
    }

    public int getScore() {
        return score;
    }

    public void setScore(final int score) {
        this.score = score;
    }
}
