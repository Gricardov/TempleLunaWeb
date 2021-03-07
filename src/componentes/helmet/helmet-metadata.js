import React from 'react'
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const Metadata = ({ quote = "", title = "Temple Luna - Lectores y escritores", image = "https://drive.google.com/uc?id=1b7NnnYFWl4cW746wfDGw5LRdZ_uwCv44", description = "Somos Temple Luna, la gran comunidad literaria de latinoamérica que plantea una nueva forma de compartir historias", hashtag = "#templeluna" }) => {
    let location = useLocation();
    let currentUrl = "https://templeluna.netlify.app" + location.pathname;

    return (
        <Helmet>
            <title>{title}</title>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="csrf_token" content="" />
            <meta property="type" content="website" />
            <meta property="url" content={currentUrl} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="_token" content="" />
            <meta name="robots" content="noodp" />
            <meta property="title" content={title} />
            <meta property="quote" content={quote} />
            <meta name="description" content={description} />
            <meta property="image" content={image} />
            <meta property="og:locale" content="es_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:quote" content={quote} />
            <meta property="og:hashtag" content={hashtag} />
            <meta property="og:image" content={image} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="Temple Luna" />
            <meta property="og:description" content={description} />
        </Helmet>
    );
}

export default Metadata;