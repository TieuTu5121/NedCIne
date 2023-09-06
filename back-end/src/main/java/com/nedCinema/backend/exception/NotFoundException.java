package com.nedCinema.backend.exception;

public class NotFoundException extends RuntimeException{
    public NotFoundException() {
        super("Not Found!!!");
    }
}
