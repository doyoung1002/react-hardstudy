import styled from "styled-components";

const CatListItem = styled.div`
display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;

    width : 48%;
   
    flex-direction: column;
    -webkit-box-pack: start;
    -webkit-box-align: start;

    align-items: flex-start;
    grid-column-gap: 1.5em;
    grid-row-gap: 1.25em;
`;

const CatListItemImage = styled.div`
        translate: none;
        rotate: none;
        scale: none;
        position: relative;
        width: 100%;
        -webkit-box-flex: 0;
        flex: 0 0 auto;
        .img_height{
            position: relative;
            width: 100%;
            padding-top: 50%;
        }
        .img{
            position: absolute;
            left: 0%;
            top: 0%;
            right: 0%;
            bottom: 0%;
            width: 100%;
            height: 100%;
            -o-object-fit: cover;
            object-fit: cover;
        }
`;

const CatListItemTitle = styled.div`
translate: none;
    rotate: none;
    scale: none;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: start;
    align-items: flex-start;

    .item_title{
        width: 100%;
        font-family: Rainertrial, sans-serif;
        color: #eee;
        font-size: 3em;
        line-height: 0.95;
        font-weight: 500;
    }
    .item_post{
        margin-top: 0.9em;
        padding: 0.6em 1.5em;
        border-style: solid;
        border-width: 2px;
        border-color: hsla(0, 0%, 93.3%, 0.2);
        border-radius: 100vw;
        background-color: transparent;
        color: #eee;
        font-size: 0.75rem;
        line-height: 1.2;
        text-transform: uppercase;
    }
`;



const CatListComponent = (source) => {

    console.log(source.cat);
    return (
        <CatListItem>
            <CatListItemImage>
                <div className="img_height">
                    <img className="img" src={source.cat.url}></img>
                </div>
            </CatListItemImage>
            <CatListItemTitle>
                <p className="item_title">🐱catcatcat</p>
                <p className="item_post">post</p>
            </CatListItemTitle>

        </CatListItem>
    )
}

export default CatListComponent