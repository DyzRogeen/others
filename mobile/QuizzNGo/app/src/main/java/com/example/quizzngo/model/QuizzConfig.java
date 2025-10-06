package com.example.quizzngo.model;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class QuizzConfig {

    private int nbQuestions = 10;
    private Difficulty difficulty = null;
    private Set<Category> categorySet = new HashSet<>();

    public QuizzConfig() {}

    public QuizzConfig(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public String toStringConfig() {
        StringBuilder buffer = new StringBuilder("limit=" + nbQuestions);

        boolean firstElem = true;
        for (Category cat: categorySet) {
            if (!firstElem) buffer.append("%2C%20");
            else {
                buffer.append("&category=");
                firstElem = false;
            }

            buffer.append(cat.getLabel());
        }

        if (difficulty == null) return buffer.toString();

        buffer.append("&difficulty=").append(difficulty.getLabel());

        return buffer.toString();
    }

    public void addCategory(Category category) {
        this.categorySet.add(category);
    }

    public void removeCategory(Category category) {
        this.categorySet.remove(category);
    }

    public int getNbQuestions() {
        return nbQuestions;
    }

    public void setNbQuestions(int nbQuestions) {
        this.nbQuestions = nbQuestions;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Difficulty difficulty) {
        this.difficulty = difficulty;
    }

    public Set<Category> getCategorySet() {
        return categorySet;
    }

    public void setCategorySet(Set<Category> categorySet) {
        this.categorySet = categorySet;
    }
}
