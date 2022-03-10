package recipes.recipes.api;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import recipes.recipes.api.interfaces.RecipesController;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = RecipesController.class)
@WebAppConfiguration()
class RecipesControllerTest {

    MockMvc mvc;

    @Autowired
    WebApplicationContext context;

    @BeforeEach
    void setup() {
        mvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

   // @Test
   //public void getAllTest_returnsListOfRecipes() throws Exception {


     //   MockHttpServletResponse response = mvc.perform(
     //           MockMvcRequestBuilders.get("/recipes")
      //                  .accept(MediaType.APPLICATION_JSON))
      //          .andExpect(status().isOk())
      //          .andReturn().getResponse();

//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.readValue(response.getContentAsString(), RecipesDTO.class);
//
//       Assertions.assertEquals(200, response.getStatus());
//        Assertions.assertEquals("It's chooching", response.getContentAsString());
 //   }

}