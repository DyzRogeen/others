package com.example.quizzngo.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Question {

    private String _id;

    private String question;

    private String answer;

    private String[] badAnswers;

    private String category;

    private String difficulty;

    public List<String> shuffleAnswers() {
        List<String> answers = new ArrayList<>(Arrays.asList(badAnswers));
        answers.add(answer);

        Collections.shuffle(answers);
        return answers;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String[] getBadAnswers() {
        return badAnswers;
    }

    public void setBadAnswers(String[] badAnswers) {
        this.badAnswers = badAnswers;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
}
