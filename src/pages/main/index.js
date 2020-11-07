import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

import api from '../../services/api'

//Criando uma classe para buscar os dados da API
export default class Main extends Component{

    //Criandop um objeto estado que contem uma lista de produtos
    state = {
        products: [],
        productInfo: {},
        page: 1    
    }

    //Método para executar o componente ao carregar a pagina
    componentDidMount(){
        this.loadProducts()
    }

    //Acessando a rota /products da api e armazenando os resultados dentro da lista de produtos
    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`)

        const { docs, ...productInfo } = response.data

        this.setState({ products: docs, productInfo, page })
    }

    prevPage = () => {
        const { page, productInfo } = this.state

        if (page === 1) return

        const pageNumber = page - 1

        this.loadProducts(pageNumber)
    }

    nextPage = () => {
        const { page, productInfo } = this.state

        if (page === productInfo.pages) return

        const pageNumber = page + 1

        this.loadProducts(pageNumber)
    }

    render(){
        const { products, page, productInfo } = this.state

        return (
            <div className="products-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Acessar</Link>

                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}