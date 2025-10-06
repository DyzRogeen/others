package com.example.quizzngo.model;

public class Quizz {

    private int count;

    private Question[] quizzes;

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public Question[] getQuestions() {
        return quizzes;
    }

    public void setQuizzes(Question[] quizzes) {
        this.quizzes = quizzes;
    }
}
