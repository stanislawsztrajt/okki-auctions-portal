<template>
    <div id="home">
        <Menu/>
        <main>
            <input class="input-handler" type="text" name="inputHandler" placeholder="piła motorowa / rower / ps5">
            <label for="inputHandler"></label>
            <div class="input-elements">
                <div class="input-element">kategorie</div>
                <div class="input-element">sortowanie</div>
                <div class="input-element">filtrowanie</div>
            </div>
        </main>
        <footer>
            <div>Wpisz dowolną frazę aby znaleźć ogłoszenie odpowiadające jej wynikom wyszukiwania, lub dodaj własne eogłoszenie sprzedaży</div>
            <router-link to="/new-adverst">Dodaj ogłoszenie</router-link>
        </footer>
    </div>

</template>

<script>
import Menu from '../components/Menu'

export default {
    name: 'Home',
    components: {
        Menu,
    },
    data(){
        return{

        }
    },
    methods: {
        addAdverst(){

        },
    }
}
</script>

<style lang="scss">
@import '../../scssVariables/variables';

</style>