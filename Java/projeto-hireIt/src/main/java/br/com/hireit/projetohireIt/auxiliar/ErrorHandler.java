package br.com.hireit.projetohireIt.auxiliar;

import org.springframework.validation.BindingResult;

public class ErrorHandler {

    public String getErrors(BindingResult bindingResult){
        return getErrors(bindingResult, 0, "");
    }

    private String getErrors(BindingResult bindingResult, int position, String message){
        if(position < bindingResult.getAllErrors().size()){
            message += bindingResult.getAllErrors().get(position).getDefaultMessage() + ",";
            return getErrors(bindingResult, position + 1, message);
        }else{
            return message;
        }
    }

}
