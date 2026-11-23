
'use client'
import { ApiClient } from "@/utils/apiClient 1";

import styles from "./page.module.css";
import {useState, useEffect} from 'react'
import CardImovel from "./components/cardImovel";
import Link from "next/link";
export default function Home() {
  const [imoveis,setImoveis] = useState([])
  async function CarregarImoveis() {
    let r = await ApiClient.get('/imovel/disponiveis');
    if(r){
      setImoveis(r)
    }
  }
  useEffect(() => {
    CarregarImoveis()
  }, [])
  return (
    <div className={styles.page}>
      <nav style={{justifyContent: 'end'}} className="navbar navbar-expand navbar-light gb-primary t">
        <div> <Link rel="stylesheet" href="/login" />Login</div>
      </nav>
      <h1>Imoveis disponiveis para locação</h1>
      <div>
        {
          imoveis.map((value, index) => {
            return <div key={index}>
                <CardImovel imovel={value}></CardImovel>
            </div>
          })
        }
      </div>
    </div>
  );
}
