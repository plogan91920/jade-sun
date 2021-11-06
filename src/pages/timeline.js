import fetchSheet from '../helpers/googleSheets'
import React from 'react';
import Loading from '../misc/loading.js'
import "./timeline.css"

class Timeline extends React.Component {
    constructor() {
        super()
        this.roleFilters = [];
        this.clanFilters = [];
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

    toggleRoleFilter(filter) {
        this.setState({loading: true})
        if (this.roleFilters.includes(filter))
            this.roleFilters.splice(this.roleFilters.indexOf(filter), 1)
        else
            this.roleFilters.push(filter)

        //Update Content
        this.setState({loading: false})
    }

    toggleClanFilter(filter) {
        this.setState({loading: true})
        if (this.clanFilters.includes(filter))
            this.clanFilters.splice(this.clanFilters.indexOf(filter), 1)
        else
            this.clanFilters.push(filter)

        //Update Content
        this.setState({loading: false})
    }

    render() {
        var bushiSelected = (this.roleFilters.length === 0 || this.roleFilters.indexOf("bushi") >= 0 ? "selected" : "")
        var courtierSelected = (this.roleFilters.length === 0 || this.roleFilters.indexOf("courtier") >= 0 ? "selected" : "")
        var shugenjaSelected = (this.roleFilters.length === 0 || this.roleFilters.indexOf("shugenja") >= 0 ? "selected" : "")
        var shinobiSelected = (this.roleFilters.length === 0 || this.roleFilters.indexOf("shinobi") >= 0 ? "selected" : "")

        var crabSelected = (this.clanFilters.length === 0 || this.clanFilters.indexOf("crab") >= 0 ? "selected" : "")
        var craneSelected = (this.clanFilters.length === 0 || this.clanFilters.indexOf("crane") >= 0 ? "selected" : "")
        var dragonSelected = (this.clanFilters.length === 0 || this.clanFilters.indexOf("dragon") >= 0 ? "selected" : "")
        var lionSelected = (this.clanFilters.length === 0 || this.clanFilters.indexOf("lion") >= 0 ? "selected" : "")
        var phoenixSelected = (this.clanFilters.length === 0 || this.clanFilters.indexOf("phoenix") >= 0 ? "selected" : "")
        var scorpionSelected = (this.clanFilters.length === 0 || this.clanFilters.indexOf("scorpion") >= 0 ? "selected" : "")
        var unicornSelected = (this.clanFilters.length === 0 || this.clanFilters.indexOf("unicorn") >= 0 ? "selected" : "")

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
                                <div onClick={() => this.toggleRoleFilter("bushi")} class={"filter bushi " + bushiSelected}></div>
                                <div onClick={() => this.toggleRoleFilter("courtier")} class={"filter courtier " + courtierSelected}></div>
                                <div onClick={() => this.toggleRoleFilter("shugenja")} class={"filter shugenja " + shugenjaSelected}></div>
                                <div onClick={() => this.toggleRoleFilter("shinobi")} class={"filter shinobi " + shinobiSelected}></div>
                            </div>
                            <div class="group">
                                <div onClick={() => this.toggleClanFilter("crab")} class={"filter crab " + crabSelected}></div>
                                <div onClick={() => this.toggleClanFilter("crane")} class={"filter crane " + craneSelected}></div>
                                <div onClick={() => this.toggleClanFilter("dragon")} class={"filter dragon " + dragonSelected}></div>
                                <div onClick={() => this.toggleClanFilter("lion")} class={"filter lion " + lionSelected}></div>
                                <div onClick={() => this.toggleClanFilter("phoenix")} class={"filter phoenix " + phoenixSelected}></div>
                                <div onClick={() => this.toggleClanFilter("scorpion")} class={"filter scorpion " + scorpionSelected}></div>
                                <div onClick={() => this.toggleClanFilter("unicorn")} class={"filter unicorn " + unicornSelected}></div>
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