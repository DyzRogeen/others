package com.example.quizzngo.model;

public enum Difficulty {
    EASY("facile"),
    NORMAL("normal"),
    HARD("difficile");

    private final String label;

    Difficulty(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
