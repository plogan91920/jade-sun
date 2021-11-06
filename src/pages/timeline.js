import fetchSheet from '../helpers/googleSheets'
import React from 'react';
import Loading from '../misc/loading.js'
import "./timeline.css"

class Timeline extends React.Component {
    constructor() {
        super()
        this.filters = [];
        this.state = {loaded: false, years:[
            {
                spring:{
                    bushi: [],
                    courtier: [],
                    shugenja: [],
                    shinobi: []
                },
                summer:{
                    bushi: [],
                    courtier: [],
                    shugenja: [],
                    shinobi: []
                },
                fall:{
                    bushi: [],
                    courtier: [],
                    shugenja: [],
                    shinobi: []
                }
            },
            {
                spring:{
                    bushi: [],
                    courtier: [],
                    shugenja: [],
                    shinobi: []
                },
                summer:{
                    bushi: [],
                    courtier: [],
                    shugenja: [],
                    shinobi: []
                },
                fall:{
                    bushi: [],
                    courtier: [],
                    shugenja: [],
                    shinobi: []
                }
            },
            {
                spring:{
                    bushi: [],
                    courtier: [],
                    shugenja: [],
                    shinobi: []
                },
                summer:{
                    bushi: [],
                    courtier: [],
                    shugenja: [],
                    shinobi: []
                },
                fall:{
                    bushi: [],
                    courtier: [],
                    shugenja: [],
                    shinobi: []
                }
            }
        ]}
    }
    
    componentDidMount() {
        fetchSheet("2PACX-1vTgbS6p3traI3aoROU6F_jbTKY5hFUYYcbASsOCwFwgihvYj01XVSEs5xqSdayTx0EJAhVlhaKr18sW").then(bushiData => {
            this.processData("bushi", bushiData)
            fetchSheet("2PACX-1vSkR7IVh4xhOAglEQRUJOY3UXKhwmIbl7WbWTOYw2jOcaVTwQeZb-TDQUWM0m9-TKyPS_m8SDPGk0j5").then(courtierData => {
                this.processData("courtier", courtierData)
                fetchSheet("2PACX-1vQj3xNfZ2mIPanE8vj3xsU02xjSF4NtMOH5lH3gQECybr4CUpkHYK2h2zQ0-V65XFqcNRWbuhNfaHMG").then(shugenjaData => {
                    this.processData("shugenja", shugenjaData)
                    fetchSheet("2PACX-1vQQaSnLqqAcBXVLQtNPWdFT94lDfZgMRRdESJAA3gKdKuPtdHpIUSTbr1NzCMYHIrPIRdC5rpHkB0Ps").then(shinobiData => {
                        this.processData("shinobi", shinobiData)
                        this.setState({loaded:true})
                    })
                })
            })
        })
    }
    
    processData(role, data) {
        data = this.sanitize(data)
        this.processStories(role, data)
    }

    sanitize(data) {
        return data.map(encounter => {
            return {"year": encounter.Year, "region": encounter.Region.toLowerCase(), "season": encounter.Season, "title": encounter.Title, "text": encounter.Text}
        });
    }

    processStories(role, data) {
        var years = this.state.years

        data.forEach(card => {
            if (card.season && typeof card.season == "string" && (card.season.toLowerCase() === "spring" || card.season.toLowerCase() === "summer" || card.season.toLowerCase() === "fall") && card.year) {
                years[parseInt(card.year) - 1][card.season.toLowerCase()][role].push({title: card.title, text: card.text, region: card.region})
            }
        });

        this.setState({years: years})
    }

    showCards(year, season, role) {
        return <div class={"section " + role}>
            {
                year[season][role].map((card, i) => {
                    return <div key={i}>
                        <div class={"title " + card.region}>
                            <div class="role"/>
                            <h1>{card.title}</h1>
                            <div class="clan"/>
                        </div>
                        <p>{card.text}</p>
                    </div>
                })
            }
        </div>
    }

    toggleFilter(filter) {
        this.setState({loading: true})
        if (this.filters.includes(filter))
            this.filters.splice(this.filters.indexOf(filter), 1)
        else
            this.filters.push(filter)

        //Update Content
        this.setState({loading: false})
    }

    render() {
        var bushiSelected = (this.filters.length === 0 || this.filters.indexOf("bushi") >= 0 ? "selected" : "")
        var courtierSelected = (this.filters.length === 0 || this.filters.indexOf("courtier") >= 0 ? "selected" : "")
        var shugenjaSelected = (this.filters.length === 0 || this.filters.indexOf("shugenja") >= 0 ? "selected" : "")
        var shinobiSelected = (this.filters.length === 0 || this.filters.indexOf("shinobi") >= 0 ? "selected" : "")

        var crabSelected = (this.filters.length === 0 || this.filters.indexOf("crab") >= 0 ? "selected" : "")
        var craneSelected = (this.filters.length === 0 || this.filters.indexOf("crane") >= 0 ? "selected" : "")
        var dragonSelected = (this.filters.length === 0 || this.filters.indexOf("dragon") >= 0 ? "selected" : "")
        var lionSelected = (this.filters.length === 0 || this.filters.indexOf("lion") >= 0 ? "selected" : "")
        var phoenixSelected = (this.filters.length === 0 || this.filters.indexOf("phoenix") >= 0 ? "selected" : "")
        var scorpionSelected = (this.filters.length === 0 || this.filters.indexOf("scorpion") >= 0 ? "selected" : "")
        var unicornSelected = (this.filters.length === 0 || this.filters.indexOf("unicorn") >= 0 ? "selected" : "")

        if (this.state.loaded)
            return (
                <div id="timeline">
                    <div class="toolbar">
                        <div class="back"><a href="/">Back</a></div>
                        <div class="title">Jade&nbsp;&nbsp;Sun&nbsp;&nbsp;Timeline</div>
                    </div>
                    <div id="timeline-summary">
                        <div id="filters">
                            <div class="group">
                                <div onClick={() => this.toggleFilter("bushi")} class={"filter bushi " + bushiSelected}></div>
                                <div onClick={() => this.toggleFilter("courtier")} class={"filter courtier " + courtierSelected}></div>
                                <div onClick={() => this.toggleFilter("shugenja")} class={"filter shugenja " + shugenjaSelected}></div>
                                <div onClick={() => this.toggleFilter("shinobi")} class={"filter shinobi " + shinobiSelected}></div>
                            </div>
                            <div class="group">
                                <div onClick={() => this.toggleFilter("crab")} class={"filter crab " + crabSelected}></div>
                                <div onClick={() => this.toggleFilter("crane")} class={"filter crane " + craneSelected}></div>
                                <div onClick={() => this.toggleFilter("dragon")} class={"filter dragon " + dragonSelected}></div>
                                <div onClick={() => this.toggleFilter("lion")} class={"filter lion " + lionSelected}></div>
                                <div onClick={() => this.toggleFilter("phoenix")} class={"filter phoenix " + phoenixSelected}></div>
                                <div onClick={() => this.toggleFilter("scorpion")} class={"filter scorpion " + scorpionSelected}></div>
                                <div onClick={() => this.toggleFilter("unicorn")} class={"filter unicorn " + unicornSelected}></div>
                            </div>
                        </div>
                        {
                            this.state.years.map((year, i) => {
                                return <div class="year" key={i}>
                                    <h1>Year {i + 1}</h1>
                                    <div class="season">
                                        <h2>Spring</h2>
                                        {
                                            [
                                                this.showCards(year, "spring", "bushi"),
                                                this.showCards(year, "spring", "courtier"),
                                                this.showCards(year, "spring", "shugenja"),
                                                this.showCards(year, "spring", "shinobi")
                                            ]
                                        }
                                    </div>
                                    <div class="season">
                                        <h2>Summer</h2>
                                        {
                                            [
                                                this.showCards(year, "summer", "bushi"),
                                                this.showCards(year, "summer", "courtier"),
                                                this.showCards(year, "summer", "shugenja"),
                                                this.showCards(year, "summer", "shinobi")
                                            ]
                                        }
                                    </div>
                                    <div class="season">
                                        <h2>Fall</h2>
                                        {
                                            [
                                                this.showCards(year, "fall", "bushi"),
                                                this.showCards(year, "fall", "courtier"),
                                                this.showCards(year, "fall", "shugenja"),
                                                this.showCards(year, "fall", "shinobi")
                                            ]
                                        }
                                    </div>
                                </div>
                            })
                        }
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

export default Timeline;