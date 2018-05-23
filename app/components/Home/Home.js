import React, {Component} from 'react';
import styles from '../../Stylesheets/Main/Home.css';

export default class Home extends Component{
    constructor(props){
        super(props);
        document.title = "About Me";
        document.body.className = styles.blackBody;
    }

    render(){
        return (
            <div className={styles.homeWrapper}>
                <div className={styles.AboutMeContainer}>
                <h1>About Me</h1>
                <div>
                    <p>
                        Hello! My name is Justin Wilkinson and this is my website! I am a Senior studying computer science at Weber State University in Ogden, Utah.
                        I am graduating in Summer 2018 and hope to find a job as a web developer. This website is a place where I try out new things and prototype
                        projects I'd like to implement fully in the future. I have the most experience programming in Java, Javascript, React, NodeJS, and ASP.NET Core.
                        The languages I used to build this website are NodeJS and React with css for styling.
                    </p>
                </div>
                </div>
                <div className={styles.GoalsContainer}>
                <h1>Goals</h1>
                <div>
                    <p>
                        I hope to expand my knowledge of web development and all its nuances. A specific area I would like to work on is user interface design. I have never
                        been very artistic but I would love to learn how to make a website look beautiful and clean. Some languages I'd like to learn more are Python, Angular,
                        and Go. I would also like to learn more about big data and data visualization tools. Being able to create my own marketable products and be a proficient
                        full stack developer is my ultimate goal.
                    </p>
                </div>
                </div>
                <div className={styles.GamesContainer}>
                <h1>Games</h1>
                <div>
                    <p>
                        As you can see from the contents of the website, I love videogames. The earliest games I played were when I was very young on the NES and my favorites
                        were super mario, ninja turtles, and duck hunt. This transitioned to PS1 with Spyro, Gameboy with Pokemon, Gamecube with Super Mario Sunshine, and then xbox 360
                        and Halo. Halo 3 and Reach were 2 of my favorite games of all time. These days I mostly play computer games including Runescape, League Of Legends, and Overwatch.
                        I have played Runescape ever since I was in 5th grade and it has remained my most played game of all time.
                    </p>
                </div>
                </div>
            </div>
        );
    }
}