const React = require('react')
//remember that default react layout...well..this is where we use him!
const Default = require('./layouts/Default')

function Index({ breads, bakers, title }) {
    return (
        //wrapping this particular view inside the default view we built already
        <Default title={title}>
            <h3>Bakers</h3>
            <ul>
                {
                    bakers.map((baker) => {
                        return (
                            <li key={baker.id}>
                                <a href={`/bakers/${baker.id}`}>{baker.name}</a>
                            </li>
                        )
                    })
                }
            </ul>
            <h3>Breads</h3>
            <ul>
                {/* this is a comment in JSX?? wild.*/}
                {
                    breads.map((bread, index) => {
                        {/* maps our bread array values to items in an unordered list */ }
                        return (
                            <li key={index}>
                                {/* because we linked each one via breads/[index] this will route to each one */}
                                <a href={`/breads/${bread.id}`}>
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