using UnityEngine;
using UnityEngine.UI;

public class score : MonoBehaviour
{
    // Start is called before the first frame update
    public Transform player;
    public Text scoreText;

    public static int userScore = 0;

    // Update is called once per frame
    void Update()
    {
        print("Update Score");
        updateScore();
    }

    void updateScore(){
        scoreText.text = userScore.ToString();
    }
}
