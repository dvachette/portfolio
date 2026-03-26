<template>
    <div class="me">
        <h1>À propos de moi</h1>
        <div class="content">
            <div class="text">
                <p>
                    Étudiant à l'IUT Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
                    earum blanditiis, quae voluptate repellat culpa facilis sed hic sunt commodi id
                    fugit ullam illum sint dignissimos sit iste cumque nobis. Dolores voluptates
                    veritatis eum, praesentium dicta consequuntur magnam facere ullam. Odio
                    voluptatum, molestiae eos autem quae aliquid facere neque ad eum similique nobis
                    vitae perspiciatis cum laudantium corrupti eaque culpa! Nisi obcaecati,
                    provident ullam sint repellendus commodi vel fugiat ab sapiente at, beatae
                    expedita minus impedit enim! Natus tenetur itaque ex nam qui. Recusandae
                    dignissimos, quisquam aliquid ea incidunt nisi? Est soluta ducimus vitae
                    aspernatur natus! Inventore et tenetur eius voluptate aliquam nostrum assumenda
                    praesentium totam. Dolore debitis adipisci ducimus placeat eius ipsum dolorum,
                    amet ipsam cum a asperiores nulla. Doloremque dolorum quam, consectetur
                    repellendus excepturi aliquam corporis inventore aperiam quis, saepe incidunt
                    neque ullam quod. Officia commodi error aspernatur? Dolorum dicta quam ad illum
                    illo molestiae quia nihil sed? Amet itaque dolores a nisi reprehenderit
                    aspernatur vero, assumenda, facere laboriosam exercitationem minus dolor fugiat
                    in expedita. Quia, quidem veniam a maxime odio suscipit accusamus, repellat
                    dolores dolore voluptatum voluptas? Beatae rem quas pariatur ratione, tempora
                    minus tenetur sunt est ipsa dolorum magni sed tempore officia sit alias laborum
                    quisquam, harum laboriosam consectetur. Officiis, perferendis. Assumenda neque
                    necessitatibus qui nesciunt. Repellat eaque totam enim vel. Minus error id
                    explicabo, mollitia veniam a sequi deleniti reprehenderit beatae aut voluptatum
                    dolores laboriosam saepe omnis nobis nesciunt fugiat? Quo repudiandae accusamus
                    illo tenetur? Necessitatibus officia similique error excepturi illo fugiat sunt,
                    dolorum eos a incidunt reiciendis consequatur velit at. Mollitia, corporis at!
                    Eos, vel sequi. Error, voluptatem aliquam voluptas excepturi asperiores ut
                    soluta. Ipsam ab dolore labore esse minima omnis! Nihil dicta eum dolorem odit
                    illum inventore dolores adipisci, iste natus, velit dolore laborum quam atque
                    ex! Enim aut maiores inventore nam animi?
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
}
.content {
    display: flex;
    gap: 2rem;
    align-items: center;
}
.text {
    flex: 1;
    font-size: 1.1em;
    line-height: 1.6;
    color: #ddd;
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
</style>
