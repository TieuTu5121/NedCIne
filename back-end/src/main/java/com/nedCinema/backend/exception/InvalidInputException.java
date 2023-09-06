package com.nedCinema.backend.exception;

public class InvalidInputException extends RuntimeException {
    public InvalidInputException() {
        super("Invalid input value!!!");
    }
}
