import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import React, { useRef, useState } from 'react';
import { Modal } from "react-bootstrap";
import LoadingBar from '../service-components/LoadingBar';
import HistoryArticleSearch from './class-services/history-server-ping';

export default function HistoryClass() {
    const historyArticleSearch = useRef();
    const [loading, setLoading] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const [answered, setAnswered] = useState(false);
    const [modalTrigger, setModalTrigger] = useState(false);
    const [historyArticles, setHistoryArticles] = useState([]);

    async function handleArticleSearch(e) {
        e.preventDefault();
        setLoading(true);
        setAnswered(false);

        const articles = new HistoryArticleSearch(historyArticleSearch.current.value);
        setHistoryArticles(await articles.search());
        setAnswered(true);
        setLoading(false);
    }

    return (
        <>
            <h1>History Class <Link to="/table-of-contents/"><AiOutlineHome className="list-icon"/></Link></h1>
            <hr/>
            <div className="history-search-bar">
                <input ref={historyArticleSearch}/>
                <button onClick={handleArticleSearch} disabled={loading}>Search</button>
            </div>
            {loading && <LoadingBar isVisible={loading}/>}
            {answered && !historyArticles.errorResponse ? historyArticles.map((historyArticle, key) => {
                return (<div className="article" key={key}>
                <a href={`${historyArticle.href}`} target="_blank"><h3>{historyArticle.title}</h3></a>
                <p>{historyArticle.corpName} <button onClick={() => {
                    setModalTrigger(true)
                    setModalInfo(historyArticle.citation);
                }}>Cite</button></p>
                <hr/>
                <a href={`${historyArticle.href}`} target="_blank"><h4>{historyArticle.content}</h4></a>
            </div>)
            }) : <div>
                <h3>{historyArticles.errorResponse}</h3>    
            </div>}
            <Modal show={modalTrigger}>
                <Modal.Header>
                    {modalInfo.title}
                    <div className="modal-close" onClick={() => {
                        setModalTrigger(false);
                    }}>
                        <GrClose style={{margin: "5px", padding: 0}}/>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    MLA
                    <br/>
                    {modalInfo.mla && <p>{modalInfo.mla.author && <>{modalInfo.mla.author},</>} {modalInfo.mla.title && <>{modalInfo.mla.title},</>} {modalInfo.mla.publisher && <>{modalInfo.mla.publisher},</>} {modalInfo.mla.date && <>{modalInfo.mla.date},</>} {modalInfo.mla.url && <a href={modalInfo.mla.url}>Citation Link</a>}</p>}
                    <hr style={{marginBottom: "0"}}/>
                    <br/>
                </Modal.Body>
            </Modal>
        </>
    )
}
