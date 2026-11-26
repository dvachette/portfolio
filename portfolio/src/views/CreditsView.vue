<template>
    <h1 class="credits-title">Crédits</h1>
    <div class="credits">

        <p>
            Ce portfolio a été développé par Donatien Vachette. Les projets présentés sont des
            créations personnelles, des projets de cours, ou des contributions à des projets open
            source.
        </p>
        <p>
            Les images utilisées dans ce portfolio sont des captures d'écran des projets réalisés.
            Les icônes viennent de bibliothèques d'icônes gratuites comme
            <a target="_blank" rel="noopener noreferrer" href="https://www.flaticon.com">Flaticon</a>.
        </p>
        <p>
            Les technologies utilisées pour développer ce portfolio incluent
            <a target="_blank" rel="noopener noreferrer" href="https://vuejs.org/">Vue.js</a>,
            <a target="_blank" rel="noopener noreferrer" href="https://www.typescriptlang.org/">TypeScript</a>,
            <a target="_blank" rel="noopener noreferrer" href="https://httpd.apache.org/">Apache HTTP Server</a>,
            <a target="_blank" rel="noopener noreferrer" href="https://www.docker.com/">Docker</a>, et diverses bibliothèques
            pour les animations et les effets visuels, comme
            <a target="_blank" rel="noopener noreferrer" href="https://vue-bits.dev/">Vue Bits</a>.
        </p>
        <p>
            Si vous avez des questions ou souhaitez en savoir plus sur les projets présentés,
            n'hésitez pas à me contacter via la page de contact.
        </p>
        <p>
            Merci d'avoir visité mon portfolio et d'avoir pris le temps de découvrir mes projets !
        </p>

        <p>Crédits supplémentaires :</p>
        <ul>
            <li>
                <a href="https://www.flaticon.com/free-icons/error" title="error icons">Error icons created by LAFS - Flaticon</a>
            </li>
            <li>
                <a href="https://www.flaticon.com/free-icons/coding" title="coding icons">Coding icons created by juicy_fish - Flaticon</a>
            </li>
            <li>
                <a href="https://www.flaticon.com/free-icons/search-engine-optimisation" title="search engine optimisation icons">Search engine optimisation icons created by logisstudio - Flaticon</a>
            </li>
            <li>
                <a href="https://www.flaticon.com/free-icons/execution" title="execution icons">Execution icons created by kliwir art - Flaticon</a>
            </li>
            <li>
                <a href="https://www.flaticon.com/free-icons/data-source" title="data source icons">Data source icons created by Vectorslab - Flaticon</a>
            </li>
            <li>
                <a href="https://www.flaticon.com/free-icons/business-and-finance" title="business and finance icons">Business and finance icons created by Slamlabs - Flaticon</a>
            </li>
            <li>
                <a href="https://www.flaticon.com/free-icons/code" title="code icons">Code icons created by juicy_fish - Flaticon</a>
            </li>
            <li>
                <a href="https://lucide.dev" title="Lucide icons">Navigation icons by Lucide (ISC license)</a>
            </li>
            <li>
                <a
                    href="https://vue-bits.dev/backgrounds/floating-lines"
                    title="Floating Lines Background"
                    >Floating Lines Background by Vue Bits</a
                >
            </li>
        </ul>
    </div>
</template>
<style scoped>
.credits {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: min(100%, 900px);
    margin: 0 auto;
    padding: 1em 2em;
    background-color: #333c;
    border-radius: 8px;
}
.credits-title {
    font-size: 2.5em;
    font-weight: bold;
    color: #eee;
    cursor: default;
    text-align: center;
}
.credits p {
    font-size: 1.25em;
    color: #ddd;
    text-align: justify;
}
.credits a {
    overflow-wrap: anywhere;
    color: #ddd;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
}
.credits a:hover {
    color: #fff;
}
.credits ul {
    list-style-type: none;
    padding: 0;
}
.credits li {
    margin: 0.5em 0;
}
@media (max-width: 600px) {
    .credits {
        padding: 0.5em 1em;
    }
    .credits p {
        font-size: 1.1em;
    }
}
</style>
