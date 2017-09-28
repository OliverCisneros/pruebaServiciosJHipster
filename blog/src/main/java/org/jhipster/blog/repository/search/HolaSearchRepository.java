package org.jhipster.blog.repository.search;

import org.jhipster.blog.domain.Hola;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Hola entity.
 */
public interface HolaSearchRepository extends ElasticsearchRepository<Hola, Long> {
}
