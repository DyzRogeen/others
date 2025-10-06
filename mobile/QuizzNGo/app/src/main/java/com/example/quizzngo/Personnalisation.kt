package com.example.quizzngo

import android.content.Intent
import android.os.Bundle
import android.os.PersistableBundle
import android.util.Log
import android.widget.CheckBox
import android.widget.EditText
import android.widget.RadioGroup
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.widget.doOnTextChanged
import com.example.quizzngo.model.Category
import com.example.quizzngo.model.Difficulty
import com.example.quizzngo.model.QuizzConfig

class Personnalisation: AppCompatActivity() {

    private var inputNbQuestion: EditText? = null
    private var inputDifficulty: RadioGroup? = null
    private var checkCatAll: CheckBox? = null
    private var checkCatMusic: CheckBox? = null
    private var checkCatArtLit: CheckBox? = null
    private var checkCatTvCin: CheckBox? = null
    private var checkCatActPol: CheckBox? = null
    private var checkCatCultGen: CheckBox? = null
    private var checkCatSport: CheckBox? = null
    private var checkCatJeuVid: CheckBox? = null

    private val quizzConfig: QuizzConfig = QuizzConfig(Difficulty.NORMAL)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.personnalisation)

        loadUI()

        inputNbQuestion!!.doOnTextChanged { number, _, _, _ -> changeNbQuestions(number)}
        inputDifficulty!!.setOnCheckedChangeListener { view, checkedId -> changeDifficulty(checkedId) }
        checkCatAll!!.setOnCheckedChangeListener { view, isChecked -> updateCategorySet(Category.ALL, isChecked) }

        checkCatMusic!!.setOnCheckedChangeListener { view, isChecked -> updateCategorySet(Category.MUSIC, isChecked) }
        checkCatArtLit!!.setOnCheckedChangeListener { view, isChecked -> updateCategorySet(Category.ART_AND_LIT, isChecked) }
        checkCatTvCin!!.setOnCheckedChangeListener { view, isChecked -> updateCategorySet(Category.TV_CINEMA, isChecked) }
        checkCatActPol!!.setOnCheckedChangeListener { view, isChecked -> updateCategorySet(Category.ACTU_POLITIC, isChecked) }
        checkCatCultGen!!.setOnCheckedChangeListener { view, isChecked -> updateCategorySet(Category.CULTURE, isChecked) }
        checkCatSport!!.setOnCheckedChangeListener { view, isChecked -> updateCategorySet(Category.SPORT, isChecked) }
        checkCatJeuVid!!.setOnCheckedChangeListener { view, isChecked -> updateCategorySet(Category.VIDEO_GAMES, isChecked) }

        findViewById<TextView>(R.id.btn_start).setOnClickListener {

            if (quizzConfig.nbQuestions == 0 || quizzConfig.categorySet.isEmpty()) return@setOnClickListener

            val intent = Intent(this, QuickPlay::class.java)

            val bundle = Bundle()
            bundle.putString("configStr", quizzConfig.toStringConfig())
            intent.putExtras(bundle)

            startActivity(intent)
            finish()
        }
    }

    private fun loadUI() {
        inputNbQuestion = findViewById(R.id.question_number_input)
        inputDifficulty = findViewById(R.id.radio_difficulty)
        checkCatAll = findViewById(R.id.cat_all)
        checkCatMusic = findViewById(R.id.cat_musique)
        checkCatArtLit = findViewById(R.id.cat_arts_lit)
        checkCatTvCin = findViewById(R.id.cat_tv_cinema)
        checkCatActPol = findViewById(R.id.cat_actu_pol)
        checkCatCultGen = findViewById(R.id.cat_cult_gen)
        checkCatSport = findViewById(R.id.cat_sport)
        checkCatJeuVid = findViewById(R.id.cat_jeux_vid)
    }

    private fun changeNbQuestions(number: CharSequence?) {
        if (number.isNullOrEmpty()) {
            quizzConfig.nbQuestions = 0
            return
        }
        quizzConfig.nbQuestions = number.toString().toInt()
    }

    private fun changeDifficulty(checkedId: Int) {
        when(checkedId) {
            0 -> quizzConfig.difficulty = Difficulty.EASY
            1 -> quizzConfig.difficulty = Difficulty.NORMAL
            2 -> quizzConfig.difficulty = Difficulty.HARD
        }
    }

    private fun updateCategorySet(category: Category, isChecked: Boolean) {

        if (Category.ALL.equals(category)) {
            updateAll(isChecked)
            return
        }

        if (isChecked) quizzConfig.addCategory(category)
        else quizzConfig.removeCategory(category)

    }

    private fun updateAll(check: Boolean) {
        checkCatMusic!!.isChecked = check
        checkCatArtLit!!.isChecked = check
        checkCatTvCin!!.isChecked = check
        checkCatActPol!!.isChecked = check
        checkCatCultGen!!.isChecked = check
        checkCatSport!!.isChecked = check
        checkCatJeuVid!!.isChecked = check
    }
}