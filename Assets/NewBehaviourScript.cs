using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NewBehaviourScript : MonoBehaviour
{
    [SerializeField]
    Transform[] waypoints;

    [SerializeField]
    float moveSpeed = 2f;
    
    public int waypointIndex = 0;
    public static int playerScore = -1000;

    void Start() {
        // print("Start");
        transform.position = waypoints [waypointIndex].transform.position;
    }

    void Update() {
        // print("Update");
        
        if (waypointIndex < waypoints.Length){
            Move();
        }
    }

    void Move() {
        // print("Move");
        transform.position = Vector3.MoveTowards(transform.position, waypoints[waypointIndex].transform.position, moveSpeed * Time.deltaTime);


        // if (transform.position == waypoints [waypointIndex].transform.position) {
        //     waypointIndex++;
        //     playerScore += 1000 - (int)Time.deltaTime;
        //     print("Move 1");

        // }
 

            
            
    }

    public void Increment() {
        waypointIndex++;
    }
}
