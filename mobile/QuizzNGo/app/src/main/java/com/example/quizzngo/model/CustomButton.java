package com.example.quizzngo.model;

import android.annotation.SuppressLint;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.core.content.ContextCompat;

import com.example.quizzngo.R;

public class CustomButton {

    private LinearLayout layout;
    private TextView letter;
    private TextView answer;

    public CustomButton(LinearLayout ly) {
        layout = ly;
        letter = (TextView) layout.getChildAt(0);
        answer = (TextView) layout.getChildAt(1);
    }

    public void setBackgroundColor(int color) {
        layout.setBackgroundColor(color);

        if (color == 0xFFFFFFFF) {
            letter.setTextColor(0xFF7F7F7F);
            answer.setTextColor(0xFF000000);
        } else {
            letter.setTextColor(0xFFFFFFFF);
            answer.setTextColor(0xFFFFFFFF);
        }
    }

    public void setOnClickListener(View.OnClickListener l) {
        layout.setOnClickListener(l);
    }

    public String getText() {
        return answer.getText().toString();
    }

    public void setText(String text) {
        answer.setText(text);
    }

    public LinearLayout getLayout() {
        return layout;
    }

    public void setLayout(LinearLayout layout) {
        this.layout = layout;
    }

    public TextView getLetter() {
        return letter;
    }

    public void setLetter(TextView letter) {
        this.letter = letter;
    }

    public TextView getAnswer() {
        return answer;
    }

    public void setAnswer(TextView answer) {
        this.answer = answer;
    }
}
