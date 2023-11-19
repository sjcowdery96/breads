const React = require('react')
const Default = require('./layouts/Default')

function home() {
    return (
        <Default>
            <main>
                <h1>HOME</h1>
                <a href="/breads">
                    <button className="btn-primary">Breads Page</button>
                </a>
                <div>
                    <img src="/images/r2.jpg" alt="Sample Shop" />
                    <div>
                        Photo by <a href="AUTHOR_LINK">Brenda Godinez</a> on <a href="UNSPLASH_LINK">Unsplash</a>
                    </div>
                </div>

            </main>

        </Default>
    )
}


module.exports = home


