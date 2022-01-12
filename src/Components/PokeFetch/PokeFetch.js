import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 10,
      timerOn: false,
      timerInterval: null,
      pokeReveal: false,
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  startTimer() {
    clearInterval(this.state.timerInterval)
    this.fetchPokemon()
    this.setState({
      timerOn: true,
      pokeReveal: false,
      timer: 10,
    })
    this.setState({
      timerInterval: setInterval(() => {
        if(this.state.timer > 0){
          this.setState({
            timer: this.state.timer - 1,
          })
        } else {
          this.setState({
            pokeReveal: true
          })
          this.setState({
            timerOn: false
          })
          
        }
      }, 1000)
    })
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button onClick ={() => this.startTimer()} className={'start'}>Start!</button>
        <h1 className={'timer'} >Timer Display: {this.state.timer}</h1>
        <div className={'pokeWrap'}>
          <img className={this.state.pokeReveal ? 'hidePokeImg' :'pokeImg' } src={this.state.pokeSprite} />
          <h1 className={this.state.pokeReveal ? 'pokeName' :'hidePoke' }>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;