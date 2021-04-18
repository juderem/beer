import React from 'react'
import styles from './Main.module.scss'
import { useState, useEffect } from 'react';
import moment from 'moment';

const Main = () => {
    // const {
    //     name,
    //     first_brewed,
    //     tagline,
    //     beerImg,
    //     abv,
    //     ph,
    //     ibu,
    //     description,
    // } = props.beers

    const [searchTerm, setSearchTerm] = useState("")
    const [beers, setBeers] = useState([])
    const [sortOption, setSortOption] = useState(false);
    const beer = 
    useEffect(() => {
        // 1. This code only ever gets run once, and never again!
        // Getting it from local to avoid CORS problems
        fetch(`beer/beers.json`)
        .then((response => {
            return response.json()
        }))
        .then((response => {
            console.log(response)
            return setBeers(response)
        }))
          }, [])

          return (
            <section className={styles.Main}>
                <div className="container">
                <h1 className={styles.searchHeading}>BREW DOG BEER</h1>
                <input
                type="text"
                placeholder="Search Beers" 
                className={styles.searchBox}
                onChange={event => {setSearchTerm(event.target.value)}}
                />
                <select name="filters" onChange={event => {setSortOption(event.target.value)}} className={styles.filters}>
                    <option value="" disabled selected hidden>Filter your beer</option>
                    <option value="abv">Highest ABV</option>
                    <option value="ph">Most Acidic</option>
                    <option value="ibu">Highest IBU</option>
                    <option value="date">First brewed</option>
                </select>
            </div>
                {beers.filter((value) => {
                    if (searchTerm === "") {
                        return value
                    } else if (value.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return value
                    } 
                })
                .sort(function(a, b) {
                        if (sortOption === "abv") {
                            return parseFloat(b.abv) - parseFloat(a.abv)
                        } else if (sortOption === "ph") {
                            return parseFloat(b.ph) - parseFloat(a.ph)
                        } else if (sortOption === "ibu") {
                            return parseFloat(b.ibu) - parseFloat(a.ibu)
                        } else if (sortOption === "date") {
                            let date1 = moment(b.first_brewed, "MM/YYYY");
                            let date2 = moment(a.first_brewed, "MM/YYYY");
                            return date2 - date1
                        }
                    }) 

                .map((value, key) => {
                    return <ul key={key} className={styles.beerlist}>
                        <li className={styles.beerName}>{value.name}</li>
                        <li className={styles.first_brewed}>{value.first_brewed}</li>
                        <li className={styles.tagline}>{value.tagline}</li>
                        <li>
                            <img src={value.image_url} className={styles.beerImg}/>
                        </li>
                        <li className={styles.composition}>ABV {value.abv}%</li>
                        <li className={styles.composition}>{value.ph} pH</li>
                        <li className={styles.composition}>{value.ibu} IBU</li>
                        <li className={styles.description}>{value.description}</li>
                    </ul>
                })}
                </section>            
        )
        }


export default Main