const React = require('react')
const Default = require('./layouts/default')

function Index({ breads }) {
    return (
        <Default>
            <h2>Index Page</h2>
            <p>I have {breads[0].name} bread!</p>
        </Default>
    )
}


module.exports = Index
