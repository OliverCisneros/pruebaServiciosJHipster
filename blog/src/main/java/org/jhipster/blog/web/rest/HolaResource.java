package org.jhipster.blog.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.blog.domain.Hola;

import org.jhipster.blog.repository.HolaRepository;
import org.jhipster.blog.repository.search.HolaSearchRepository;
import org.jhipster.blog.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Hola.
 */
@RestController
@RequestMapping("/api")
public class HolaResource {

    private final Logger log = LoggerFactory.getLogger(HolaResource.class);

    private static final String ENTITY_NAME = "hola";

    private final HolaRepository holaRepository;

    private final HolaSearchRepository holaSearchRepository;

    public HolaResource(HolaRepository holaRepository, HolaSearchRepository holaSearchRepository) {
        this.holaRepository = holaRepository;
        this.holaSearchRepository = holaSearchRepository;
    }

    /**
     * POST  /holas : Create a new hola.
     *
     * @param hola the hola to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hola, or with status 400 (Bad Request) if the hola has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/holas")
    @Timed
    public ResponseEntity<Hola> createHola(@RequestBody Hola hola) throws URISyntaxException {
        log.debug("REST request to save Hola : {}", hola);
        if (hola.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new hola cannot already have an ID")).body(null);
        }
        Hola result = holaRepository.save(hola);
        holaSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/holas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /holas : Updates an existing hola.
     *
     * @param hola the hola to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hola,
     * or with status 400 (Bad Request) if the hola is not valid,
     * or with status 500 (Internal Server Error) if the hola couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/holas")
    @Timed
    public ResponseEntity<Hola> updateHola(@RequestBody Hola hola) throws URISyntaxException {
        log.debug("REST request to update Hola : {}", hola);
        if (hola.getId() == null) {
            return createHola(hola);
        }
        Hola result = holaRepository.save(hola);
        holaSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hola.getId().toString()))
            .body(result);
    }

    /**
     * GET  /holas : get all the holas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of holas in body
     */
    @GetMapping("/holas")
    @Timed
    public List<Hola> getAllHolas() {
        log.debug("REST request to get all Holas");
        return holaRepository.findAll();
        }

    /**
     * GET  /holas/:id : get the "id" hola.
     *
     * @param id the id of the hola to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hola, or with status 404 (Not Found)
     */
    @GetMapping("/holas/{id}")
    @Timed
    public ResponseEntity<Hola> getHola(@PathVariable Long id) {
        log.debug("REST request to get Hola : {}", id);
        Hola hola = holaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(hola));
    }

    /**
     * DELETE  /holas/:id : delete the "id" hola.
     *
     * @param id the id of the hola to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/holas/{id}")
    @Timed
    public ResponseEntity<Void> deleteHola(@PathVariable Long id) {
        log.debug("REST request to delete Hola : {}", id);
        holaRepository.delete(id);
        holaSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/holas?query=:query : search for the hola corresponding
     * to the query.
     *
     * @param query the query of the hola search
     * @return the result of the search
     */
    @GetMapping("/_search/holas")
    @Timed
    public List<Hola> searchHolas(@RequestParam String query) {
        log.debug("REST request to search Holas for query {}", query);
        return StreamSupport
            .stream(holaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
