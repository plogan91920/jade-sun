import fetchSheet from '../helpers/googleSheets'
import React from 'react';
import Loading from '../misc/loading.js'
import ShugenjaCard from '../cards/shugenja.js';
import "./shugenjaprint.css";

class ShugenjaPrint extends React.Component {
    constructor() {
        super()
        this.state = {loaded: false, encounters: []}
    }

    componentDidMount() {
        fetchSheet("2PACX-1vQj3xNfZ2mIPanE8vj3xsU02xjSF4NtMOH5lH3gQECybr4CUpkHYK2h2zQ0-V65XFqcNRWbuhNfaHMG").then(data => {
            this.setState({encounters: this.sanitize(data)})
            this.setState({loaded: true})
        })
    }

    sanitize(data) {
        return data.map(encounter => {
            var challenges = []

            //Challenge
            for (var i = 1; i <= 6; i++) {
                if (encounter["Challenge " + i + " Keywords"] && encounter["Challenge " + i + " Difficulty"] && encounter["Challenge " + i + " Consequence"]) {
                    var challenge = {keywords: [...encounter["Challenge " + i + " Keywords"].split("-")], difficulty:  encounter["Challenge " + i + " Difficulty"], consequence:  encounter["Challenge " + i + " Consequence"]}
                    challenge.keywords = challenge.keywords.map(keyword => {return keyword.trim()})
                    challenges.push(challenge)
                }
            }

            return {"year": encounter.Year, "season": encounter.Season, "region": encounter.Region, "title": encounter.Title, "rumor": encounter.Rumor, "text": encounter.Text, "challenges": challenges}
        });
    }

    render() {
        if (this.state.loaded) {

            var pagedEncounters = []

            for (var i = 0; i < this.state.encounters.length; i += 4) {
                pagedEncounters.push(this.state.encounters.slice(i, i+4))
            }

            return (
                <div>
                    <div class="toolbar">
                        <div class="back"><a href="/shugenja">Back</a></div>
                        <div class="title">Shugenja&nbsp;&nbsp;Encounters</div>
                    </div>
                    {
                        pagedEncounters.map(page => {
                            return (<span>
                                <div class="page">
                                    {
                                        page.map(front => {
                                            return <div class="card"><div class="content"><div class="float-center">{front.rumor}</div></div></div>
                                        })
                                    }
                                </div>
                                <div class="page">
                                    {
                                        page.map(back => {
                                            return <ShugenjaCard encounter={back}></ShugenjaCard>
                                        })
                                    }
                                </div>
                            </span>)
                        })
                    }
                </div>
            )
        } else
            return (
                <Loading />
            )
    }
}

export default ShugenjaPrint;