import React, { useState, useEffect } from 'react'
import Footer from '../componentes/footer/footer';
import Navbar from '../componentes/navbar';
import ClipLoader from "react-spinners/ClipLoader";
import queryString from 'query-string'
import critiqueImg from '../img/critiqueImg.PNG';
import { getRequest } from '../api';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

const override = css`
  display: block;
  margin: 0 auto;
`;

const Previsualizacion = ({ location }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [type, setType] = useState('');
    const [resultUrl, setResultUrl] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        if (location && location.state && location.state.data) {
            const { type, resultUrl, title, name } = location.state.data;
            setIsLoading(false);
            setType(type);
            setResultUrl(resultUrl);
            setTitle(title);
            setAuthor(name);
        } else {
            const id = queryString.parse(location.search).id;
            if (id) {
                getRequest(id).then(({ data, error }) => {
                    if (!error) {
                        const { type, resultUrl, title, name } = data;
                        setType(type);
                        setResultUrl(resultUrl);
                        setTitle(title);
                        setAuthor(name);
                        setIsLoading(false);
                    } else {
                        alert('No se encontró el archivo. Intente más tarde');
                    }
                });
            }
        }
    }, [location]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }
    console.log(resultUrl)
    return (
        <div>
            <Navbar />
            <main className='main-body below-navbar colored-background'>
                <section className='container-xl section position-relative'>
                    <div className='floating-form b-shadow-none container-background-prev position-relative'>
                        <div className='loader-container'>
                            <ClipLoader css={override} loading={isLoading} size={50} color={'#8B81EC'} />
                        </div>
                        {
                            !isLoading && resultUrl
                            &&
                            <div>
                                <Document
                                    file={resultUrl}
                                    onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pageNumber} />
                                </Document>
                                <p>Page {pageNumber} of {numPages}</p>
                            </div>
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Previsualizacion;