import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import { setSearchField } from '../actions';

const mapStateToProps = state => {
    return {
        searchfield: state.searchfield
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchChange: (event) => { dispatch(setSearchField(event.target.value)) }
    }
};

function App(props) {
    const [robots, setRobots] = useState([]);
    const [count, setCount] = useState(0);
    const { searchfield, onSearchChange } = props;

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((users) => setRobots(users))
    }, [count]); // only run if count changes

    const filteredRobots = robots.filter((robot) => {
        return robot.name.toLowerCase().includes(searchfield)
    })
    return (!robots.length) ? (<h1>Loading</h1>)
        :
        (
            <div className="tc">
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <button onClick={() => { setCount(count + 1) }}>Click me</button>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
};

export default connect(mapStateToProps, mapDispatchToProps)(App);