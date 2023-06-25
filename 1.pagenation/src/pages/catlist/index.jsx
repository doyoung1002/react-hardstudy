import { useEffect, useState } from "react";
import styled from "styled-components";
import CatListComponent from "../../components/CatListComponent";
import axios from 'axios';


const CatListContainer = styled.div`
min-height: 100vh;
padding-top: 11em;
padding-bottom: 11em;
width: 100%;
max-width: 100em;
margin-right: auto;
margin-left: auto;
padding: 5em 6em;
`;

const CatListHeader = styled.div`
padding: 5em 0em;
display: flex;
    margin-bottom: 3em;
    padding-bottom: 2em;
    -webkit-box-pack: justify;
    justify-content: space-between;
    align-items: flex-end;
    grid-column-gap: 2em;
    grid-row-gap: 2em;
    border-bottom: 2px solid hsla(0, 0%, 93.3%, 0.2);
    h1 {font-family: Rainertrial, sans-serif;
        font-size: 11em;
        line-height: 0.8;
        font-weight: 500;
        text-transform: uppercase;
        margin-top: 0px;
        margin-bottom: 0px;}
    a {
        padding: 0.9em 2.1em;
        border-style: solid;
        border-width: 2px;
        border-color: #eee;
        border-radius: 100vw;
        background-color: #eee;
        color: #070707;
        font-size: 0.9rem;
        font-weight: 700; 
        max-width: 100%;
        display: inline-block;
    }
}
`;

const CarListPhotoWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;

    margin-bottom: 3em;
    padding-bottom: 2em;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: end;
    align-items: flex-end;
    grid-column-gap: 2em;
    grid-row-gap: 2em;

}
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2em;
`;

const Button = styled.button`
padding: 0.9em 2.1em;
border-style: solid;
border-width: 2px;
border-color: #000;
border-radius: 100vw;
background-color: #fff;
color: #000;
font-size: 0.9rem;
font-weight: 700; 
max-width: 100%;
display: inline-block;

&:disabled {
  background-color: #000;
  border-color: #000
  color: #070707;
  cursor: not-allowed;
}
`;

const PageButton = styled.button`
margin: 0 0.5em;
padding: 0.5em 1em;
border: none;
border-radius: 4px;
background-color: ${({ active }) => (active ? "#000" : "#fff")};
color: ${({ active }) => (active ? "#fff" : "#070707")};
  cursor: ${({ active }) => (active ? "default" : "pointer")};
`;


const CatList = () => {
    const [toggle, setToggle] = useState(false);
    const [catImage, setCatImage] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    const visiblePages = 5
    const totalPages = 10;
    const startPage = Math.floor(currentPage / visiblePages) * visiblePages;
    const endPage = Math.min(startPage + visiblePages, totalPages);



    useEffect(() => {
        fetchCatImages(currentPage);
    }, [currentPage]);


    const fetchCatImages = (page) => {
        axios.get(`https://api.thecatapi.com/v1/images/search?page=${page}&limit=${itemsPerPage}&api_key=live_KptcdlhjqVlIyH5UcdBdE0s1pXJgByixJAUVwnJ6F5JQLr7UgfzLoEAmRgmIJywR`)
            .then(res => {
                console.log(1, res.data);
                setCatImage(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // 이전 페이지 넘어가는 코드

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 다음 페이지 넘어가는 코드
    // 현재페이지가 5가 된다면 다음페이지로 넘어가지 않는다.

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };



    const goToPage = (page) => {
        setCurrentPage(page);
    };




    return (
        <CatListContainer>
            <CatListHeader>
                <h1>CATLIST</h1>
                <a href="" onClick={() => { setToggle(!toggle) }}>
                    {toggle ? <p>list view</p> : <p>grid view</p>}
                </a>
            </CatListHeader>
            <CarListPhotoWrapper>
                {catImage.map((cat) => (
                    <CatListComponent key={cat.id} cat={cat} />
                ))}


            </CarListPhotoWrapper>

            <Pagination>
                <Button onClick={goToPreviousPage} disabled={currentPage === 0}>
                    이전
                </Button>
                {[...Array(visiblePages)].map((_, index) => {
                    const pageNumber = startPage + index + 1;
                    if (pageNumber <= endPage) {
                        return (
                            <PageButton
                                key={pageNumber}
                                active={currentPage + 1 === pageNumber}
                                onClick={() => goToPage(pageNumber - 1)}
                            >
                                {pageNumber}
                            </PageButton>
                        );
                    }
                    return null;
                })}
                <Button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
                    다음
                </Button>
            </Pagination>
        </CatListContainer>
    );
};


export default CatList