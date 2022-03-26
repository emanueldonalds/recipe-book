package recipes.recipes.api.interfaces;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import recipes.recipes.api.domain.model.Unit;

@RestController
@RequestMapping("/units")
public class UnitsController {

    @GetMapping
    public ResponseEntity<Unit[]> getUnits() {
        return new ResponseEntity<>(Unit.values(), HttpStatus.OK);
    }
}
