package br.com.hireit.projetohireIt.repository;

import br.com.hireit.projetohireIt.tables.SoftSkillsTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SoftskillRepository extends JpaRepository<SoftSkillsTable, Integer> {
}
