package com.example.quizzngo

import android.content.Intent
import android.content.res.ColorStateList
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.example.quizzngo.model.CustomButton
import com.example.quizzngo.model.Question
import com.example.quizzngo.model.Quizz
import com.example.quizzngo.model.QuizzConfig
import com.google.gson.Gson
import okhttp3.*
import okio.IOException

class QuickPlay : AppCompatActivity() {

    private val _httpClient = OkHttpClient()

    private val URL_API = "https://quizzapi.jomoreschi.fr/api/v1/quiz"

    private var BLACK = 0
    private var COLOR_NEUTRAL = 0
    private var COLOR_SELECTED = 0
    private var COLOR_GOOD_ANSWER = 0
    private var COLOR_BAD_ANSWER = 0

    private var quizz: Quizz? = null

    private var questionIdx = 0

    private var currentQuestion: Question? = null

    private var headerPanel: TextView? = null
    private var questionPanel: TextView? = null
    private var btnA: CustomButton? = null
    private var btnB: CustomButton? = null
    private var btnC: CustomButton? = null
    private var btnD: CustomButton? = null
    private var submit_btn: Button? = null

    private var pressedBtn: CustomButton? = null

    private var answerShowed = false
    private var score = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.quick_play)

        loadUI()

        loadQuizz { _quizz ->
            quizz = _quizz
            quizz!!.count = quizz!!.questions.size
            loadNextQuestion()
        }

    }

    private fun loadUI() {
        BLACK = ContextCompat.getColor(this, R.color.black)
        COLOR_NEUTRAL = ContextCompat.getColor(this, R.color.white)
        COLOR_SELECTED = ContextCompat.getColor(this, R.color.selected_answer)
        COLOR_GOOD_ANSWER = ContextCompat.getColor(this, R.color.good_answer)
        COLOR_BAD_ANSWER = ContextCompat.getColor(this, R.color.bad_answer)

        headerPanel = findViewById(R.id.question_panel_header)
        questionPanel = findViewById(R.id.question_panel)

        btnA = CustomButton(findViewById(R.id.answer_btn_A))
        btnB = CustomButton(findViewById(R.id.answer_btn_B))
        btnC = CustomButton(findViewById(R.id.answer_btn_C))
        btnD = CustomButton(findViewById(R.id.answer_btn_D))

        submit_btn = findViewById(R.id.submit_btn)

        btnA!!.setOnClickListener { selectAnswer(btnA!!) }
        btnB!!.setOnClickListener { selectAnswer(btnB!!) }
        btnC!!.setOnClickListener { selectAnswer(btnC!!) }
        btnD!!.setOnClickListener { selectAnswer(btnD!!) }

        submit_btn!!.setOnClickListener { submitOrContinue() }
    }

    private fun selectAnswer(btn: CustomButton) {
        if (answerShowed) return
        if (pressedBtn != null) {
            pressedBtn!!.setBackgroundColor(COLOR_NEUTRAL)
            submit_btn!!.isEnabled = true
        }
        pressedBtn = btn
        pressedBtn!!.setBackgroundColor(COLOR_SELECTED)
    }

    private fun submitOrContinue() {
        if (pressedBtn == null) return

        // Case Continue
        if (answerShowed) {
            btnA!!.setBackgroundColor(COLOR_NEUTRAL)
            btnB!!.setBackgroundColor(COLOR_NEUTRAL)
            btnC!!.setBackgroundColor(COLOR_NEUTRAL)
            btnD!!.setBackgroundColor(COLOR_NEUTRAL)
            pressedBtn = null
            answerShowed = false

            loadNextQuestion()
            submit_btn!!.setText(R.string.submit_btn)
            return
        }

        // Case Submit
        if (currentQuestion!!.answer.equals(pressedBtn!!.text)) {
            score++
            pressedBtn!!.setBackgroundColor(COLOR_GOOD_ANSWER)
        } else {
            pressedBtn!!.setBackgroundColor(COLOR_BAD_ANSWER)
            colorGoodAnswer()
        }
        answerShowed = true

        if (questionIdx < quizz!!.count) submit_btn!!.setText(R.string.next_btn)
        else submit_btn!!.setText(R.string.finish_quizz)
    }

    private fun colorGoodAnswer() {
        when (currentQuestion!!.answer) {
            btnA!!.text -> btnA!!.setBackgroundColor(COLOR_GOOD_ANSWER)
            btnB!!.text -> btnB!!.setBackgroundColor(COLOR_GOOD_ANSWER)
            btnC!!.text -> btnC!!.setBackgroundColor(COLOR_GOOD_ANSWER)
            btnD!!.text -> btnD!!.setBackgroundColor(COLOR_GOOD_ANSWER)
        }
    }

    private fun loadNextQuestion() {

        if (questionIdx >= quizz!!.count) {
            goToScoreScreen()
            return
        }

        currentQuestion = quizz!!.questions[questionIdx++]

        headerPanel!!.text = "QUESTION ${questionIdx}/${quizz!!.count} - ${currentQuestion?.difficulty?.uppercase()}"
        questionPanel!!.text = currentQuestion!!.question

        val answers: List<String> = currentQuestion!!.shuffleAnswers()

        btnA!!.text = answers[0]
        btnB!!.text = answers[1]
        btnC!!.text = answers[2]
        btnD!!.text = answers[3]
    }

    private fun goToScoreScreen() {
        val intent = Intent(this, ScoreScreen::class.java)

        val bundle = Bundle()
        bundle.putInt("score", score)
        bundle.putInt("nbQuestions", quizz!!.count)
        bundle.putString("configStr", intent.getStringExtra("configStr"))
        intent.putExtras(bundle)

        startActivity(intent)
        finish()
    }

    private fun loadQuizz(callback: (Quizz) -> Unit) {
        val config = intent.getStringExtra("configStr");

        Log.d("CONFIG", config!!)

        val req = Request.Builder()
            .url("${URL_API}?${config}").build()

        Log.d("URLLL", "${URL_API}?${config}")

        _httpClient.newCall(req).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("ERROR", "msg : ${e.message}")
            }

            override fun onResponse(call: Call, response: Response) {
                response.use {
                    if (response.isSuccessful) {
                        val _quizz: Quizz = Gson().fromJson(response.body?.string(), Quizz::class.java)
                        runOnUiThread { callback(_quizz) }
                    } else {
                        Log.e("ERROR", "code : ${response.code}")
                    }
                }
            }
        })
    }

}