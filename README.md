# Racer Hack (Naprock-2021-Singapore-Poly-EEE)

Racker Hack is a 2D game that gamifies the process of learning coding.

## Unity + Web Based UI
- Main User Interface for the gameplay is developed in Unity and exported to WebGL and Javascript
- Exported WebGL and Javascript is then embedded into a HTML page 

![Racer Hack UI](https://github.com/christopher-sherman/Racer-Hack/blob/main/Racer%20Hack%20UI.png)

## System Architecture
- Firebase is used to store persistant data for game scores, question information, etc
- JDoodle is used as a Cloud based compiler to compile and execute the players code 
- Inter-Communcations between Firebase, JDoodle are via REST APIs and Javascript shared variables

![RacerHack System Architecture](https://github.com/christopher-sherman/Racer-Hack/blob/main/RacerHack_System_Architecture.png)



