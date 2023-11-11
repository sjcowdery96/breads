const React = require('react')
const Default = require('./layouts/Default')

function Show({ bread }) {
    console.log(bread.name)
    return (
        <Default>
            <h3>{bread.name}</h3>
            {/* data below is using the passed in variables "bread" from the controller file */}
            <img src={bread.image} alt={bread.name} />
            <p>{bread.getBakedBy()}</p>
            <p>
                {/* so evidently...this logic below with ? and : is shorthand for "if" when displaying certain HTML data. Neato! */}
                and it
                {
                    bread.hasGluten
                        ? <span> does </span>
                        : <span> does NOT </span>
                }
                have gluten.
            </p>
            {/* added a button for editing the bread */}
            <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>
            {/* this form below is how we delete the bread displayed */}
            <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
                <input type='submit' value="DELETE" />
            </form>

            <li><a href="/breads">Go home</a></li>
        </Default>

    )
}

module.exports = Show
