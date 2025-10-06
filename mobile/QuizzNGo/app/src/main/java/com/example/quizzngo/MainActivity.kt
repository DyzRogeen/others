package com.example.quizzngo

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.quizzngo.model.QuizzConfig

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        findViewById<Button>(R.id.menu_btn1).setOnClickListener {
            val intent = Intent(this, QuickPlay::class.java)

            val bundle = Bundle()
            bundle.putString("configStr", QuizzConfig().toStringConfig());
            intent.putExtras(bundle)

            startActivity(intent)
            finish()
        }

        findViewById<Button>(R.id.menu_btn2).setOnClickListener {
            startActivity(Intent(this, Personnalisation::class.java))
        }

        findViewById<Button>(R.id.menu_btn3)

    }
}