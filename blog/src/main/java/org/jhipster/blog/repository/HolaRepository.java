package org.jhipster.blog.repository;

import org.jhipster.blog.domain.Hola;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Hola entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HolaRepository extends JpaRepository<Hola, Long> {

}
