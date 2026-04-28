<template>
    <div class="contact">
        <div class="contact__block">
            <h1>Me contacter</h1>

            <div class="contact__links">
                <a class="btn" target="blank" href="mailto:donatien.vachette@gmail.com">M'envoyer un mail</a>
                <a class="btn" target="blank" href="https://www.linkedin.com/in/donatien-vachette/">Mon LinkedIn</a>
                <a class="btn" target="blank" href="https://www.github.com/dvachette">Mon GitHub</a>
                <a class="btn" target="_blank" href="/cv_donatien_vachette-latest.pdf">Mon CV</a>
            </div>

            <div class="contact__divider" />

            <h2>Formulaire de contact</h2>

            <div v-if="status === 'success'" class="contact__feedback contact__feedback--success">
                Message envoyé avec succès !
            </div>
            <div v-else-if="status === 'error'" class="contact__feedback contact__feedback--error">
                {{ errorMessage }}
            </div>
            <form v-if="status !== 'success'" class="contact__form" @submit.prevent="handleSubmit">
                <div class="contact__field">
                    <label for="name">Nom</label>
                    <input id="name" v-model="form.name" type="text" placeholder="Votre nom" :disabled="status === 'loading'" />
                </div>
                <div class="contact__field">
                    <label for="email">Email</label>
                    <input id="email" v-model="form.email" type="email" placeholder="Votre email" :disabled="status === 'loading'" />
                </div>
                <div class="contact__field">
                    <label for="message">Message</label>
                    <textarea id="message" v-model="form.message" placeholder="Votre message" rows="5" :disabled="status === 'loading'" />
                </div>
                <button class="btn btn--submit" type="submit" :disabled="status === 'loading'">
                    {{ status === 'loading' ? 'Envoi en cours...' : 'Envoyer' }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { sendContactForm } from '@/services/contactService';

type Status = 'idle' | 'loading' | 'success' | 'error';

const status = ref<Status>('idle');
const errorMessage = ref<string>('');

const form = reactive({
    name: '',
    email: '',
    message: '',
});

async function handleSubmit(): Promise<void> {
    status.value = 'loading';
    errorMessage.value = '';
    try {
        await sendContactForm({ ...form });
        status.value = 'success';
    } catch (e) {
        errorMessage.value = e instanceof Error ? e.message : 'Une erreur est survenue.';
        status.value = 'error';
    }
}
</script>

<style scoped>
.contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.contact__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    background-color: #1a1a1aee;
    border-radius: 10px;
    padding: 2em;
    width: 100%;
    max-width: 550px;
    backdrop-filter: blur(6px);
    border: 1px solid #444;
}
.contact h1 {
    font-size: 2.5em;
    font-weight: bold;
    color: #eee;
}
.contact h2 {
    font-size: 1.5em;
    font-weight: bold;
    color: #eee;
    align-self: flex-start;
}
.contact__links {
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    width: 100%;
}
.contact__divider {
    width: 100%;
    border-top: 1px solid #444;
    margin: 0.5em 0;
}
.contact a.btn {
    color: #eee;
    text-decoration: none;
    font-size: 1.25em;
    font-weight: bold;
    background-color: #333c;
    padding: 0.5em 1em;
    border-radius: 5px;
    text-align: center;
    transition: all 0.3s ease;
}
.contact a.btn:hover {
    background-color: #555c;
    transform: scale(1.03);
}
.contact a.btn:hover::after {
    content: ' →';
}
.contact__form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
}
.contact__field {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
}
.contact__field label {
    color: #ccc;
    font-size: 0.95em;
}
.contact__field input,
.contact__field textarea {
    background-color: #333c;
    border: 1px solid #555;
    border-radius: 5px;
    padding: 0.5em 0.75em;
    color: #eee;
    font-size: 1em;
    font-family: inherit;
    transition: border-color 0.3s ease;
    resize: vertical;
}
.contact__field input:focus,
.contact__field textarea:focus {
    outline: none;
    border-color: #aaa;
}
.contact__field input:disabled,
.contact__field textarea:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.btn--submit {
    background-color: #333c;
    color: #eee;
    border: none;
    border-radius: 5px;
    padding: 0.5em 1em;
    font-size: 1.25em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
}
.btn--submit:hover:not(:disabled) {
    background-color: #555c;
    transform: scale(1.03);
}
.btn--submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.contact__feedback {
    width: 100%;
    padding: 0.75em 1em;
    border-radius: 5px;
    font-size: 1em;
    text-align: center;
}
.contact__feedback--success {
    background-color: #2a4a2a;
    color: #8f8;
    border: 1px solid #4a8a4a;
}
.contact__feedback--error {
    background-color: #4a2a2a;
    color: #f88;
    border: 1px solid #8a4a4a;
}
</style>