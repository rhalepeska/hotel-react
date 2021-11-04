import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import HotelList from '../../components/HotelList';
import {useTranslation} from 'react-i18next';

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const [t, i18n] = useTranslation();

    useEffect(() => {
        (async () => {
            const url = process.env.REACT_APP_BASE_URL
            console.log(url)
            const {data} = await axios.get(`${url}/hotel/featured`);
            console.log(data);
            setFeatured(data);
        })();
      }, []);
 
    return (
        <>
        <div className="container">
            <h1 className="p-3 m-2"><span className="px-3 py-1 shadow border rounded-pill"> Spinka Hotels</span></h1>
        </div>
        <div className="text-center py-3 my-2 bk-img">
            <div>
                <h3 className="py-3">{t('img.text')}</h3>
                <button className="btn btn-dark rounded-pill">{t('img.btn')}</button>
            </div>
        </div>
        <div className="container">
            <h3 className="mt-5">{t('featured.header')}</h3>
            <div className="d-md-flex my-3">
                <HotelList hotels={featured} showAll={false}/>
            </div>
            <div className="text-center py-3">
                <Link to="/hotels" className="btn btn-dark rounded-pill">{t('featured.btn')}</Link>
            </div>
        </div>
        </>
    )
}
 
export default Home


                