import React from 'react';
import './shugenja.css';

function ShugenjaCard(props) {
    return (
        <div class="card">
            <div class="content">
                <h1>{props.encounter.title}</h1>
                <p>{props.encounter.text}</p>
                <div class="challenges">
                    {
                        props.encounter.challenges.map(challenge => {
                            
                            var difficulty = []
                            for (var i = 0; i < challenge.difficulty; i++)
                                difficulty.push(<span class="box"></span>)

                            if (challenge.keywords.length) {
                                var keywords = challenge.keywords[0];
                                for (i = 1; i < challenge.keywords.length; i++)
                                    keywords += " • " + challenge.keywords[i]
                            }

                            return (<div>
                                <h2>{keywords}</h2>
                                <div class="challenge">
                                    <div class="boxes">{difficulty}</div>
                                    <div class="consequence">{challenge.consequence}</div>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ShugenjaCard;