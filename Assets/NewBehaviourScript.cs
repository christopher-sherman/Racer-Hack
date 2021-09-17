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

    void Start() {
        print("Start");
        transform.position = waypoints [waypointIndex].transform.position;
    }

    void Update() {
        print("Update");
        Move();
    }

    void Move()
    {
        print("Move");
        transform.position = Vector3.MoveTowards(transform.position, waypoints[waypointIndex].transform.position, moveSpeed * Time.deltaTime);


        if (transform.position == waypoints [waypointIndex].transform.position) {
            waypointIndex += 1;
            print("Move 1");
        }

        if (waypointIndex == waypoints.Length)
            waypointIndex = 0;
            print("reset");
    }
}
