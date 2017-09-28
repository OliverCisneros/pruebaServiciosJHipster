package org.jhipster.blog.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.blog.domain.Bank;

import org.jhipster.blog.repository.BankRepository;
import org.jhipster.blog.repository.search.BankSearchRepository;
import org.jhipster.blog.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Bank.
 */
@RestController
@RequestMapping("/api")
public class BankResource {

    private final Logger log = LoggerFactory.getLogger(BankResource.class);

    private static final String ENTITY_NAME = "bank";

    private final BankRepository bankRepository;

    private final BankSearchRepository bankSearchRepository;

    public BankResource(BankRepository bankRepository, BankSearchRepository bankSearchRepository) {
        this.bankRepository = bankRepository;
        this.bankSearchRepository = bankSearchRepository;
    }

    /**
     * POST  /banks : Create a new bank.
     *
     * @param bank the bank to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bank, or with status 400 (Bad Request) if the bank has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/banks")
    @Timed
    public ResponseEntity<Bank> createBank(@Valid @RequestBody Bank bank) throws URISyntaxException {
        log.debug("REST request to save Bank : {}", bank);
        if (bank.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new bank cannot already have an ID")).body(null);
        }
        Bank result = bankRepository.save(bank);
        bankSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/banks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /banks : Updates an existing bank.
     *
     * @param bank the bank to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bank,
     * or with status 400 (Bad Request) if the bank is not valid,
     * or with status 500 (Internal Server Error) if the bank couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/banks")
    @Timed
    public ResponseEntity<Bank> updateBank(@Valid @RequestBody Bank bank) throws URISyntaxException {
        log.debug("REST request to update Bank : {}", bank);
        if (bank.getId() == null) {
            return createBank(bank);
        }
        Bank result = bankRepository.save(bank);
        bankSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bank.getId().toString()))
            .body(result);
    }

    /**
     * GET  /banks : get all the banks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of banks in body
     */
    @GetMapping("/banks")
    @Timed
    public List<Bank> getAllBanks() {
        log.debug("REST request to get all Banks");
        return bankRepository.findAll();
        }

    /**
     * GET  /banks/:id : get the "id" bank.
     *
     * @param id the id of the bank to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bank, or with status 404 (Not Found)
     */
    @GetMapping("/banks/{id}")
    @Timed
    public ResponseEntity<Bank> getBank(@PathVariable Long id) {
        log.debug("REST request to get Bank : {}", id);
        Bank bank = bankRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bank));
    }

    /**
     * DELETE  /banks/:id : delete the "id" bank.
     *
     * @param id the id of the bank to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/banks/{id}")
    @Timed
    public ResponseEntity<Void> deleteBank(@PathVariable Long id) {
        log.debug("REST request to delete Bank : {}", id);
        bankRepository.delete(id);
        bankSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/banks?query=:query : search for the bank corresponding
     * to the query.
     *
     * @param query the query of the bank search
     * @return the result of the search
     */
    @GetMapping("/_search/banks")
    @Timed
    public List<Bank> searchBanks(@RequestParam String query) {
        log.debug("REST request to search Banks for query {}", query);
        return StreamSupport
            .stream(bankSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
