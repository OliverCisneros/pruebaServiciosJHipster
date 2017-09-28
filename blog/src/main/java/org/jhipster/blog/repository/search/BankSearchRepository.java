package org.jhipster.blog.repository.search;

import org.jhipster.blog.domain.Bank;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Bank entity.
 */
public interface BankSearchRepository extends ElasticsearchRepository<Bank, Long> {
}
