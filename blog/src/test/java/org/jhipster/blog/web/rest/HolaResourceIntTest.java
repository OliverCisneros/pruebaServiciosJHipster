package org.jhipster.blog.web.rest;

import org.jhipster.blog.BlogApp;

import org.jhipster.blog.domain.Hola;
import org.jhipster.blog.repository.HolaRepository;
import org.jhipster.blog.repository.search.HolaSearchRepository;
import org.jhipster.blog.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HolaResource REST controller.
 *
 * @see HolaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogApp.class)
public class HolaResourceIntTest {

    @Autowired
    private HolaRepository holaRepository;

    @Autowired
    private HolaSearchRepository holaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHolaMockMvc;

    private Hola hola;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HolaResource holaResource = new HolaResource(holaRepository, holaSearchRepository);
        this.restHolaMockMvc = MockMvcBuilders.standaloneSetup(holaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hola createEntity(EntityManager em) {
        Hola hola = new Hola();
        return hola;
    }

    @Before
    public void initTest() {
        holaSearchRepository.deleteAll();
        hola = createEntity(em);
    }

    @Test
    @Transactional
    public void createHola() throws Exception {
        int databaseSizeBeforeCreate = holaRepository.findAll().size();

        // Create the Hola
        restHolaMockMvc.perform(post("/api/holas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hola)))
            .andExpect(status().isCreated());

        // Validate the Hola in the database
        List<Hola> holaList = holaRepository.findAll();
        assertThat(holaList).hasSize(databaseSizeBeforeCreate + 1);
        Hola testHola = holaList.get(holaList.size() - 1);

        // Validate the Hola in Elasticsearch
        Hola holaEs = holaSearchRepository.findOne(testHola.getId());
        assertThat(holaEs).isEqualToComparingFieldByField(testHola);
    }

    @Test
    @Transactional
    public void createHolaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = holaRepository.findAll().size();

        // Create the Hola with an existing ID
        hola.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHolaMockMvc.perform(post("/api/holas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hola)))
            .andExpect(status().isBadRequest());

        // Validate the Hola in the database
        List<Hola> holaList = holaRepository.findAll();
        assertThat(holaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHolas() throws Exception {
        // Initialize the database
        holaRepository.saveAndFlush(hola);

        // Get all the holaList
        restHolaMockMvc.perform(get("/api/holas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hola.getId().intValue())));
    }

    @Test
    @Transactional
    public void getHola() throws Exception {
        // Initialize the database
        holaRepository.saveAndFlush(hola);

        // Get the hola
        restHolaMockMvc.perform(get("/api/holas/{id}", hola.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hola.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingHola() throws Exception {
        // Get the hola
        restHolaMockMvc.perform(get("/api/holas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHola() throws Exception {
        // Initialize the database
        holaRepository.saveAndFlush(hola);
        holaSearchRepository.save(hola);
        int databaseSizeBeforeUpdate = holaRepository.findAll().size();

        // Update the hola
        Hola updatedHola = holaRepository.findOne(hola.getId());

        restHolaMockMvc.perform(put("/api/holas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHola)))
            .andExpect(status().isOk());

        // Validate the Hola in the database
        List<Hola> holaList = holaRepository.findAll();
        assertThat(holaList).hasSize(databaseSizeBeforeUpdate);
        Hola testHola = holaList.get(holaList.size() - 1);

        // Validate the Hola in Elasticsearch
        Hola holaEs = holaSearchRepository.findOne(testHola.getId());
        assertThat(holaEs).isEqualToComparingFieldByField(testHola);
    }

    @Test
    @Transactional
    public void updateNonExistingHola() throws Exception {
        int databaseSizeBeforeUpdate = holaRepository.findAll().size();

        // Create the Hola

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHolaMockMvc.perform(put("/api/holas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hola)))
            .andExpect(status().isCreated());

        // Validate the Hola in the database
        List<Hola> holaList = holaRepository.findAll();
        assertThat(holaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHola() throws Exception {
        // Initialize the database
        holaRepository.saveAndFlush(hola);
        holaSearchRepository.save(hola);
        int databaseSizeBeforeDelete = holaRepository.findAll().size();

        // Get the hola
        restHolaMockMvc.perform(delete("/api/holas/{id}", hola.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean holaExistsInEs = holaSearchRepository.exists(hola.getId());
        assertThat(holaExistsInEs).isFalse();

        // Validate the database is empty
        List<Hola> holaList = holaRepository.findAll();
        assertThat(holaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchHola() throws Exception {
        // Initialize the database
        holaRepository.saveAndFlush(hola);
        holaSearchRepository.save(hola);

        // Search the hola
        restHolaMockMvc.perform(get("/api/_search/holas?query=id:" + hola.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hola.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Hola.class);
        Hola hola1 = new Hola();
        hola1.setId(1L);
        Hola hola2 = new Hola();
        hola2.setId(hola1.getId());
        assertThat(hola1).isEqualTo(hola2);
        hola2.setId(2L);
        assertThat(hola1).isNotEqualTo(hola2);
        hola1.setId(null);
        assertThat(hola1).isNotEqualTo(hola2);
    }
}
