package br.com.hireit.projetohireIt.controller;

import br.com.hireit.projetohireIt.repository.SoftskillRepository;
import br.com.hireit.projetohireIt.tables.SoftSkillsTable;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
public class SoftskillControllerTest {

    @Autowired
    private SoftskillController softskillController;

    @MockBean
    private SoftskillRepository softskillRepository;

    @Test
    @DisplayName("GET /softskills - Should return 200 when list is not empty")
    void getSoftskillsSuccess(){
        List<SoftSkillsTable> listSoftskills = Arrays.asList(new SoftSkillsTable(), new SoftSkillsTable());
        Mockito.when(softskillRepository.findAll()).thenReturn(listSoftskills);

        ResponseEntity response = softskillController.getSoftskills();

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    @DisplayName("GET /softskills - Should return 204 when list is empty")
    void getSoftskillsNoContent(){
        Mockito.when(softskillRepository.findAll()).thenReturn(new ArrayList<>());

        ResponseEntity response = softskillController.getSoftskills();

        assertEquals(204, response.getStatusCodeValue());
    }
}
