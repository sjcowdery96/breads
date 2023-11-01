const React = require('react')
const Default = require('./layouts/Default')

function Index({ breads }) {
    return (
        //wrapping this particular view inside the default view we built already
        <Default>
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
        </Default>

    )
}


module.exports = Index
