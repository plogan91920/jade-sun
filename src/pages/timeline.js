import fetchSheet from '../helpers/googleSheets'
import React from 'react';
import Loading from '../misc/loading.js'
import "./timeline.css"

class Timeline extends React.Component {
    constructor() {
        super()
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
            return {"year": encounter.Year, "season": encounter.Season, "title": encounter.Title, "text": encounter.Text}
        });
    }

    processStories(role, data) {
        var years = this.state.years

        data.forEach(card => {
            if (card.season && typeof card.season == "string" && (card.season.toLowerCase() === "spring" || card.season.toLowerCase() === "summer" || card.season.toLowerCase() === "fall") && card.year) {
                years[parseInt(card.year) - 1][card.season.toLowerCase()][role].push({title: card.title, text: card.text})
            }
        });

        this.setState({years: years})
    }

    render() {
        if (this.state.loaded)
            return (
                <div id="timeline">
                    <div class="toolbar">
                        <div class="back"><a href="/">Back</a></div>
                        <div class="title">Jade&nbsp;&nbsp;Sun&nbsp;&nbsp;Timeline</div>
                    </div>
                    <div id="timeline-summary">
                        {
                            this.state.years.map((year, i) => {
                                return <div class="year" key={i}>
                                    <h1>Year {i + 1}</h1>
                                    <div class="season">
                                        <h2>Spring</h2>
                                        <div class="section bushi">
                                            {
                                                year.spring.bushi.map((card, i) => {
                                                    return <div key={i}>
                                                        <h1>{card.title}</h1>
                                                        <p>{card.text}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div class="section courtier">
                                            {
                                                year.spring.courtier.map((card, i) => {
                                                    return <div key={i}>
                                                        <h1>{card.title}</h1>
                                                        <p>{card.text}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div class="section shugenja">
                                            {
                                                year.spring.shugenja.map((card, i) => {
                                                    return <div key={i}>
                                                        <h1>{card.title}</h1>
                                                        <p>{card.text}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div class="section shinobi">
                                            {
                                                year.spring.shinobi.map((card, i) => {
                                                    return <div key={i}>
                                                        <h1>{card.title}</h1>
                                                        <p>{card.text}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div class="season">
                                        <h2>Summer</h2>
                                        <div class="section bushi">
                                            {
                                                year.summer.bushi.map((card, i) => {
                                                    return <div key={i}>
                                                        <h1>{card.title}</h1>
                                                        <p>{card.text}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div class="section courtier">
                                            {
                                                year.summer.courtier.map((card, i) => {
                                                    return <div key={i}>
                                                        <h1>{card.title}</h1>
                                                        <p>{card.text}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div class="section shugenja">
                                            {
                                                year.summer.shugenja.map((card, i) => {
                                                    return <div key={i}>
                                                        <h1>{card.title}</h1>
                                                        <p>{card.text}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div class="section shinobi">
                                            {
                                                year.summer.shinobi.map((card, i) => {
                                                    return <div key={i}>
                                                        <h1>{card.title}</h1>
                                                        <p>{card.text}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div class="season">
                                        <h2>Fall</h2>
                                        <div class="section bushi">
                                            {
                                                year.fall.bushi.map((card, i) => {
                                                    return <div key={i}>
                                                        <h1>{card.title}</h1>
                                                        <p>{card.text}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div class="section courtier">
                                            {
                                                year.fall.courtier.map((card, i) => {
                                                    return <div key={i}>
                                                        <h1>{card.title}</h1>
                                                        <p>{card.text}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div class="section shugenja">
                                            {
                                                year.fall.shugenja.map((card, i) => {
                                                    return <div key={i}>
                                                        <h1>{card.title}</h1>
                                                        <p>{card.text}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div class="section shinobi">
                                            {
                                                year.fall.shinobi.map((card, i) => {
                                                    return <div key={i}>
                                                        <h1>{card.title}</h1>
                                                        <p>{card.text}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
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