<template>
    <div class="contact">
        <h1>Me contacter</h1>
        <a class="btn" target="blank" href="mailto:donatien.vachette@gmail.com"
            >M'envoyer un mail</a
        >
        <a class="btn" target="blank" href="https://www.linkedin.com/in/donatien-vachette/"
            >Mon LinkedIn</a
        >
        <a class="btn" target="blank" href="https://www.github.com/dvachette">Mon GitHub</a>
    </div>
</template>
<style scoped>
.contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    padding: 2em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.contact a.btn {
    color: #eee;
    text-decoration: none;
    font-size: 1.25em;
    font-weight: bold;
    background-color: #333c;
    padding: 0.5em 1em;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    width: 300px;
    text-align: center;
    transition: all 0.3s ease;
}
.contact a.btn::after {
    transition: fade 0.3s ease;
}
/* reverse the arrow on hover */
.contact a.btn:hover::after {
    content: ' →';
}

.contact a.info {
    color: #333c;
    text-decoration: none;
    font-size: 1.25em;
    font-weight: bold;
    transition: color 0.3s ease;
    display: none;
}
.contact__button {
    display: flex;
    gap: 1em;
    background-color: #333c;
    padding: 0.5em 1em;
    border-radius: 5px;
}
.contact h1 {
    font-size: 2.5em;
    font-weight: bold;
    color: #eee;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.contact p {
    font-size: 1.25em;
    color: #ddd;
    text-align: center;
}
.contact a.btn:hover {
    background-color: #555c;
    transform: scale(1.03);
}
</style>
