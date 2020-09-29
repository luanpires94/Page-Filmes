import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { connect } from 'react-redux';
import redstar from './img/redstar.png'
// Redux
import { updateMovies } from './redux/Reducer';
import { updateSeries } from './redux/Reducer';


const mapStateToProps = state => {
    return {
        results: state.content.results,
        tv: state.content.tv
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateMovies: (info) => {
            dispatch(updateMovies(info));
        },
        updateSeries: (info) => {
            dispatch(updateSeries(info));
        }
    };
}

const Image = styled.img`
  width: 50%;
  border: 2px solid red;
  margin-top: .25rem;
`
const ContainerMovies = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 3rem;
`
const Container = styled.div`
  background-color: #000;
`
const Title = styled.h1`
  font-size: 2.7rem;
  color: red;
  margin-right: 1rem;
`

const ContainerTextImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
`
const ContainerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
`
const SearchInput = styled.input`
  border-bottom: 2px solid #fff;
  height: 2rem;
  color: #000;
  font-weight: bold;
  outline: none;
  padding: 5px;
`
const Paragraph = styled.p`
  font-size: 1rem;
  width: 30vw;
`
const VoteStar = styled.div`
    position: relative;
    left: 8rem;
    top: 1rem;
 `
const VoteAverage = styled.div`
    position: relative;
    left: 8rem;
    top: 1rem;
    font-weight: bold;
 `

const Star = styled.img`
    width: 70px;
    position: relative;
    top: 3rem;
`

class App extends Component {
        state = {
            results: [],
            tv: [],
        }

    componentDidMount() {
        this.getMovies()
        this.getSeries()
    }

    getMovies = async () => {
        const showMovies = await axios({
            url: "https://api.themoviedb.org/3/movie/popular?api_key=674e056a0305570de7e7dea12691bb59",
            method: "get"
        })

        const movies = showMovies.data.results.map(item => {

            return {
                ...item,
                poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                backdrop_path: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
            };
        });
        this.props.updateMovies(movies)
        console.log("movies", movies)
    }

    getSeries = async () => {
        const showSeries = await axios({
            url: "https://api.themoviedb.org/3/tv/popular?api_key=674e056a0305570de7e7dea12691bb59",
            method: "get"
        })

        const series = showSeries.data.results.map(item => {

            return {
                ...item,
                poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                backdrop_path: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
            };
        });
        this.props.updateSeries(series)
        console.log("series", series)
    }

    render() {

        return (

            <Container>
                <ContainerHeader>
                    <Title>Movies</Title>
                    <SearchInput type="text"
                        placeholder="Search ..." />
                </ContainerHeader>

                <ContainerMovies > {
                    this.props.results.map((item, index) =>
                        <div key={index} > {
                            <Paragraph />
                        } <ContainerTextImg >
                                <VoteStar>
                                    <Star src={redstar} alt="estrela" />
                                </VoteStar>
                                <VoteAverage>
                                    {item.vote_average}
                                </VoteAverage>
                                {/* {item.original_title} */}

                                <Image src={item.poster_path}
                                    alt="" />
                                {/* {item.overview} */}
                            </ContainerTextImg>
                        </div>
                    )
                }
                </ContainerMovies>

                <ContainerHeader>
                    <Title>Séries</Title>
                    <SearchInput type="text"
                        placeholder="Search ..." />
                </ContainerHeader>
                <ContainerMovies > {
                    this.props.tv.map((item, index) =>
                        <div key={index} > {
                            <Paragraph />

                        } <ContainerTextImg >
                                <VoteStar>
                                    <Star src={redstar} alt="estrela" />
                                </VoteStar>
                                <VoteAverage>
                                    {item.vote_average}
                                </VoteAverage>
                                {/* {item.name} */}
                                <Image src={item.poster_path}
                                    alt="" />
                                {/* {item.overview} */}

                            </ContainerTextImg>
                        </div>
                    )
                } </ContainerMovies>

            </Container>
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);