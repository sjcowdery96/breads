const React = require('react')
const Default = require('./layouts/Default')

function Index({ breads, title }) {
    return (
        //wrapping this particular view inside the default view we built already
        <Default title={title}>
            <h2>Index Page</h2>
            <ul>
                {/* this is a comment in JSX?? wild.*/}
                {
                    breads.map((bread, index) => {
                        {/* maps our bread array values to items in an unordered list */ }
                        return (
                            <li key={index}>
                                {/* because we linked each one via breads/[index] this will route to each one */}
                                <a href={`/breads/${index}`}>
                                    {bread.name}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="newButton">
                <a href="/breads/new"><button>Add a new bread</button></a>
            </div>

        </Default>

    )
}


module.exports = Index
