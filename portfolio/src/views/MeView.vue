<template>
    <div class="me">
        <h1>À propos de moi</h1>
        <div class="content">
            <div class="text">
                <p>
                    Étudiant à l'IUT de Lyon 1 en informatique, je suis passionné par le
                    développement web et les technologies modernes. J'aime créer des applications
                    fonctionnelles et esthétiques, tout en apprenant constamment de nouvelles
                    compétences pour rester à jour dans ce domaine en constante évolution.
                    <br />
                    <br />
                    Je m'intéresse également à l'informatique à bas niveau, que ce soit au niveau du
                    matériel ou du système d'exploitation, dans une optique de compréhension globale
                    du fonctionnement de mes outils, ainsi que pour pouvoir mettre en œuvre des
                    installations personnalisées et finement adaptées à mes besoins.
                    <br />
                    <br />
                    Fervent défenseur de l'open source, je crois en la collaboration et au partage
                    des connaissances pour faire avancer la technologie et créer des solutions
                    innovantes. C'est cet état d'esprit qui me pousse à privilégier l'utilisation
                    d'outils open source comme par exemple Debian, que j'utilise au quotidien.
                    <br />
                    <br />
                    Ancien vice-trésorier et chargé de mission prévention au sein du BDE de mon IUT,
                    j'ai développé des compétences en gestion d'équipe, organisation d'événements et
                    gestion de crise, que je considère comme des atouts précieux pour ma future
                    carrière professionnelle. J'ai a travers cet engagement pu mettre en pratique
                    mes compétences techniques et humaines au service des étudiants de mon IUT.
                    L'engagement associatif m'a aussi conduit a suivre des formations de secourisem
                    en santé mentale, en gestion de crise et en prévention des risques
                    psychosociaux, qui m'ont permis d'acquérir des compétences précieuses en matière
                    de gestion de situations difficiles et de soutien aux personnes en détresse.
                </p>
            </div>
            <div class="image">
                <img src="/images/me.jpg" alt="Photo de moi" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.me {
    padding: 2rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.content {
    display: flex;
    gap: 2rem;
    align-items: center;
}
.image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid #3178c6;
}
.image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.me h1 {
    font-size: 2.5em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5em;
    color: #eee;
}
.text {
    text-justify: distribute-all-lines;
    flex: 1;
    line-height: 1.6;
    font-size: 1.25em;
    color: #ddd;
    text-align: center;
    background-color: #333c;
    padding: 1em;
    border-radius: 10px;
    width: 80%;
    margin: 2em auto;
    cursor: default;
}
</style>
