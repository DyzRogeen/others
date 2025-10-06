package com.example.quizzngo

import android.content.Intent
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class ScoreScreen: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.score_screen)


        val score = intent!!.getIntExtra("score", 0)
        val nbQuestions = intent!!.getIntExtra("nbQuestions", 0)

        val scoreView = findViewById<TextView>(R.id.score)
        scoreView.text = "${score}/${nbQuestions}"


        findViewById<TextView>(R.id.retry_btn).setOnClickListener {
            val intent = Intent(this, QuickPlay::class.java)

            val config = intent.getStringExtra("configStr")
            val bundle = Bundle()
            bundle.putString("configStr", config)
            intent.putExtras(bundle)

            startActivity(intent)
            finish()
        }

        findViewById<TextView>(R.id.menu_btn).setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
            finish()
        }

    }

}