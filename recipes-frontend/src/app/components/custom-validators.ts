import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function invalidCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let regexp: RegExp = /[^A-Z^a-z^Å^å^Ä^ä^Ö^ö^0-9^ ^.^,^:^;^!^?^(^)^-^-^–^*^°^½^"^'^\n]/;
        const invalid = regexp.test(control.value);
        return invalid ? { invalidCharacters: { value: control.value } } : null;
    };
    
}

export function getInvalidCharactersErrorMessage()  {
    return "Endast alfanumeriska tecken eller någon av: . , : ; ! ? ( ) - * ° ½\" \'"
}