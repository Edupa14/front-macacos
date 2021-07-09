import React from 'react';
import Menu from 'components/menu/menu'
import HeaderMenu from 'components/menu/headermenu'

const Home = () => {

    return (
        <div>
            <HeaderMenu subtitle="¿Qué módulo desea visitar?"/>
            <Menu/>           
        </div>
    );
}

export default Home;