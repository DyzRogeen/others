package com.example.quizzngo.model;

public enum Category {

    ALL("all"),
    MUSIC("musique"),
    ART_AND_LIT("art_litterature"),
    TV_CINEMA("tv_cinema"),
    ACTU_POLITIC("actu_politique"),
    CULTURE("culture_generale"),
    SPORT("sport"),
    VIDEO_GAMES("jeux_videos");

    private final String label;

    Category(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
