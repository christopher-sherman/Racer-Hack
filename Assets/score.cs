using UnityEngine;
using UnityEngine.UI;

public class score : MonoBehaviour
{
    public Text scoreText;

    // Update is called once per frame
    void Update()
    {
        print("Update Score");
        updateScore();
    }

    void updateScore(){
        scoreText.text = NewBehaviourScript.playerScore.ToString();
    }
}
