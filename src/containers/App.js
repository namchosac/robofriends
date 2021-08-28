import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchfield: state.searchRobots.searchfield,
        isPending: state.requestRobots.isPending,
        robots: state.requestRobots.robots,
        error: state.requestRobots.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchChange: (event) => { dispatch(setSearchField(event.target.value)) },
        onRequestRobots: () => requestRobots(dispatch)
    }
};

function App(props) {
    const [count, setCount] = useState(0);
    const { searchfield, onSearchChange, robots, isPending, onRequestRobots } = props;

    useEffect(() => {
        onRequestRobots()
        // eslint-disable-next-line
    }, []);

    const filteredRobots = robots.filter((robot) => {
        return robot.name.toLowerCase().includes(searchfield)
    })
    return isPending ? (<h1>Loading</h1>)
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