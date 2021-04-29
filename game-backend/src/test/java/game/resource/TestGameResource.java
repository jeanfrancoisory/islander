package game.resource;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.hanleyt.JerseyExtension;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.Response;

import game.model.Game;
import game.model.Map;
import game.model.Score;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;


import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestGameResource {

    public String data;
    static {
        System.setProperty("jersey.config.test.container.port", "0");
    }

    //static final Logger log = Logger.getLogger(TestGameResource.class.getSimpleName());

    @SuppressWarnings("unused")
    @RegisterExtension
    JerseyExtension jerseyExtension = new JerseyExtension(this::configureJersey);

    Application configureJersey() {
        return new ResourceConfig(GameResource.class)
                .register(MyExceptionMapper.class)
                .register(JacksonFeature.class);
    }

    @BeforeEach
    public void beforeEach() {
        try {
            data = Files.readString(Paths.get("src/main/webapp/maps.txt"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @AfterEach
    public void afterEach() {
        try {
            PrintWriter writer = new PrintWriter("src/main/webapp/maps.txt");
            writer.print("");
            writer.close();
            FileWriter file = new FileWriter("src/main/webapp/maps.txt");
            file.write(data);
            file.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    <T> T LogJSONAndUnmarshallValue(final Response res, final Class<T> classToRead) {
        res.bufferEntity();
        final String json = res.readEntity(String.class);
        //log.log(Level.INFO, "JSON received: " + json);
        final T obj = res.readEntity(classToRead);
        res.close();
        return obj;
    }

    // Example of a route test. The one for getting a list of available maps
    // To edit
//  @Test
//  void testGetNames(final Client client, final URI baseUri) {
//		final Response res = client
//			.target(baseUri)
//			.path("game/maps/names")
//			.request()
//			.get();

//		assertEquals(Response.Status.OK.getStatusCode(), res.getStatus());
//		final List<String> names = res.readEntity(new GenericType<>() {});
    // add other assertions to check 'names'
//  }

    @Test
    void testPostScore(final Client client, final URI baseUri) {
        final Response responseAfterPost = client
                .target(baseUri)
                .path("game/Carte1/playerone/1")
                .request()
                .post(Entity.text(""));
        assertEquals(Response.Status.OK.getStatusCode(), responseAfterPost.getStatus());
        Score score = LogJSONAndUnmarshallValue(responseAfterPost, Score.class);
        assertEquals("playerone", score.getPlayer().getName());
        assertEquals(1, score.getScore());
    }

    @Test
    void testPostScoreNewMap(final Client client, final URI baseUri) {
        final Response responseAfterPost = client
                .target(baseUri)
                .path("game/mapone/playerone/1")
                .request()
                .post(Entity.text(""));
        assertEquals(Response.Status.OK.getStatusCode(), responseAfterPost.getStatus());
        Score score = LogJSONAndUnmarshallValue(responseAfterPost, Score.class);
        assertEquals("playerone", score.getPlayer().getName());
        assertEquals(1, score.getScore());
        Response responseAfterGet = client
                .target(baseUri)
                .path("game/name/mapone")
                .request()
                .get();
        assertEquals(Response.Status.OK.getStatusCode(), responseAfterGet.getStatus());
        Map mapAfterGet = responseAfterGet.readEntity(Map.class);
        assertEquals("mapone", mapAfterGet.getName());
    }

    @Test
    void testGetMaps(final Client client, final URI baseUri) {
        ObjectMapper mapper = new ObjectMapper();
        Game game = null;
        List<Map> mapList = null;
        try {
            game = mapper.readValue(new File("src/main/webapp/maps.txt"), Game.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        mapList = game.getMapList();
        final Response responseAfterGet = client
                .target(baseUri)
                .path("game/maps")
                .request()
                .get();
        assertEquals(Response.Status.OK.getStatusCode(), responseAfterGet.getStatus());
        List<String> mapListAfterGet = responseAfterGet.readEntity(new GenericType<List<String>>() {
        });
        assertEquals(mapListAfterGet.size(), mapList.size());
    }

    @Test
    void testGetOneMap(final Client client, final URI baseUri) {
        ObjectMapper mapper = new ObjectMapper();
        Game mapList = null;
        try {
            mapList = mapper.readValue(new File("src/main/webapp/maps.txt"), Game.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Map map = mapList
                .getMapList()
                .stream()
                .filter(m -> m.getName().equals("Carte1"))
                .findFirst()
                .get();
        Response responseAfterGet = client
                .target(baseUri)
                .path("game/name/Carte1")
                .request()
                .get();
        assertEquals(Response.Status.OK.getStatusCode(), responseAfterGet.getStatus());
        Map mapAfterGet = responseAfterGet.readEntity(Map.class);
        assertEquals(map.getName(), mapAfterGet.getName());
    }

    @Test
    void testGetScores(final Client client, final URI baseUri) {
        Response s1 = client
                .target(baseUri)
                .path("game/map1/player1/1")
                .request()
                .post(Entity.text(""));
        Score score1 = LogJSONAndUnmarshallValue(s1, Score.class);
        Response s2 = client
                .target(baseUri)
                .path("game/map1/player2/2")
                .request()
                .post(Entity.text(""));
        Score score2 = LogJSONAndUnmarshallValue(s2, Score.class);
        Response responseAfterGet = client
                .target(baseUri)
                .path("game/map1/scores")
                .request()
                .get();
        assertEquals(Response.Status.OK.getStatusCode(), responseAfterGet.getStatus());
        List<Score> scoreList = responseAfterGet.readEntity(new GenericType<List<Score>>() {
        });
        assertEquals(scoreList.size(), 2);
    }

}
