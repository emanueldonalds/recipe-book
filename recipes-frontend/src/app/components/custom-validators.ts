import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function invalidCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let regexp: RegExp = /[^A-Za-zÅåÄäÖö0-9 .,:;!?()--–*°½"'`éè—_^´=#%&\/\[\]{}€$@¨<>|\n]/;
        const invalid = regexp.test(control.value);
        return invalid ? { invalidCharacters: { value: control.value } } : null;
    };
    
}

export function getInvalidCharactersErrorMessage()  {
    return "Ett eller flera ogiltliga tecken"
}