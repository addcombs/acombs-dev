package com.acombsdev.acombsdev;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// The deployed UI polls the health endpoint from its own host, so the API must allow that origin.
@SpringBootTest(properties = "CORS_ALLOWED_ORIGINS=https://app.example.com")
@AutoConfigureMockMvc
class HealthEndpointTest {
    @Autowired MockMvc mvc;

    @Test
    void reportsUpWithoutDetails() throws Exception {
        mvc.perform(get("/actuator/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.components").doesNotExist());
    }

    @Test
    void allowsTheConfiguredOrigin() throws Exception {
        mvc.perform(options("/actuator/health")
                        .header("Origin", "https://app.example.com")
                        .header("Access-Control-Request-Method", "GET"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "https://app.example.com"));
    }

    @Test
    void rejectsOtherOrigins() throws Exception {
        mvc.perform(get("/actuator/health").header("Origin", "https://elsewhere.example.com"))
                .andExpect(status().isForbidden());
    }

    @Test
    void exposesNoOtherActuatorEndpoints() throws Exception {
        mvc.perform(get("/actuator/env")).andExpect(status().isNotFound());
    }
}
