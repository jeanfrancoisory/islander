package game.resource;

import com.fasterxml.jackson.databind.ObjectMapper;
import game.model.Game;
import game.model.Map;
import game.model.Player;
import game.model.Score;
import io.swagger.annotations.Api;

import javax.inject.Singleton;
import java.io.File;
//import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Comparator;
import java.util.List;
import java.net.HttpURLConnection;
import java.util.stream.Collectors;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Singleton
@Path("game")
@Api(value = "game")
public class GameResource {

    private final Game game;


    public GameResource() {
        super();
        final ObjectMapper mapper = new ObjectMapper();
        Game game = null;
        try {
            game = mapper.readValue(new File("src/main/webapp/maps.txt"), Game.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        this.game = game;
    }

    @POST
    @Path("{map}/{player}/{score}")
    @Produces(MediaType.APPLICATION_JSON)
    public Score postScore(@PathParam("map") final String map, @PathParam("player") final String player, @PathParam("score") final int score) {
        final Player p = new Player(player);
        final Score s = new Score(p, score);
        try {
            game.addScoreForMap(map, s);
        } catch (final IllegalArgumentException ex) {
            throw new WebApplicationException(Response.status(HttpURLConnection.HTTP_BAD_REQUEST, ex.getMessage()).build());
        }
        final ObjectMapper mapper = new ObjectMapper();
        try {
            final String json = mapper.writeValueAsString(game);
            final PrintWriter writer = new PrintWriter("src/main/webapp/maps.txt");
            writer.print(json);
            writer.close();
            //final FileWriter file = new FileWriter("src/main/webapp/maps.txt");
            //file.write(json);
            //file.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return s;
    }

    @GET
    @Path("maps")
    @Produces(MediaType.APPLICATION_JSON)
    public List getMaps() {
        final List<Map> listMaps = game.getMapList();
        final List<String> listRes = listMaps
                .stream()
                .map(Map::getName)
                .collect(Collectors.toList());

        return listRes;
    }

    @GET
    @Path("name/{map}")
    @Produces(MediaType.APPLICATION_JSON)
    public Map getOneMap(@PathParam("map") final String map) {
        final Map m = game.getMapFromName(map);
        return m;
    }

    @GET
    @Path("{map}/scores")
    @Produces(MediaType.APPLICATION_JSON)
    public List getScores(@PathParam("map") final String map) {
        final List<Score> listMaps = game.getMapFromName(map).getScoreList();
        final List<Score> result = listMaps
                .stream()
                .sorted(Comparator.<Score>comparingInt(Score::getScore).reversed())
                .limit(5)
                .collect(Collectors.toList());
        return result;
    }

}
