import fetchSheet from '../helpers/googleSheets'
import React from 'react';
import Loading from '../misc/loading.js'
import "./shugenja.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faEdit } from '@fortawesome/free-solid-svg-icons'

class Shugenja extends React.Component {
    constructor() {
        super()
        this.state = {loaded: false, keywordTableRows: [], regionTableHeaders: [], regionTableRows: []}
    }

    componentDidMount() {
        fetchSheet("2PACX-1vQj3xNfZ2mIPanE8vj3xsU02xjSF4NtMOH5lH3gQECybr4CUpkHYK2h2zQ0-V65XFqcNRWbuhNfaHMG").then(data => {
            this.processData(data)
            this.setState({loaded:true})
        })
    }

    processData(data) {
        data = this.sanitize(data)
        this.processKeywords(data)
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

    processKeywords(data) {
        //Calculate info
        var keywords = {}
        var regions = []
        data.forEach(encounter => {
            encounter.challenges.forEach(challenge => {
                challenge.keywords.forEach(keyword => {
                    if (typeof keywords[keyword] === "undefined")
                        keywords[keyword] = {name: keyword, uses: 0, avgDifficulty: 0, minimumDifficulty: 999, maximumDifficulty: 0, regions: {}}

                    if (!regions.includes(encounter.region))
                        regions.push(encounter.region)

                    if (typeof keywords[keyword].regions[encounter.region] === "undefined")
                        keywords[keyword].regions[encounter.region] = 1
                    else
                        keywords[keyword].regions[encounter.region] += 1

                    if (challenge.difficulty < keywords[keyword].minimumDifficulty)
                        keywords[keyword].minimumDifficulty = challenge.difficulty

                    if (challenge.difficulty > keywords[keyword].maximumDifficulty)
                        keywords[keyword].maximumDifficulty = challenge.difficulty

                    var modAverage = keywords[keyword].avgDifficulty * keywords[keyword].uses + parseInt(challenge.difficulty)
                    keywords[keyword].uses++
                    keywords[keyword].avgDifficulty = modAverage / keywords[keyword].uses
                })
            })
        })

        regions.sort()

        //Create Keyword Display Elements
        var elements = []
        for (const keyword in keywords) {
            elements.push(<tr key={keyword}>
                <td>{keyword}</td><td>{keywords[keyword].uses}</td><td>{keywords[keyword].minimumDifficulty}</td><td>{keywords[keyword].avgDifficulty}</td><td>{keywords[keyword].maximumDifficulty}</td>
            </tr>)
        }
        this.setState({keywordTableRows: elements})

        //Create Region Display Elements
        var regionRows = []

        for (const keyword in keywords) {
            regionRows.push(<tr key={keyword}>
                <td>{keyword}</td>
                {
                    regions.map(region => {
                        if (typeof keywords[keyword].regions[region] === "undefined")
                            return <td></td>
                        else
                            return <td>{keywords[keyword].regions[region]}</td>
                    })
                }
            </tr>)
        }

        this.setState({regionTableHeaders: regions.map(region => {
            return <th key={region}>{region}</th>
        }), regionTableRows: regionRows})
    }

    render() {
        if (this.state.loaded)
            return (
                <div id="shugenja-summary">
                    <div class="toolbar">
                        <div class="back"><a href="/">Back</a></div>
                        <div class="title">Shugenja&nbsp;&nbsp;Details</div>
                        <div class="buttons">
                            <a alt="edit" rel="noreferrer" target="_blank" href="https://docs.google.com/spreadsheets/d/19ISghw6yWG0z1s1pr7ANlWLN9lmbgTnQAobTZePIBtI/edit#gid=0"><FontAwesomeIcon icon={faEdit} /></a>
                            <a alt="print" href="/shugenja/print"><FontAwesomeIcon icon={faPrint} /></a>
                        </div>
                    </div>
                    <div id="keyword-summary">
                        <h1>Keyword Difficulty</h1>
                        <table id="keywordChart" cellPadding={0} cellSpacing={0}>
                            <tbody>
                                <tr>
                                    <th>Keyword</th><th>Uses</th><th>Minimum</th><th>Average</th><th>Maximum</th>
                                </tr>
                                {this.state.keywordTableRows}
                            </tbody>
                        </table>
                    </div>
                    <div id="region-summary">
                        <h1>Keywords by Region</h1>
                        <table id="keywordChart" cellPadding={0} cellSpacing={0}>
                            <tbody>
                                <tr>
                                    <th>Keyword</th>{this.state.regionTableHeaders}
                                </tr>
                                {this.state.regionTableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        else
            return (
                <div id="shugenja-summary">
                    <Loading />
                </div>
            )
    }
}

export default Shugenja;