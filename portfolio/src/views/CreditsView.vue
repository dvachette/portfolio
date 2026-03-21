<template>
    <div class="credits">
        <h1>Crédits</h1>

        <p>
            Ce portfolio a été développé par Donatien Vachette. Les projets présentés sont des
            créations personnelles, des projets de cours, ou des contributions à des projets open
            source.
        </p>
        <p>
            Les images utilisées dans ce portfolio sont des captures d'écran des projets réalisés.
            Les icônes viennent de bibliothèques d'icônes gratuites comme
            <a target="blank" href="https://https://www.flaticon.com">Flaticon</a>.
        </p>
        <p>
            Les technologies utilisées pour développer ce portfolio incluent
            <a target="blank" href="https://vuejs.org/">Vue.js</a>,
            <a target="blank" href="https://www.typescriptlang.org/">TypeScript</a>,
            <a target="blank" href="https://httpd.apache.org/">Apache HTTP Server</a>,
            <a target="blank" href="https://www.docker.com/">Docker</a>, et diverses bibliothèques
            pour les animations et les effets visuels, comme
            <a target="blank" href="https://vue-bits.dev/">Vue Bits</a>.
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
                <a href="https://www.flaticon.com/free-icons/error" title="error icons"
                    >Error icons created by LAFS - Flaticon</a
                >
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
    padding: 2em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    align-items: center;
    background-color: #333c;
    padding: 1em;
    border-radius: 8px;
    width: 70%;
    position: absolute;
    overflow: scroll;
    scrollbar-width: none; /* Firefox */
    height: 70vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.credits::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}
h1 {
    font-size: 2.5em;
    font-weight: bold;
    color: #eee;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: default;
    text-align: center;
}
.credits p {
    font-size: 1.25em;
    color: #ddd;
    text-align: justify;
}
.credits a {
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
</style>
